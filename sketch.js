let capture;
let textInput;
let asciiChars = " .:-=+*%@#";

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(windowWidth / 2, windowHeight);
  capture.hide();

  textInput = select('#textInput');
}

function draw() {
  background(220);

  // Display the camera feed on the left side
  image(capture, 0, 0, windowWidth / 2, windowHeight);

  // Get the text from the text input
  let inputText = textInput.value();

  // Convert the text into ASCII art
  let asciiArt = generateAsciiArt(inputText);

  // Display the ASCII art on the right side
  textSize(16);
  textAlign(LEFT);
  fill(0);
  text(asciiArt, windowWidth / 2 + 10, 30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth / 2, windowHeight);
}

function generateAsciiArt(input) {
  let asciiArt = "";
  let captureWidth = capture.width;
  let captureHeight = capture.height;

  for (let y = 0; y < captureHeight; y += 6) {
    for (let x = 0; x < captureWidth; x += 6) {
      // Get the color of the pixel
      let c = capture.get(x, y);
      // Calculate the brightness
      let brightness = (red(c) + green(c) + blue(c)) / 3;
      // Map the brightness to an ASCII character
      let index = floor(map(brightness, 0, 255, 0, asciiChars.length));
      let asciiChar = asciiChars[index];
      asciiArt += asciiChar;
    }
    asciiArt += '\n';
  }
  return asciiArt;
}

