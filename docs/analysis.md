# Analisis Teknis Fitur Jadwal Shalat

Dokumen ini berisi hasil bedah teknis terhadap fitur-fitur utama dalam aplikasi Jadwal Shalat.

## 1. Jam Real-time & Sinkronisasi DOM

### Implementasi
Logika jam utama dijalankan di dalam `DOMContentLoaded` pada file `script.js` menggunakan fungsi `setInterval`.

```javascript
setInterval(() => {
  els.clock.textContent = new Date().toLocaleTimeString("id-ID", { 
    hour: "2-digit", 
    minute: "2-digit", 
    second: "2-digit" 
  }).replace(/\./g, ":");
}, 1000);
```

### Analisis Teknis
- **Akurasi**: Pembaruan dilakukan setiap 1000ms (1 detik). Meskipun `setInterval` tidak menjamin akurasi milidetik yang sempurna karena beban event loop, untuk kebutuhan display jam digital detik demi detik, durasi ini sudah sangat memadai.
- **Lokalisasi**: Penggunaan `id-ID` memastikan format waktu mengikuti standar Indonesia. Terdapat manipulasi string `.replace(/\./g, ":")` karena secara default standar Windows/Node untuk `id-ID` sering menggunakan titik sebagai pemisah waktu.
- **Efisiensi**: Update DOM dilakukan secara langsung pada `textContent`. Ini adalah cara tercepat untuk memperbarui teks tanpa memicu proses parsing HTML ulang (seperti pada `innerHTML`).

---

## 2. API Waktu Sholat & Penanganan Data

### Alur Kerja
Aplikasi menggunakan API publik dari `aladhan.com`. Proses pengambilan data dilakukan melalui fungsi asinkron `fetchTimes`.

### Analisis Teknis
- **Metode Perhitungan**: API dipanggil dengan parameter `method=23` (Kemenag RI). Ini krusial untuk memastikan waktu sholat sesuai dengan standar yang berlaku di Indonesia.
- **Koordinat**: Menggunakan koordinat statis (default Bogor) atau dinamis via Geolocation API. Terdapat *fallback* yang solid jika pengguna menolak memberikan akses lokasi.
- **Hijri Context**: Selain waktu sholat, API ini juga menyediakan data kalender Hijriah yang langsung ditampilkan di sidebar, mengurangi kebutuhan akan library eksternal tambahan.

---

## 3. Logika Iqomah Modular

### Arsitektur
Fitur Iqomah dipisahkan ke dalam modul ES `js/iqomah.js` untuk meningkatkan keterbacaan dan mempermudah pengetesan otomatis.

### Analisis Teknis
- **Mekanisme Pemicu**: Fungsi `startCountdown` di `script.js` berjalan setiap menit untuk memeriksa apakah waktu saat ini cocok dengan jadwal sholat.
- **Sistem Callback**: `startIqomah` menggunakan pola *callback* (`onUpdate` dan `onComplete`). Ini memisahkan logika hitung mundur (bisnis) dari manipulasi DOM (view), sesuai dengan prinsip *Separation of Concerns*.
- **State Management**: Transisi antar layar (Dashboard -> Iqomah -> Sholat) dikelola dengan memanipulasi kelas `.hidden` pada overlay. Transisi ini dianimasikan menggunakan CSS `fadeIn` untuk memberikan kesan premium.

---

## Kesimpulan
Sistem ini dibangun dengan pendekatan minimalis namun kuat. Pemisahan logika ke dalam modul JavaScript pendukung (Iqomah) dan penggunaan API publik yang standar membuat aplikasi ini mudah dipelihara dan dikembangkan lebih lanjut.
