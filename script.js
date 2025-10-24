/* global document, window */
/* assets/js/script.js */

(() => {
  // ---------- Config data ----------
  const PROJECTS = [
    {id:'sub', title:'Sub（サブツール）', url:'https://tls-client.github.io/sub/'},
    {id:'arashi', title:'Arashi Tool（嵐ツール）', url:'https://tls-client.github.io/arashi-tool/'},
    {id:'mass', title:'Mass Report（大量報告ツール）', url:'https://tls-client.github.io/mass-report/'},
    {id:'webhook', title:'Webhook スパマー', url:'https://tls-client.github.io/webhook-spammer/'},
    {id:'gleave', title:'グループリーブ', url:'https://tls-client.github.io/group-leaver/'},
    {id:'token', title:'トークンチェッカー', url:'https://tls-client.github.io/token-checker/'},
    {id:'dm', title:'DMツール', url:'https://tls-client.github.io/dm-tool'},
    {id:'bot', title:'Bot ツール', url:'https://tls-client.github.io/bot-tool/'},
    {id:'dfm', title:'Discord Fast Message', url:'https://github.com/tls-client/discord-fast-message'},
    {id:'spoof', title:'Invite Spoofer', url:'https://tls-client.github.io/discord-invite-spoofer/'}
  ];

  const POSTS = [
    {id:1,title:'初めての投稿',thumb:'assets/img/th1.jpg',date:'2025-10-01',tags:['日記','自己分析'],excerpt:'はじめまして。サイトの紹介です。'},
    {id:2,title:'開発メモ: SNS用便利ツール',thumb:'assets/img/th2.jpg',date:'2025-09-10',tags:['アプリ','開発'],excerpt:'ツールのまとめと使い方。'},
    {id:3,title:'散歩メモ',thumb:'assets/img/th3.jpg',date:'2025-07-22',tags:['散歩','暮らし'],excerpt:'近所の公園で見つけたこと。'}
  ];

  const CATEGORIES = ['プロフィール','趣味','日記・記事','筋トレ・散歩','勉強・読書','計画・目標','アニメ・漫画','ゲーム','アプリ','ニュース','瞑想','学校生活','健康','家族','生活習慣','精神疾患','自己分析','自分磨き','ネット活動','人生論','暮らし','界隈','お金'];

  // Audio files (local hosted). Put your mp3 files under /music/ and list here.
  const AUDIO_FILES = [
    { src: 'music/Lv2vision.mp3', title: 'Lv.2 vision (feat. AssToro)', artist: 'alouji' },
    // add more {src:'music/xxx.mp3', title:'..', artist:'..'}
  ];

  // ---------- DOM references ----------
  const appRoot = document.getElementById('app');
  const hambBtn = document.getElementById('hambBtn');
  const sideMenu = document.getElementById('sideMenu');
  const closeSide = document.getElementById('closeSide');
  const searchBtn = document.getElementById('searchBtn');
  const searchBar = document.getElementById('searchBar');
  const closeSearch = document.getElementById('closeSearch');
  const searchInput = document.getElementById('searchInput');
  const sideSearch = document.getElementById('sideSearch');
  const themeBtn = document.getElementById('themeBtn');
  const iconSun = document.getElementById('iconSun');
  const iconMoon = document.getElementById('iconMoon');
  const yearEls = document.querySelectorAll('#year1, #year2, #yearProj, #yearBlog, #yearAbout');

  // player
  const playBtn = document.getElementById('playBtn');
  const trackTitle = document.getElementById('trackTitle');
  const trackArtist = document.getElementById('trackArtist');

  // lists
  const projListEl = document.getElementById('projList');
  const postsEl = document.getElementById('posts');
  const projGrid = document.getElementById('projectGrid');
  const sideProjects = document.getElementById('sideProjects');
  const sidePosts = document.getElementById('sidePosts');
  const postsPreview = document.getElementById('posts');
  const blogList = document.getElementById('blogList');
  const archivesList = document.getElementById('archivesList');
  const categoriesList = document.getElementById('categoriesList');

  // ---------- helpers ----------
  function setYear() {
    const y = new Date().getFullYear();
    yearEls.forEach(el => { if(el) el.textContent = y; });
    if(document.getElementById('year1')) document.getElementById('year1').textContent = y;
    if(document.getElementById('year2')) document.getElementById('year2').textContent = y;
    if(document.getElementById('yearProj')) document.getElementById('yearProj').textContent = y;
    if(document.getElementById('yearBlog')) document.getElementById('yearBlog').textContent = y;
    if(document.getElementById('yearAbout')) document.getElementById('yearAbout').textContent = y;
  }

  // ---------- theme ----------
  function initTheme() {
    const saved = localStorage.getItem('rucy_theme');
    if(saved === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      appRoot.setAttribute('data-theme','light');
      iconSun.style.display='none'; iconMoon.style.display='inline';
    } else {
      document.documentElement.removeAttribute('data-theme');
      appRoot.setAttribute('data-theme','dark');
      iconSun.style.display='inline'; iconMoon.style.display='none';
    }
  }
  function toggleTheme(){
    const cur = appRoot.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    appRoot.setAttribute('data-theme', cur);
    document.documentElement.setAttribute('data-theme', cur);
    localStorage.setItem('rucy_theme', cur);
    if(cur === 'light'){ iconSun.style.display='none'; iconMoon.style.display='inline'; } else { iconSun.style.display='inline'; iconMoon.style.display='none'; }
  }

  // ---------- side & search ----------
  function openSide(){ sideMenu.classList.add('open'); sideMenu.setAttribute('aria-hidden','false'); overlay(true); renderSideLists(); }
  function closeSideFn(){ sideMenu.classList.remove('open'); sideMenu.setAttribute('aria-hidden','true'); overlay(false); }
  function overlay(show){
    let ov = document.getElementById('rucyOverlay');
    if(show){
      if(!ov){ ov = document.createElement('div'); ov.id='rucyOverlay'; ov.style.position='fixed'; ov.style.inset='0'; ov.style.background='rgba(0,0,0,0.36)'; ov.style.zIndex='48'; document.body.appendChild(ov); }
      ov.addEventListener('click', ()=>{ closeSideFn(); hideSearch(); });
    } else {
      if(ov) ov.remove();
    }
  }
  function showSearch(){ searchBar.classList.remove('hidden'); searchInput.focus(); overlay(true); }
  function hideSearch(){ searchBar.classList.add('hidden'); overlay(false); }

  // ---------- render helpers ----------
  function renderProjects(){
    if(!projListEl) return;
    projListEl.innerHTML = '';
    PROJECTS.forEach(p => {
      const card = document.createElement('div');
      card.className = 'proj-card';
      const icon = document.createElement('div');
      icon.className = 'proj-icon';
      // auto initials icon
      icon.style.background = randomGradient(p.id);
      icon.textContent = p.title.split(' ')[0].slice(0,2).toUpperCase();
      const title = document.createElement('div');
      title.className = 'proj-title';
      title.innerHTML = `<a href="${p.url}" target="_blank" rel="noopener">${p.title}</a>`;
      card.appendChild(icon); card.appendChild(title);
      projListEl.appendChild(card);
    });
  }
  function renderProjectGrid(){
    if(!projGrid) return;
    projGrid.innerHTML='';
    PROJECTS.forEach(p=>{
      const el = document.createElement('div'); el.className='proj-card';
      const ic = document.createElement('div'); ic.className='proj-icon'; ic.style.background=randomGradient(p.id); ic.textContent=p.title.split(' ')[0].slice(0,2).toUpperCase();
      const t = document.createElement('div'); t.className='proj-title'; t.innerHTML=`<a href="${p.url}" target="_blank">${p.title}</a>`;
      el.appendChild(ic); el.appendChild(t);
      projGrid.appendChild(el);
    });
  }
  function renderSideLists(){
    if(sideProjects){
      sideProjects.innerHTML='';
      PROJECTS.forEach(p=>{
        const a = document.createElement('a'); a.href=p.url; a.target='_blank'; a.textContent=p.title; sideProjects.appendChild(a);
      });
    }
    if(sidePosts){
      sidePosts.innerHTML='';
      POSTS.forEach(p=>{
        const d = document.createElement('div'); d.style.marginBottom='8px';
        d.innerHTML = `<div style="font-weight:700">${p.title}</div><div style="font-size:12px;color:var(--muted)">${p.date}</div>`;
        sidePosts.appendChild(d);
      });
    }
  }
  function renderPostsPreview(){
    if(!postsEl) return;
    postsEl.innerHTML = '';
    POSTS.forEach(p=>{
      const el = document.createElement('div'); el.className='post';
      el.innerHTML = `<div class="thumb" style="background-image:url('${p.thumb}');background-size:cover;background-position:center"></div>
        <div>
          <div class="postTitle">${p.title}</div>
          <div class="postMeta">${p.date}</div>
          <div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
          <div style="margin-top:6px;color:var(--muted)">${p.excerpt}</div>
        </div>`;
      postsEl.appendChild(el);
    });
  }
  function renderBlogList(){
    if(!blogList) return;
    blogList.innerHTML = '';
    POSTS.forEach(p=>{
      const card = document.createElement('div'); card.className='post';
      card.innerHTML = `<div class="thumb" style="background-image:url('${p.thumb}');background-size:cover"></div>
        <div>
          <div class="postTitle">${p.title}</div>
          <div class="postMeta">${p.date}</div>
          <div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
          <div style="margin-top:6px;color:var(--muted)">${p.excerpt}</div>
        </div>`;
      blogList.appendChild(card);
    });
    // archives & categories
    if(archivesList){
      archivesList.innerHTML = POSTS.map(p=>`<div>${p.date} — ${p.title}</div>`).join('');
    }
    if(categoriesList){
      categoriesList.innerHTML = CATEGORIES.map(c=>`<div class="tag">${c}</div>`).join(' ');
    }
  }

  // ---------- audio player (random) ----------
  let audio = null;
  let current = 0;
  let playing = false;
  function initPlayer(){
    if(AUDIO_FILES.length === 0) return;
    audio = new Audio();
    audio.preload = 'auto';
    loadTrack(Math.floor(Math.random()*AUDIO_FILES.length));
    playBtn.addEventListener('click', togglePlay);
    audio.addEventListener('ended', ()=>{ nextRandom(); });
  }
  function loadTrack(i){
    current = i % AUDIO_FILES.length;
    const t = AUDIO_FILES[current];
    if(!t) return;
    audio.src = t.src;
    trackTitle.textContent = t.title;
    trackArtist.textContent = t.artist || '';
  }
  function togglePlay(){
    if(!audio) return;
    if(!playing){
      audio.play().then(()=>{ playing=true; playBtn.textContent='⏸'; }).catch(e=>{ console.warn('play failed',e); });
    } else {
      audio.pause(); playing=false; playBtn.textContent='▶';
    }
  }
  function nextRandom(){
    if(AUDIO_FILES.length<=1){ audio.currentTime = 0; audio.play(); return; }
    let idx = Math.floor(Math.random()*AUDIO_FILES.length);
    if(idx === current) idx = (idx+1) % AUDIO_FILES.length;
    loadTrack(idx); if(playing) audio.play();
  }

  // ---------- utilities ----------
  function randomGradient(seed){
    const colors = [
      ['#2b7ab5','#12597a'],
      ['#7a2b6b','#c14bbf'],
      ['#5a2b7a','#8a4bbf'],
      ['#2b7a3a','#1b5f2a'],
      ['#7a2b2b','#b52b2b'],
      ['#2b4b7a','#26407a'],
      ['#333333','#555555'],
      ['#7a7a2b','#bfb45a']
    ];
    let h = 0; for(let i=0;i<seed.length;i++){ h += seed.charCodeAt(i); } return `linear-gradient(135deg, ${colors[h%colors.length][0]}, ${colors[h%colors.length][1]})`;
  }

  // ---------- init all ----------
  function init(){
    setYear();
    initTheme();

    // DOM handlers
    hambBtn && hambBtn.addEventListener('click', openSide);
    closeSide && closeSide.addEventListener('click', closeSideFn);
    searchBtn && searchBtn.addEventListener('click', ()=>{ showSearch(); });
    closeSearch && closeSearch.addEventListener('click', hideSearch);
    themeBtn && themeBtn.addEventListener('click', toggleTheme);

    // render lists
    renderProjects();
    renderProjectGrid();
    renderPostsPreview();
    renderBlogList();

    // side lists (for menu)
    renderSideLists();

    // player
    initPlayer();
  }

  // run
  document.addEventListener('DOMContentLoaded', init);
  window.__RUCY = { PROJECTS, POSTS, AUDIO_FILES, nextRandom };
})();
