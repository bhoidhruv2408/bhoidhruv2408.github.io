// main.js - Enhanced with Full Mobile Support & Foldable Device Optimization
// Version 2.2 - Premium Amazon Affiliate Website

// Global configuration
const CONFIG = {
    APP_VERSION: '2.2',
    WISHLIST_KEY: 'mobiletechhub_wishlist_v2',
    THEME_KEY: 'mobiletechhub_theme',
    ANALYTICS_KEY: 'mobiletechhub_analytics',
    PERFORMANCE_MONITORING: true
};

// Performance monitoring
let perfStart = performance.now();
let isInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    if (isInitialized) return;
    isInitialized = true;
    
    console.log(`%c📱 MobileTechHub v${CONFIG.APP_VERSION} - Premium Amazon Affiliate`, 
                'background: linear-gradient(90deg, #2563EB, #7C3AED); color: white; padding: 10px; border-radius: 5px; font-size: 14px;');
    
    // Initialize all modules with error handling
    initializeApp();
});

async function initializeApp() {
    try {
        const modules = [
            { name: 'Performance Optimizer', fn: initPerformanceOptimizer },
            { name: 'Device Detection', fn: initDeviceDetection },
            { name: 'Theme Management', fn: initThemeManager },
            { name: 'Mobile Navigation', fn: initMobileNavigation },
            { name: 'Product Filtering', fn: initProductFilters },
            { name: 'Wishlist System', fn: initWishlistSystem },
            { name: 'Scroll Animations', fn: initScrollAnimations },
            { name: 'Touch Gestures', fn: initTouchGestures },
            { name: 'Offline Support', fn: initOfflineSupport },
            { name: 'Analytics Tracker', fn: initAnalytics }
        ];
        
        // Initialize modules sequentially
        for (const module of modules) {
            try {
                await module.fn();
                console.log(`✅ ${module.name}`);
            } catch (error) {
                console.error(`❌ ${module.name}:`, error);
                // Continue with other modules even if one fails
            }
        }
        
        // Final initialization steps
        await finalizeInitialization();
        
    } catch (error) {
        console.error('App initialization failed:', error);
        showToast('App initialization failed. Please refresh.', 'error');
    }
}

async function finalizeInitialization() {
    // Hide loading screen with animation
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
            checkFirstVisit();
        }, 500);
    }
    
    // Performance log
    const perfEnd = performance.now();
    if (CONFIG.PERFORMANCE_MONITORING) {
        console.log(`🚀 Page loaded in ${(perfEnd - perfStart).toFixed(2)}ms`);
    }
    
    // Initialize Service Worker for PWA
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('✅ Service Worker registered');
        } catch (error) {
            console.log('Service Worker registration failed:', error);
        }
    }
    
    console.log('🎯 MobileTechHub fully initialized');
}

// ========== ENHANCED MOBILE NAVIGATION ==========
function initMobileNavigation() {
    return new Promise((resolve) => {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        const body = document.body;
        
        if (!mobileMenuBtn || !navMenu) {
            console.warn('Mobile navigation elements not found');
            resolve();
            return;
        }
        
        let isMenuOpen = false;
        
        // Create backdrop element
        const backdrop = document.createElement('div');
        backdrop.className = 'mobile-menu-backdrop';
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            z-index: 998;
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(backdrop);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        backdrop.addEventListener('click', closeMobileMenu);
        
        // Close menu on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMobileMenu();
            }
        });
        
        // Close menu when clicking nav links (smooth scroll)
        document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    const targetId = this.getAttribute('href');
                    if (targetId !== '#') {
                        closeMobileMenu();
                        setTimeout(() => {
                            const targetElement = document.querySelector(targetId);
                            if (targetElement) {
                                targetElement.scrollIntoView({ 
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }
                        }, 300);
                    }
                }
            });
        });
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth > 992 && isMenuOpen) {
                    closeMobileMenu();
                }
            }, 100);
        });
        
        function toggleMobileMenu() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                navMenu.style.display = 'flex';
                backdrop.style.display = 'block';
                
                setTimeout(() => {
                    navMenu.classList.add('active');
                    backdrop.style.opacity = '1';
                }, 10);
                
                // Update menu button icon
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
                
                // Prevent body scrolling
                body.style.overflow = 'hidden';
                
                // Track menu open
                trackEvent('mobile_menu_opened');
                
            } else {
                closeMobileMenu();
            }
        }
        
        function closeMobileMenu() {
            if (!isMenuOpen) return;
            
            isMenuOpen = false;
            navMenu.classList.remove('active');
            backdrop.style.opacity = '0';
            
            setTimeout(() => {
                navMenu.style.display = 'none';
                backdrop.style.display = 'none';
                
                // Update menu button icon
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Restore body scrolling
                body.style.overflow = '';
                
                // Track menu close
                trackEvent('mobile_menu_closed');
            }, 300);
        }
        
        // Initialize by closing menu
        closeMobileMenu();
        resolve();
    });
}

