document.addEventListener("DOMContentLoaded", () => {
  const els = {
    loc: document.getElementById("lokasi"),
    date: document.getElementById("tanggal-hari-ini"),
    clock: document.getElementById("live-clock"),
    nextName: document.getElementById("next-prayer-name"),
    countdown: document.getElementById("countdown-timer"),
    prayers: {
      Subuh: document.getElementById("subuh"),
      Dzuhur: document.getElementById("dzuhur"),
      Ashar: document.getElementById("ashar"),
      Maghrib: document.getElementById("maghrib"),
      Isya: document.getElementById("isya")
    }
  };

  let prayerTimes = null, coords = { lat: -6.2088, lng: 106.8456 };

  const updateTheme = () => {
    const h = new Date().getHours();
    document.body.classList.toggle("day-theme", h >= 6 && h < 18);
  };

  updateTheme();
  setInterval(updateTheme, 60000); // Update every minute

  setInterval(() => {
    els.clock.textContent = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }, 1000);

  els.date.textContent = new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const getCity = async (lat, lng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      return data.address?.city || data.address?.town || data.address?.village || "Lokasi";
    } catch {
      return "Lokasi";
    }
  };

  const fetchTimes = async (lat, lng, city) => {
    try {
      els.loc.textContent = "Memuat...";
      const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=23`);
      const data = await res.json();
      const t = data.data.timings;
      prayerTimes = { Subuh: t.Fajr, Dzuhur: t.Dhuhr, Ashar: t.Asr, Maghrib: t.Maghrib, Isya: t.Isha };
      Object.entries(prayerTimes).forEach(([k, v]) => els.prayers[k].textContent = v);
      els.loc.textContent = city;
      startCountdown();
    } catch (e) {
      console.error("Error:", e);
      els.loc.textContent = "Gagal memuat";
    }
  };

  const startCountdown = () => {
    if (!prayerTimes) return;
    const now = new Date(), today = now.toISOString().split("T")[0];
    const prayers = Object.entries(prayerTimes).map(([n, t]) => ({ name: n, time: t }));
    let next = null, nextTime = null, last = null;
    for (let i = 0; i < prayers.length; i++) {
      const dt = new Date(`${today}T${prayers[i].time}:00`);
      if (dt > now) {
        next = prayers[i];
        nextTime = dt;
        last = i > 0 ? prayers[i - 1] : { name: "Isya", time: prayerTimes.Isya };
        break;
      }
    }
    if (!next) {
      const tom = new Date(now);
      tom.setDate(tom.getDate() + 1);
      next = { name: "Subuh", time: prayerTimes.Subuh };
      nextTime = new Date(`${tom.toISOString().split("T")[0]}T${next.time}:00`);
      last = prayers[prayers.length - 1];
    }
    els.nextName.textContent = next.name;
    highlightLast(last.name);
    const int = setInterval(() => {
      const diff = nextTime - new Date();
      if (diff <= 0) {
        clearInterval(int);
        fetchTimes(coords.lat, coords.lng, els.loc.textContent);
        return;
      }
      const h = Math.floor(diff / 3600000), m = Math.floor((diff % 3600000) / 60000), s = Math.floor((diff % 60000) / 1000);
      els.countdown.textContent = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }, 1000);
  };

  const highlightLast = (name) => {
    document.querySelectorAll(".card").forEach(c => c.classList.remove("next-prayer-highlight"));
    document.querySelector(`.card[data-prayer="${name}"]`)?.classList.add("next-prayer-highlight");
  };

  const getLocation = async () => {
    if (!navigator.geolocation) return fetchTimes(coords.lat, coords.lng, "Jakarta");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      coords = { lat, lng };
      const city = await getCity(lat, lng);
      fetchTimes(lat, lng, city);
    }, () => fetchTimes(coords.lat, coords.lng, "Jakarta"));
  };

  getLocation();
});
