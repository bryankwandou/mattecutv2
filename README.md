# Mattecut

Studio pasfoto dan foto katalog produk yang berjalan di dalam peramban: hapus latar, ganti latar studio, pasang jas otomatis. Tanpa akun. Berkas tidak
pernah dikirim ke server mana pun, tidak ada antrean, tidak ada kuota harian,
dan hasilnya diunduh pada resolusi asli.

Nama kode awal proyek ini adalah "Roto" (dari *rotoscoping*, istilah film untuk
memisahkan subjek dari latarnya). Beberapa kunci teknis masih memakai awalan itu,
misalnya `localStorage` `roto.lang`; sengaja tidak diubah agar pilihan bahasa
pengguna lama tidak hilang.

## Apa yang membuatnya berbeda

Model segmentasi dijalankan oleh peramban lewat WebAssembly, bukan oleh
server. Konsekuensinya nyata di dua arah, dan keduanya disebut apa adanya:

- Gambar tidak menyentuh server kami, karena memang tidak ada server yang
  menerimanya. Tidak ada yang perlu Anda percayai soal apa yang terjadi pada
  foto Anda.
- Unduhan pertama antara sekitar 12 MB dan sekitar 190 MB tergantung tingkat yang dipilih
  (angka dihitung di `src/lib/matting.ts`, `downloadMb`),
  dan beban komputasi ada di perangkat Anda. Ponsel kelas bawah butuh
  belasan detik per gambar.

Halaman depan memuat satu seksi khusus yang menyebutkan batasan-batasan ini
sebelum orang mencoba, bukan sesudah.

## Fitur

- Unggah lewat tarik-lepas, tempel dari papan klip, atau galeri ponsel.
  JPG, PNG, WebP sampai 12 MB.
- Pembanding sebelum/sesudah yang bisa digeser dengan tetikus, jari, dan
  tombol panah.
- Lima tingkat model untuk jaringan dan perangkat yang berbeda. Dua tingkat
  MediaPipe (`src/lib/lite.ts`, sekitar 12 MB untuk selfie segmenter) dan tiga
  tingkat ONNX/ISNet (`src/lib/matting.ts`): ringan (bobot 42,3 MB, total
  sekitar 54 MB di CPU / 64 MB dengan WebGPU), seimbang (84,1 MB, sekitar 95 MB di CPU / 106 MB dengan
  WebGPU), dan maksimum (168 MB, sekitar 179 / 190 MB). Bisa diganti di tengah
  penyuntingan; potongan diulang pada gambar yang sama tanpa kehilangan
  latar yang sudah dipilih.
- Latar baru: transparan, swatch warna, gradien, enam wallpaper studio, atau
  gambar Anda sendiri yang bisa dipenuhkan atau dimuatkan ke bingkai.
- Spektrum warna di dalam halaman, bukan dialog warna bawaan sistem yang
  terpotong di tepi panel dan mengambil alih layar ponsel. Seluruh
  16.777.216 warna terjangkau, plus tingkat ketembusan. Kolom teks tetap
  menerima `#FF0000`, `#F00`, `#00f8`, `rgb(255, 0, 0)`, `rgb(10 20 30)`,
  dan `rgba(0, 0, 255, .4)`. Salah ketik ditandai, bukan diabaikan
  diam-diam.
- Pasfoto dan jas otomatis: tiga potongan (charcoal, navy, blazer; SVG di
  `public/attire/`) dipasang otomatis. Posisi bahu dibaca oleh MediaPipe Pose
  (`src/lib/pose.ts`, model `pose_landmarker_lite.task` sekitar 5,8 MB di
  `public/mediapipe/`); area pakaian dibaca dari kanal alfa
  (`clothingSpans`) dan garmen disesuaikan di `src/lib/garment.ts`
  (`fitGarment`). Penggeser ukuran dan tinggi jas tersedia untuk koreksi
  manual. Batasnya disebut di antarmuka: ini membaca potret hadap depan
  sebatas dada, dan kalau bahu tidak terbaca aplikasinya bilang begitu
  alih-alih menebak (`src/lib/portrait.ts` sebagai cadangan).
- Katalog latar offline: 934 berkas WebP di `public/offline/` (indeks dan
  atribusi di `public/catalogue/offline.json`, 934 entri) yang bisa dipakai
  tanpa jaringan, ditambah enam latar studio SVG di `public/backdrops/` dan
  katalog daring `public/catalogue/photos.json` (24.408 entri).
- Mode 0 MB tanpa hapus latar: matikan sakelar hapus latar di studio
  (`cutBg`) untuk langsung memperjelas (`src/lib/sharpen.ts`), memperbesar
  (`src/lib/upscale.ts`, model ESPCN sekitar 0,24 MB) atau memasang jas tanpa
  mengunduh model segmentasi.
- Bahasa awal mengikuti negara dari alamat IP: header `x-vercel-ip-country`
  dibaca di `proxy.ts` lalu disimpan ke cookie dan dipetakan ke daftar
  bahasa. Pilihan manual lewat LanguagePicker (tersimpan di `localStorage`)
  selalu menang. Disclaimer VPN: kalau Anda memakai VPN atau proxy dari luar
  negeri, bahasa awal mengikuti lokasi IP VPN itu, bukan zona waktu atau
  bahasa peramban. Itu disengaja; ganti lewat LanguagePicker.
