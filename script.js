// script.js
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');
const themeToggle = document.getElementById('theme-toggle');

hamburger.addEventListener('click', () => {
  sidebar.classList.add('open');
});
closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('open');
});

// ダーク/ライトの切替・保存
themeToggle.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark');
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ページロード時に前回の状態を復元
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}
