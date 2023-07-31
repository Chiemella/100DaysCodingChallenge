const element = document.getElementById("image");
let hue = 0;

function getTrippy() {
  element.style.filter = `hue-rotate(${hue}deg)`;
  hue = (hue + 1.75) % 360;
  window.requestAnimationFrame(getTrippy);
}

window.requestAnimationFrame(getTrippy);
