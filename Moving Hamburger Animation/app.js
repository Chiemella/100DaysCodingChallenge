const to_move = document.getElementById("to_move");
const clickable = document.querySelectorAll(".clickable");

clickable.forEach((c) => {
  c.addEventListener("click", () => {
    to_move.className = "menu active";
    to_move.classList.add(c.getAttribute("data-class"));
  });
});
