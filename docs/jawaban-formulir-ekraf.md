# Jawaban formulir Founders Arena 2026 (techsummit.ekraf.go.id)

Draf siap tempel. Formulir diisi dan dikirim sendiri oleh pendaftar. Tenggat 22 November 2026. Angka tidak boleh dikarang; bagian Traksi sengaja kosong.

## Identitas produk

- **Nama produk:** Mattecut
- **Tagline:** Pasfoto dan foto produk rapi, diproses di perangkat Anda, tanpa akun dan tanpa unggah.
- **URL produk:** https://mattecut.vercel.app
- **Repositori:** https://github.com/bryankwandou/mattecutv2

## Kategori teknologi

**Artificial Intelligence (AI) & Big Data**

Alasan singkat: inti Mattecut adalah model AI visi komputer (segmentasi subjek, deteksi titik bahu) yang berjalan langsung di peramban pengguna lewat WebGPU/WebAssembly, bukan di server.

## Deskripsi 50 kata

Mattecut adalah studio pasfoto dan foto katalog produk berbasis AI yang berjalan sepenuhnya di peramban. Foto dipotong, diberi latar studio, dan dipasangi jas formal otomatis di perangkat pengguna, tanpa akun dan tanpa mengunggah ke server. Cocok untuk UMKM, pelamar kerja, dan kreator.

## Deskripsi 150 kata

Mattecut adalah studio pasfoto dan foto katalog produk untuk UMKM, pelamar kerja, dan kreator. Seluruh pemrosesan berjalan di peramban pengguna, sehingga foto tidak pernah diunggah ke server kami dan tidak perlu membuat akun.

Pengguna cukup memilih foto. Mattecut memotong subjek dengan model AI, lalu pengguna memilih latar: abu, putih, biru, merah, gradien studio, transparan, atau ratusan foto latar yang tersimpan di aplikasi. Untuk pasfoto, jas formal (charcoal, navy, blazer) dipasang otomatis mengikuti posisi bahu yang dideteksi. Hasil dapat dipertajam, diperbesar, lalu diunduh sebagai PNG, JPG, atau WebP.

Tersedia beberapa tingkat model supaya cocok untuk perangkat dan kuota data yang berbeda, termasuk mode tanpa hapus latar yang tidak mengunduh model segmentasi sama sekali. Antarmuka mendukung 18 bahasa, termasuk Indonesia, dan bahasa awal menyesuaikan lokasi pengguna.

## Deskripsi 300 kata

Mattecut adalah studio pasfoto dan foto katalog produk yang berjalan sepenuhnya di peramban. Ditujukan bagi UMKM yang butuh foto produk bersih, pelamar kerja yang butuh pasfoto formal, dan kreator yang butuh gambar dengan latar rapi, tanpa perlu ke studio foto atau membayar jasa desain.

Cara pakainya sederhana. Pengguna membuka situs, memilih foto (atau mencoba foto contoh), dan Mattecut memotong subjek menggunakan model segmentasi AI yang dijalankan lewat WebGPU atau WebAssembly di perangkat pengguna. Setelah itu pengguna memilih latar: abu formal, putih, biru, merah, gradien studio, transparan, atau ratusan foto latar yang sudah tersimpan di aplikasi dan bisa dipakai tanpa koneksi ke sumber lain. Untuk pasfoto, Mattecut mendeteksi titik bahu dengan MediaPipe Pose lalu memasang jas formal (charcoal, navy, atau blazer) secara otomatis. Hasil bisa dipertajam dengan penajaman yang menjaga tepi potongan, diperbesar, lalu diunduh dalam resolusi asli sebagai PNG, JPG, atau WebP. Pekerjaan juga disimpan sebagai draf di peramban sehingga tidak hilang saat halaman ditutup.

Karena komputasi terjadi di perangkat, foto wajah dan produk tidak meninggalkan perangkat pengguna. Privasi dijaga oleh arsitektur, bukan sekadar janji. Biaya server per foto pun nyaris nol, sehingga layanan dasar dapat tetap gratis.

