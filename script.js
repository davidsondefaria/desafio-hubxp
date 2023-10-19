document.addEventListener("DOMContentLoaded", () => {
  const divElement = document.getElementById("clickableDiv");

  if (divElement) {
    divElement.addEventListener("click", handleClick);
  }
});

function handleClick(event) {
  console.log("Div clicked!");
}
