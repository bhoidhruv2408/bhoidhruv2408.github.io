// main.js - Enhanced with Full Mobile Support & Foldable Device Optimization
// Version 2.3 - Premium Amazon Affiliate Website - Optimized for Mobile

// Global configuration
const CONFIG = {
    APP_VERSION: '2.3',
    WISHLIST_KEY: 'mobiletechhub_wishlist_v3',
    THEME_KEY: 'mobiletechhub_theme_v2',
    ANALYTICS_KEY: 'mobiletechhub_analytics_v2',
    PERFORMANCE_MONITORING: true,
    TOUCH_FRIENDLY: true
};

// Performance monitoring
let perfStart = performance.now();
let isInitialized = false;

// Prevent double initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    setTimeout(initializeApp, 100);
}

async function initializeApp() {
    if (isInitialized) return;
    isInitialized = true;
    
    console.log(`%c📱 MobileTechHub v${CONFIG.APP_VERSION} - Premium Amazon Affiliate`, 
                'background: linear-gradient(90deg, #2563EB, #7C3AED); color: white; padding: 8px 12px; border-radius: 4px; font-size: 12px;');
    
    try {
        // Initialize core modules first
        await Promise.allSettled([
            initPerformanceOptimizer(),
            initDeviceDetection(),
            initThemeManager(),
            initTouchOptimizations()
        ]);
        
        // Initialize UI modules
        await Promise.allSettled([
            initMobileNavigation(),
            initProductFilters(),
            initWishlistSystem(),
            initScrollAnimations(),
            initOfflineSupport(),
            initAnalytics()
        ]);
        
        // Finalize initialization
        await finalizeInitialization();
        
    } catch (error) {
        console.error('App initialization failed:', error);
        showToast('App initialization failed. Please refresh.', 'error', 5000);
    }
}

async function finalizeInitialization() {
    // Hide loading screen
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
            checkFirstVisit();
        }, 300);
    }
    
    // Performance log
    const perfEnd = performance.now();
    if (CONFIG.PERFORMANCE_MONITORING) {
        console.log(`🚀 Page loaded in ${(perfEnd - perfStart).toFixed(2)}ms`);
    }
    
    // Initialize Service Worker for PWA (if supported)
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('✅ Service Worker registered with scope:', registration.scope);
        } catch (error) {
            console.log('⚠️ Service Worker registration failed:', error);
        }
    }
    
    console.log('🎯 MobileTechHub fully initialized');
    
    // Trigger initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
}