Mattecut menyediakan beberapa tingkat model, dari tingkat ringan berbasis MediaPipe hingga tingkat maksimum, serta mode tanpa hapus latar yang tidak mengunduh model segmentasi. Ini membantu pengguna dengan perangkat lama atau kuota data terbatas. Antarmuka tersedia dalam 18 bahasa, termasuk Indonesia dan Arab (tata letak kanan-ke-kiri), dan bahasa awal mengikuti lokasi pengguna sementara pilihan manual selalu diutamakan.

## Masalah

- Pasfoto dan foto katalog yang rapi biasanya butuh studio atau jasa desain berbayar, yang memberatkan UMKM dan pencari kerja.
- Banyak alat hapus latar daring memproses foto di server. Artinya foto, termasuk foto wajah, dikirim ke pihak lain.
- Pengguna dengan kuota data terbatas atau perangkat sederhana butuh pilihan yang hemat unduhan dan tidak berat.
- Pasfoto formal dengan jas dan latar standar umumnya masih dikerjakan manual di aplikasi desain.

## Solusi

Mattecut menjalankan seluruh alur di peramban: potong subjek, ganti latar, pasang jas otomatis, pertajam, perbesar, dan unduh. Tanpa akun, tanpa unggah foto ke server. Tersedia beberapa tingkat model (ringan sampai maksimum) dan mode tanpa hapus latar untuk perangkat atau kuota terbatas, katalog latar yang tersimpan di aplikasi, serta 18 bahasa.

## Target pengguna utama

1. **UMKM:** pelaku usaha yang membuat foto katalog produk untuk marketplace dan media sosial dengan latar bersih.
2. **Pelamar kerja:** pencari kerja yang butuh pasfoto formal (latar abu/putih/biru/merah, jas otomatis) tanpa ke studio.
3. **Kreator:** pembuat konten yang butuh subjek terpotong dan latar bervariasi untuk thumbnail, poster, dan unggahan.

## Keunggulan dibanding kompetitor berbasis cloud

Pembanding: Photoroom, remove.bg, Pixelcut, Adobe Express, Clipdrop.

Klaim yang dapat diverifikasi:

- Layanan-layanan tersebut memproses gambar di server mereka. Mattecut memproses foto di perangkat pengguna; bukti ada di kode (`src/lib/matting.ts`, `src/lib/lite.ts`, `src/lib/pose.ts`, `public/ort/`, `public/mediapipe/`).
- Karena pemrosesan di perangkat, foto pengguna tidak diunggah untuk dipotong, dan tidak ada biaya GPU server per foto. Yang diunduh dari jaringan hanya berkas model dan aset (foto latar), bukan foto pengguna. Hal ini dapat dibuktikan lewat tab Network di peramban.
- Mattecut tidak meminta akun untuk dipakai.
- Ada mode tanpa hapus latar yang tidak mengunduh model segmentasi.

Tidak diklaim: perbandingan kualitas hasil, kecepatan, harga, atau fitur lain terhadap pesaing, karena belum diukur secara terdokumentasi.

## Model bisnis

- **Sekarang:** pemakaian tunggal di peramban gratis penuh.
- **RENCANA (belum ada di kode):** paket Pro/UMKM untuk pemrosesan massal foto katalog; preset cetak pasfoto (3x4, 4x6, paspor); lisensi komponen untuk toko online.
- **Struktur biaya:** pemrosesan di perangkat pengguna, jadi tidak ada biaya GPU server per foto; biaya utama adalah hosting statis dan pengembangan.

## Dampak ekonomi kreatif

- Menurunkan biaya produksi visual bagi pelaku UMKM dan kreator mikro: foto produk dan pasfoto yang layak dapat dibuat sendiri tanpa jasa studio.
- Membantu pelamar kerja menyiapkan berkas lamaran dengan pasfoto formal tanpa biaya studio.
- Privasi foto terjaga sehingga pengguna tidak perlu menyerahkan foto wajah ke layanan pihak ketiga.
- Berjalan di peramban dan bisa dipakai pada perangkat sederhana, dengan pilihan hemat kuota, sehingga menjangkau pengguna di luar kota besar.
- Dampak ini adalah tujuan produk. Belum ada angka dampak terukur; jangan menyebut angka sebelum ada data (lihat Traksi).

