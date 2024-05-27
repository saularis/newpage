displayTime();

function displayTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  const dateString = now.toLocaleDateString();
  document.getElementById("time").textContent = timeString;
  document.getElementById("date").textContent = dateString;
}
setInterval(displayTime, 1000);

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

chrome.system.memory.getInfo((memoryInfo) => {
  document.getElementById("memory").textContent =
    formatBytes(memoryInfo.capacity - memoryInfo.availableCapacity) +
    " / " +
    formatBytes(memoryInfo.capacity);
});

function populateTable(data) {
  const tableBody = document.querySelector("#cpuTable tbody");
  tableBody.innerHTML = "";

  data.forEach((item, index) => {
    const totalUsage = item.usage.kernel + item.usage.user;
    const cpuUsagePercentage = (totalUsage / item.usage.total) * 100;

    const row = document.createElement("tr");
    row.innerHTML = `
          <td class="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">Core ${
            index + 1
          }</td>
          <td class="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">${
            item.usage.idle
          }</td>
          <td class="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">${
            item.usage.kernel
          }</td>
          <td class="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">${
            item.usage.user
          }</td>
          <td class="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">${
            item.usage.total
          }</td>
          <td class="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">${cpuUsagePercentage.toFixed(
            2
          )}%</td>
      `;

    tableBody.appendChild(row);
  });
}

chrome.system.cpu.getInfo((cpu) => {
  populateTable(cpu.processors);
});