// ========== ENHANCED PRODUCT FILTERING & SEARCH ==========
function initProductFilters() {
    return new Promise((resolve) => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const searchInput = document.getElementById('searchInput');
        const productCards = document.querySelectorAll('.affiliate-product-card');
        
        if (!filterButtons.length || !productCards.length) {
            console.warn('Product filtering elements not found');
            resolve();
            return;
        }
        
        let activeFilter = 'all';
        let searchTerm = '';
        
        // Initialize filter buttons
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                activeFilter = this.dataset.filter || 'all';
                
                // Apply filters
                applyFilters();
                
                // Track filter usage
                trackEvent('filter_used', { filter: activeFilter });
            });
        });
        
        // Initialize search
        if (searchInput) {
            searchInput.addEventListener('input', debounce(function(e) {
                searchTerm = e.target.value.toLowerCase().trim();
                applyFilters();
                
                // Track search
                if (searchTerm.length >= 2) {
                    trackEvent('search_performed', { query: searchTerm });
                }
            }, 300));
        }
        
        function applyFilters() {
            let visibleCount = 0;
            
            productCards.forEach(card => {
                const category = card.dataset.category || '';
                const name = card.dataset.name?.toLowerCase() || '';
                const brand = card.dataset.brand?.toLowerCase() || '';
                
                let shouldShow = true;
                
                // Apply category filter
                if (activeFilter !== 'all' && category !== activeFilter) {
                    shouldShow = false;
                }
                
                // Apply search filter
                if (shouldShow && searchTerm) {
                    if (!name.includes(searchTerm) && !brand.includes(searchTerm)) {
                        shouldShow = false;
                    }
                }
                
                if (shouldShow) {
                    card.style.display = 'block';
                    visibleCount++;
                    
                    // Add animation
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.4s ease';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update search results count
            const searchResults = document.getElementById('searchResults');
            if (searchResults) {
                searchResults.textContent = searchTerm ? 
                    `Found ${visibleCount} product${visibleCount !== 1 ? 's' : ''}` : '';
            }
            
            // Show empty state if no results
            showEmptyState(visibleCount === 0);
        }
        
        function showEmptyState(show) {
            const existingEmptyState = document.querySelector('.empty-state');
            if (existingEmptyState) existingEmptyState.remove();
            
            if (show) {
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.style.cssText = `
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 3rem 1.5rem;
                    background: linear-gradient(135deg, var(--light-gray), var(--light));
                    border-radius: var(--radius-lg);
                    border: 2px dashed var(--border);
                    margin: 2rem 0;
                `;
                
                emptyState.innerHTML = `
                    <i class="fas fa-search" style="font-size: 2.5rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--dark); margin-bottom: 0.5rem; font-size: 1.25rem;">No products found</h3>
                    <p style="color: var(--text-light); max-width: 400px; margin: 0 auto 1.5rem; font-size: 0.95rem;">
                        ${searchTerm ? `No products match "${searchTerm}". Try different keywords.` : 
                         'No products in this category. Check other categories.'}
                    </p>
                    <button class="btn-clear-filters" style="
                        padding: 0.75rem 1.5rem;
                        background: var(--gradient-primary);
                        color: white;
                        border: none;
                        border-radius: var(--radius-md);
                        font-weight: 600;
                        cursor: pointer;
                        transition: var(--transition-medium);
                        font-size: 0.95rem;
                        min-height: 44px;
                        min-width: 44px;
                    ">
                        <i class="fas fa-redo"></i> Clear Filters
                    </button>
                `;
                
                const grid = document.querySelector('.affiliate-products-grid');
                if (grid) {
                    grid.appendChild(emptyState);
                    
                    // Add clear filters button functionality
                    emptyState.querySelector('.btn-clear-filters').addEventListener('click', function() {
                        if (searchInput) searchInput.value = '';
                        searchTerm = '';
                        filterButtons.forEach(btn => {
                            if (btn.dataset.filter === 'all') {
                                btn.classList.add('active');
                            } else {
                                btn.classList.remove('active');
                            }
                        });
                        activeFilter = 'all';
                        applyFilters();
                        
                        const searchResults = document.getElementById('searchResults');
                        if (searchResults) searchResults.textContent = '';
                    });
                }
            }
        }
        
        // Apply initial filters
        applyFilters();
        resolve();
    });
}

