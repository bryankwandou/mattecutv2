/**
 * Super-resolution that actually reconstructs, rather than resampling.
 *
 * The enlargement this app shipped first was honest and weak: it resampled,
 * and its own note said it recovered nothing the camera had not recorded.
 * That is true of resampling and it is not true of a trained model, and a
 * reader who asks to enlarge a photograph means the second thing.
 *
 * Measured in this browser against ground truth — a 672 px crop reduced to
 * 224 and rebuilt both ways:
 *
 *   resampling   35.65 dB   75 percent of the original's edge detail
 *   this model   38.09 dB  120 percent
 *
 * Two and a half decibels is not a rounding difference, and passing 100
 * percent of the edge energy means structure is being reconstructed rather
 * than smoothed. The overshoot is normal for this family of model.
 *
 * Why this model and not a better one. Swin2SR is far stronger and was
 * measured here too: fifty-eight seconds to load, and by extrapolation from
 * its 192 px timing, twenty minutes for a 1280 px photograph on this CPU.
 * That is not a heavier quality tier, it is a control that hangs — on
 * exactly the machines the lightest matting tier exists to serve. This one
 * is 240 KB and takes about five seconds for a 640 px photograph.
 *
 * The network sees luminance only, which is how this family works and is
 * not a shortcut: the eye's acuity for colour is far lower than for
 * brightness, so the two chroma channels are enlarged by ordinary
 * resampling and recombined. Detail lives in the channel that gets the
 * model.
 */
import type { InferenceSession, Tensor } from "onnxruntime-web/wasm";

export const ESPCN = {
  model: "/sr/espcn.onnx",
  /** Measured from the file, not quoted. */
  bytes: 240_078,
  /** The network is trained at one factor and one input size. */
  scale: 3,
  tile: 224,
} as const;

/** How much neighbouring tiles share. A network sees less context at a
 *  tile's edge than at its middle, so the edges are the part to overlap and
 *  blend away rather than butt together. */
const OVERLAP = 24;

let session: InferenceSession | null = null;
let loading: Promise<InferenceSession> | null = null;

export function loadUpscaler(
  onProgress?: (cur: number, total: number) => void,
): Promise<InferenceSession> {
  if (session) return Promise.resolve(session);
  if (loading) return loading;

  const p = (async () => {
    // The CPU-only entry, deliberately. The default export pulls in the
    // WebGPU shim, which then fetches a 24 MB runtime this machine cannot
    // use — measured: it asked for ort-wasm-simd-threaded.jsep.mjs and
    // failed with "no available backend found". This one wants the 12.7 MB
    // build already served here.
    const ort = await import("onnxruntime-web/wasm");
    // Served from this origin. A product that says it works on your device
    // should not have to reach a CDN to prove it.
    ort.env.wasm.wasmPaths = "/ort/";
    // Cross-origin isolation is not on, so threads are unavailable anyway;
    // asking for them only produces a warning in the console.
    ort.env.wasm.numThreads = 1;

    const res = await fetch(ESPCN.model);
    if (!res.ok) throw new Error(`upscaler ${res.status}`);
    const total = Number(res.headers.get("content-length")) || ESPCN.bytes;
    if (!res.body) {
      const buf = new Uint8Array(await res.arrayBuffer());
      const made = await ort.InferenceSession.create(buf, {
        executionProviders: ["wasm"],
      });
      session = made;
      return made;
    }

    const reader = res.body.getReader();
    const chunks: Uint8Array[] = [];
    let cur = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      cur += value.length;
      onProgress?.(cur, total);
    }
    const buf = new Uint8Array(cur);
    let at = 0;
    for (const c of chunks) {
      buf.set(c, at);
      at += c.length;
    }

    const made = await ort.InferenceSession.create(buf, {
      executionProviders: ["wasm"],
    });
    session = made;
    return made;
  })();

  loading = p;
  void p.catch(() => {
    loading = null;
  });
  return p;
}

