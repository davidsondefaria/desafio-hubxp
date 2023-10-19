let timeIntervals = [];
let lastClick = null;
let lastAvg = null;
let errorRate = 40;
let textPattern = ["long", "short", "short", "avg", "long", "avg"];

document.addEventListener("DOMContentLoaded", () => {
  const divElement = document.getElementById("clickableDiv");
  const resetButton = document.getElementById("resetButton");
  const errorRateInput = document.getElementById("errorRateInput");
  const patternInput = document.getElementById("patternInput");

  if (divElement) {
    divElement.addEventListener("click", handleClick);
  }

  if (resetButton) {
    resetButton.addEventListener("click", reset);
  }

  if (errorRateInput) {
    errorRateInput.value = `${errorRate}`;
    errorRateInput.addEventListener("input", handleError);
  }

  if (patternInput) {
    patternInput.value = textPattern.toString();
    patternInput.addEventListener("input", handlePattern);
  }
});

function handleClick(event) {
  const currentTime = new Date().getTime();

  handleTime(currentTime);

  checkShaveAndAHaircut();
}

function handleTime(currentTime) {
  if (lastClick !== null) {
    const timeElapsed = currentTime - lastClick;
    timeIntervals.push(timeElapsed);
  }

  lastClick = currentTime;
}

function calcAvg(pattern) {
  const avg = pattern.reduce((prev, curr) => prev + curr, 0) / pattern.length;
  lastAvg = avg;
  return avg;
}

function reset() {
  // restart
  console.log("restarting");
  timeIntervals = [];
  lastClick = null;
  lastAvg = null;
}

function checkShaveAndAHaircut() {
  const size = textPattern.length;
  if (timeIntervals.length >= size) {
    const checking = timeIntervals.slice(-size);
    const avg = calcAvg(checking);
    const short = Math.floor(avg * (1 - errorRate / 100));
    const long = Math.floor(avg * (1 + errorRate / 100));
    const notes = { avg, short, long };
    const pattern = textPattern.map((p) => notes[p]);

    for (let i = 0; i < pattern.length; i++) {
      if (Math.abs(checking[i] - pattern[i]) > avg * (errorRate / 100)) {
        console.log("Últimos 6 clicks não fazendo parte do padrão!");
        console.log("Você fez:         ", checking);
        console.log("Seu padrão médio: ", pattern);
        return false;
      }
    }
    console.log("Você fez:         ", checking);
    console.log("Seu padrão médio: ", pattern);
    alert("Acertou! " + checking.toString());
    reset();
    return true;
  }
}

function handleError() {
  const value = parseInt(this.value);
  if (value < 0) {
    this.value = "0";
  } else if (value > 100) {
    this.value = "100";
  }
  errorRate = parseInt(this.value);
}

function handlePattern() {
  textPattern = this.value.split(",").map((str) => str.trim());
}
