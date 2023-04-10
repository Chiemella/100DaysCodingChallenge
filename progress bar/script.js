const progress_bars = document.querySelectorAll(".progress");

progress_bars.forEach((bar) => {
  setTimeout(() => {
    const { size } = bar.dataset;
    bar.style.width = `${size}%`;
  }, 1000);
});
