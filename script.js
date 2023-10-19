let pattern = [];
let lastClick = null;

document.addEventListener("DOMContentLoaded", () => {
  const divElement = document.getElementById("clickableDiv");

  if (divElement) {
    divElement.addEventListener("click", handleClick);
  }
});

function handleClick(event) {
  const currentTime = new Date().getTime();

  handleTime(currentTime);

  pattern.push("click");

  console.log("Div clicked!", pattern);
}

function handleTime(currentTime) {
  if (lastClick !== null) {
    const timeElapsed = currentTime - lastClick;
    pattern.push(timeElapsed);
  }

  lastClick = currentTime;
}
