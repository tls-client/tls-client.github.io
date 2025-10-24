// ===============================
// テーマ切り替え
// ===============================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// 保存されたテーマを適用
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-theme");
}

// アイコンを更新
function updateThemeIcon() {
  themeToggle.innerHTML = body.classList.contains("light-theme")
    ? "🌞"
    : "🌙";
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  localStorage.setItem(
    "theme",
    body.classList.contains("light-theme") ? "light" : "dark"
  );
  updateThemeIcon();
});

// ===============================
// 検索バー展開
// ===============================
const searchToggle = document.getElementById("search-toggle");
const searchBar = document.getElementById("search-bar");

searchToggle.addEventListener("click", () => {
  searchBar.classList.toggle("hidden");
});

// ===============================
// ハンバーガーメニュー
// ===============================
const menuToggle = document.getElementById("menu-toggle");

menuToggle.addEventListener("click", () => {
  body.classList.toggle("menu-active");
});

// ===============================
// 音楽プレイヤー制御
// ===============================
const playBtn = document.getElementById("play-btn");
const audio = document.getElementById("audio");
let isPlaying = false;

playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
  isPlaying = !isPlaying;
});

// 曲終了時に最初から再生
audio.addEventListener("ended", () => {
  audio.currentTime = 0;
  audio.play();
});