// ========== PREMIUM WISHLIST SYSTEM ==========
function initWishlistSystem() {
    return new Promise((resolve) => {
        // Load wishlist from localStorage
        let wishlist = JSON.parse(localStorage.getItem(CONFIG.WISHLIST_KEY) || '[]');
        
        // Initialize wishlist buttons
        document.addEventListener('click', function(e) {
            const wishlistBtn = e.target.closest('.btn-wishlist-toggle');
            
            if (wishlistBtn) {
                e.preventDefault();
                toggleWishlistItem(wishlistBtn);
            }
        });
        
        // Header wishlist button
        const headerWishlistBtn = document.querySelector('.btn-wishlist');
        if (headerWishlistBtn) {
            headerWishlistBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (wishlist.length > 0) {
                    showWishlistModal();
                } else {
                    showToast('Your wishlist is empty. Add some products!', 'info');
                }
            });
        }
        
        // Update wishlist badge
        updateWishlistBadge();
        
        function toggleWishlistItem(button) {
            const productId = button.dataset.productId;
            const productName = button.dataset.product || 'Product';
            
            const existingIndex = wishlist.findIndex(item => item.id === productId);
            
            if (existingIndex > -1) {
                // Remove from wishlist
                wishlist.splice(existingIndex, 1);
                button.innerHTML = '<i class="far fa-heart"></i> Wishlist';
                button.classList.remove('active');
                showToast(`Removed ${productName} from wishlist`, 'info');
                
                // Animation
                button.style.transform = 'scale(0.9)';
                setTimeout(() => button.style.transform = '', 300);
            } else {
                // Add to wishlist
                const productCard = button.closest('.affiliate-product-card');
                wishlist.push({
                    id: productId,
                    name: productName,
                    image: productCard?.querySelector('img')?.src || '',
                    date: new Date().toISOString(),
                    category: productCard?.dataset.category || 'unknown'
                });
                button.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
                button.classList.add('active');
                showToast(`Added ${productName} to wishlist`, 'success');
                
                // Animation
                button.style.transform = 'scale(1.2)';
                setTimeout(() => button.style.transform = '', 300);
            }
            
            // Save to localStorage
            localStorage.setItem(CONFIG.WISHLIST_KEY, JSON.stringify(wishlist));
            
            // Update badge
            updateWishlistBadge();
            
            // Track event
            trackEvent('wishlist_updated', {
                action: existingIndex > -1 ? 'removed' : 'added',
                product: productName,
                product_id: productId
            });
        }
        
        function updateWishlistBadge() {
            try {
                const badge = document.querySelector('.wishlist-count');
                if (badge) {
                    badge.textContent = wishlist.length > 99 ? '99+' : wishlist.length;
                    badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
                    
                    // Animation for new items
                    if (wishlist.length > parseInt(badge.dataset.lastCount || 0)) {
                        badge.style.animation = 'bounceIn 0.5s';
                        setTimeout(() => badge.style.animation = '', 500);
                    }
                    badge.dataset.lastCount = wishlist.length;
                }
                
                // Update all wishlist buttons
                document.querySelectorAll('.btn-wishlist-toggle').forEach(btn => {
                    const productId = btn.dataset.productId;
                    const isInWishlist = wishlist.some(item => item.id === productId);
                    
                    if (isInWishlist) {
                        btn.classList.add('active');
                        btn.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
                    } else {
                        btn.classList.remove('active');
                        btn.innerHTML = '<i class="far fa-heart"></i> Wishlist';
                    }
                });
            } catch (error) {
                console.error('Error updating wishlist badge:', error);
            }
        }
        
        function showWishlistModal() {
            // Remove existing modal
            const existingModal = document.querySelector('.wishlist-modal-overlay');
            if (existingModal) existingModal.remove();
            
            const modalHtml = `
                <div class="wishlist-modal-overlay">
                    <div class="wishlist-modal">
                        <div class="wishlist-modal-header">
                            <h3><i class="fas fa-heart"></i> My Wishlist (${wishlist.length})</h3>
                            <button class="wishlist-modal-close">&times;</button>
                        </div>
                        <div class="wishlist-modal-content">
                            ${wishlist.map((item, index) => `
                                <div class="wishlist-item" data-index="${index}">
                                    <img src="${item.image || 'data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"%3E%3Crect width=\"100\" height=\"100\" fill=\"%23f1f5f9\"/%3E%3Ctext x=\"50\" y=\"50\" text-anchor=\"middle\" dy=\".3em\" fill=\"%2394a3b8\" font-size=\"12\"%3ENo Image%3C/text%3E%3C/svg%3E'}" 
                                         alt="${item.name}" 
                                         loading="lazy">
                                    <div class="wishlist-item-info">
                                        <h4>${item.name}</h4>
                                        <p>Added: ${new Date(item.date).toLocaleDateString()}</p>
                                        <span class="wishlist-category">${item.category}</span>
                                    </div>
                                    <div class="wishlist-item-actions">
                                        <button class="wishlist-item-remove" data-id="${item.id}">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="wishlist-modal-footer">
                            <button class="wishlist-clear-all">
                                <i class="fas fa-trash"></i> Clear All
                            </button>
                            <button class="wishlist-modal-close-btn">
                                <i class="fas fa-times"></i> Close
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            
            // Add styles for modal if not already added
            addModalStyles();
            
            const overlay = document.querySelector('.wishlist-modal-overlay');
            
            // Close buttons
            overlay.querySelectorAll('.wishlist-modal-close, .wishlist-modal-close-btn').forEach(btn => {
                btn.addEventListener('click', () => overlay.remove());
            });
            
            // Remove item buttons
            overlay.querySelectorAll('.wishlist-item-remove').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productId = this.dataset.id;
                    wishlist = wishlist.filter(item => item.id !== productId);
                    localStorage.setItem(CONFIG.WISHLIST_KEY, JSON.stringify(wishlist));
                    updateWishlistBadge();
                    this.closest('.wishlist-item').remove();
                    
                    // Update modal header
                    const header = overlay.querySelector('.wishlist-modal-header h3');
                    if (header) {
                        header.innerHTML = `<i class="fas fa-heart"></i> My Wishlist (${wishlist.length})`;
                    }
                    
                    if (wishlist.length === 0) {
                        overlay.remove();
                        showToast('Wishlist cleared', 'info');
                    }
                });
            });
            
            // Clear all button
            overlay.querySelector('.wishlist-clear-all').addEventListener('click', function() {
                if (confirm('Are you sure you want to clear your entire wishlist?')) {
                    wishlist = [];
                    localStorage.setItem(CONFIG.WISHLIST_KEY, JSON.stringify(wishlist));
                    updateWishlistBadge();
                    overlay.remove();
                    showToast('Wishlist cleared', 'info');
                }
            });
            
            // Close when clicking outside
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.remove();
                }
            });
            
            // Add fade-in animation
            setTimeout(() => {
                overlay.style.opacity = '1';
                overlay.querySelector('.wishlist-modal').style.transform = 'translateY(0)';
            }, 10);
        }
        
        function addModalStyles() {
            // Check if styles already exist
            if (document.querySelector('#wishlist-modal-styles')) return;
            
            const styles = `
                .wishlist-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(5px);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    padding: 1rem;
                }
                
                .wishlist-modal {
                    background: var(--light);
                    border-radius: var(--radius-xl);
                    width: 100%;
                    max-width: 500px;
                    max-height: 80vh;
                    display: flex;
                    flex-direction: column;
                    transform: translateY(20px);
                    transition: transform 0.3s ease;
                    box-shadow: var(--shadow-xl);
                    overflow: hidden;
                }
                
                .wishlist-modal-header {
                    padding: 1.25rem;
                    background: var(--gradient-primary);
                    color: white;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-shrink: 0;
                }
                
                .wishlist-modal-header h3 {
                    margin: 0;
                    background: none;
                    -webkit-text-fill-color: white;
                    font-size: 1.25rem;
                }
                
                .wishlist-modal-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0;
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .wishlist-modal-content {
                    padding: 1rem;
                    overflow-y: auto;
                    flex: 1;
                }
                
                .wishlist-item {
                    display: flex;
                    align-items: center;
                    padding: 1rem;
                    background: white;
                    border-radius: var(--radius-md);
                    margin-bottom: 0.75rem;
                    border: 1px solid var(--border);
                    transition: var(--transition-fast);
                }
                
                [data-theme="dark"] .wishlist-item {
                    background: rgba(255, 255, 255, 0.05);
                }
                
                .wishlist-item:hover {
                    border-color: var(--primary);
                    box-shadow: var(--shadow-md);
                }
                
                .wishlist-item img {
                    width: 60px;
                    height: 60px;
                    object-fit: contain;
                    border-radius: var(--radius-sm);
                    margin-right: 1rem;
                    flex-shrink: 0;
                }
                
                .wishlist-item-info {
                    flex: 1;
                    min-width: 0;
                }
                
                .wishlist-item-info h4 {
                    font-size: 0.95rem;
                    margin-bottom: 0.25rem;
                    color: var(--dark);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                
                [data-theme="dark"] .wishlist-item-info h4 {
                    color: #F1F5F9;
                }
                
                .wishlist-item-info p {
                    font-size: 0.8rem;
                    color: var(--text-light);
                    margin: 0;
                }
                
                .wishlist-category {
                    display: inline-block;
                    background: var(--light-gray);
                    color: var(--text);
                    padding: 0.2rem 0.5rem;
                    border-radius: var(--radius-sm);
                    font-size: 0.7rem;
                    margin-top: 0.25rem;
                }
                
                [data-theme="dark"] .wishlist-category {
                    background: rgba(255, 255, 255, 0.1);
                }
                
                .wishlist-item-actions {
                    display: flex;
                    gap: 0.5rem;
                    flex-shrink: 0;
                }
                
                .wishlist-item-remove {
                    background: #fee2e2;
                    border: 1px solid #fecaca;
                    color: #dc2626;
                    width: 36px;
                    height: 36px;
                    border-radius: var(--radius-md);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: var(--transition-fast);
                    min-height: 44px;
                    min-width: 44px;
                }
                
                .wishlist-item-remove:hover {
                    background: #fecaca;
                }
                
                .wishlist-modal-footer {
                    padding: 1rem;
                    border-top: 1px solid var(--border);
                    display: flex;
                    gap: 0.75rem;
                    flex-shrink: 0;
                }
                
                .wishlist-clear-all, .wishlist-modal-close-btn {
                    flex: 1;
                    padding: 0.75rem;
                    border: none;
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    cursor: pointer;
                    transition: var(--transition-fast);
                    min-height: 44px;
                }
                
                .wishlist-clear-all {
                    background: #fee2e2;
                    color: #dc2626;
                }
                
                .wishlist-clear-all:hover {
                    background: #fecaca;
                }
                
                .wishlist-modal-close-btn {
                    background: var(--light-gray);
                    color: var(--text);
                }
                
                .wishlist-modal-close-btn:hover {
                    background: var(--border);
                }
                
                @media (max-width: 480px) {
                    .wishlist-modal {
                        max-height: 70vh;
                    }
                    
                    .wishlist-item {
                        flex-wrap: wrap;
                    }
                    
                    .wishlist-item img {
                        width: 50px;
                        height: 50px;
                    }
                    
                    .wishlist-item-info h4 {
                        font-size: 0.9rem;
                    }
                }
            `;
            
            const styleEl = document.createElement('style');
            styleEl.id = 'wishlist-modal-styles';
            styleEl.textContent = styles;
            document.head.appendChild(styleEl);
        }
        
        resolve();
    });
}

