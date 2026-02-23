# Panduan Simulasi Pengujian Manual - Fitur Iqomah

Dokumen ini menjelaskan cara melakukan simulasi pengujian fitur Iqomah secara manual untuk memverifikasi alur visual tanpa menunggu waktu sholat asli.

## 🛠️ Persiapan Pengujian
Pengujian dilakukan dengan memanipulasi data waktu sholat (API mock) dan mempercepat durasi hitung mundur.

### 1. Manipulasi Waktu Sholat
Buka file `js/script.js` dan cari bagian `prayerTimes`. Timpa salah satu waktu sholat dengan waktu yang 1-2 menit ke depan dari waktu sekarang.

*Contoh (Jika sekarang jam 14:00):*
```javascript
prayerTimes = {
  // ... data lainnya
  Ashar: "14:02", // Ganti dengan waktu target simulasi
  // ... data lainnya
};
```

### 2. Mempercepat Durasi Iqomah
Buka file `js/iqomah.js`, lalu ubah nilai pada objek `iqDurations`. Gunakan angka desimal jika ingin durasi dalam hitungan detik.

*Contoh (20 detik):*
```javascript
// 0.333 menit ≈ 20 detik
export const iqDurations = { Subuh: 12, Dzuhur: 10, Ashar: 0.333, Maghrib: 7, Isya: 10 };
```

### 3. Mempercepat Pesan Penyelesaian
Buka file `js/script.js`, cari bagian `setTimeout` di dalam `triggerIqomah` (saat `onComplete` dipanggil). Ubah nilai milidetik menjadi lebih kecil.

*Contoh (10 detik):*
```javascript
setTimeout(() => {
  document.getElementById("prayer-completion-overlay").classList.add("hidden");
}, 10000); // 10000ms = 10 detik
```

---

## 🏃 Cara Melakukan Tes
1. Simpan semua perubahan file.
2. Buka proyek menggunakan **Live Server** di VS Code.
3. Tunggu hingga jam pada aplikasi mencapai waktu yang Anda tentukan di langkah 1.
4. Perhatikan alur: **Dashboard** -> **Overlay Iqomah** -> **Pesan Penyelesaian** -> kembali ke **Dashboard**.

---

## ⚠️ Membersihkan Hasil Tes (Revert)
Setelah pengujian selesai, pastikan Anda mengembalikan kode ke kondisi semula:
1. Hapus nilai statis waktu sholat di `script.js` (kembalikan ke `t.Asr`, dll).
2. Kembalikan durasi iqomah di `iqomah.js` ke nilai menit yang asli (10, 7, dll).
3. Kembalikan durasi pesan penyelesaian ke `600000` (10 menit).

> [!CAUTION]
> Jangan biarkan kode simulasi ini ter-push ke produksi (GitHub) karena akan merusak jadwal asli di masjid.
