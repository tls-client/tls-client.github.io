// Minimalist JavaScript for new design
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const blogNavLinks = document.querySelectorAll('.blog-nav-link');

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    createThemeToggle();
    loadGitHubData();
}

// Create theme toggle button
function createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '🌙';
    toggle.onclick = toggleTheme;
    document.body.appendChild(toggle);
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const toggle = document.querySelector('.theme-toggle');
    toggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
}

// Show section
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Handle navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        showSection(targetId);
    });
});

// Handle blog navigation
blogNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active state
        blogNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show/hide content
        const targetId = link.getAttribute('href').substring(1);
        
        document.getElementById('recent-posts').style.display = targetId === 'recent' ? 'block' : 'none';
        document.getElementById('archives').style.display = targetId === 'archives' ? 'block' : 'none';
        document.getElementById('categories').style.display = targetId === 'categories' ? 'block' : 'none';
    });
});

// Load GitHub data
function loadGitHubData() {
    fetch('https://api.github.com/users/tls-client', { 
        referrerPolicy: "no-referrer" 
    })
    .then(response => response.json())
    .then(data => {
        const displayName = data.name || 'tls-client';
        document.getElementById('github-name').innerText = displayName + ' / @tls-client';
        document.getElementById('github-bio').innerText = data.bio || "No bio available";
        document.getElementById('github-followers').innerText = Intl.NumberFormat('en-us', { 
            notation: "compact", 
            maximumFractionDigits: 1 
        }).format(data.followers).replaceAll(" ", '');
        document.getElementById('github-following').innerText = Intl.NumberFormat('en-us', { 
            notation: "compact", 
            maximumFractionDigits: 1 
        }).format(data.following).replaceAll(" ", '');
        document.getElementById('github-repos').innerText = Intl.NumberFormat('en-us', { 
            notation: "compact", 
            maximumFractionDigits: 1 
        }).format(data.public_repos).replaceAll(" ", '');
        
        const avatarEl = document.getElementById('github-avatar');
        avatarEl.style.backgroundImage = 'url(' + data.avatar_url + ')';
        avatarEl.style.backgroundColor = 'transparent';
        
        console.log("[GITHUB-USER-CARD] Loaded card for tls-client");
    })
    .catch(err => {
        console.warn("[GITHUB-USER-CARD] Error loading card for tls-client", err);
        const card = document.getElementById('github-card');
        if (card) {
            card.style.opacity = '0.5';
        }
    });
}

// Handle contact form
document.querySelector('.contact-form form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Contact form functionality would be implemented here.');
    e.target.reset();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + / to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        toggleTheme();
    }
    
    // Number keys for navigation
    if (e.key >= '1' && e.key <= '4') {
        const sectionIds = ['about', 'blog', 'projects', 'contact'];
        const index = parseInt(e.key) - 1;
        if (sectionIds[index]) {
            showSection(sectionIds[index]);
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    showSection('about');
});

// Export functions
window.RucyHomepage = {
    showSection,
    toggleTheme
};
