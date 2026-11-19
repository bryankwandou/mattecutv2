# Mattecut untuk Founders Arena 2026

Situs: https://mattecut.vercel.app | Kode: https://github.com/bryankwandou/mattecut
Formulir resmi: techsummit.ekraf.go.id. Formulir diisi sendiri oleh pendaftar; dokumen ini hanya bahan bantu.

## Ringkasan pitch

Mattecut adalah studio pasfoto dan foto katalog produk untuk UMKM, pelamar kerja, dan kreator yang berjalan seluruhnya di peramban. Foto dipotong, diberi latar studio (abu, putih, biru, merah, atau ratusan foto latar), dan dipasangi jas formal secara otomatis di perangkat pengguna, tanpa akun dan tanpa mengunggah ke server. Karena komputasi ada di perangkat, biaya per pengguna mendekati nol dan privasi foto terjaga secara arsitektur, bukan janji.

## Masalah

- Pasfoto dan foto katalog yang rapi biasanya butuh studio atau jasa desain berbayar.
- Alat hapus latar daring umumnya mewajibkan akun, kuota, atau mengunggah foto (termasuk foto wajah dan KTP-adjacent) ke server pihak lain.
- Pengguna dengan kuota data terbatas butuh pilihan yang hemat unduhan.

## Solusi

Pemrosesan di peramban (WebGPU/WebAssembly), lima tingkat model dari sekitar 12 MB sampai sekitar 190 MB, mode 0 MB tanpa hapus latar, jas otomatis, katalog latar offline, 18 bahasa, dan bahasa awal mengikuti lokasi IP.

## Demo 60 detik untuk juri

1. Buka https://mattecut.vercel.app (landing).
2. Klik kartu **Pasfoto** di bawah hero. Ini membuka `/studio?preset=passport`.
3. Klik **foto contoh** orang di area unggah (tidak perlu menyiapkan file).
4. Tunggu proses potong selesai (unduhan model pertama bisa memakan beberapa detik; lihat indikator progres).
5. Pilih **latar abu** (latar abu formal) dan, bila perlu, pasang jas.
6. Klik **Unduh**.

Catatan: langkah 2-5 bergantung pada fitur preset dan foto contoh yang dibuat agen lain. Cek lagi di situs hasil deploy sebelum dipakai di depan juri.

## Fitur teknis dan bukti di kode

| Fitur | Bukti |
| --- | --- |
| Pemotongan subjek di perangkat (ONNX, WebGPU/WASM) | `src/lib/matting.ts`, `worker/`, `public/ort/` |
| Tingkat ringan MediaPipe (~12 MB) | `src/lib/lite.ts`, `public/mediapipe/selfie_segmenter.tflite` |
| Deteksi bahu MediaPipe Pose | `src/lib/pose.ts`, `public/mediapipe/pose_landmarker_lite.task` |
| Jas otomatis (charcoal, navy, blazer) | `src/lib/garment.ts`, `public/attire/` |
| Deteksi area pasfoto | `src/lib/portrait.ts` |
| Penajaman aman tepi | `src/lib/sharpen.ts` |
| Perbesar gambar | `src/lib/upscale.ts`, `public/sr/espcn.onnx` |
| Mode 0 MB tanpa hapus latar | sakelar `cutBg` di `src/components/studio.tsx` |
| Katalog latar offline (934 berkas WebP) | `public/offline/`, `public/catalogue/offline.json` |
| Latar studio SVG | `public/backdrops/` |
| Draf otomatis di IndexedDB | `src/lib/draft.ts` |
| Komposisi dan ekspor PNG/JPG/WebP resolusi asli | `src/lib/compose.ts` |
| 18 bahasa, RTL untuk Arab | `src/lib/i18n/locales/` |
| Bahasa awal dari IP (`x-vercel-ip-country`), pilihan manual selalu menang | `proxy.ts`, `src/components/preferences.tsx` |

Catatan jujur: kunci `localStorage` bahasa masih bernama `roto.lang` (warisan nama kode awal).

## Skema keberlanjutan

- Sekarang: pemakaian tunggal di peramban gratis penuh.
- RENCANA (belum ada di kode): paket Pro/UMKM untuk pemrosesan massal foto katalog; preset cetak pasfoto 3x4, 4x6, paspor; lisensi komponen ke toko online.
- Struktur biaya: pemrosesan di perangkat pengguna, jadi tidak ada biaya GPU server per foto.

## Checklist pendaftaran

- [ ] Tenggat pendaftaran: **22 November 2026**. Residensi: **29 November sampai 4 Desember 2026**.
- [ ] Cek syarat usia. Skema formulir mencatat "berusia 21 hingga 35 tahun (belum genap 36 tahun) pada saat pendaftaran", sedangkan metadata halaman depan menulis "23-30 tahun". Keduanya tidak sama; pastikan di halaman resmi sebelum mendaftar.
- [ ] Step Profil **mengunci NIK 16 digit secara permanen**. Periksa ketikan sebelum menyimpan.
- [ ] Data traksi Step 4 diisi dengan data nyata (lihat template di bawah).
- [ ] Formulir diisi sendiri oleh pendaftar. Dokumen ini tidak mengisinya.

## Data traksi Step 4: TEMPLATE (kosong, isi hanya dengan data nyata)

Jangan mengisi angka perkiraan atau karangan. Kosongkan sampai ada pengukuran sungguhan.

| Kolom formulir | Isi |
| --- | --- |
| dev_status | |
| first_external_use (tanggal pemakaian pertama oleh orang luar) | |
| early_users (jumlah pengguna awal) | |
| traction_indicator (mis. Documented User Testing atau Monthly Active Users) | |
| traction_value | |
| measurement_period | |

### Cara mengukur

1. Cari 5 sampai 10 pengguna eksternal (UMKM, pelamar kerja, kreator) yang bukan tim dan bukan keluarga dekat.
2. Beri tugas yang sama: buat satu pasfoto atau satu foto produk dari foto mereka sendiri, tanpa dibantu.
3. Catat per orang: nama atau inisial, tanggal, perangkat dan peramban, apakah berhasil sampai unduh, waktu dari buka sampai unduh, kendala, dan komentar. Simpan bukti (tangkapan layar atau catatan sesi) dengan izin mereka.
4. Tanggal sesi pertama dengan orang luar menjadi `first_external_use`. Jumlah orang unik yang benar-benar mencoba menjadi `early_users`.
5. Untuk indikator "Documented User Testing", `traction_value` adalah jumlah sesi yang tercatat; `measurement_period` adalah rentang tanggal sesi pertama sampai terakhir.
6. Salin hanya angka yang bisa dibuktikan dari catatan itu ke formulir.

Tabel catatan sesi (kosong):

| # | Tanggal | Pengguna (inisial) | Latar belakang | Perangkat | Berhasil unduh? | Waktu | Kendala |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
