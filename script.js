let timeIntervals = [];
let lastClick = null;
let lastAvg = null;

document.addEventListener("DOMContentLoaded", () => {
  const divElement = document.getElementById("clickableDiv");
  const resetButton = document.getElementById("resetButton");

  if (divElement) {
    divElement.addEventListener("click", handleClick);
  }

  if (resetButton) {
    resetButton.addEventListener("click", reset);
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
  if (timeIntervals.length >= 6) {
    const checking = timeIntervals.slice(-6);
    const avg = calcAvg(checking);
    const short = Math.floor(avg * 0.6);
    const long = Math.floor(avg * 1.4);
    let pattern = [long, short, short, avg, long, avg];

    for (let i = 0; i < pattern.length; i++) {
      if (Math.abs(checking[i] - pattern[i]) > avg * 0.4) {
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
