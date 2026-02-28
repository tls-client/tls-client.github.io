const hamburger    = document.getElementById('hamburger');
const drawer       = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose  = document.getElementById('drawerClose');

function openDrawer() {
  drawer.classList.add('open');
  drawerOverlay.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () =>
  drawer.classList.contains('open') ? closeDrawer() : openDrawer()
);
drawerOverlay.addEventListener('click', closeDrawer);
drawerClose.addEventListener('click', closeDrawer);

document.querySelectorAll('.drawer-nav a').forEach(a =>
  a.addEventListener('click', closeDrawer)
);

const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');

const saved = localStorage.getItem('theme') || 'dark';
applyTheme(saved);

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
  localStorage.setItem('theme', theme);
}

themeBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

let allProjects = [];

async function loadProjects() {
  try {
    const res  = await fetch('./projects.json');
    allProjects = await res.json();
    renderProjects(allProjects);
    buildTagFilters(allProjects);
  } catch (e) {
    document.getElementById('projectGrid').innerHTML =
      '<p style="color:var(--text2);font-size:14px;">プロジェクトを読み込めませんでした。</p>';
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderProjects(projects) {
  const grid = document.getElementById('projectGrid');
  if (!projects.length) {
    grid.innerHTML = '<p style="color:var(--text2);font-size:14px;">該当するプロジェクトが見つかりませんでした。</p>';
    return;
  }
  grid.innerHTML = projects.map(p => `
    <div class="project-card">
      <div class="thumb">
        ${p.thumbnail
          ? `<img src="${p.thumbnail}" alt="${p.title}" loading="lazy">`
          : `<div class="no-img">No Image</div>`}
      </div>
      <div class="info">
        <h3>${p.title}</h3>
        ${p.date ? `<div class="project-date"><span class="material-icons">calendar_today</span>${formatDate(p.date)}</div>` : ''}
        <p>${p.description}</p>
        <div class="tags">${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="project-links">
          ${p.links?.project ? `<a href="${p.links.project}" target="_blank" rel="noopener">View Project</a>` : ''}
          ${p.links?.github  ? `<a href="${p.links.github}"  target="_blank" rel="noopener">GitHub</a>`       : ''}
        </div>
      </div>
    </div>
  `).join('');
}

const searchBtn     = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchInput   = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchCloseBtn = document.getElementById('searchCloseBtn');
const tagFiltersEl  = document.getElementById('tagFilters');

let activeTag = null;

function openSearch() {
  searchOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => searchInput.focus(), 100);
  renderSearchResults(allProjects);
}
function closeSearch() {
  searchOverlay.classList.remove('open');
  document.body.style.overflow = '';
  searchInput.value = '';
  activeTag = null;
  document.querySelectorAll('.tag-filter').forEach(el => el.classList.remove('active'));
}

searchBtn.addEventListener('click', openSearch);
searchCloseBtn.addEventListener('click', closeSearch);
searchOverlay.addEventListener('click', e => {
  if (e.target === searchOverlay) closeSearch();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSearch();
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
});

searchInput.addEventListener('input', doSearch);

function buildTagFilters(projects) {
  const allTags = [...new Set(projects.flatMap(p => p.tags || []))].sort();
  tagFiltersEl.innerHTML = allTags.map(t =>
    `<span class="tag-filter" data-tag="${t}">${t}</span>`
  ).join('');

  tagFiltersEl.querySelectorAll('.tag-filter').forEach(el => {
    el.addEventListener('click', () => {
      if (activeTag === el.dataset.tag) {
        activeTag = null;
        el.classList.remove('active');
      } else {
        activeTag = el.dataset.tag;
        tagFiltersEl.querySelectorAll('.tag-filter').forEach(x => x.classList.remove('active'));
        el.classList.add('active');
      }
      doSearch();
    });
  });
}

function doSearch() {
  const query = searchInput.value.trim().toLowerCase();
  let results = allProjects;

  if (activeTag) {
    results = results.filter(p => (p.tags || []).includes(activeTag));
  }

  if (query) {
    results = results.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      (p.tags || []).some(t => t.toLowerCase().includes(query))
    );
  }

  renderSearchResults(results);
}

function renderSearchResults(projects) {
  if (!projects.length) {
    searchResults.innerHTML = '<div class="search-empty">🔍 該当するプロジェクトがありません</div>';
    return;
  }
  searchResults.innerHTML = projects.map(p => `
    <a class="search-result-item"
       href="${p.links?.project || p.links?.github || '#'}"
       target="${p.links?.project || p.links?.github ? '_blank' : '_self'}"
       rel="noopener">
      <div class="search-result-thumb">
        ${p.thumbnail
          ? `<img src="${p.thumbnail}" alt="${p.title}">`
          : 'No Image'}
      </div>
      <div class="search-result-info">
        <div class="search-result-title">${p.title}</div>
        ${p.date ? `<div class="search-result-date">${formatDate(p.date)}</div>` : ''}
        <div class="search-result-desc">${p.description}</div>
        <div class="search-result-tags">
          ${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </a>
  `).join('');
}

// スキルバーのアニメーションのみ IntersectionObserver で制御
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0 });

document.querySelectorAll('.skill-category').forEach(el => observer.observe(el));

loadProjects();