// ========== ENHANCED MOBILE NAVIGATION ==========
function initMobileNavigation() {
    return new Promise((resolve) => {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        
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
            -webkit-backdrop-filter: blur(4px);
            z-index: 998;
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            touch-action: none;
        `;
        document.body.appendChild(backdrop);
        
        // Toggle mobile menu with improved touch handling
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            toggleMobileMenu();
        }, { passive: false });
        
        // Close menu when clicking outside
        backdrop.addEventListener('click', closeMobileMenu);
        backdrop.addEventListener('touchstart', closeMobileMenu, { passive: true });
        
        // Close menu on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMobileMenu();
            }
        });
        
        // Enhanced nav link handling with smooth scroll
        document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 991) {
                    const targetId = this.getAttribute('href');
                    if (targetId !== '#') {
                        e.preventDefault();
                        closeMobileMenu();
                        setTimeout(() => {
                            const targetElement = document.querySelector(targetId);
                            if (targetElement) {
                                const headerHeight = 140; // Fixed header + disclosure height
                                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                                window.scrollTo({
                                    top: targetPosition,
                                    behavior: 'smooth'
                                });
                            }
                        }, 350);
                    }
                }
            }, { passive: false });
        });
        
        // Handle window resize with debouncing
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 991 && isMenuOpen) {
                    closeMobileMenu();
                }
                // Update header position for mobile
                updateMobileHeaderPosition();
            }, 150);
        });
        
        function toggleMobileMenu() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                navMenu.style.display = 'flex';
                backdrop.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.touchAction = 'none';
                
                // Trigger reflow
                navMenu.offsetHeight;
                
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
                
                // Prevent body scroll on iOS
                document.body.classList.add('no-scroll');
                
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
                document.body.style.overflow = '';
                document.body.style.touchAction = '';
                document.body.classList.remove('no-scroll');
                
                // Update menu button icon
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                trackEvent('mobile_menu_closed');
            }, 300);
        }
        
        function updateMobileHeaderPosition() {
            if (window.innerWidth <= 991) {
                document.body.style.paddingTop = '140px';
            }
        }
        
        // Initialize
        updateMobileHeaderPosition();
        closeMobileMenu();
        resolve();
    });
}

// ========== OPTIMIZED PRODUCT FILTERING & SEARCH ==========
function initProductFilters() {
    return new Promise((resolve) => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const searchInput = document.getElementById('searchInput');
        
        if (!filterButtons.length) {
            console.warn('Filter buttons not found');
            resolve();
            return;
        }
        
        let activeFilter = 'all';
        let searchTerm = '';
        let productCards = [];
        
        // Initialize product cards once
        setTimeout(() => {
            productCards = Array.from(document.querySelectorAll('.affiliate-product-card'));
        }, 500);
        
        // Filter buttons with touch optimization
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('active')) return;
                
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                activeFilter = this.dataset.filter || 'all';
                
                // Apply filters
                applyFilters();
                
                // Track filter usage
                trackEvent('filter_used', { filter: activeFilter });
            }, { passive: true });
        });
        
        // Search with debouncing and improved mobile UX
        if (searchInput) {
            // Prevent zoom on focus in iOS
            searchInput.addEventListener('touchstart', function(e) {
                if (window.innerWidth <= 768) {
                    this.style.fontSize = '16px';
                }
            }, { passive: true });
            
            // Handle input with debounce
            let searchTimeout;
            searchInput.addEventListener('input', function(e) {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    searchTerm = this.value.toLowerCase().trim();
                    applyFilters();
                    
                    if (searchTerm.length >= 2) {
                        trackEvent('search_performed', { query: searchTerm });
                    }
                }, 300);
            }, { passive: true });
            
            // Clear search on escape
            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    this.value = '';
                    searchTerm = '';
                    applyFilters();
                }
            });
        }
        
        function applyFilters() {
            if (productCards.length === 0) {
                productCards = Array.from(document.querySelectorAll('.affiliate-product-card'));
            }
            
            let visibleCount = 0;
            const fragment = document.createDocumentFragment();
            
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
                    const searchText = name + ' ' + brand;
                    if (!searchText.includes(searchTerm)) {
                        shouldShow = false;
                    }
                }
                
                if (shouldShow) {
                    visibleCount++;
                    card.style.display = 'block';
                    
                    // Add to fragment for batch update
                    fragment.appendChild(card.cloneNode(true));
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update search results count
            const searchResults = document.getElementById('searchResults');
            if (searchResults) {
                if (searchTerm) {
                    searchResults.textContent = `Found ${visibleCount} product${visibleCount !== 1 ? 's' : ''}`;
                    searchResults.style.display = 'block';
                } else {
                    searchResults.style.display = 'none';
                }
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
                        if (searchInput) {
                            searchInput.value = '';
                            searchInput.blur();
                        }
                        searchTerm = '';
                        filterButtons.forEach(btn => {
                            if (btn.dataset.filter === 'all') {
                                btn.click();
                            }
                        });
                        applyFilters();
                        
                        const searchResults = document.getElementById('searchResults');
                        if (searchResults) searchResults.style.display = 'none';
                    }, { passive: true });
                }
            }
        }
        
        // Apply initial filters
        setTimeout(applyFilters, 1000);
        resolve();
    });
}

// ========== OPTIMIZED WISHLIST SYSTEM ==========
function initWishlistSystem() {
    return new Promise((resolve) => {
        // Load wishlist with error handling
        let wishlist = [];
        try {
            wishlist = JSON.parse(localStorage.getItem(CONFIG.WISHLIST_KEY) || '[]');
        } catch (error) {
            console.error('Error loading wishlist:', error);
            localStorage.removeItem(CONFIG.WISHLIST_KEY);
        }
        
        // Initialize wishlist buttons with event delegation
        document.addEventListener('click', function(e) {
            const wishlistBtn = e.target.closest('.btn-wishlist-toggle');
            
            if (wishlistBtn) {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlistItem(wishlistBtn);
            }
        }, { passive: false });
        
        // Header wishlist button
        const headerWishlistBtn = document.querySelector('.btn-wishlist');
        if (headerWishlistBtn) {
            headerWishlistBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (wishlist.length > 0) {
                    showWishlistModal();
                } else {
                    showToast('Your wishlist is empty. Add some products!', 'info', 3000);
                }
            }, { passive: false });
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
                showToast(`Removed ${productName} from wishlist`, 'info', 2000);
                
                // Animation
                button.style.transform = 'scale(0.9)';
                setTimeout(() => button.style.transform = '', 300);
            } else {
                // Add to wishlist
                const productCard = button.closest('.affiliate-product-card');
                const productImage = productCard?.querySelector('img');
                
                wishlist.push({
                    id: productId,
                    name: productName,
                    image: productImage?.src || productImage?.dataset?.src || '',
                    date: new Date().toISOString(),
                    category: productCard?.dataset.category || 'unknown',
                    added: Date.now()
                });
                
                button.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
                button.classList.add('active');
                showToast(`Added ${productName} to wishlist`, 'success', 2000);
                
                // Animation
                button.style.transform = 'scale(1.2)';
                setTimeout(() => button.style.transform = '', 300);
            }
            
            // Save to localStorage
            try {
                localStorage.setItem(CONFIG.WISHLIST_KEY, JSON.stringify(wishlist));
            } catch (error) {
                console.error('Error saving wishlist:', error);
                showToast('Failed to save wishlist. Storage may be full.', 'error', 3000);
            }
            
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
                    const count = wishlist.length;
                    badge.textContent = count > 99 ? '99+' : count;
                    badge.style.display = count > 0 ? 'flex' : 'none';
                    
                    // Animation for new items
                    if (count > parseInt(badge.dataset.lastCount || 0)) {
                        badge.style.animation = 'bounceIn 0.5s';
                        setTimeout(() => badge.style.animation = '', 500);
                    }
                    badge.dataset.lastCount = count;
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
                            <button class="wishlist-modal-close" aria-label="Close">&times;</button>
                        </div>
                        <div class="wishlist-modal-content">
                            ${wishlist.length === 0 ? `
                                <div class="empty-wishlist">
                                    <i class="far fa-heart" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                                    <p>Your wishlist is empty</p>
                                </div>
                            ` : wishlist.map((item, index) => `
                                <div class="wishlist-item" data-index="${index}">
                                    <img src="${item.image || 'data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"%3E%3Crect width=\"100\" height=\"100\" fill=\"%23f1f5f9\"/%3E%3Ctext x=\"50\" y=\"50\" text-anchor=\"middle\" dy=\".3em\" fill=\"%2394a3b8\" font-size=\"12\"%3ENo Image%3C/text%3E%3C/svg%3E'}" 
                                         alt="${item.name}" 
                                         loading="lazy"
                                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"%3E%3Crect width=\"100\" height=\"100\" fill=\"%23f1f5f9\"/%3E%3Ctext x=\"50\" y=\"50\" text-anchor=\"middle\" dy=\".3em\" fill=\"%2394a3b8\" font-size=\"12\"%3ENo Image%3C/text%3E%3C/svg%3E'">
                                    <div class="wishlist-item-info">
                                        <h4>${item.name}</h4>
                                        <p>Added: ${new Date(item.date).toLocaleDateString()}</p>
                                        <span class="wishlist-category">${item.category}</span>
                                    </div>
                                    <div class="wishlist-item-actions">
                                        <button class="wishlist-item-remove" data-id="${item.id}" aria-label="Remove item">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="wishlist-modal-footer">
                            ${wishlist.length > 0 ? `
                                <button class="wishlist-clear-all">
                                    <i class="fas fa-trash"></i> Clear All
                                </button>
                            ` : ''}
                            <button class="wishlist-modal-close-btn">
                                <i class="fas fa-times"></i> Close
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            
            // Add modal styles
            addModalStyles();
            
            const overlay = document.querySelector('.wishlist-modal-overlay');
            
            // Close buttons
            overlay.querySelectorAll('.wishlist-modal-close, .wishlist-modal-close-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    overlay.style.opacity = '0';
                    overlay.querySelector('.wishlist-modal').style.transform = 'translateY(20px)';
                    setTimeout(() => overlay.remove(), 300);
                }, { passive: true });
            });
            
            // Remove item buttons
            if (wishlist.length > 0) {
                overlay.querySelectorAll('.wishlist-item-remove').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const productId = this.dataset.id;
                        const itemElement = this.closest('.wishlist-item');
                        
                        // Animation
                        itemElement.style.opacity = '0.5';
                        itemElement.style.transform = 'translateX(-10px)';
                        
                        setTimeout(() => {
                            wishlist = wishlist.filter(item => item.id !== productId);
                            try {
                                localStorage.setItem(CONFIG.WISHLIST_KEY, JSON.stringify(wishlist));
                            } catch (error) {
                                console.error('Error saving wishlist:', error);
                            }
                            
                            updateWishlistBadge();
                            itemElement.remove();
                            
                            // Update modal header
                            const header = overlay.querySelector('.wishlist-modal-header h3');
                            if (header) {
                                header.innerHTML = `<i class="fas fa-heart"></i> My Wishlist (${wishlist.length})`;
                            }
                            
                            if (wishlist.length === 0) {
                                setTimeout(() => overlay.remove(), 300);
                                showToast('Wishlist cleared', 'info', 2000);
                            }
                        }, 300);
                    }, { passive: false });
                });
                
                // Clear all button
                const clearAllBtn = overlay.querySelector('.wishlist-clear-all');
                if (clearAllBtn) {
                    clearAllBtn.addEventListener('click', function() {
                        if (confirm('Are you sure you want to clear your entire wishlist?')) {
                            wishlist = [];
                            try {
                                localStorage.setItem(CONFIG.WISHLIST_KEY, JSON.stringify(wishlist));
                            } catch (error) {
                                console.error('Error saving wishlist:', error);
                            }
                            updateWishlistBadge();
                            overlay.remove();
                            showToast('Wishlist cleared', 'info', 2000);
                        }
                    }, { passive: false });
                }
            }
            
            // Close when clicking outside
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.style.opacity = '0';
                    this.querySelector('.wishlist-modal').style.transform = 'translateY(20px)';
                    setTimeout(() => this.remove(), 300);
                }
            }, { passive: true });
            
            // Add fade-in animation
            setTimeout(() => {
                overlay.style.opacity = '1';
                overlay.querySelector('.wishlist-modal').style.transform = 'translateY(0)';
            }, 10);
            
            // Focus trap for accessibility
            const focusableElements = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            overlay.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            lastFocusable.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            firstFocusable.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
            
            // Focus first element
            if (firstFocusable) firstFocusable.focus();
        }
        
        function addModalStyles() {
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
                    -webkit-backdrop-filter: blur(5px);
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
                    color: white;
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
                    -webkit-overflow-scrolling: touch;
                }
                
                .empty-wishlist {
                    text-align: center;
                    padding: 3rem 1rem;
                    color: var(--text-light);
                }
                
                .wishlist-item {
                    display: flex;
                    align-items: center;
                    padding: 1rem;
                    background: white;
                    border-radius: var(--radius-md);
                    margin-bottom: 0.75rem;
                    border: 1px solid var(--border);
                    transition: all 0.3s ease;
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
                    width: 44px;
                    height: 44px;
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
        let currentTheme;
        try {
            currentTheme = localStorage.getItem(THEME_KEY) || (systemPrefersDark.matches ? 'dark' : 'light');
        } catch (error) {
            currentTheme = systemPrefersDark.matches ? 'dark' : 'light';
        }
        
        // Apply theme
        applyTheme(currentTheme);
        
        // Listen for system theme changes (only if no saved preference)
        if (!localStorage.getItem(THEME_KEY)) {
            systemPrefersDark.addEventListener('change', (e) => {
                currentTheme = e.matches ? 'dark' : 'light';
                applyTheme(currentTheme);
                showToast(`Switched to ${currentTheme} mode (system)`, 'info', 2000);
            });
        }
        
        // Theme toggle button with touch optimization
        if (themeToggle) {
            themeToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                currentTheme = currentTheme === 'light' ? 'dark' : 'light';
                applyTheme(currentTheme);
                
                try {
                    localStorage.setItem(THEME_KEY, currentTheme);
                } catch (error) {
                    console.error('Error saving theme:', error);
                }
                
                // Update icon with animation
                this.style.transform = 'rotate(180deg) scale(1.2)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
                
                // Show notification
                showToast(`Switched to ${currentTheme} mode`, 'success', 2000);
                
                // Track theme change
                trackEvent('theme_changed', { theme: currentTheme });
            }, { passive: false });
        }
        
        function applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            updateThemeIcon();
            
            // Update meta theme-color for mobile browsers
            const metaThemeColor = document.querySelector('meta[name="theme-color"]');
            if (metaThemeColor) {
                metaThemeColor.content = theme === 'dark' ? '#0F172A' : '#F8FAFC';
            }
        }
        
        function updateThemeIcon() {
            if (themeToggle) {
                themeToggle.innerHTML = currentTheme === 'light' 
                    ? '<i class="fas fa-moon"></i>' 
                    : '<i class="fas fa-sun"></i>';
                themeToggle.setAttribute('aria-label', `Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`);
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
                    entry.target.classList.add('reveal', 'active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.affiliate-product-card, .step, .faq-item').forEach((el, index) => {
            el.dataset.index = index;
            observer.observe(el);
        });
        
        // Back to top button
        const backToTopBtn = document.getElementById('backToTop');
        
        if (backToTopBtn) {
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    if (window.pageYOffset > 300) {
                        backToTopBtn.classList.add('visible');
                    } else {
                        backToTopBtn.classList.remove('visible');
                    }
                }, 100);
            }, { passive: true });
            
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                trackEvent('back_to_top_clicked');
            }, { passive: true });
        }
        
        // Reading progress bar
        const progressBar = document.getElementById('progressBar');
        
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (window.pageYOffset / windowHeight) * 100;
                progressBar.style.width = `${scrolled}%`;
            }, { passive: true });
        }
        
        resolve();
    });
}