// ========== THEME MANAGER WITH SYSTEM PREFERENCE ==========
function initThemeManager() {
    return new Promise((resolve) => {
        const themeToggle = document.getElementById('themeToggle');
        const THEME_KEY = CONFIG.THEME_KEY;
        
        // Detect system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Get saved theme or use system preference
        const savedTheme = localStorage.getItem(THEME_KEY);
        let currentTheme = savedTheme || (systemPrefersDark.matches ? 'dark' : 'light');
        
        // Apply theme
        applyTheme(currentTheme);
        
        // Listen for system theme changes (only if no saved preference)
        if (!savedTheme) {
            systemPrefersDark.addEventListener('change', (e) => {
                if (!localStorage.getItem(THEME_KEY)) {
                    currentTheme = e.matches ? 'dark' : 'light';
                    applyTheme(currentTheme);
                    showToast(`Switched to ${currentTheme} mode (system)`, 'info');
                }
            });
        }
        
        // Theme toggle button
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                currentTheme = currentTheme === 'light' ? 'dark' : 'light';
                applyTheme(currentTheme);
                localStorage.setItem(THEME_KEY, currentTheme);
                
                // Update icon with animation
                this.style.transform = 'rotate(180deg) scale(1.2)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
                
                // Show notification
                showToast(`Switched to ${currentTheme} mode`, 'success');
                
                // Track theme change
                trackEvent('theme_changed', { theme: currentTheme });
            });
        }
        
        function applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            updateThemeIcon();
        }
        
        function updateThemeIcon() {
            if (themeToggle) {
                themeToggle.innerHTML = currentTheme === 'light' 
                    ? '<i class="fas fa-moon"></i>' 
                    : '<i class="fas fa-sun"></i>';
            }
        }
        
        resolve();
    });
}

