// main.js - Enhanced JavaScript for Amazon Affiliate Website
// Version 2.0 - Enhanced with modern features and better UX

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== CONFIGURATION ==========
    const CONFIG = {
        wishlistKey: 'mobiletechhub_wishlist',
        themeKey: 'mobiletechhub_theme',
        cookiesAcceptedKey: 'mobiletechhub_cookies_accepted',
        pageViewsKey: 'mobiletechhub_page_views',
        visitorsKey: 'mobiletechhub_visitors',
        lastVisitKey: 'mobiletechhub_last_visit'
    };
    
    // ========== INITIALIZE SITE ==========
    console.log('🚀 MobileTechHub Amazon Affiliate Website v2.0 Initialized');
    console.log('%c🔧 Debug Mode Active', 'color: #FF9900; font-weight: bold;');
    
    initializeSite();
    
    function initializeSite() {
        // Initialize with error handling
        const initializers = [
            { name: 'Mobile Menu', fn: initMobileMenu },
            { name: 'Filters', fn: initFilters },
            { name: 'Wishlist', fn: initWishlist },
            { name: 'Product Actions', fn: initProductActions },
            { name: 'Scroll Animations', fn: initScrollAnimations },
            { name: 'Lazy Loading', fn: initLazyLoading },
            { name: 'Back to Top', fn: initBackToTop },
            { name: 'Analytics', fn: initAnalytics },
            { name: 'Tooltips', fn: initTooltips },
            { name: 'Cookie Consent', fn: initCookieConsent },
            { name: 'Theme Toggle', fn: initThemeToggle },
            { name: 'Price Comparison', fn: initPriceComparison },
            { name: 'Reading Progress', fn: initReadingProgress },
            { name: 'Product Comparison', fn: initProductComparison },
            { name: 'Quick View', fn: initQuickView }
        ];
        
        initializers.forEach(({ name, fn }) => {
            try {
                fn();
                console.log(`✅ ${name} initialized successfully`);
            } catch (error) {
                console.error(`❌ Error initializing ${name}:`, error);
            }
        });
        
        updateWishlistBadge();
        addCustomStyles();
        initPerformanceOptimizations();
        initKeyboardShortcuts();
        
        // Show welcome message for returning visitors
        setTimeout(showWelcomeMessage, 1000);
    }
    
    // ========== ENHANCED MOBILE MENU ==========
    function initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!mobileMenuBtn || !navMenu) return;
        
        let isAnimating = false;
        
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (isAnimating) return;
            isAnimating = true;
            
            const isOpening = !navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger icon with smooth transition
            const icon = this.querySelector('i');
            if (isOpening) {
                icon.classList.replace('fa-bars', 'fa-times');
                this.style.transform = 'rotate(180deg)';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
                this.style.transform = 'rotate(0)';
                document.body.style.overflow = '';
            }
            
            setTimeout(() => {
                this.style.transform = '';
                isAnimating = false;
            }, 300);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-btn')) {
                closeMobileMenu();
            }
        });
        
        // Close menu when pressing escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
        
        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        function closeMobileMenu() {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.replace('fa-times', 'fa-bars');
            }
            mobileMenuBtn.style.transform = '';
            document.body.style.overflow = '';
        }
    }
    
    // ========== ENHANCED FILTERS WITH SEARCH ==========
    function initFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.affiliate-product-card');
        const filterContainer = document.querySelector('.filter-buttons');
        
        if (!filterBtns.length || !productCards.length || !filterContainer) return;
        
        // Add search input
        const searchHtml = `
            <div class="search-container" style="margin-bottom: 20px;">
                <input type="text" class="product-search" placeholder="🔍 Search products..." 
                       style="padding: 12px 16px; width: 100%; max-width: 400px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px;">
                <div class="search-stats" style="margin-top: 8px; font-size: 14px; color: #64748b;"></div>
            </div>
        `;
        filterContainer.insertAdjacentHTML('beforebegin', searchHtml);
        
        const searchInput = document.querySelector('.product-search');
        const searchStats = document.querySelector('.search-stats');
        let activeFilter = 'all';
        let searchQuery = '';
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                activeFilter = this.dataset.filter;
                filterProducts();
            });
        });
        
        searchInput.addEventListener('input', debounce(function(e) {
            searchQuery = e.target.value.toLowerCase().trim();
            filterProducts();
        }, 300));
        
        function filterProducts() {
            let visibleCount = 0;
            
            productCards.forEach(card => {
                const category = card.dataset.category;
                const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
                const features = card.querySelector('.product-features')?.textContent.toLowerCase() || '';
                const price = card.querySelector('.product-price')?.textContent.toLowerCase() || '';
                
                let shouldShow = true;
                
                // Apply category filter
                if (activeFilter !== 'all' && category !== activeFilter) {
                    shouldShow = false;
                }
                
                // Apply search filter
                if (shouldShow && searchQuery) {
                    const matches = title.includes(searchQuery) || 
                                  features.includes(searchQuery) || 
                                  price.includes(searchQuery);
                    if (!matches) shouldShow = false;
                }
                
                if (shouldShow) {
                    card.style.display = 'block';
                    visibleCount++;
                    
                    // Animation
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.4s ease';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update search stats
            if (searchStats) {
                searchStats.textContent = `Found ${visibleCount} product${visibleCount !== 1 ? 's' : ''}`;
                searchStats.style.color = visibleCount === 0 ? '#ef4444' : '#10b981';
            }
        }
        
        // Initial filter
        filterProducts();
    }
    
    // ========== ENHANCED WISHLIST SYSTEM ==========
    function initWishlist() {
        let wishlist = loadWishlist();
        
        // Toggle wishlist with better animation
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
                showWishlistModal();
            });
        }
        
        function toggleWishlistItem(button) {
            const productId = button.dataset.productId || button.dataset.product;
            const productName = button.dataset.product || 'Unknown Product';
            const productPrice = button.dataset.price || '';
            const productImage = button.dataset.image || '';
            
            const existingIndex = wishlist.findIndex(item => item.id === productId);
            
            if (existingIndex > -1) {
                // Remove from wishlist
                wishlist.splice(existingIndex, 1);
                button.classList.remove('active');
                button.innerHTML = '<i class="far fa-heart"></i> <span>Add to Wishlist</span>';
                showNotification(`Removed ${productName} from wishlist`, 'info');
                
                // Animation
                button.style.transform = 'scale(0.9)';
                setTimeout(() => button.style.transform = '', 200);
            } else {
                // Add to wishlist
                wishlist.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    added: new Date().toISOString()
                });
                button.classList.add('active');
                button.innerHTML = '<i class="fas fa-heart"></i> <span>In Wishlist</span>';
                showNotification(`Added ${productName} to wishlist`, 'success');
                
                // Animation
                button.style.transform = 'scale(1.1)';
                setTimeout(() => button.style.transform = '', 200);
                
                // Haptic feedback for mobile
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
            }
            
            saveWishlist(wishlist);
            updateWishlistBadge();
        }
        
        function loadWishlist() {
            try {
                return JSON.parse(localStorage.getItem(CONFIG.wishlistKey)) || [];
            } catch (e) {
                console.error('Error loading wishlist:', e);
                return [];
            }
        }
        
        function saveWishlist(list) {
            try {
                localStorage.setItem(CONFIG.wishlistKey, JSON.stringify(list));
            } catch (e) {
                console.error('Error saving wishlist:', e);
            }
        }
        
        function showWishlistModal() {
            if (wishlist.length === 0) {
                showNotification('Your wishlist is empty. Add some products!', 'info');
                return;
            }
            
            const modalHtml = `
                <div class="wishlist-modal">
                    <div class="wishlist-modal-content">
                        <div class="wishlist-modal-header">
                            <h3><i class="fas fa-heart"></i> My Wishlist (${wishlist.length})</h3>
                            <button class="close-modal">&times;</button>
                        </div>
                        <div class="wishlist-items">
                            ${wishlist.map((item, index) => `
                                <div class="wishlist-item" data-index="${index}">
                                    ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">` : ''}
                                    <div class="wishlist-item-info">
                                        <h4>${item.name}</h4>
                                        <p>${item.price}</p>
                                        <small>Added: ${new Date(item.added).toLocaleDateString()}</small>
                                    </div>
                                    <div class="wishlist-item-actions">
                                        <button class="btn-remove-wishlist" data-product-id="${item.id}">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        <a href="#" class="amazon-btn-small" target="_blank" rel="noopener noreferrer">
                                            View on Amazon
                                        </a>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="wishlist-modal-footer">
                            <button class="btn-clear-wishlist">Clear All</button>
                            <button class="btn-close-modal">Close</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            
            const modal = document.querySelector('.wishlist-modal');
            
            // Event listeners
            modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
            modal.querySelector('.btn-close-modal').addEventListener('click', () => modal.remove());
            
            modal.querySelectorAll('.btn-remove-wishlist').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productId = this.dataset.productId;
                    wishlist = wishlist.filter(item => item.id !== productId);
                    saveWishlist(wishlist);
                    updateWishlistBadge();
                    this.closest('.wishlist-item').remove();
                    
                    if (wishlist.length === 0) {
                        modal.remove();
                        showNotification('Wishlist cleared', 'info');
                    }
                });
            });
            
            modal.querySelector('.btn-clear-wishlist').addEventListener('click', function() {
                if (confirm('Are you sure you want to clear your entire wishlist?')) {
                    wishlist = [];
                    saveWishlist(wishlist);
                    updateWishlistBadge();
                    modal.remove();
                    showNotification('Wishlist cleared', 'info');
                }
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }
    }
    
    function updateWishlistBadge() {
        try {
            const wishlist = JSON.parse(localStorage.getItem(CONFIG.wishlistKey)) || [];
            const count = wishlist.length;
            
            // Update header badge
            const badge = document.querySelector('.wishlist-count');
            if (badge) {
                badge.textContent = count;
                badge.style.display = count > 0 ? 'flex' : 'none';
                
                // Animation for new items
                if (count > parseInt(badge.dataset.lastCount || 0)) {
                    badge.style.transform = 'scale(1.3)';
                    setTimeout(() => badge.style.transform = '', 300);
                }
                badge.dataset.lastCount = count;
            }
            
            // Update wishlist buttons
            document.querySelectorAll('.btn-wishlist-toggle').forEach(btn => {
                const productId = btn.dataset.productId || btn.dataset.product;
                const wishlist = JSON.parse(localStorage.getItem(CONFIG.wishlistKey)) || [];
                const isInWishlist = wishlist.some(item => item.id === productId);
                
                if (isInWishlist) {
                    btn.classList.add('active');
                    btn.innerHTML = '<i class="fas fa-heart"></i> <span>In Wishlist</span>';
                } else {
                    btn.classList.remove('active');
                    btn.innerHTML = '<i class="far fa-heart"></i> <span>Add to Wishlist</span>';
                }
            });
        } catch (e) {
            console.error('Error updating wishlist badge:', e);
        }
    }
    
    // ========== ENHANCED PRODUCT ACTIONS ==========
    function initProductActions() {
        // Share with Web Share API or fallback
        document.addEventListener('click', function(e) {
            const shareBtn = e.target.closest('.btn-share');
            
            if (shareBtn) {
                e.preventDefault();
                const productName = shareBtn.dataset.product;
                const productUrl = shareBtn.dataset.url || window.location.href;
                
                if (navigator.share) {
                    navigator.share({
                        title: `Check out ${productName} on MobileTechHub`,
                        text: `I found this great smartphone recommendation: ${productName}`,
                        url: productUrl
                    }).then(() => {
                        showNotification('Thanks for sharing!', 'success');
                    }).catch(() => {
                        copyToClipboard(productUrl, productName);
                    });
                } else {
                    showShareDialog(productName, productUrl);
                }
            }
        });
        
        // Amazon button enhanced tracking
        document.querySelectorAll('.amazon-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const productName = this.dataset.product || 'Unknown Product';
                const productId = this.dataset.productId || '';
                
                // Track click
                trackEvent('affiliate_click', {
                    product: productName,
                    product_id: productId,
                    source: 'amazon_button'
                });
                
                // Show loading state
                const originalHTML = this.innerHTML;
                const originalWidth = this.offsetWidth;
                this.style.width = `${originalWidth}px`;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                
                // Add slight delay for better UX
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                    this.style.width = '';
                }, 1500);
            });
        });
        
        // Price drop alerts
        document.querySelectorAll('.btn-price-alert').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productName = this.dataset.product;
                const currentPrice = this.dataset.price;
                
                const email = prompt(`Enter your email to get alerts when ${productName} price drops below ${currentPrice}:`);
                if (email && validateEmail(email)) {
                    showNotification(`Price alert set for ${productName}! We'll email you at ${email} when the price drops.`, 'success');
                    trackEvent('price_alert_set', { product: productName, email: email });
                }
            });
        });
    }
    
    function showShareDialog(productName, url) {
        const dialogHtml = `
            <div class="share-dialog">
                <div class="share-dialog-content">
                    <h4>Share "${productName}"</h4>
                    <div class="share-options">
                        <button class="share-option" data-action="copy">
                            <i class="fas fa-copy"></i> Copy Link
                        </button>
                        <button class="share-option" data-action="facebook">
                            <i class="fab fa-facebook"></i> Facebook
                        </button>
                        <button class="share-option" data-action="twitter">
                            <i class="fab fa-twitter"></i> Twitter
                        </button>
                        <button class="share-option" data-action="whatsapp">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </button>
                        <button class="share-option" data-action="email">
                            <i class="fas fa-envelope"></i> Email
                        </button>
                    </div>
                    <button class="btn-close-dialog">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', dialogHtml);
        const dialog = document.querySelector('.share-dialog');
        
        dialog.querySelector('.btn-close-dialog').addEventListener('click', () => dialog.remove());
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) dialog.remove();
        });
        
        dialog.querySelectorAll('.share-option').forEach(option => {
            option.addEventListener('click', function() {
                const action = this.dataset.action;
                
                switch(action) {
                    case 'copy':
                        copyToClipboard(url, productName);
                        break;
                    case 'facebook':
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                        break;
                    case 'twitter':
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${productName}`)}&url=${encodeURIComponent(url)}`, '_blank');
                        break;
                    case 'whatsapp':
                        window.open(`https://wa.me/?text=${encodeURIComponent(`${productName} - ${url}`)}`, '_blank');
                        break;
                    case 'email':
                        window.location.href = `mailto:?subject=${encodeURIComponent(`Check out ${productName}`)}&body=${encodeURIComponent(`${productName} - ${url}`)}`;
                        break;
                }
                
                dialog.remove();
            });
        });
    }
    
    function copyToClipboard(text, productName) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification(`Link for "${productName}" copied to clipboard!`, 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification(`Link for "${productName}" copied to clipboard!`, 'success');
        });
    }
    
    // ========== NOTIFICATION SYSTEM v2 ==========
    function showNotification(message, type = 'info', duration = 5000) {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => {
            n.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => n.remove(), 300);
        });
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-${icons[type] || 'info-circle'}"></i>
            </div>
            <div class="notification-content">
                <p>${message}</p>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            closeNotification(notification);
        });
        
        // Auto close
        const autoClose = setTimeout(() => {
            closeNotification(notification);
        }, duration);
        
        // Pause auto-close on hover
        notification.addEventListener('mouseenter', () => {
            clearTimeout(autoClose);
        });
        
        notification.addEventListener('mouseleave', () => {
            setTimeout(() => {
                closeNotification(notification);
            }, duration);
        });
        
        function closeNotification(notif) {
            notif.classList.remove('show');
            setTimeout(() => {
                if (notif.parentNode) {
                    notif.remove();
                }
            }, 300);
        }
    }
    
    // ========== SCROLL ANIMATIONS WITH INTERSECTION OBSERVER ==========
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.affiliate-product-card, .step, .faq-item, .stat-item, .review-card').forEach(el => {
            observer.observe(el);
        });
        
        // Add staggered animation for product cards
        document.querySelectorAll('.affiliate-product-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // ========== LAZY LOADING WITH BLUR PLACEHOLDER ==========
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        if (img.dataset.src) {
                            // Create blur placeholder
                            const placeholder = document.createElement('div');
                            placeholder.className = 'image-placeholder';
                            placeholder.style.cssText = `
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                                background-size: 200% 100%;
                                animation: loading 1.5s infinite;
                                border-radius: inherit;
                            `;
                            img.parentNode.style.position = 'relative';
                            img.parentNode.appendChild(placeholder);
                            
                            // Load image
                            img.src = img.dataset.src;
                            
                            img.onload = function() {
                                if (placeholder.parentNode) {
                                    placeholder.style.opacity = '0';
                                    setTimeout(() => {
                                        if (placeholder.parentNode) {
                                            placeholder.remove();
                                        }
                                    }, 300);
                                }
                                img.style.opacity = '1';
                                img.style.transition = 'opacity 0.3s ease';
                            };
                            
                            img.onerror = function() {
                                if (placeholder.parentNode) {
                                    placeholder.remove();
                                }
                                img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0f0f0"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999" font-size="12">No Image</text></svg>';
                            };
                            
                            img.removeAttribute('data-src');
                        }
                        
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px 0px',
                threshold: 0.01
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
    
    // ========== BACK TO TOP WITH PROGRESS INDICATOR ==========
    function initBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        
        // Progress circle
        const progressSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        progressSvg.setAttribute('class', 'back-to-top-progress');
        progressSvg.innerHTML = `
            <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(255, 255, 255, 0.3)" stroke-width="2"/>
            <circle cx="30" cy="30" r="28" fill="none" stroke="white" stroke-width="2" stroke-dasharray="176" stroke-dashoffset="176"/>
        `;
        backToTopBtn.appendChild(progressSvg);
        
        document.body.appendChild(backToTopBtn);
        
        let isScrolling = false;
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Click animation
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 300);
        });
        
        window.addEventListener('scroll', throttle(function() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100;
            
            // Update progress circle
            const circle = progressSvg.querySelector('circle:last-child');
            if (circle) {
                const circumference = 2 * Math.PI * 28;
                const offset = circumference - (scrollPercent / 100) * circumference;
                circle.style.strokeDashoffset = offset;
            }
            
            // Show/hide button
            if (scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, 100));
    }
    
    // ========== ENHANCED ANALYTICS ==========
    function initAnalytics() {
        // Track page view
        const pageViews = parseInt(localStorage.getItem(CONFIG.pageViewsKey) || '0');
        localStorage.setItem(CONFIG.pageViewsKey, pageViews + 1);
        
        // Track unique visitors
        const today = new Date().toISOString().split('T')[0];
        let visitors = JSON.parse(localStorage.getItem(CONFIG.visitorsKey) || '{}');
        
        if (!visitors[today]) {
            visitors[today] = {
                count: 0,
                sessions: []
            };
        }
        
        // Check if new session (30 minutes inactivity)
        const lastVisit = localStorage.getItem(CONFIG.lastVisitKey);
        const now = new Date().getTime();
        const isNewSession = !lastVisit || (now - parseInt(lastVisit)) > 30 * 60 * 1000;
        
        if (isNewSession) {
            visitors[today].count++;
            visitors[today].sessions.push({
                start: new Date().toISOString(),
                duration: 0
            });
        }
        
        localStorage.setItem(CONFIG.visitorsKey, JSON.stringify(visitors));
        localStorage.setItem(CONFIG.lastVisitKey, now.toString());
        
        // Time on page tracking
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Date.now() - startTime;
            trackEvent('time_on_page', { duration: Math.round(timeSpent / 1000) });
        });
        
        console.log('📊 Enhanced Analytics Active');
        console.log(`Total Page Views: ${pageViews + 1}`);
        console.log(`Today's Visitors: ${visitors[today].count}`);
    }
    
    function trackEvent(eventName, eventData = {}) {
        // In production, integrate with Google Analytics or similar
        console.log(`📈 Event: ${eventName}`, eventData);
        
        // Store events locally for debugging
        const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
        events.push({
            event: eventName,
            data: eventData,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 100 events
        if (events.length > 100) {
            events.shift();
        }
        
        localStorage.setItem('analytics_events', JSON.stringify(events));
    }
    
    // ========== TOOLTIPS WITH ARROW ==========
    function initTooltips() {
        document.body.addEventListener('mouseover', function(e) {
            const target = e.target;
            
            // Check if element or parent has tooltip
            const tooltipElement = target.closest('[data-tooltip]');
            if (!tooltipElement) return;
            
            const tooltipText = tooltipElement.dataset.tooltip;
            if (!tooltipText) return;
            
            // Remove existing tooltip
            document.querySelectorAll('.custom-tooltip').forEach(t => t.remove());
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = tooltipText;
            
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = tooltipElement.getBoundingClientRect();
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            tooltip.style.top = `${rect.top + scrollTop - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + scrollLeft + (rect.width - tooltip.offsetWidth) / 2}px`;
            
            // Add arrow
            tooltip.innerHTML += '<div class="tooltip-arrow"></div>';
            
            // Store reference
            tooltipElement._tooltip = tooltip;
        });
        
        document.body.addEventListener('mouseout', function(e) {
            const target = e.target;
            const tooltipElement = target.closest('[data-tooltip]');
            
            if (tooltipElement && tooltipElement._tooltip) {
                setTimeout(() => {
                    if (tooltipElement._tooltip) {
                        tooltipElement._tooltip.remove();
                        delete tooltipElement._tooltip;
                    }
                }, 100);
            }
        });
    }
    
    // ========== COOKIE CONSENT WITH OPTIONS ==========
    function initCookieConsent() {
        if (localStorage.getItem(CONFIG.cookiesAcceptedKey)) return;
        
        setTimeout(() => {
            const consentHtml = `
                <div class="cookie-consent-modal">
                    <div class="cookie-consent-content">
                        <div class="cookie-header">
                            <i class="fas fa-cookie-bite"></i>
                            <h3>Cookie Consent</h3>
                        </div>
                        <div class="cookie-body">
                            <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies.</p>
                            
                            <div class="cookie-options">
                                <div class="cookie-option">
                                    <label class="cookie-switch">
                                        <input type="checkbox" checked disabled>
                                        <span class="cookie-slider"></span>
                                    </label>
                                    <span>Essential Cookies <small>(Required)</small></span>
                                </div>
                                <div class="cookie-option">
                                    <label class="cookie-switch">
                                        <input type="checkbox" checked id="analytics-cookies">
                                        <span class="cookie-slider"></span>
                                    </label>
                                    <span>Analytics Cookies</span>
                                </div>
                                <div class="cookie-option">
                                    <label class="cookie-switch">
                                        <input type="checkbox" checked id="marketing-cookies">
                                        <span class="cookie-slider"></span>
                                    </label>
                                    <span>Marketing Cookies</span>
                                </div>
                            </div>
                            
                            <div class="cookie-links">
                                <a href="/privacy-policy" target="_blank">Privacy Policy</a>
                                <a href="/cookie-policy" target="_blank">Cookie Policy</a>
                            </div>
                        </div>
                        <div class="cookie-footer">
                            <button class="btn-cookie-necessary">Necessary Only</button>
                            <button class="btn-cookie-accept">Accept All</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', consentHtml);
            const modal = document.querySelector('.cookie-consent-modal');
            
            // Event listeners
            modal.querySelector('.btn-cookie-accept').addEventListener('click', () => {
                localStorage.setItem(CONFIG.cookiesAcceptedKey, 'all');
                modal.remove();
                showNotification('Cookie preferences saved', 'success');
            });
            
            modal.querySelector('.btn-cookie-necessary').addEventListener('click', () => {
                localStorage.setItem(CONFIG.cookiesAcceptedKey, 'necessary');
                modal.remove();
                showNotification('Only necessary cookies accepted', 'info');
            });
            
            // Close when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    // Don't allow closing by clicking outside
                    showNotification('Please choose a cookie preference', 'warning');
                }
            });
        }, 1500);
    }
    
    // ========== THEME TOGGLE WITH SYSTEM PREFERENCE ==========
    function initThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        
        document.body.appendChild(themeToggle);
        
        // Check system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Load saved theme or use system preference
        const savedTheme = localStorage.getItem(CONFIG.themeKey);
        const systemTheme = systemPrefersDark.matches ? 'dark' : 'light';
        const initialTheme = savedTheme || systemTheme;
        
        if (initialTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Listen for system preference changes
        systemPrefersDark.addListener((e) => {
            if (!localStorage.getItem(CONFIG.themeKey)) {
                if (e.matches) {
                    document.body.classList.add('dark-mode');
                    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                } else {
                    document.body.classList.remove('dark-mode');
                    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                }
            }
        });
        
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            
            if (isDark) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem(CONFIG.themeKey, 'dark');
                trackEvent('theme_changed', { theme: 'dark' });
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem(CONFIG.themeKey, 'light');
                trackEvent('theme_changed', { theme: 'light' });
            }
            
            // Animation
            themeToggle.style.transform = 'scale(1.2) rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 300);
        });
    }
    
    // ========== NEW FEATURES ==========
    
    function initPriceComparison() {
        // This would integrate with price comparison APIs
        console.log('💰 Price comparison initialized');
        
        // Example: Add price history button
        document.querySelectorAll('.affiliate-product-card').forEach(card => {
            const priceHistoryBtn = document.createElement('button');
            priceHistoryBtn.className = 'btn-price-history';
            priceHistoryBtn.innerHTML = '<i class="fas fa-chart-line"></i> Price History';
            priceHistoryBtn.style.cssText = `
                margin-top: 10px;
                padding: 8px 12px;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                width: 100%;
            `;
            
            const priceContainer = card.querySelector('.product-price');
            if (priceContainer) {
                priceContainer.parentNode.appendChild(priceHistoryBtn);
                
                priceHistoryBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    showNotification('Price history feature coming soon!', 'info');
                });
            }
        });
    }
    
    function initReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #FF9900, #FF6B00);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
            
            progressBar.style.width = `${scrollPercent}%`;
        });
    }
    
    function initProductComparison() {
        let comparisonList = JSON.parse(localStorage.getItem('comparison_list') || '[]');
        
        document.querySelectorAll('.btn-compare').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.dataset.productId;
                const productName = this.dataset.product;
                
                if (comparisonList.includes(productId)) {
                    comparisonList = comparisonList.filter(id => id !== productId);
                    showNotification(`Removed ${productName} from comparison`, 'info');
                    this.classList.remove('active');
                } else {
                    if (comparisonList.length >= 4) {
                        showNotification('Maximum 4 products can be compared', 'warning');
                        return;
                    }
                    comparisonList.push(productId);
                    showNotification(`Added ${productName} to comparison`, 'success');
                    this.classList.add('active');
                }
                
                localStorage.setItem('comparison_list', JSON.stringify(comparisonList));
                updateComparisonBadge();
            });
        });
        
        function updateComparisonBadge() {
            const badge = document.querySelector('.comparison-count') || createComparisonBadge();
            const count = comparisonList.length;
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
        
        function createComparisonBadge() {
            const badge = document.createElement('div');
            badge.className = 'comparison-count';
            badge.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background: #3b82f6;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                z-index: 1000;
                cursor: pointer;
            `;
            badge.addEventListener('click', showComparisonModal);
            document.body.appendChild(badge);
            return badge;
        }
        
        function showComparisonModal() {
            // Implementation for comparison modal
            showNotification('Comparison feature coming soon!', 'info');
        }
    }
    
    function initQuickView() {
        document.querySelectorAll('.btn-quick-view').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.dataset.productId;
                // Load product data and show quick view modal
                showNotification('Quick view feature coming soon!', 'info');
            });
        });
    }
    
    // ========== UTILITY FUNCTIONS ==========
    
    function addCustomStyles() {
        const styles = `
            /* Animations */
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
            
            @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            /* Notification Styles */
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 0;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                z-index: 9999;
                max-width: 400px;
                transform: translateX(120%);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                border-left: 4px solid #3b82f6;
                overflow: hidden;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success { border-left-color: #10b981; }
            .notification-error { border-left-color: #ef4444; }
            .notification-warning { border-left-color: #f59e0b; }
            .notification-info { border-left-color: #3b82f6; }
            
            .notification-icon {
                padding: 20px;
                background: rgba(59, 130, 246, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: #3b82f6;
            }
            
            .notification-success .notification-icon { 
                background: rgba(16, 185, 129, 0.1); 
                color: #10b981;
            }
            
            .notification-content {
                padding: 20px;
                flex: 1;
            }
            
            .notification-close {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                cursor: pointer;
                opacity: 0.5;
                transition: opacity 0.2s;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            /* Back to Top */
            .back-to-top {
                position: fixed;
                bottom: 40px;
                right: 40px;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #FF9900, #FF6B00);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                box-shadow: 0 4px 20px rgba(255, 153, 0, 0.3);
                z-index: 999;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .back-to-top.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .back-to-top:hover {
                transform: translateY(-5px) scale(1.1);
                box-shadow: 0 8px 30px rgba(255, 153, 0, 0.4);
            }
            
            .back-to-top.clicked {
                transform: scale(0.9);
            }
            
            .back-to-top-progress {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                transform: rotate(-90deg);
            }
            
            /* Theme Toggle */
            .theme-toggle {
                position: fixed;
                bottom: 110px;
                right: 40px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #FF9900, #FF6B00);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                z-index: 998;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(255, 153, 0, 0.3);
            }
            
            .theme-toggle:hover {
                transform: rotate(15deg) scale(1.1);
                box-shadow: 0 6px 20px rgba(255, 153, 0, 0.4);
            }
            
            /* Tooltips */
            .custom-tooltip {
                position: absolute;
                background: #1e293b;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                z-index: 10000;
                pointer-events: none;
                animation: fadeIn 0.2s ease;
                font-family: 'Poppins', sans-serif;
                max-width: 200px;
                text-align: center;
            }
            
            .tooltip-arrow {
                position: absolute;
                bottom: -5px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid #1e293b;
            }
            
            /* Dark Mode */
            body.dark-mode {
                background-color: #0f172a;
                color: #cbd5e1;
            }
            
            body.dark-mode .affiliate-product-card {
                background: #1e293b;
                border-color: #334155;
            }
            
            body.dark-mode .product-title {
                color: #f1f5f9;
            }
            
            body.dark-mode .product-features p {
                color: #94a3b8;
            }
            
            /* Cookie Modal */
            .cookie-consent-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            
            .cookie-consent-content {
                background: white;
                border-radius: 16px;
                padding: 30px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            
            body.dark-mode .cookie-consent-content {
                background: #1e293b;
                color: #cbd5e1;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    function initPerformanceOptimizations() {
        // Debounce scroll events
        window.addEventListener('scroll', throttle(() => {
            // Performance monitoring
            if (window.performance) {
                const now = performance.now();
                console.debug(`Scroll performance: ${now.toFixed(2)}ms`);
            }
        }, 100));
        
        // Preload critical resources
        const criticalImages = document.querySelectorAll('img[data-src][data-critical="true"]');
        criticalImages.forEach(img => {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = img.dataset.src;
            document.head.appendChild(preloadLink);
        });
    }
    
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Alt + S: Search focus
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                const searchInput = document.querySelector('.product-search');
                if (searchInput) searchInput.focus();
            }
            
            // Alt + W: Open wishlist
            if (e.altKey && e.key === 'w') {
                e.preventDefault();
                document.querySelector('.btn-wishlist')?.click();
            }
            
            // Alt + T: Toggle theme
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                document.querySelector('.theme-toggle')?.click();
            }
        });
    }
    
    function showWelcomeMessage() {
        const lastVisit = localStorage.getItem(CONFIG.lastVisitKey);
        if (!lastVisit) {
            // First visit
            setTimeout(() => {
                showNotification('Welcome to MobileTechHub! 🎉 Explore our smartphone recommendations.', 'success', 8000);
            }, 2000);
        } else {
            const daysSince = Math.floor((Date.now() - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
            if (daysSince > 7) {
                showNotification(`Welcome back! It's been ${daysSince} days since your last visit. Check out new recommendations!`, 'info', 6000);
            }
        }
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ========== PERFORMANCE UTILITIES ==========
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
    
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // ========== PERFORMANCE MONITORING ==========
    if (window.performance) {
        // Measure page load performance
        window.addEventListener('load', function() {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
            
            console.log(`📈 Performance Metrics:`);
            console.log(`   Page Load Time: ${loadTime}ms`);
            console.log(`   DOM Ready: ${domReady}ms`);
            
            // Log web vitals
            if (performance.getEntriesByType) {
                const paintMetrics = performance.getEntriesByType('paint');
                paintMetrics.forEach(metric => {
                    console.log(`   ${metric.name}: ${Math.round(metric.startTime)}ms`);
                });
                
                // Largest Contentful Paint
                const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
                if (lcpEntries.length > 0) {
                    console.log(`   LCP: ${Math.round(lcpEntries[lcpEntries.length - 1].startTime)}ms`);
                }
            }
            
            // Send performance data (in production, send to analytics)
            trackEvent('performance_metrics', {
                load_time: loadTime,
                dom_ready: domReady
            });
        });
    }
});

// ========== GLOBAL EXPORTS ==========
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        trackEvent: function(eventName, data) {
            console.log(`📈 Event: ${eventName}`, data);
        },
        showNotification: showNotification,
        debounce: debounce,
        throttle: throttle
    };
}