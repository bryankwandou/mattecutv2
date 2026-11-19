/**
 * Types for onnxruntime-web.
 *
 * The package ships `types.d.ts` but its `exports` map does not point at it,
 * so TypeScript resolves the minified bundle and gives up. Rather than
 * disable checking for the import, this declares the small surface the
 * upscaler actually uses — which also means a future change to that surface
 * fails here rather than at runtime.
 */
declare module "onnxruntime-web/wasm" {
  export class Tensor {
    constructor(
      type: "float32",
      data: Float32Array,
      dims: readonly number[],
    );
    readonly data: Float32Array;
    readonly dims: readonly number[];
  }

  export interface InferenceSession {
    readonly inputNames: readonly string[];
    readonly outputNames: readonly string[];
    run(feeds: Record<string, Tensor>): Promise<Record<string, Tensor>>;
  }

  export const InferenceSession: {
    create(
      model: string | Uint8Array,
      options?: { executionProviders?: string[] },
    ): Promise<InferenceSession>;
  };

  export const env: {
    wasm: {
      wasmPaths: string;
      numThreads: number;
    };
  };
}