## Teknologi (diperiksa ke kode)

| Komponen | Bukti di repositori |
| --- | --- |
| Framework: Next.js 16.3.2, React 19, Tailwind 4 | `package.json` |
| Segmentasi subjek di peramban: `@imgly/background-removal` ^1.7.0 dan `onnxruntime-web` ^1.21.0 (model ISNet, varian quint8/fp16/penuh), WebGPU bila tersedia, WebAssembly sebagai cadangan | `package.json`, `src/lib/matting.ts`, `public/ort/`, `public/matting-worker.js` |
| Tingkat ringan MediaPipe (selfie segmenter ~244 KB) | `src/lib/lite.ts`, `public/mediapipe/selfie_segmenter.tflite` |
| Deteksi bahu: MediaPipe Pose (`@mediapipe/tasks-vision` ^1.0.1) | `src/lib/pose.ts`, `public/mediapipe/pose_landmarker_lite.task` |
| Jas otomatis (charcoal, navy, blazer) | `src/lib/garment.ts`, `public/attire/` |
| Deteksi area pasfoto dan komposisi, ekspor PNG/JPG/WebP | `src/lib/portrait.ts`, `src/lib/compose.ts` |
| Penajaman aman tepi dan perbesar gambar | `src/lib/sharpen.ts`, `src/lib/upscale.ts`, `public/sr/espcn.onnx` |
| Katalog latar offline (934 berkas WebP) dan latar SVG | `public/offline/`, `public/catalogue/`, `public/backdrops/` |
| Draf otomatis di peramban (IndexedDB) | `src/lib/draft.ts` |
| 18 bahasa, RTL untuk Arab, bahasa awal dari IP | `src/lib/i18n/`, `proxy.ts` |

Catatan jujur: berkas model segmentasi tingkat atas diunduh dari CDN pustaka saat pertama dipakai (`src/lib/catalog.ts`), dan sebagian foto latar berasal dari Wikimedia Commons (`src/lib/photos.ts`). Yang diunduh adalah model dan aset, bukan foto pengguna. Ukuran unduhan tiap tingkat model: gunakan angka dari halaman `/studio` setelah selaras (README masih perlu diselaraskan, 54 MB vs 95 MB).

## Traksi (Step 4): KOSONG, isi hanya dengan data nyata

Jangan menulis angka perkiraan. Kosongkan sampai ada pengukuran.

| Kolom formulir | Isi |
| --- | --- |
| dev_status | (isi sesuai kondisi sebenarnya) |
| first_external_use | |
| early_users | |
| traction_indicator | |
| traction_value | |
| measurement_period | |

### Panduan mengisi

1. Cari 5 sampai 10 pengguna eksternal (UMKM, pelamar kerja, kreator) yang bukan tim dan bukan keluarga dekat.
2. Beri tugas yang sama: buat satu pasfoto atau satu foto produk dari foto mereka sendiri, tanpa dibantu.
3. Catat per orang: inisial, tanggal, perangkat dan peramban, berhasil sampai unduh atau tidak, waktu dari buka sampai unduh, kendala, komentar. Simpan bukti (tangkapan layar atau catatan sesi) dengan izin mereka.
4. Tanggal sesi pertama dengan orang luar = `first_external_use`. Jumlah orang unik yang benar-benar mencoba = `early_users`.
5. Untuk indikator "Documented User Testing", `traction_value` = jumlah sesi tercatat; `measurement_period` = rentang tanggal sesi pertama sampai terakhir.
6. Salin hanya angka yang bisa dibuktikan dari catatan itu.

## Pengingat sebelum kirim

- Tenggat 22 November 2026.
- Syarat usia di skema formulir ("21 hingga 35 tahun") berbeda dari metadata halaman depan ("23-30 tahun"); cek di halaman resmi.
- Step Profil mengunci NIK 16 digit secara permanen; periksa ketikan.
