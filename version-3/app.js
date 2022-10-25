const getID = (id) => {
  return document.getElementById(id);
};
const root = getID("root");
const output = getID("output");
const changeBtn = getID("change-btn");
const copyBtn = getID("copy-btn");

changeBtn.addEventListener("click", function () {
  const bgColor = generateHexColor();
  root.style.backgroundColor = bgColor;
  output.value = bgColor;
  copyBtn.innerHTML = "Copy";
});

copyBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(output.value);
  copyBtn.innerHTML = "Code Copied";
});

// random color generator function
function generateHexColor() {
  // #000000 #ffffff
  // 255, 255, 255 -> #FFFFFF
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}
