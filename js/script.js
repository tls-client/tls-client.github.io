document.addEventListener("DOMContentLoaded", function() {
  const menuBtn = document.getElementById("menu-btn");
  const drawer = document.getElementById("drawer-menu");
  const closeDrawer = document.getElementById("close-drawer");
  if(menuBtn && drawer){
    menuBtn.onclick = () => drawer.style.display = "block";
    if(closeDrawer) closeDrawer.onclick = () => drawer.style.display = "none";
  }
  const themeBtn = document.getElementById("theme-toggle");
  themeBtn && themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
    themeBtn.classList.toggle("light");
  });
  const searchBtn = document.getElementById("search-btn");
  const searchBar = document.getElementById("search-bar");
  if(searchBtn && searchBar){
    searchBtn.onclick = () => {
      searchBar.style.display = searchBar.style.display === "none" ? "inline-block" : "none";
      if(searchBar.style.display !== "none") searchBar.focus();
    };
  }
});
