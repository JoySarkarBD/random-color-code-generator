// Globals
let div = null;

const getID = (id) => {
  return document.getElementById(id);
};

// DOM functions
/**
 * Generate a dynamic DOM element to show a toast message
 * @param {string} msg
 */

getID("generate-random-color").addEventListener(
  "click",
  handleGenerateRandomColor
);

// // copy hex code
// copyBtn.addEventListener("click", function () {
//   navigator.clipboard.writeText(`#${output.value}`);
//   if (div !== null) {
//     div.remove();
//     div = null;
//   }
//   if (isValidHex(output.value)) {
//     generateToastMessage(`#${output.value} copied`);
//   } else {
//     alert("Invalid Color Code");
//   }
// });

// // copy rgb code
// copyBtn2.addEventListener("click", function () {
//   navigator.clipboard.writeText(`${output2.value}`);
//   if (div !== null) {
//     div.remove();
//     div = null;
//   }
//   if (isValidHex(output.value)) {
//     generateToastMessage(`${output2.value} copied`);
//   } else {
//     alert("Invalid Color Code");
//   }
// });

// output.addEventListener("keyup", function (e) {
//   const color = e.target.value;
//   if (color) {
//     output.value = color.toUpperCase();
//     if (isValidHex(color)) {
//       root.style.backgroundColor = `#${color}`;
//       output2.value = hexToRgb(color);
//     }
//   }
// });

// DOM functions
/**
 * Generate a dynamic DOM element to show a toast message
 * @param {string} msg
 */

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

// event handlers
function handleGenerateRandomColor() {
  const color = generateColorDecimal();
  updateColorCodeToDom(color);
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
  getID("input-rgb").value = rgbColor.toLocaleUpperCase();
  getID("color-slider-red").value = color.red;
  getID("color-slider-red-label").innerText = color.red;
  getID("color-slider-green").value = color.green;
  getID("color-slider-green-label").innerText = color.green;
  getID("color-slider-blue").value = color.blue;
  getID("color-slider-blue-label").innerText = color.blue;
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