// ========== TOUCH OPTIMIZATIONS ==========
function initTouchOptimizations() {
    return new Promise((resolve) => {
        // Prevent double-tap zoom on mobile
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
        
        // Improve touch scrolling
        document.addEventListener('touchstart', function() {
            // Add smooth scrolling for touch devices
            if ('scrollBehavior' in document.documentElement.style) {
                document.documentElement.style.scrollBehavior = 'smooth';
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
        const isIOS = /iPhone|iPad|iPod/i.test(ua);
        
        // Add device class to body for specific styling
        if (isMobile) document.body.classList.add('is-mobile');
        if (isTablet) document.body.classList.add('is-tablet');
        if (isIOS) document.body.classList.add('is-ios');
        
        // Adjust UI based on screen size
        function adjustUIForScreenSize() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Handle mobile viewport adjustments
            if (width < 768) {
                // Mobile optimizations
                document.body.style.setProperty('--touch-target-size', '44px');
                
                // Adjust font sizes for better readability
                if (width < 480) {
                    document.documentElement.style.fontSize = '14px';
                } else {
                    document.documentElement.style.fontSize = '15px';
                }
            } else {
                document.body.style.removeProperty('--touch-target-size');
                document.documentElement.style.fontSize = '16px';
            }
            
            // Handle orientation changes
            if (width > height && width < 992) {
                document.body.classList.add('landscape');
            } else {
                document.body.classList.remove('landscape');
            }
        }
        
        // Initial adjustment
        adjustUIForScreenSize();
        
        // Listen for resize with debouncing
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(adjustUIForScreenSize, 150);
        }, { passive: true });
        
        // Track device information
        trackEvent('device_detected', {
            isMobile,
            isTablet,
            isIOS,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
            pixelRatio: window.devicePixelRatio || 1
        });
        
        resolve();
    });
}

