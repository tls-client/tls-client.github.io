// DOM Elements
const hamburgerMenu = document.getElementById('hamburgerMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const closeMenu = document.getElementById('closeMenu');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const mobileSearchInput = document.getElementById('mobileSearchInput');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const blogNavBtns = document.querySelectorAll('.blog-nav-btn');
const recentPosts = document.getElementById('recentPosts');
const archivesContent = document.getElementById('archivesContent');
const categoriesContent = document.getElementById('categoriesContent');

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Update theme icon
function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Mobile menu functions
function openMobileMenu() {
    mobileMenuOverlay.classList.add('active');
    hamburgerMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('active');
    hamburgerMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Navigation functions
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu if open
    closeMobileMenu();
}

// Blog navigation
function showBlogContent(contentType) {
    // Hide all blog content
    recentPosts.style.display = 'none';
    archivesContent.style.display = 'none';
    categoriesContent.style.display = 'none';
    
    // Update button states
    blogNavBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected content
    switch(contentType) {
        case 'recent':
            recentPosts.style.display = 'grid';
            document.getElementById('blogRecent').classList.add('active');
            break;
        case 'archives':
            archivesContent.style.display = 'block';
            document.getElementById('blogArchives').classList.add('active');
            break;
        case 'categories':
            categoriesContent.style.display = 'grid';
            document.getElementById('blogCategories').classList.add('active');
            break;
    }
}

// Search functionality
function performSearch(query) {
    if (!query.trim()) return;
    
    const searchQuery = query.toLowerCase();
    let foundResults = false;
    
    // Search in all sections
    sections.forEach(section => {
        const textContent = section.textContent.toLowerCase();
        if (textContent.includes(searchQuery)) {
            section.classList.add('active');
            foundResults = true;
        }
    });
    
    if (foundResults) {
        // Switch to home or first matching section
        const homeSection = document.getElementById('home');
        if (homeSection && homeSection.textContent.toLowerCase().includes(searchQuery)) {
            showSection('home');
        }
    }
    
    // Clear search input
    searchInput.value = '';
    mobileSearchInput.value = '';
}

// Event Listeners
hamburgerMenu.addEventListener('click', openMobileMenu);
closeMenu.addEventListener('click', closeMobileMenu);
themeToggle.addEventListener('click', toggleTheme);

// Close mobile menu when clicking overlay
mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
        closeMobileMenu();
    }
});

// Navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        showSection(targetId);
    });
});

// Mobile navigation links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        showSection(targetId);
    });
});

// About Me menu links
document.querySelectorAll('.about-me-list a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        showSection('about');
        
        // Scroll to specific section after a short delay
        setTimeout(() => {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    });
});

// Blog navigation
blogNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnId = btn.getAttribute('id');
        let contentType = 'recent';
        
        switch(btnId) {
            case 'blogRecent':
                contentType = 'recent';
                break;
            case 'blogArchives':
                contentType = 'archives';
                break;
            case 'blogCategories':
                contentType = 'categories';
                break;
        }
        
        showBlogContent(contentType);
    });
});

// Search functionality
searchBtn.addEventListener('click', () => {
    performSearch(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(searchInput.value);
    }
});

mobileSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(mobileSearchInput.value);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
        closeMobileMenu();
    }
    
    // Ctrl/Cmd + / to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        toggleTheme();
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
    showSection('home');
    showBlogContent('recent');
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh any dynamic content if needed
        console.log('Page is visible');
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('Connection restored');
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        // Handle scroll-based animations if needed
    }, 100);
});

// Add loading states for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        // Add loading state if needed
    });
});

// Touch gestures for mobile (optional)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        // Handle swipe gestures
        if (diff > 0) {
            // Swipe left - could navigate to next section
        } else {
            // Swipe right - could open mobile menu
        }
    }
}

// Export functions for potential use by other scripts
window.RucyHomepage = {
    showSection,
    toggleTheme,
    performSearch,
    showBlogContent
};
