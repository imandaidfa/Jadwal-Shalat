# Jawaban Portrait vs Landscape

Tidak, tampilannya tidak sama ketika dibuka dalam mode portrait dan landscape.

Penyebabnya ada di CSS responsif saat ini:

- Pada ukuran lebar normal, `.bg` memakai layout `display: flex` dua kolom, sehingga sidebar ada di samping konten utama.
- Pada `max-width: 1200px`, layout berubah menjadi satu kolom karena `.bg` menjadi `flex-direction: column` di [css/style.css](/Users/imanda/Code/Web/Sekolah/Jadwal-Shalat/css/style.css:331).
- Pada `max-width: 768px`, prayer bar berubah menjadi grid 2 kolom di [css/style.css](/Users/imanda/Code/Web/Sekolah/Jadwal-Shalat/css/style.css:382).
- Pada `max-width: 480px`, prayer bar berubah lagi menjadi 1 kolom, dan timer iqomah menjadi vertikal di [css/style.css](/Users/imanda/Code/Web/Sekolah/Jadwal-Shalat/css/style.css:436).

Artinya:

- Jika layar dibuka dalam `landscape`, biasanya lebar viewport lebih besar, jadi layout cenderung tetap melebar dan terasa seperti dashboard desktop/tablet.
- Jika layar dibuka dalam `portrait`, lebar viewport biasanya lebih kecil, jadi breakpoint lebih cepat aktif dan susunan elemen berubah.

Jadi kesimpulannya:

- `Landscape` dan `portrait` sekarang sama-sama didukung.
- Tetapi hasil tampilannya tidak identik.
- `Portrait` akan lebih bertumpuk ke bawah.
- `Landscape` akan lebih melebar ke samping.

Kalau tujuan Anda adalah membuat portrait dan landscape terlihat hampir sama, maka CSS perlu ditambah aturan berbasis `orientation` atau breakpoint khusus untuk rasio layar.

Dibuat pada: 2026-04-17 09:53:18 AM WIB