// ========== PERFORMANCE OPTIMIZATIONS ==========
function initPerformanceOptimizer() {
    return new Promise((resolve) => {
        // Lazy load images with IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.dataset.src;
                        
                        if (src) {
                            img.src = src;
                            
                            // Add fade-in effect
                            img.style.opacity = '0';
                            img.style.transition = 'opacity 0.3s ease';
                            
                            img.onload = () => {
                                img.style.opacity = '1';
                                img.removeAttribute('data-src');
                                img.classList.add('loaded');
                            };
                            
                            // Handle image loading errors
                            img.onerror = () => {
                                console.warn('Failed to load image:', src);
                                img.style.opacity = '1';
                            };
                        }
                        
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px 0px',
                threshold: 0.01
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
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        
        // Prevent layout thrashing
        let rafId;
        window.addEventListener('resize', () => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                // Layout-sensitive operations here
            });
        }, { passive: true });
        
        resolve();
    });
}

// ========== OFFLINE SUPPORT ==========
function initOfflineSupport() {
    return new Promise((resolve) => {
        // Check online/offline status
        window.addEventListener('online', () => {
            showToast('You are back online!', 'success', 3000);
            document.body.classList.remove('offline');
        }, { passive: true });
        
        window.addEventListener('offline', () => {
            showToast('You are offline. Some features may not work.', 'warning', 5000);
            document.body.classList.add('offline');
        }, { passive: true });
        
        // Initial check
        if (!navigator.onLine) {
            document.body.classList.add('offline');
            showToast('You are offline. Some features may not work.', 'warning', 5000);
        }
        
        resolve();
    });
}

