// ===== Theme Mode Toggle =====
const themeToggle = document.querySelector(".theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
} else {
  body.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  body.classList.toggle("dark");

  const theme = body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("theme", theme);
});

// ===== Search Bar Expand =====
const searchContainer = document.querySelector(".search-container");
const searchInput = document.querySelector(".search-container input");
const searchButton = document.querySelector(".search-container button");

searchButton.addEventListener("click", () => {
  searchContainer.classList.toggle("active");
  if (searchContainer.classList.contains("active")) {
    searchInput.focus();
  } else {
    searchInput.blur();
  }
});

// Enterキーで検索実行（デモ用）
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    alert(`検索中: ${searchInput.value}`);
    searchInput.value = "";
  }
});

// ===== Hamburger Menu =====
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuBtn.classList.toggle("active");
});

// スマホ用クリック外閉じ
document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu-btn") && !e.target.closest(".nav-links")) {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("active");
  }
});
