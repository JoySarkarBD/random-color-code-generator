// Global
let div = null;
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
});

copyBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(output.value);
  if (div !== null) {
    div.remove();
    div = null;
  }
  generateToastMessage(`${output.value} copied`);
});

// random color generator
function generateHexColor() {
  // #000000 #ffffff
  // 255, 255, 255 -> #FFFFFF
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

function generateToastMessage(msg) {
  div = document.createElement("div");
  div.innerText = msg;
  div.className = "toast-message toast-message-slide-in";

  div.addEventListener("click", function () {
    div.classList.remove("toast-message-slide-in");
    div.classList.add("toast-message-slide-out");

    div.addEventListener("animationend", function () {
      div.remove();
      div = null;
    });
  });

  document.body.appendChild(div);
}
