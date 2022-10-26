const getID = (id) => {
  return document.getElementById(id);
};

const root = getID("root");
const btn = getID("change-btn");

btn.addEventListener("click", function () {
  const bgColor = generateRGBColor();
  root.style.backgroundColor = bgColor;
});

function generateRGBColor() {
  // rgb(0, 0, 0), rgb(255, 255, 255)
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
}