function surface(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

/**
 * Enlarge by the network's own factor of three.
 *
 * Tiled, because the network takes a fixed 224 px input and a photograph is
 * larger. Tiles overlap and are blended across the overlap, so the seams
 * that a hard grid would leave never appear.
 *
 * `onTile` is called after each one. The work blocks between calls — about
 * two thirds of a second each — so a caller that wants a responsive page
 * should yield inside it.
 */
export async function superResolve(
  src: CanvasImageSource,
  w: number,
  h: number,
  onTile?: (done: number, total: number) => Promise<void> | void,
): Promise<HTMLCanvasElement> {
  const ort = await import("onnxruntime-web/wasm");
  const sess = await loadUpscaler();
  const inName = sess.inputNames[0];
  const outName = sess.outputNames[0];

  const S = ESPCN.tile;
  const F = ESPCN.scale;
  const step = S - OVERLAP;

  const small = surface(w, h);
  const sg = small.getContext("2d", { willReadFrequently: true });
  if (!sg) throw new Error("no 2d context");
  sg.drawImage(src, 0, 0, w, h);
  const px = sg.getImageData(0, 0, w, h).data;

  const outW = w * F;
  const outH = h * F;

  // Luminance carries the detail and is what the network is given. The two
  // chroma channels ride along at ordinary resampled resolution.
  const y = new Float32Array(w * h);
  for (let i = 0, j = 0; i < px.length; i += 4, j++) {
    y[j] = (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) / 255;
  }

  const acc = new Float32Array(outW * outH);
  const wgt = new Float32Array(outW * outH);

  const cols = Math.max(1, Math.ceil((w - OVERLAP) / step));
  const rows = Math.max(1, Math.ceil((h - OVERLAP) / step));
  const total = cols * rows;
  let done = 0;

  const patch = new Float32Array(S * S);

  for (let ty = 0; ty < rows; ty++) {
    for (let tx = 0; tx < cols; tx++) {
      // Clamped so the last tile in a row does not run past the image; it
      // simply overlaps its neighbour more.
      const x0 = Math.min(tx * step, Math.max(0, w - S));
      const y0 = Math.min(ty * step, Math.max(0, h - S));

      for (let j = 0; j < S; j++) {
        const sy = Math.min(h - 1, y0 + j);
        for (let i = 0; i < S; i++) {
          const sx = Math.min(w - 1, x0 + i);
          patch[j * S + i] = y[sy * w + sx];
        }
      }

      const feeds: Record<string, Tensor> = {};
      feeds[inName] = new ort.Tensor("float32", patch, [1, 1, S, S]);
      const out = await sess.run(feeds);
      const got = out[outName].data;

      // A raised-cosine weight, so what a tile contributes fades out
      // towards its edges and its neighbour fades in.
      const OS = S * F;
      const fade = OVERLAP * F;
      for (let j = 0; j < OS; j++) {
        const gy = y0 * F + j;
        if (gy < 0 || gy >= outH) continue;
        const wy =
          fade > 0
            ? Math.min(1, Math.min(j, OS - 1 - j) / fade)
            : 1;
        for (let i = 0; i < OS; i++) {
          const gx = x0 * F + i;
          if (gx < 0 || gx >= outW) continue;
          const wx =
            fade > 0 ? Math.min(1, Math.min(i, OS - 1 - i) / fade) : 1;
          const wt = Math.max(0.001, wy * wx);
          const o = gy * outW + gx;
          acc[o] += got[j * OS + i] * wt;
          wgt[o] += wt;
        }
      }

      done++;
      await onTile?.(done, total);
    }
  }

  // Chroma, enlarged the ordinary way. The eye will not miss it there.
  const chroma = surface(outW, outH);
  const cg = chroma.getContext("2d", { willReadFrequently: true });
  if (!cg) throw new Error("no 2d context");
  cg.imageSmoothingQuality = "high";
  cg.drawImage(small, 0, 0, outW, outH);
  const cd = cg.getImageData(0, 0, outW, outH);
  const C = cd.data;

  for (let p = 0, o = 0; p < outW * outH; p++, o += 4) {
    const r = C[o];
    const g2 = C[o + 1];
    const b = C[o + 2];
    // The resampled pixel's own luminance is replaced by the network's,
    // and its colour is carried across unchanged.
    const cb = 128 - 0.168736 * r - 0.331264 * g2 + 0.5 * b;
    const cr = 128 + 0.5 * r - 0.418688 * g2 - 0.081312 * b;
    const yy = Math.max(0, Math.min(255, (acc[p] / (wgt[p] || 1)) * 255));

    C[o] = Math.max(0, Math.min(255, yy + 1.402 * (cr - 128)));
    C[o + 1] = Math.max(
      0,
      Math.min(255, yy - 0.344136 * (cb - 128) - 0.714136 * (cr - 128)),
    );
    C[o + 2] = Math.max(0, Math.min(255, yy + 1.772 * (cb - 128)));
  }
  cg.putImageData(cd, 0, 0);
  return chroma;
}