- Hasil terakhir disimpan diam-diam di IndexedDB, jadi tab yang tertutup
  atau peramban yang mati tidak menghapus pekerjaan Anda. Latar dan jas
  yang dipilih ikut pulih.
- Ekspor PNG (kanal alfa dipertahankan), JPG, dan WebP, selalu pada resolusi
  berkas asli, bukan ukuran pratinjau.
- Mode terang dan gelap, plus opsi mengikuti sistem, tanpa kedipan saat muat.
- 18 bahasa: Indonesia, Inggris, Melayu, Spanyol, Portugis, Prancis, Jerman,
  Italia, Belanda, Turki, Vietnam, Thai, Jepang, Korea, Mandarin, Hindi,
  Rusia, dan Arab dengan tata letak kanan-ke-kiri.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

```bash
npm run build   # build produksi
npx eslint src  # lint
npx tsc --noEmit
```

## Susunan berkas

| Berkas | Isinya |
| --- | --- |
| `src/lib/matting.ts` | Pembungkus model. Satu-satunya tempat pustaka matting disentuh, dan bebas bahasa: yang keluar hanya kunci tahapan. |
| `src/lib/color.ts` | Pengurai HEX dan `rgb()`, plus konversi HSV yang menjadi tulang punggung spektrum. Mengembalikan `null` untuk apa pun yang tidak terbaca, supaya antarmuka bisa menandainya. |
| `src/lib/pose.ts` | Letak bahu lewat MediaPipe Pose (landmark 11 dan 12). |
| `src/lib/garment.ts` | Mask area pakaian dan pemasangan jas pada bahu. |
| `src/lib/lite.ts` | Segmentasi MediaPipe tingkat ringan. |
| `src/lib/portrait.ts` | Letak leher dan bahu, dibaca dari lebar kanal alfa baris demi baris. Mengembalikan `null` untuk bentuk yang tidak masuk akal sebagai potret, supaya antarmuka bisa meminta penempatan manual alih-alih menebak. |
| `src/lib/draft.ts` | Salinan tahan-crash di IndexedDB. Setiap kegagalan penyimpanan dibiarkan diam: studio harus tetap utuh di mode penyamaran, cuma tanpa jaring pengaman. |
| `src/components/spectrum.tsx` | Spektrum warna dari gradien CSS, bukan kanvas. Tidak ada bitmap yang dialokasikan dan tidak ada yang digambar ulang saat digeser, jadi ponsel murah tidak dihukum. |
| `src/lib/compose.ts` | Penyusunan kanvas dan ekspor. Pratinjau memakai CSS `background` agar seketika; kanvas hanya dipakai saat ekspor. |
| `src/lib/i18n/` | Tipe `Dict` dan 18 kamus. Menambah satu kalimat ke produk akan menggagalkan build sampai semua bahasa melengkapinya. |
| `src/components/preferences.tsx` | Tema dan bahasa, dibaca lewat `useSyncExternalStore` karena `localStorage` memang sistem eksternal. Ikut sinkron antar-tab. |
| `src/app/globals.css` | Dua palet penuh. Setiap token punya nilai di `:root` polos. |

## Aksesibilitas dan kontras

Setiap pasangan warna teks dan latar diukur di kedua tema; yang terendah
5.09 di mode terang dan 5.24 di mode gelap, keduanya di atas ambang WCAG AA
4.5. Tata letak diuji pada 375px dan 1440px untuk 18 bahasa dikali 2 tema.

## Catatan keamanan

Header keamanan diatur di `next.config.ts`: CSP, `X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP, CORP, dan
HSTS.

Satu hal disebut terbuka di komentar berkas itu: `script-src` memuat
`'unsafe-eval'` dan `blob:`. Runtime ONNX menyalakan worker dari URL `blob:`
dan mengompilasi lem Emscripten dari string, jadi tanpa keduanya potongan
pertama melempar `EvalError` dan aplikasinya mati total. Itu pelonggaran
nyata. Yang membatasi dampaknya adalah apa yang aplikasi ini simpan, yaitu
tidak ada: tanpa akun, tanpa cookie, tanpa sesi, tanpa server, tanpa skrip
pihak ketiga, dan tanpa data pengguna yang keluar dari tab. Sisanya tetap
terkunci pada `'self'` ditambah satu CDN yang menyajikan model.

## Tumpukan

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4,
`@imgly/background-removal` dan `@mediapipe/tasks-vision` untuk matting dan pose di perangkat, `motion` untuk gerak,
`lucide-react` untuk ikon.

## Keberlanjutan

Pemakaian tunggal di peramban gratis penuh dan akan tetap begitu: tanpa akun,
tanpa kuota, tanpa server yang menanggung biaya komputasi, karena pemrosesan
terjadi di perangkat pengguna.

Berikut adalah RENCANA, belum ada di kode dan belum dijual:

- Paket Pro/UMKM: pemrosesan massal foto katalog produk.
- Preset cetak pasfoto multi-ukuran (3x4, 4x6, paspor).
- Lisensi komponen untuk toko online yang ingin menanamkan fitur ini.