// ========== SCROLL ANIMATIONS & INTERSECTION OBSERVER ==========
function initScrollAnimations() {
    return new Promise((resolve) => {
        // Add scroll-triggered animations
        const observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add specific animations based on element type
                    if (entry.target.classList.contains('affiliate-product-card')) {
                        entry.target.style.animationDelay = `${entry.target.dataset.index * 0.1}s`;
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.affiliate-product-card, .step, .faq-item, .badge').forEach((el, index) => {
            el.dataset.index = index;
            observer.observe(el);
        });
        
        // Back to top button
        const backToTopBtn = document.getElementById('backToTop');
        
        if (backToTopBtn) {
            window.addEventListener('scroll', debounce(() => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            }, 100));
            
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Reading progress bar
        const progressBar = document.getElementById('progressBar');
        
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (window.pageYOffset / windowHeight) * 100;
                progressBar.style.width = `${scrolled}%`;
            });
        }
        
        resolve();
    });
}

// ========== TOUCH GESTURES FOR MOBILE ==========
function initTouchGestures() {
    return new Promise((resolve) => {
        let touchStartX = 0;
        let touchStartY = 0;
        
        // Swipe detection for mobile navigation
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            const xDiff = touchStartX - touchEndX;
            const yDiff = touchStartY - touchEndY;
            
            // Only consider horizontal swipes
            if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 50) {
                // Swipe left to close menu
                if (xDiff > 50 && window.innerWidth <= 992) {
                    const navMenu = document.querySelector('.nav-menu');
                    if (navMenu && navMenu.classList.contains('active')) {
                        document.querySelector('.mobile-menu-btn')?.click();
                    }
                }
            }
        }, { passive: true });
        
        resolve();
    });
}

