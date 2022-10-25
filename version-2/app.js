const getID = (id) => {
  return document.getElementById(id);
};
const root = getID("root");
const btn = getID("change-btn");
const output = getID("output");

btn.addEventListener("click", function () {
  const bgColor = generateHexColor();
  root.style.backgroundColor = bgColor;
  output.value = bgColor;
});

function generateHexColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}
