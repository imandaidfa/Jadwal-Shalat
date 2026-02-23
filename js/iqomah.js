export const iqDurations = { Subuh: 12, Dzuhur: 10, Ashar: 10, Maghrib: 7, Isya: 10 };

export const motivations = [
    "Shalatlah tepat waktu, karena itu adalah amalan yang paling dicintai Allah.",
    "Shalat berjamaah lebih utama 27 derajat dibandingkan shalat sendirian.",
    "Luruskan dan rapatkan shaf, karena kerapian shaf adalah bagian dari kesempurnaan shalat.",
    "Tenanglah dalam melangkah menuju masjid, karena setiap langkah menghapus dosa.",
    "Ingatlah Allah dalam shalatmu, seolah-olah itu adalah shalat terakhirmu."
];

let iqTimer = null;

export const startIqomah = (name, onUpdate, onComplete) => {
    const duration = (iqDurations[name] || 10) * 60;
    let timeLeft = duration;

    const motivation = motivations[Math.floor(Math.random() * motivations.length)];
    onUpdate({ timeLeft, motivation });

    if (iqTimer) clearInterval(iqTimer);

    iqTimer = setInterval(() => {
        timeLeft--;
        onUpdate({ timeLeft });

        if (timeLeft <= 0) {
            clearInterval(iqTimer);
            onComplete();
        }
    }, 1000);

    return () => clearInterval(iqTimer);
};
