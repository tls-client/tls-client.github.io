const acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    for (let j = 0; j < acc.length; j++) {
      if (acc[j] !== this) {
        acc[j].nextElementSibling.style.display = "none";
      }
    }
    const panel = this.nextElementSibling;
    panel.style.display = (panel.style.display === "block") ? "none" : "block";
  });
}
