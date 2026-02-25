# Penjelasan Waktu Tunggu Iqomah

Waktu tunggu (durasi) untuk Iqomah setelah masuk waktu sholat diatur di dalam file:

### 📍 Lokasi: `js/iqomah.js`

Pada baris pertama file tersebut, Anda akan menemukan objek `iqDurations` yang menentukan durasi (dalam menit) untuk setiap waktu sholat:

```javascript
// js/iqomah.js: L1
export const iqDurations = { Subuh: 12, Dzuhur: 10, Ashar: 10, Maghrib: 7, Isya: 10 };
```

### Cara Kerja:
1. **Definisi**: Angka di atas mewakili jumlah menit. Sebagai contoh, `Maghrib: 7` berarti iqomah akan dimulai 7 menit setelah adzan Maghrib.
2. **Penggunaan**: Di dalam fungsi `startIqomah`, nilai ini diambil berdasarkan nama sholat yang sedang aktif:
   ```javascript
   const duration = (iqDurations[name] || 10) * 60; // Dikonversi ke detik
   ```

Jika Anda ingin mengubah lama waktu tunggu iqomah, cukup ubah nilai angka pada objek `iqDurations` di file `js/iqomah.js`.