// ========== ANALYTICS & TRACKING ==========
function initAnalytics() {
    return new Promise((resolve) => {
        const ANALYTICS_KEY = CONFIG.ANALYTICS_KEY;
        
        // Initialize analytics data
        let analytics = {
            pageViews: 0,
            uniqueVisits: 0,
            lastVisit: null,
            firstVisit: null,
            events: [],
            device: {}
        };
        
        try {
            const stored = localStorage.getItem(ANALYTICS_KEY);
            if (stored) {
                analytics = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading analytics:', error);
        }
        
        // Track page view
        analytics.pageViews++;
        analytics.lastVisit = new Date().toISOString();
        
        if (!analytics.firstVisit) {
            analytics.firstVisit = analytics.lastVisit;
        }
        
        // Track unique visits (based on session)
        const sessionKey = 'mt_session_start';
        const currentTime = Date.now();
        const sessionStart = sessionStorage.getItem(sessionKey);
        
        if (!sessionStart || (currentTime - parseInt(sessionStart)) > 30 * 60 * 1000) {
            analytics.uniqueVisits++;
            sessionStorage.setItem(sessionKey, currentTime.toString());
        }
        
        // Store device info
        analytics.device = {
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            userAgent: navigator.userAgent.substring(0, 100),
            language: navigator.language,
            platform: navigator.platform
        };
        
        // Save analytics
        try {
            localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
        } catch (error) {
            console.error('Error saving analytics:', error);
        }
        
        // Time on page tracking
        let pageLoadTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Date.now() - pageLoadTime;
            trackEvent('page_unload', { time_spent: timeSpent });
        }, { passive: true });
        
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
                
                // Add loading state
                const originalHTML = amazonBtn.innerHTML;
                amazonBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
                amazonBtn.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    amazonBtn.innerHTML = originalHTML;
                    amazonBtn.style.pointerEvents = 'auto';
                }, 1500);
            }
        }, { passive: true });
        
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
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas fa-${icons[type] || 'info-circle'}"></i>
        <span>${message}</span>
        <button class="toast-close" aria-label="Close">&times;</button>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, { passive: true });
    
    // Auto remove
    const toastTimeout = setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }
    }, duration);
    
    // Pause timeout on hover/focus
    toast.addEventListener('mouseenter', () => clearTimeout(toastTimeout));
    toast.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }
        }, duration);
    });
}

