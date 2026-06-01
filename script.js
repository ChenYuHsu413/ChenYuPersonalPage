const currentTime = document.getElementById("current-time");
const currentDate = document.getElementById("current-date");

function updateCurrentTime() {
    const now = new Date();

    currentTime.textContent = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).format(now);

    currentDate.textContent = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(now);
}

updateCurrentTime();
setInterval(updateCurrentTime, 1000);
