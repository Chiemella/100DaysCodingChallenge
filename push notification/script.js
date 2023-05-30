const button = document.getElementById("button");
const container = document.getElementById("container");
const messages = [
  "Hey, bro!",
  "What are you cooking...",
  "Pheww! 😏",
  "I'm building today for tomorrow!",
];

button.addEventListener("click", () => {
  createNotification();
});

function createNotification() {
  const notif = document.createElement("div");
  notif.classList.add("toast");

  notif.innerText = getRandomMessage();

  container.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 3000);
}

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}