function trackEvent(eventName, data = {}) {
    try {
        const events = JSON.parse(localStorage.getItem('event_log') || '[]');
        events.push({
            event: eventName,
            data: data,
            timestamp: new Date().toISOString(),
            path: window.location.pathname
        });
        
        // Keep only last 100 events
        if (events.length > 100) events.shift();
        
        localStorage.setItem('event_log', JSON.stringify(events));
        
        // Log to console in development
        if (CONFIG.PERFORMANCE_MONITORING) {
            console.log(`📈 ${eventName}:`, data);
        }
    } catch (error) {
        console.error('Error tracking event:', error);
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
if (typeof window !== 'undefined') {
    window.MobileTechHub = {
        version: CONFIG.APP_VERSION,
        showToast,
        trackEvent,
        refreshWishlist: () => {
            try {
                const wishlist = JSON.parse(localStorage.getItem(CONFIG.WISHLIST_KEY) || '[]');
                console.log('❤️ Wishlist:', wishlist);
                return wishlist;
            } catch (error) {
                console.error('Error loading wishlist:', error);
                return [];
            }
        },
        getAnalytics: () => {
            try {
                return JSON.parse(localStorage.getItem(CONFIG.ANALYTICS_KEY) || '{}');
            } catch (error) {
                console.error('Error loading analytics:', error);
                return {};
            }
        },
        clearData: () => {
            if (confirm('Are you sure you want to clear all local data?')) {
                try {
                    localStorage.clear();
                    sessionStorage.clear();
                    console.log('🗑️ All data cleared');
                    showToast('All local data cleared', 'info', 3000);
                    setTimeout(() => location.reload(), 1000);
                } catch (error) {
                    console.error('Error clearing data:', error);
                }
            }
        },
        forceReload: () => {
            location.reload();
        }
    };
}

// ========== ERROR HANDLING ==========

// Add global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    trackEvent('global_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error?.toString()
    });
    
    // Don't show error toast in production to avoid user confusion
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        showToast(`Error: ${e.message}`, 'error', 5000);
    }
}, { passive: true });

