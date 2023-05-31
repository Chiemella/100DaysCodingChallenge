const counterP = document.getElementById('counter');
const btn = document.getElementById('btn');

let counter = 0;
let paused = false;

// initial call
increaseCounter();

function increaseCounter() {
	counter++;
	
	counterP.innerText = formatCounter(counter);
	
	if(counter < 30001 && !paused) {
		setTimeout(() => {
			increaseCounter();
		}, 10)
	}
	
	if(counter % 10 === 0) {
		dropAHeart();
	}
	
	if(counter % 1000 === 0) {
		dropAHeart(true);
	}
}

btn.addEventListener('click', () => {
	paused = !paused;
	
	if(paused) {
		btn.innerText = 'Play';
	} else {
		btn.innerText = 'Pause';
		increaseCounter();
	}
});

function dropAHeart(isBig) {
	const heart = document.createElement('span');
	heart.innerText = '💜';
	
	heart.classList.add('heart');
	
	if(isBig) {
		heart.classList.add('heart-big');
	}
	
	heart.style.left = Math.random() * 100 + 'vw';
	heart.style.animationDuration = Math.random() * 5 + 2 + 's';
	
	document.body.appendChild(heart);
	
	setTimeout(() => {
		heart.remove();
	}, 7000)
}

function formatCounter(counter) {
	return counter > 1000 ? (counter / 1000).toFixed(1) + 'k' : counter;
} 