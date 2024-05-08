displayTime();

function displayTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  const dateString = now.toLocaleDateString();
  document.getElementById("time").textContent = timeString;
  document.getElementById("date").textContent = dateString;
}
setInterval(displayTime, 1000);
