// Globals
let toastContainer = null;

const defaultColor = {
  red: 221,
  green: 222,
  blue: 238,
};

const defaultPresetColors = [
  "#ffcdd2",
  "#f8bbd0",
  "#e1bee7",
  "#ff8a80",
  "#ff80ab",
  "#ea80fc",
  "#b39ddb",
  "#9fa8da",
  "#90caf9",
  "#b388ff",
  "#8c9eff",
  "#82b1ff",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#80d8ff",
  "#84ffff",
  "#a7ffeb",
  "#c8e6c9",
  "#dcedc8",
  "#f0f4c3",
  "#b9f6ca",
  "#ccff90",
  "#ffcc80",
];

const copySound = new Audio("./Desert Eagle Firing Message.mp3");

const getID = (id) => {
  return document.getElementById(id);
};

window.onload = () => {
  updateColorCodeToDom(defaultColor);
  // display preset colors
  displayColorBoxes(
    document.getElementById("preset-colors"),
    defaultPresetColors
  );
};

// Dom References
const colorSliderRed = getID("color-slider-red");
const colorSliderGreen = getID("color-slider-green");
const colorSliderBlue = getID("color-slider-blue");
const copyToClipboardBtn = getID("copy-to-clipboard");
const colorModeRadios = document.getElementsByName("color-mode");
const inputHex = getID("input-hex");
const presetColorsParent = getID("preset-colors");
// DOM functions
/**
 * Generate a dynamic DOM element to show a toast message
 * @param {string} msg
 */
// Events Listeners

getID("generate-random-color").addEventListener(
  "click",
  handleGenerateRandomColor
);
inputHex.addEventListener("keyup", handleColorModeHexInp);

colorSliderRed.addEventListener(
  "change",
  handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
);
colorSliderGreen.addEventListener(
  "change",
  handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
);
colorSliderBlue.addEventListener(
  "change",
  handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
);

copyToClipboardBtn.addEventListener("click", handleCopyToClipboard);
presetColorsParent.addEventListener("click", handlePresetColorsParent);

// DOM functions
/**
 * Generate a dynamic DOM element to show a toast message
 * @param {string} msg
 */

function generateToastMessage(msg) {
  toastContainer = document.createElement("div");
  toastContainer.innerText = msg;
  toastContainer.className = "toast-message toast-message-slide-in";

  toastContainer.addEventListener("click", function () {
    toastContainer.classList.remove("toast-message-slide-in");
    toastContainer.classList.add("toast-message-slide-out");

    toastContainer.addEventListener("animationend", function () {
      toastContainer.remove();
      toastContainer = null;
    });
  });

  document.body.appendChild(toastContainer);
}

function handlePresetColorsParent(event) {
  const child = event.target;
  if (child.className === "color-box") {
    navigator.clipboard.writeText(child.getAttribute("data-color"));
    copySound.volume = 0.2;
    copySound.play();
  }
}

/**
 * find the checked elements from a list of radio buttons
 * @param {Array} nodes
 * @returns {string | null}
 */
function getCheckedValueFromRadios(nodes) {
  let checkedValue = null;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      checkedValue = nodes[i].value;
      break;
    }
  }
  return checkedValue;
}

// event handlers
function handleGenerateRandomColor() {
  const color = generateColorDecimal();
  updateColorCodeToDom(color);
}

function handleColorModeHexInp(e) {
  const hexColor = e.target.value;
  if (hexColor) {
    this.value = hexColor.toUpperCase();
    if (isValidHex(hexColor)) {
      const color = hexToDecimalColors(hexColor);
      updateColorCodeToDom(color);
    }
  }
}

function handleCopyToClipboard() {
  const colorModeRadios = document.getElementsByName("color-mode");
  const mode = getCheckedValueFromRadios(colorModeRadios);
  if (mode === null) {
    throw new Error("Invalid Radio Input");
  }

  if (toastContainer !== null) {
    toastContainer.remove();
    toastContainer = null;
  }

  if (mode === "hex") {
    const hexColor = getID("input-hex").value;
    if (hexColor && isValidHex(hexColor)) {
      navigator.clipboard.writeText(`#${hexColor}`);
      generateToastMessage(`#${hexColor} Copied`);
    } else {
      alert("Invalid Hex Code");
    }
  } else {
    const rgbColor = getID("input-rgb").value;
    if (rgbColor) {
      navigator.clipboard.writeText(rgbColor);
      generateToastMessage(`${rgbColor} Copied`);
    } else {
      alert("Invalid RGB Color");
    }
  }
}

/**
 * update dom elements with calculated color values
 * @param {object} color : ;
 */

function updateColorCodeToDom(color) {
  const hexColor = generateHexColor(color);
  const rgbColor = generateRGBColor(color);

  getID("color-display").style.backgroundColor = `${hexColor}`;
  getID("input-hex").value = hexColor.substring(1);
  getID("input-rgb").value = rgbColor;
  getID("color-slider-red").value = color.red;
  getID("color-slider-red-label").innerText = color.red;
  getID("color-slider-green").value = color.green;
  getID("color-slider-green-label").innerText = color.green;
  getID("color-slider-blue").value = color.blue;
  getID("color-slider-blue-label").innerText = color.blue;
}

/**
 * create a div element with class name color-box
 * @param {string} color : ;
 * @returns {object}
 */

function generateColorBox(color) {
  const div = document.createElement("div");
  div.className = "color-box";
  div.style.backgroundColor = color;
  div.setAttribute("data-color", color);

  return div;
}

/**
 * this function will create and append new color boxes to it's parent
 * @param {object} parent
 * @param {Array} colors
 */

function displayColorBoxes(parent, colors) {
  colors.forEach((color) => {
    const colorBox = generateColorBox(color);
    parent.appendChild(colorBox);
  });
}

function handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue) {
  return function () {
    const color = {
      red: parseInt(colorSliderRed.value),
      green: parseInt(colorSliderGreen.value),
      blue: parseInt(colorSliderBlue.value),
    };
    updateColorCodeToDom(color);
  };
}

// Utils

/**
 * generate and return an object of three color decimal values
 * @returns {object}}
 */

// generate three random decimal number for red, green and blue and return as an object
function generateColorDecimal() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return {
    red,
    green,
    blue,
  };
}

/**
 * take a color object of three decimal values and return a hexadecimal color code
 * @param {object} color
 * @returns {string}
 */

// generate hex color code
function generateHexColor({ red, green, blue }) {
  const getTwoCode = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
    blue
  )}`.toUpperCase();
}

/**
 * take a color object of three decimal values and return a rgb color code
 * @param {object} color
 * @returns {string}
 */

// generate rgba color code
function generateRGBColor({ red, green, blue }) {
  return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * convert hex color to decimal colors object
 * @param {string} hex
 * @returns {object}
 */

//  generate hex to decimal colors
function hexToDecimalColors(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return {
    red,
    green,
    blue,
  };
}

/**
 * validate hex color code
 * @param {string} color;
 * @returns {boolean}
 */

function isValidHex(color) {
  if (color.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}
