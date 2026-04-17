# Dokumentasi Commit Terkait Layout

## Ringkasan

Terdapat dua commit utama yang terkait dengan perubahan layout website pada project ini. Keduanya berfokus pada file [css/style.css](/Users/imanda/Code/Web/Sekolah/Jadwal-Shalat/css/style.css), tetapi memiliki tujuan yang berbeda.

## Commit 1

### `e6716b9` - `Fix layout to match 1920x1080 display`

Tujuan commit ini adalah membuat layout utama benar-benar pas untuk target resolusi `1920 x 1080`.

Perubahan utama:
- Mengubah ukuran container utama agar tepat `1920px x 1080px`
- Menambahkan aturan dasar untuk `html` dan `body`
- Menghapus pendekatan ukuran sebelumnya yang menghasilkan layout `1936x1088`

Statistik perubahan:
- 1 file berubah
- 11 baris ditambahkan
- 5 baris dihapus

Efek commit:
- Layout menjadi presisi untuk layar Full HD
- Fokusnya masih pada ukuran tetap, belum responsif untuk ukuran layar lain

## Commit 2

### `3bfb0ba` - `Make layout responsive across screen sizes`

Tujuan commit ini adalah mengembangkan layout fixed Full HD menjadi layout responsif yang dapat menyesuaikan ukuran layar.

Perubahan utama:
- Mengubah container utama agar mengikuti viewport
- Menambahkan skala ukuran dinamis dengan `clamp()`
- Menambahkan breakpoint untuk `1200px`, `768px`, dan `480px`
- Menyesuaikan sidebar, prayer bar, dan overlay agar lebih adaptif

Statistik perubahan:
- 1 file berubah
- 171 baris ditambahkan
- 35 baris dihapus

Efek commit:
- Layout tidak lagi terkunci di `1920x1080`
- Tampilan menjadi lebih fleksibel pada desktop, tablet, dan mobile
- Portrait dan landscape sama-sama didukung, meskipun hasil tampilannya tidak identik

## Hubungan Antar Commit

Urutan perubahan yang terjadi adalah:

1. Layout diperbaiki dulu agar akurat pada target `1920x1080`
2. Setelah itu, layout dikembangkan menjadi responsif untuk berbagai ukuran layar

Jadi commit kedua bisa dianggap sebagai evolusi dari commit pertama:
- Commit pertama menyelesaikan masalah presisi Full HD
- Commit kedua memperluas dukungan ke banyak ukuran layar

## Catatan

Kedua commit hanya menyentuh file CSS utama dan tidak mengubah struktur HTML maupun logika JavaScript.

Dibuat pada: 2026-04-17 10:01:14 AM WIB
