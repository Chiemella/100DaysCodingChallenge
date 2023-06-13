const imageEl = document.getElementById("container");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const down = document.getElementById("down");

const images = [];
let activeImageIdx = 0;

next.addEventListener("click", getNextImg);
prev.addEventListener("click", getPrevImg);

function getNewImage() {
  fetch("https://random.dog/woof.json")
    .then((res) => res.json())
    .then((data) => {
      const imageURL = data.url;

      // save the image URL
      images.push(imageURL);

      imageEl.src = imageURL;
      down.href = imageURL;
    });
}

function showImage(idx) {
  imageEl.src = images[idx];
  down.href = images[idx];
}

function getNextImg() {
  activeImageIdx++;

  if (!images[activeImageIdx]) {
    getNewImage();
  } else {
    showImage(activeImageIdx);
  }
}

function getPrevImg() {
  activeImageIdx--;

  if (activeImageIdx < 0) {
    activeImageIdx = 0;
  } else {
    showImage(activeImageIdx);
  }
}

getNewImage();
