let selectedImageId = null;

// Function to handle image selection
function selectImage(imageId) {
  // Remove the selection from the previously selected image
  if (selectedImageId) {
    const prevSelectedImage = document.getElementById(selectedImageId);
    prevSelectedImage.classList.remove("selected");
  }

  // Add the selection to the newly selected image
  const image = document.getElementById(imageId);
  image.classList.add("selected");
  selectedImageId = imageId;

}

// Function to make the image reddish
function makeReddish() {
  if (selectedImageId) {
    const image = document.getElementById(selectedImageId);
    image.classList.add("reddish");
  }
}
function makeGrayscale() {
  if (selectedImageId) {
    const image = document.getElementById(selectedImageId);
    image.classList.add("grayscale");
  }
}
function increaseBrightness() {
  if (selectedImageId) {
    const image = document.getElementById(selectedImageId);
    const currentBrightness = parseFloat(image.dataset.brightness) || 1;
    const newBrightness = currentBrightness + 0.1;
    image.style.filter = `brightness(${newBrightness})`;
    image.dataset.brightness = newBrightness;
  }
}

// Function to decrease the brightness of the image
function decreaseBrightness() {
  if (selectedImageId) {
    const image = document.getElementById(selectedImageId);
    const currentBrightness = parseFloat(image.dataset.brightness) || 1;
    const newBrightness = Math.max(currentBrightness - 0.1, 0.1);
    image.style.filter = `brightness(${newBrightness})`;
    image.dataset.brightness = newBrightness;
  }
}

async function generateQRCode() {
  if (selectedImageId) {
    const image = document.getElementById(selectedImageId);
    const imageUrl = image.src;
    const qrCodeDiv = document.createElement("div");
    qrCodeDiv.classList.add("qr-code");
    image.parentNode.insertBefore(qrCodeDiv, image.nextSibling);

    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?data=${imageUrl}&size=128x128`
      );

      if (response.ok) {
        const qrCodeImage = document.createElement("img");
        qrCodeImage.src = response.url;
        qrCodeDiv.appendChild(qrCodeImage);
      } else {
        console.error("Failed to generate QR code.");
      }
    } catch (error) {
      console.error("An error occurred while generating the QR code:", error);
    }
  }
}


function checkColor() {
  if (!selectedImageId) {
    // No image is selected
    return;
  }

  const selectedImage = document.getElementById(selectedImageId);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = selectedImage.width;
  canvas.height = selectedImage.height;
  context.drawImage(selectedImage, 0, 0);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
  let redPixels = 0;
  let greenPixels = 0;
  let bluePixels = 0;

  for (let i = 0; i < imageData.length; i += 4) {
    const red = imageData[i];
    const green = imageData[i + 1];
    const blue = imageData[i + 2];

    if (red > green + blue) {
      redPixels++;
    } else if (green > red + blue) {
      greenPixels++;
    } else {
      bluePixels++;
    }
  }

  let color;
  if (redPixels > greenPixels && redPixels > bluePixels) {
    color = "red";
  } else if (greenPixels > redPixels && greenPixels > bluePixels) {
    color = "green";
  } else {
    color = "blue";
  }

  // Prompt the user with the color analysis result
  prompt("Image color", `The selected image is ${color}.`);
}
function duplicateImage() {
  if (!selectedImageId) {
    // No image is selected
    return;
  }

  const selectedImage = document.getElementById(selectedImageId);
  const clone = selectedImage.cloneNode(true);
  const album = document.querySelector(".album");
  album.appendChild(clone);
}

function reduceResolution() {
  if (!selectedImageId) {
    // No image is selected
    return;
  }

  const selectedImage = document.getElementById(selectedImageId);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const aspectRatio = selectedImage.width / selectedImage.height;
  const newWidth = 200; // Set the desired width for the reduced resolution
  const newHeight = newWidth / aspectRatio;

  canvas.width = newWidth;
  canvas.height = newHeight;
  context.drawImage(selectedImage, 0, 0, newWidth, newHeight);
  selectedImage.src = canvas.toDataURL();
}
function createThumbnail() {
  if (!selectedImageId) {
    // No image is selected
    return;
  }

  const selectedImage = document.getElementById(selectedImageId);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const thumbnailSize = 100; // Set the desired size for the thumbnail

  canvas.width = thumbnailSize;
  canvas.height = thumbnailSize;
  context.drawImage(selectedImage, 0, 0, thumbnailSize, thumbnailSize);
  const thumbnailImage = new Image();
  thumbnailImage.src = canvas.toDataURL();

  // Append the thumbnail image to the page
  const thumbnailContainer = document.getElementById("thumbnail-container");
  thumbnailContainer.appendChild(thumbnailImage);
}

function makeBlue() {
  const selectedImage = document.querySelector(".selected");
  
  // Check if a selected image exists
  if (selectedImage) {
    selectedImage.style.filter = "grayscale(0%) saturate(100%) hue-rotate(240deg)";
  }
}
function makeGreen() {
  const selectedImage = document.querySelector(".selected");
  
  // Check if a selected image exists
  if (selectedImage) {
    selectedImage.style.filter = "grayscale(0%) saturate(100%) hue-rotate(120deg)";
  }
}