// Add unhandled rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    trackEvent('unhandled_rejection', {
        reason: e.reason?.message || String(e.reason)
    });
}, { passive: true });

// Add page visibility change handler
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        trackEvent('page_hidden');
    } else {
        trackEvent('page_visible');
    }
}, { passive: true });

// Add beforeinstallprompt handler for PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    trackEvent('pwa_install_prompt');
    
    // You can show your own install button here
    // showInstallPromotion();
}, { passive: true });

// ========== INITIALIZE APP STYLES ==========

// Add critical styles for mobile optimizations
if (document.head) {
    const mobileStyles = `
        /* Prevent blue highlight on touch */
        * {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-tap-highlight-color: transparent;
        }
        
        /* Improve text rendering */
        body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
        }
        
        /* Prevent pull-to-refresh on mobile */
        body.no-scroll {
            overscroll-behavior: none;
            position: fixed;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        
        /* Improve button touch targets */
        button, 
        .btn, 
        .amazon-btn, 
        .filter-btn,
        .btn-wishlist-toggle,
        .btn-share {
            min-height: 44px;
            min-width: 44px;
            touch-action: manipulation;
        }
        
        /* Prevent zoom on input focus in iOS */
        @media screen and (max-width: 768px) {
            input, select, textarea {
                font-size: 16px !important;
            }
        }
        
        /* Smooth scrolling for touch devices */
        @media (prefers-reduced-motion: no-preference) {
            html {
                scroll-behavior: smooth;
            }
        }
    `;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'mobiletechhub-critical-styles';
    styleEl.textContent = mobileStyles;
    document.head.appendChild(styleEl);
}