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

changeBtn.addEventListener("click", function () {
  const color = generateColorDecimal();
  const hex = generateHexColor(color);
  const rgb = generateRGBColor(color);
  root.style.backgroundColor = hex;
  output.value = hex.substring(1);
  output2.value = rgb;
});

// copy hex code
copyBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(`#${output.value}`);
  if (div !== null) {
    div.remove();
    div = null;
  }
  if (isValidHex(output.value)) {
    generateToastMessage(`#${output.value} copied`);
  } else {
    alert("Invalid Color Code");
  }
});

// copy rgb code
copyBtn2.addEventListener("click", function () {
  navigator.clipboard.writeText(`${output2.value}`);
  if (div !== null) {
    div.remove();
    div = null;
  }
  if (isValidHex(output.value)) {
    generateToastMessage(`${output2.value} copied`);
  } else {
    alert("Invalid Color Code");
  }
});

output.addEventListener("keyup", function (e) {
  const color = e.target.value;
  if (color) {
    output.value = color.toUpperCase();
    if (isValidHex(color)) {
      root.style.backgroundColor = `#${color}`;
      output2.value = hexToRgb(color);
    }
  }
});

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

//  generate hex to rgb color code
function hexToRgb(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return `rgb(${red}, ${green}, ${blue})`;
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