// ========== DEVICE DETECTION & OPTIMIZATION ==========
function initDeviceDetection() {
    return new Promise((resolve) => {
        const ua = navigator.userAgent;
        const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(ua);
        const isTablet = /iPad|Android|Tablet/i.test(ua) && !/Mobile/i.test(ua);
        
        // Add device class to body for specific styling
        if (isMobile) document.body.classList.add('is-mobile');
        if (isTablet) document.body.classList.add('is-tablet');
        
        // Adjust UI based on screen size
        function adjustUIForScreenSize() {
            const width = window.innerWidth;
            
            // Adjust product grid for different screen sizes
            const productGrid = document.querySelector('.affiliate-products-grid');
            if (productGrid) {
                if (width < 576) {
                    productGrid.style.gridTemplateColumns = '1fr';
                } else if (width < 768) {
                    productGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                } else if (width < 992) {
                    productGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                } else if (width < 1200) {
                    productGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                } else {
                    productGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
                }
            }
            
            // Adjust hero layout
            const heroContainer = document.querySelector('.hero .container');
            if (heroContainer) {
                if (width < 992) {
                    heroContainer.style.gridTemplateColumns = '1fr';
                    heroContainer.style.textAlign = 'center';
                } else {
                    heroContainer.style.gridTemplateColumns = '1fr 1fr';
                    heroContainer.style.textAlign = 'left';
                }
            }
            
            // Adjust font sizes for mobile
            const html = document.documentElement;
            if (width < 480) {
                html.style.fontSize = '14px';
            } else if (width < 768) {
                html.style.fontSize = '15px';
            } else {
                html.style.fontSize = '16px';
            }
        }
        
        // Initial adjustment
        adjustUIForScreenSize();
        
        // Listen for resize
        window.addEventListener('resize', debounce(adjustUIForScreenSize, 100));
        
        // Track device information
        trackEvent('device_detected', {
            isMobile,
            isTablet,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
        });
        
        resolve();
    });
}

