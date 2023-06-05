const container = document.getElementById("container");

const timeToRunAnim = 5000;
let starIdx = 0;

setInterval(() => createStars(7), 100);

function createStar() {
  const starEl = document.createElement("div");
  const styleEl = document.createElement("style");
  starEl.classList.add("star");
  starEl.classList.add(`star-${++starIdx}`);
  starEl.style.animation = `moveto-${starIdx} ${timeToRunAnim}ms linear forwards`;

  const endX = Math.random() * 200 - 100;
  const endY = Math.random() * 200 - 100;

  styleEl.innerHTML += `
		@keyframes moveto-${starIdx} {
			20% {
				opacity: 0;
			}
			50% {
				opacity: 1;
			}
			100% {
				transform: scale(3) translate(${endX}vw, ${endY}vh);
				opacity: 0;
			}
		}
	`;

  container.appendChild(starEl);
  container.appendChild(styleEl);

  setTimeout(() => {
    starEl.remove();
    styleEl.remove();
  }, timeToRunAnim);
}

function createStars(num) {
  for (let i = 0; i < num; i++) {
    createStar();
  }
}
