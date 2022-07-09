const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const newLapButton = document.getElementById("newLapButton");
const continueButton = document.getElementById("continueButton");
const resetButton = document.getElementById("resetButton");

const stopWatchDisplay = document.getElementById("stopWatch");
const lapListTable = document.querySelector("#lapListTable tbody");

let lapId = 0;

const timer = new easytimer.Timer();
easytimerConfig = {
  precision: "secondTenths",
};

startButton.addEventListener("click", () => {
  activateStopWatch();

  startButton.style.display = "none";
  pauseButton.style.display = "inline";
  newLapButton.style.display = "inline";
});

pauseButton.addEventListener("click", () => {
  timer.pause();
  createNewLapItem();

  pauseButton.style.display = "none";
  newLapButton.style.display = "none";
  continueButton.style.display = "inline";
  resetButton.style.display = "inline";
});

continueButton.addEventListener("click", () => {
  timer.start();

  pauseButton.style.display = "inline";
  newLapButton.style.display = "inline";
  continueButton.style.display = "none";
  resetButton.style.display = "none";
});

resetButton.addEventListener("click", () => {
  timer.stop();
  stopWatchDisplay.textContent = "00:00:00.0";
  lapListTable.innerHTML = "";

  startButton.style.display = "inline";
  pauseButton.style.display = "none";
  newLapButton.style.display = "none";
  continueButton.style.display = "none";
  resetButton.style.display = "none";
});

newLapButton.addEventListener("click", () => {
  createNewLapItem();
});

lapListTable.addEventListener("click", (event) => {
  if (event.target.nodeName.toLowerCase() === "button") {
    event.target.parentNode.parentNode.remove();
  }
});

function activateStopWatch() {
  timer.start(easytimerConfig);

  timer.addEventListener("secondTenthsUpdated", () => {
    stopWatchDisplay.textContent =
      timer.getTimeValues().toString(["hours", "minutes", "seconds"]) +
      `.${timer.getTimeValues().toString(["secondTenths"])}`;
  });
}

function createNewLapItem() {
  const lapItem = document.createElement("tr");
  lapItem.setAttribute("id", `lap-${lapId}`);
  lapId++;
  lapItem.innerHTML = `
  <td class="lapDelete">
    <button>X</button>
  </td>
  <td class="lapRecord">${stopWatchDisplay.textContent}</td>
  <td class="lapComment">
    <input type="text" />
  </td>
  `;
  lapListTable.appendChild(lapItem);
}