// ========== PERFORMANCE OPTIMIZATIONS ==========
function initPerformanceOptimizer() {
    return new Promise((resolve) => {
        // Lazy load images
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        
                        // Add fade-in effect
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.5s ease';
                        
                        img.onload = () => {
                            img.style.opacity = '1';
                            img.removeAttribute('data-src');
                        };
                        
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px'
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
            });
        }
        
        // Optimize scroll performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Performance heavy operations here
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        
        resolve();
    });
}

// ========== OFFLINE SUPPORT ==========
function initOfflineSupport() {
    return new Promise((resolve) => {
        // Check online/offline status
        window.addEventListener('online', () => {
            showToast('You are back online!', 'success');
        });
        
        window.addEventListener('offline', () => {
            showToast('You are offline. Some features may not work.', 'warning');
        });
        
        resolve();
    });
}

// ========== ANALYTICS & TRACKING ==========
function initAnalytics() {
    return new Promise((resolve) => {
        const ANALYTICS_KEY = CONFIG.ANALYTICS_KEY;
        
        // Initialize analytics data
        let analytics = JSON.parse(localStorage.getItem(ANALYTICS_KEY)) || {
            pageViews: 0,
            uniqueVisits: 0,
            lastVisit: null,
            events: []
        };
        
        // Track page view
        analytics.pageViews++;
        analytics.lastVisit = new Date().toISOString();
        
        // Track unique visits (based on session)
        const lastVisitTime = sessionStorage.getItem('last_session_time');
        const currentTime = Date.now();
        const isNewSession = !lastVisitTime || (currentTime - parseInt(lastVisitTime)) > 30 * 60 * 1000;
        
        if (isNewSession) {
            analytics.uniqueVisits++;
            sessionStorage.setItem('last_session_time', currentTime.toString());
        }
        
        // Save analytics
        localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
        
        // Time on page tracking
        let pageLoadTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Date.now() - pageLoadTime;
            trackEvent('page_unload', { time_spent: timeSpent });
        });
        
        // Product interaction tracking
        document.addEventListener('click', function(e) {
            const amazonBtn = e.target.closest('.amazon-btn');
            if (amazonBtn) {
                const product = amazonBtn.dataset.product;
                const productId = amazonBtn.dataset.productId;
                
                trackEvent('amazon_click', {
                    product: product,
                    product_id: productId,
                    timestamp: new Date().toISOString()
                });
                
                // Open in new tab
                setTimeout(() => {
                    window.open(amazonBtn.href, '_blank');
                }, 100);
            }
        });
        
        resolve();
    });
}

