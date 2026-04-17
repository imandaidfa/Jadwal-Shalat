# Jawaban Portrait Sama Seperti Landscape

Ya, mode portrait bisa dibuat mirip seperti landscape, tetapi tidak ideal jika dibuat benar-benar sama persis.

Secara teknis, itu bisa dilakukan dengan:

- Mempertahankan `.bg` tetap dua kolom walaupun layar menyempit.
- Mencegah perubahan `flex-direction: column` pada breakpoint kecil di [css/style.css](/Users/imanda/Code/Web/Sekolah/Jadwal-Shalat/css/style.css:331).
- Menahan prayer bar tetap satu baris dan tidak membungkus pada breakpoint kecil di [css/style.css](/Users/imanda/Code/Web/Sekolah/Jadwal-Shalat/css/style.css:363).

Tetapi konsekuensinya:

- Konten akan menjadi terlalu sempit di portrait.
- Teks jam, nama imam, dan waktu shalat berisiko mengecil terlalu jauh.
- Pengguna bisa perlu zoom atau scroll horizontal.
- Tampilan mungkin terlihat sama secara struktur, tetapi kualitas baca dan kenyamanan turun.

## Saran Best Practice

Best practice yang lebih disarankan adalah:

1. Pertahankan **hierarki visual yang sama**, bukan layout yang sama persis.
2. Gunakan **komposisi adaptif**:
   - `landscape`: dua kolom seperti dashboard
   - `portrait`: satu kolom atau grid yang lebih vertikal
3. Pastikan elemen paling penting tetap konsisten urutannya:
   - jam
   - tanggal
   - jadwal shalat
   - informasi muadzin/khatib
4. Gunakan breakpoint berbasis **lebar layar** dan bila perlu tambahkan aturan berbasis **orientation**.
5. Prioritaskan **readability** daripada kemiripan bentuk layout.
6. Hindari memaksa semua card tetap satu baris di portrait jika membuat teks terlalu kecil.
7. Untuk display publik seperti layar masjid, lebih baik optimalkan untuk:
   - `landscape display` jika perangkat utamanya TV/monitor horizontal
   - `portrait display` jika perangkat utamanya signage vertikal

## Rekomendasi Praktis untuk Project Ini

Untuk project ini, pendekatan terbaik adalah:

- Jadikan `landscape` sebagai layout utama/default.
- Buat `portrait` tetap membawa nuansa yang sama, tetapi susunannya adaptif.
- Pertahankan warna, font, dan urutan informasi agar identitas visual tetap konsisten.
- Jika benar-benar perlu portrait terlihat sangat mirip landscape, gunakan `@media (orientation: portrait)` untuk versi khusus, bukan memaksa semua breakpoint jadi identik.

## Kesimpulan

Mode portrait bisa dibuat mirip landscape, tetapi best practice-nya bukan membuat keduanya sama persis. Yang lebih baik adalah membuat keduanya konsisten secara identitas visual dan prioritas informasi, sambil tetap menyesuaikan struktur layout dengan bentuk layar.

Dibuat pada: 2026-04-17 09:56:05 AM WIB
