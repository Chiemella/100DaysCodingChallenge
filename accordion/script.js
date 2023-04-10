const accordion_items = document.querySelectorAll(".accordion-item");

accordion_items.forEach((elem) =>
  elem.addEventListener("click", () => {
    if (elem.classList.contains("open")) {
      elem.classList.remove("open");
    } else {
      accordion_items.forEach((elem2) => elem2.classList.remove("open"));
      elem.classList.add("open");
    }
  })
);