// ========== UTILITY FUNCTIONS ==========

function showToast(message, type = 'info', duration = 3000) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas fa-${icons[type] || 'info-circle'}"></i>
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
    
    // Auto remove
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }
    }, duration);
}

function trackEvent(eventName, data = {}) {
    // Store locally for debugging
    const events = JSON.parse(localStorage.getItem('event_log') || '[]');
    events.push({
        event: eventName,
        data: data,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 100 events
    if (events.length > 100) events.shift();
    
    localStorage.setItem('event_log', JSON.stringify(events));
    
    // Log to console in development
    if (CONFIG.PERFORMANCE_MONITORING) {
        console.log(`📈 ${eventName}:`, data);
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function checkFirstVisit() {
    const hasVisited = localStorage.getItem('has_visited');
    if (!hasVisited) {
        setTimeout(() => {
            showToast('Welcome to MobileTechHub! 🎉 Explore premium smartphone recommendations.', 'success', 5000);
            localStorage.setItem('has_visited', 'true');
        }, 1000);
    }
}

// ========== GLOBAL EXPORTS (for debugging) ==========
window.MobileTechHub = {
    version: CONFIG.APP_VERSION,
    showToast,
    trackEvent,
    refreshWishlist: () => {
        const wishlist = JSON.parse(localStorage.getItem(CONFIG.WISHLIST_KEY) || '[]');
        console.log('❤️ Wishlist:', wishlist);
        return wishlist;
    },
    getAnalytics: () => {
        return JSON.parse(localStorage.getItem(CONFIG.ANALYTICS_KEY) || '{}');
    },
    clearData: () => {
        if (confirm('Are you sure you want to clear all local data?')) {
            localStorage.clear();
            sessionStorage.clear();
            console.log('🗑️ All data cleared');
            showToast('All local data cleared', 'info');
            setTimeout(() => location.reload(), 1000);
        }
    }
};

// Add global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    trackEvent('global_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno
    });
});

// Add unhandled rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    trackEvent('unhandled_rejection', {
        reason: e.reason?.message || String(e.reason)
    });
});