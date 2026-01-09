// main.js - Enhanced with Full Mobile Support & Foldable Device Optimization
// Version 2.1 - Premium Amazon Affiliate Website

document.addEventListener('DOMContentLoaded', function() {
    // ========== CONFIGURATION & INITIALIZATION ==========
    console.log('%c📱 MobileTechHub v2.1 - Premium Amazon Affiliate', 
                'background: linear-gradient(90deg, #2563EB, #7C3AED); color: white; padding: 10px; border-radius: 5px; font-size: 14px;');
    
    // Performance monitoring
    const perfStart = performance.now();
    
    // Initialize all modules with error handling
    const modules = [
        { name: 'Mobile Navigation', fn: initMobileNavigation },
        { name: 'Product Filtering', fn: initProductFilters },
        { name: 'Wishlist System', fn: initWishlistSystem },
        { name: 'Theme Management', fn: initThemeManager },
        { name: 'Scroll Animations', fn: initScrollAnimations },
        { name: 'Touch Gestures', fn: initTouchGestures },
        { name: 'Device Detection', fn: initDeviceDetection },
        { name: 'Performance Optimizer', fn: initPerformanceOptimizer },
        { name: 'Offline Support', fn: initOfflineSupport },
        { name: 'Analytics Tracker', fn: initAnalytics }
    ];
    
    modules.forEach(module => {
        try {
            module.fn();
            console.log(`✅ ${module.name}`);
        } catch (error) {
            console.error(`❌ ${module.name}:`, error);
        }
    });
    
    // Hide loading screen with animation
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                // Show welcome message for first-time visitors
                checkFirstVisit();
            }, 500);
        }
        
        // Performance log
        const perfEnd = performance.now();
        console.log(`🚀 Page loaded in ${(perfEnd - perfStart).toFixed(2)}ms`);
    }, 1000);
    
    // ========== ENHANCED MOBILE NAVIGATION ==========
    function initMobileNavigation() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        const body = document.body;
        
        if (!mobileMenuBtn || !navMenu) return;
        
        let isMenuOpen = false;
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            
            // Toggle menu visibility
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger icon
            const icon = this.querySelector('i');
            if (isMenuOpen) {
                icon.classList.replace('fa-bars', 'fa-times');
                body.style.overflow = 'hidden'; // Prevent scrolling
                
                // Add backdrop
                addBackdrop();
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
                body.style.overflow = '';
                removeBackdrop();
            }
            
            // Track menu interaction
            trackEvent('mobile_menu_toggle', { state: isMenuOpen ? 'open' : 'closed' });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-btn')) {
                closeMobileMenu();
            }
        });
        
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
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId !== '#') {
                        closeMobileMenu();
                        setTimeout(() => {
                            const targetElement = document.querySelector(targetId);
                            if (targetElement) {
                                targetElement.scrollIntoView({ behavior: 'smooth' });
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
                
                // Adjust UI for different screen sizes
                adjustUIForScreenSize();
            }, 100);
        });
        
        // Add backdrop for mobile menu
        function addBackdrop() {
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
                z-index: 999;
                animation: fadeIn 0.3s ease;
            `;
            backdrop.addEventListener('click', closeMobileMenu);
            document.body.appendChild(backdrop);
        }
        
        function removeBackdrop() {
            const backdrop = document.querySelector('.mobile-menu-backdrop');
            if (backdrop) {
                backdrop.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => backdrop.remove(), 300);
            }
        }
        
        function closeMobileMenu() {
            isMenuOpen = false;
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) icon.classList.replace('fa-times', 'fa-bars');
            body.style.overflow = '';
            removeBackdrop();
        }
        
        // Initial UI adjustment
        adjustUIForScreenSize();
    }
    
    // ========== ENHANCED PRODUCT FILTERING & SEARCH ==========
    function initProductFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const searchInput = document.getElementById('searchInput');
        const productCards = document.querySelectorAll('.affiliate-product-card');
        const searchResults = document.getElementById('searchResults');
        
        if (!filterButtons.length || !productCards.length) return;
        
        let activeFilter = 'all';
        let searchTerm = '';
        
        // Initialize filter buttons
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                activeFilter = this.dataset.filter;
                
                // Apply filters
                applyFilters();
                
                // Track filter usage
                trackEvent('filter_used', { filter: activeFilter });
                
                // Scroll to products on mobile
                if (window.innerWidth <= 768 && activeFilter !== 'all') {
                    const firstVisible = document.querySelector('.affiliate-product-card:not([style*="display: none"])');
                    if (firstVisible) {
                        firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
        
        // Initialize search
        if (searchInput) {
            searchInput.addEventListener('input', debounce(function(e) {
                searchTerm = e.target.value.toLowerCase().trim();
                applyFilters();
                
                // Show search results count
                if (searchResults) {
                    const visibleCount = document.querySelectorAll('.affiliate-product-card:not([style*="display: none"])').length;
                    searchResults.textContent = searchTerm ? 
                        `Found ${visibleCount} product${visibleCount !== 1 ? 's' : ''}` : '';
                }
                
                // Track search
                if (searchTerm.length >= 2) {
                    trackEvent('search_performed', { query: searchTerm });
                }
            }, 300));
            
            // Clear search on escape
            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    this.value = '';
                    searchTerm = '';
                    applyFilters();
                    if (searchResults) searchResults.textContent = '';
                }
            });
        }
        
        function applyFilters() {
            let visibleCount = 0;
            
            productCards.forEach(card => {
                const category = card.dataset.category;
                const name = card.dataset.name.toLowerCase();
                const brand = card.dataset.brand.toLowerCase();
                
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
                    padding: 4rem 2rem;
                    background: linear-gradient(135deg, var(--light-gray), var(--light));
                    border-radius: var(--radius-lg);
                    border: 2px dashed var(--border);
                    margin: 2rem 0;
                `;
                
                emptyState.innerHTML = `
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--dark); margin-bottom: 0.5rem;">No products found</h3>
                    <p style="color: var(--text-light); max-width: 400px; margin: 0 auto 1.5rem;">
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
                        if (searchResults) searchResults.textContent = '';
                    });
                }
            }
        }
        
        // Apply initial filters
        applyFilters();
    }
    
    // ========== PREMIUM WISHLIST SYSTEM ==========
    function initWishlistSystem() {
        const WISHLIST_KEY = 'mobiletechhub_wishlist_v2';
        
        // Load wishlist from localStorage
        let wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
        
        // Initialize wishlist buttons
        document.addEventListener('click', function(e) {
            const wishlistBtn = e.target.closest('.btn-wishlist-toggle');
            
            if (wishlistBtn) {
                e.preventDefault();
                toggleWishlistItem(wishlistBtn);
            }
        });
        
        // Header wishlist button
        const headerWishlistBtn = document.getElementById('headerWishlistBtn');
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
            const productName = button.dataset.product;
            const productImage = button.closest('.affiliate-product-card')?.querySelector('img')?.src || '';
            
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
                wishlist.push({
                    id: productId,
                    name: productName,
                    image: productImage,
                    date: new Date().toISOString(),
                    category: button.closest('.affiliate-product-card')?.dataset.category || 'unknown'
                });
                button.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
                button.classList.add('active');
                showToast(`Added ${productName} to wishlist`, 'success');
                
                // Animation with haptic feedback
                button.style.transform = 'scale(1.2)';
                setTimeout(() => button.style.transform = '', 300);
                
                // Haptic feedback for mobile
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
            }
            
            // Save to localStorage
            localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
            
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
                    badge.textContent = wishlist.length;
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
                                    <img src="${item.image}" alt="${item.name}" 
                                         onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><rect width=\"100\" height=\"100\" fill=\"%23f1f5f9\"/><text x=\"50\" y=\"50\" text-anchor=\"middle\" dy=\".3em\" fill=\"%2394a3b8\" font-size=\"12\">No Image</text></svg>'">
                                    <div class="wishlist-item-info">
                                        <h4>${item.name}</h4>
                                        <p>Added: ${new Date(item.date).toLocaleDateString()}</p>
                                        <span class="wishlist-category">${item.category}</span>
                                    </div>
                                    <div class="wishlist-item-actions">
                                        <button class="wishlist-item-remove" data-id="${item.id}">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        <a href="#" class="wishlist-item-view" data-product="${item.name}">
                                            <i class="fab fa-amazon"></i> View
                                        </a>
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
            
            // Add styles for modal
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
                    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
                    updateWishlistBadge();
                    this.closest('.wishlist-item').remove();
                    
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
                    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
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
                }
                
                .wishlist-modal {
                    background: var(--light);
                    border-radius: var(--radius-xl);
                    width: 90%;
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
                    padding: 1.5rem;
                    background: var(--gradient-primary);
                    color: white;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .wishlist-modal-header h3 {
                    margin: 0;
                    background: none;
                    -webkit-text-fill-color: white;
                }
                
                .wishlist-modal-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0;
                    width: 30px;
                    height: 30px;
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
                }
                
                .wishlist-item-info {
                    flex: 1;
                }
                
                .wishlist-item-info h4 {
                    font-size: 1rem;
                    margin-bottom: 0.25rem;
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
                
                .wishlist-item-actions {
                    display: flex;
                    gap: 0.5rem;
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
                }
                
                .wishlist-item-remove:hover {
                    background: #fecaca;
                }
                
                .wishlist-item-view {
                    background: var(--gradient-primary);
                    color: white;
                    padding: 0.5rem 0.75rem;
                    border-radius: var(--radius-md);
                    text-decoration: none;
                    font-size: 0.8rem;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }
                
                .wishlist-modal-footer {
                    padding: 1rem;
                    border-top: 1px solid var(--border);
                    display: flex;
                    gap: 1rem;
                }
                
                .wishlist-clear-all, .wishlist-modal-close-btn {
                    flex: 1;
                    padding: 0.75rem;
                    border: none;
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    cursor: pointer;
                    transition: var(--transition-fast);
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
            `;
            
            const styleEl = document.createElement('style');
            styleEl.textContent = styles;
            document.head.appendChild(styleEl);
        }
    }
    
    // ========== THEME MANAGER WITH SYSTEM PREFERENCE ==========
    function initThemeManager() {
        const themeToggle = document.getElementById('themeToggle');
        const THEME_KEY = 'mobiletechhub_theme';
        
        // Detect system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Get saved theme or use system preference
        const savedTheme = localStorage.getItem(THEME_KEY);
        let currentTheme = savedTheme || (systemPrefersDark.matches ? 'dark' : 'light');
        
        // Apply theme
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon();
        
        // Listen for system theme changes (only if no saved preference)
        if (!savedTheme) {
            systemPrefersDark.addEventListener('change', (e) => {
                currentTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', currentTheme);
                updateThemeIcon();
                showToast(`Switched to ${currentTheme} mode (system)`, 'info');
            });
        }
        
        // Theme toggle button
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                currentTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                // Apply theme with transition
                document.documentElement.style.transition = 'background-color 0.3s, color 0.3s';
                document.documentElement.setAttribute('data-theme', currentTheme);
                
                // Save preference
                localStorage.setItem(THEME_KEY, currentTheme);
                
                // Update icon with animation
                this.style.transform = 'rotate(180deg) scale(1.2)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
                
                updateThemeIcon();
                
                // Show notification
                showToast(`Switched to ${currentTheme} mode`, 'success');
                
                // Track theme change
                trackEvent('theme_changed', { theme: currentTheme });
            });
        }
        
        function updateThemeIcon() {
            if (themeToggle) {
                themeToggle.innerHTML = currentTheme === 'light' 
                    ? '<i class="fas fa-moon"></i>' 
                    : '<i class="fas fa-sun"></i>';
            }
        }
    }
    
    // ========== SCROLL ANIMATIONS & INTERSECTION OBSERVER ==========
    function initScrollAnimations() {
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
    }
    
    // ========== TOUCH GESTURES FOR MOBILE ==========
    function initTouchGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        
        // Swipe detection for mobile navigation
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const xDiff = touchStartX - touchEndX;
            const yDiff = touchStartY - touchEndY;
            
            // Only consider horizontal swipes
            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                // Swipe left to close menu
                if (xDiff > swipeThreshold && window.innerWidth <= 992) {
                    const navMenu = document.querySelector('.nav-menu');
                    if (navMenu && navMenu.classList.contains('active')) {
                        document.querySelector('.mobile-menu-btn')?.click();
                    }
                }
            }
        }
        
        // Double tap to like on mobile
        let lastTap = 0;
        document.addEventListener('touchend', function(e) {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            if (tapLength < 300 && tapLength > 0) {
                // Double tap detected
                const target = e.target;
                const productCard = target.closest('.affiliate-product-card');
                
                if (productCard) {
                    const wishlistBtn = productCard.querySelector('.btn-wishlist-toggle');
                    if (wishlistBtn) {
                        wishlistBtn.click();
                        
                        // Show visual feedback
                        const heart = document.createElement('div');
                        heart.innerHTML = '<i class="fas fa-heart"></i>';
                        heart.style.cssText = `
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            font-size: 3rem;
                            color: #ef4444;
                            animation: heartBurst 0.8s ease-out;
                            pointer-events: none;
                            z-index: 100;
                        `;
                        productCard.style.position = 'relative';
                        productCard.appendChild(heart);
                        
                        setTimeout(() => heart.remove(), 800);
                    }
                }
            }
            lastTap = currentTime;
        }, { passive: true });
        
        // Add heart burst animation
        const heartAnimation = `
            @keyframes heartBurst {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.2);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = heartAnimation;
        document.head.appendChild(style);
    }
    
    // ========== DEVICE DETECTION & OPTIMIZATION ==========
    function initDeviceDetection() {
        const ua = navigator.userAgent;
        const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(ua);
        const isTablet = /iPad|Android|Tablet/i.test(ua) && !/Mobile/i.test(ua);
        const isFoldable = /SM-F[0-9]{3,4}/i.test(ua); // Samsung Fold series
        
        // Add device class to body for specific styling
        if (isMobile) document.body.classList.add('is-mobile');
        if (isTablet) document.body.classList.add('is-tablet');
        if (isFoldable) document.body.classList.add('is-foldable');
        
        // Detect foldable device specific features
        if (isFoldable) {
            console.log('📱 Foldable device detected - applying optimizations');
            
            // Adjust UI for foldable
            adjustUIForFoldable();
            
            // Listen for screen orientation changes
            screen.orientation?.addEventListener('change', () => {
                setTimeout(adjustUIForFoldable, 100);
            });
        }
        
        // Adjust UI based on screen size
        function adjustUIForScreenSize() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isPortrait = height > width;
            
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
        
        function adjustUIForFoldable() {
            const isLandscape = window.innerWidth > window.innerHeight;
            
            // Different adjustments for folded/unfolded states
            const screenWidth = window.innerWidth;
            
            if (screenWidth > 800) {
                // Unfolded - tablet mode
                document.body.classList.add('foldable-unfolded');
                document.body.classList.remove('foldable-folded');
            } else {
                // Folded - phone mode
                document.body.classList.add('foldable-folded');
                document.body.classList.remove('foldable-unfolded');
            }
            
            // Adjust product grid for foldable
            const productGrid = document.querySelector('.affiliate-products-grid');
            if (productGrid) {
                if (isLandscape && screenWidth > 1000) {
                    productGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                } else if (isLandscape) {
                    productGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                } else {
                    productGrid.style.gridTemplateColumns = '1fr';
                }
            }
        }
        
        // Initial adjustment
        adjustUIForScreenSize();
        
        // Track device information
        trackEvent('device_detected', {
            isMobile,
            isTablet,
            isFoldable,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
        });
    }
    
    // ========== PERFORMANCE OPTIMIZATIONS ==========
    function initPerformanceOptimizer() {
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
        
        // Preload critical resources
        const preloadResources = [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
            'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap'
        ];
        
        preloadResources.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = url;
            link.onload = () => link.rel = 'stylesheet';
            document.head.appendChild(link);
        });
        
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
    }
    
    // ========== OFFLINE SUPPORT ==========
    function initOfflineSupport() {
        // Check online/offline status
        window.addEventListener('online', () => {
            showToast('You are back online!', 'success');
        });
        
        window.addEventListener('offline', () => {
            showToast('You are offline. Some features may not work.', 'warning');
        });
        
        // Cache critical assets
        if ('caches' in window) {
            const cacheName = 'mobiletechhub-v2';
            const urlsToCache = [
                '/',
                '/css/style.css',
                '/js/main.js',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
                'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap'
            ];
            
            window.addEventListener('load', () => {
                caches.open(cacheName)
                    .then(cache => cache.addAll(urlsToCache))
                    .catch(err => console.log('Cache failed:', err));
            });
        }
    }
    
    // ========== ANALYTICS & TRACKING ==========
    function initAnalytics() {
        const ANALYTICS_KEY = 'mobiletechhub_analytics';
        
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
        const lastVisitTime = localStorage.getItem('last_session_time');
        const currentTime = Date.now();
        const isNewSession = !lastVisitTime || (currentTime - parseInt(lastVisitTime)) > 30 * 60 * 1000;
        
        if (isNewSession) {
            analytics.uniqueVisits++;
            localStorage.setItem('last_session_time', currentTime.toString());
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
            }
        });
        
        console.log('📊 Analytics initialized:', {
            pageViews: analytics.pageViews,
            uniqueVisits: analytics.uniqueVisits,
            isNewSession
        });
    }
    
    // ========== UTILITY FUNCTIONS ==========
    
    function showToast(message, type = 'info', duration = 3000) {
        // Remove existing toast
        const existingToast = document.getElementById('toast');
        if (existingToast) existingToast.remove();
        
        // Create toast
        const toast = document.createElement('div');
        toast.id = 'toast';
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
        // In production, send to analytics service
        console.log(`📈 ${eventName}:`, data);
        
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
        version: '2.1',
        showToast,
        trackEvent,
        refreshWishlist: () => {
            const wishlist = JSON.parse(localStorage.getItem('mobiletechhub_wishlist_v2') || '[]');
            console.log('❤️ Wishlist:', wishlist);
            return wishlist;
        },
        getAnalytics: () => {
            return JSON.parse(localStorage.getItem('mobiletechhub_analytics') || '{}');
        },
        clearData: () => {
            localStorage.clear();
            console.log('🗑️ All data cleared');
            showToast('All local data cleared', 'info');
        }
    };
    
    // Add custom styles for enhanced UI
    addEnhancedStyles();
    
    function addEnhancedStyles() {
        const styles = `
            /* Enhanced Animations */
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInDown {
                from {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
            
            /* Enhanced Toast */
            .toast {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background: white;
                padding: 1rem 1.5rem;
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-xl);
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 1001;
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                border-left: 4px solid var(--success);
                max-width: 90%;
                min-width: 300px;
            }
            
            .toast.show {
                transform: translateX(-50%) translateY(0);
            }
            
            .toast-success { border-left-color: var(--success); }
            .toast-error { border-left-color: var(--danger); }
            .toast-warning { border-left-color: var(--warning); }
            .toast-info { border-left-color: var(--info); }
            
            .toast-close {
                background: none;
                border: none;
                font-size: 1.25rem;
                cursor: pointer;
                opacity: 0.5;
                transition: opacity 0.2s;
                margin-left: auto;
            }
            
            .toast-close:hover {
                opacity: 1;
            }
            
            /* Device-specific styles */
            .is-mobile .affiliate-product-card {
                margin-bottom: 1rem;
            }
            
            .is-foldable .container {
                padding: 0 1rem;
            }
            
            .foldable-unfolded .affiliate-products-grid {
                grid-template-columns: repeat(3, 1fr) !important;
            }
            
            .foldable-folded .affiliate-products-grid {
                grid-template-columns: 1fr !important;
            }
            
            /* Loading overlay animation */
            #loadingOverlay {
                transition: opacity 0.5s ease;
            }
            
            /* Mobile menu backdrop */
            .mobile-menu-backdrop {
                animation: fadeIn 0.3s ease;
            }
            
            /* Product card animations */
            .affiliate-product-card.animate-in {
                animation: fadeInUp 0.6s ease;
                animation-fill-mode: both;
            }
            
            /* Progress bar animation */
            #progressBar {
                transition: width 0.1s ease;
            }
            
            /* Dark mode transitions */
            [data-theme] {
                transition: background-color 0.3s, color 0.3s;
            }
            
            /* Responsive adjustments */
            @media (max-width: 480px) {
                .toast {
                    min-width: auto;
                    width: calc(100% - 2rem);
                    left: 1rem;
                    transform: translateX(0) translateY(100px);
                }
                
                .toast.show {
                    transform: translateX(0) translateY(0);
                }
            }
        `;
        
        const styleEl = document.createElement('style');
        styleEl.textContent = styles;
        document.head.appendChild(styleEl);
    }
    
    // Initialization complete
    console.log('🎯 MobileTechHub fully initialized');
    console.log('📱 Screen:', `${window.innerWidth} × ${window.innerHeight}`);
    console.log('🎨 Theme:', document.documentElement.getAttribute('data-theme'));
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}