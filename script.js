const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const lapButton = document.getElementById("lapButton");
const continueButton = document.getElementById("continueButton");
const resetButton = document.getElementById("resetButton");

const stopWatchDisplay = document.getElementById("stopWatch");
const lapListTable = document.querySelector("#lapListTable tbody");

let stopWatchInterval = null;
let milliSecond = 0,
  second = 0,
  minute = 0,
  hour = 0;

startButton.addEventListener("click", () => {
  stopWatchInterval = setInterval(stopWatch, 10);

  startButton.style.display = "none";
  stopButton.style.display = "inline";
  lapButton.style.display = "inline";
});

stopButton.addEventListener("click", () => {
  clearInterval(stopWatchInterval);

  stopButton.style.display = "none";
  lapButton.style.display = "none";
  continueButton.style.display = "inline";
  resetButton.style.display = "inline";
});

continueButton.addEventListener("click", () => {
  stopWatchInterval = setInterval(stopWatch, 10);

  stopButton.style.display = "inline";
  lapButton.style.display = "inline";
  continueButton.style.display = "none";
  resetButton.style.display = "none";
});

resetButton.addEventListener("click", () => {
  stopWatchInterval = null;
  milliSecond = 0;
  second = 0;
  minute = 0;
  hour = 0;
  stopWatchDisplay.textContent = "00:00:00.00";
  lapListTable.innerHTML = "";

  startButton.style.display = "inline";
  stopButton.style.display = "none";
  lapButton.style.display = "none";
  continueButton.style.display = "none";
  resetButton.style.display = "none";
});

lapButton.addEventListener("click", () => {
  createNewLapItem();
});

function stopWatch() {
  milliSecond++;
  if (milliSecond === 99) {
    milliSecond = 0;
    second++;
  }
  if (second === 59) {
    second = 0;
    minute++;
  }
  if (minute === 59) {
    minute = 0;
    hour++;
  }

  stopWatchDisplay.textContent =
    (hour <= 9 ? `0${hour}` : hour) +
    ":" +
    (minute <= 9 ? `0${minute}` : minute) +
    ":" +
    (second <= 9 ? `0${second}` : second) +
    "." +
    (milliSecond <= 9 ? `0${milliSecond}` : milliSecond);
}

function createNewLapItem() {
  const lapItem = document.createElement("tr");
  lapItem.innerHTML = `
  <td>
  <button>X</button>
</td>
<td>${stopWatchDisplay.textContent}</td>
<td>
  <input type="text" />
</td>
  `;
  lapListTable.appendChild(lapItem);
}
