// main.js - All JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // ========== DROPDOWN MENU FOR DESKTOP ==========
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-content').style.display = 'block';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-content').style.display = 'none';
        });
    });
    
    // ========== SEARCH FUNCTIONALITY ==========
    const searchBtn = document.querySelector('.search-box button');
    const searchInput = document.querySelector('.search-box input');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                alert(`Searching for: "${query}"\n\nIn a real website, this would search products.`);
                // In real implementation:
                // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            } else {
                alert('Please enter a search term');
                searchInput.focus();
            }
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // ========== NEWSLETTER FORM ==========
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email && email.includes('@')) {
                alert(`Thank you for subscribing with email: ${email}`);
                this.reset();
                
                // In real implementation, send to backend:
                // fetch('/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
            } else {
                alert('Please enter a valid email address');
            }
        });
    }
    
    // ========== SMOOTH SCROLL ==========
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            }
        });
    });
    
    // ========== PRODUCT CARD INTERACTIONS ==========
    const productButtons = document.querySelectorAll('.product-buttons a');
    
    productButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track affiliate clicks (in real site, use analytics)
            const productName = this.closest('.product-card').querySelector('h3 a').textContent;
            const platform = this.classList.contains('btn-amazon') ? 'Amazon' : 'Flipkart';
            
            console.log(`Affiliate click: ${productName} on ${platform}`);
            
            // In real implementation:
            // gtag('event', 'click', { 'event_category': 'affiliate', 'event_label': `${platform}_${productName}` });
            
            // Show loading/redirect message
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
            setTimeout(() => {
                this.innerHTML = this.classList.contains('btn-amazon') 
                    ? '<i class="fab fa-amazon"></i> Buy on Amazon' 
                    : '<i class="fas fa-shopping-cart"></i> Buy on Flipkart';
            }, 2000);
        });
    });
    
    // ========== SET ACTIVE NAV LINK BASED ON PAGE ==========
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage.includes('categories') && linkHref.includes('categories')) ||
                (currentPage.includes('reviews') && linkHref.includes('reviews'))) {
                
                // Remove active from all
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active to current
                link.classList.add('active');
            }
        });
    }
    
    setActiveNavLink();
    
    // ========== PRICE ALERT SIMULATION ==========
    function simulatePriceChanges() {
        const prices = document.querySelectorAll('.price');
        
        if (prices.length > 0) {
            // Every 30 seconds, simulate a small price change
            setInterval(() => {
                prices.forEach(price => {
                    const current = parseInt(price.textContent.replace(/[^0-9]/g, ''));
                    const change = Math.random() > 0.5 ? -100 : 100;
                    const newPrice = current + change;
                    
                    // Only update if positive
                    if (newPrice > 0) {
                        price.textContent = `₹${newPrice.toLocaleString('en-IN')}`;
                        
                        // Add animation
                        price.style.color = change > 0 ? 'var(--danger)' : 'var(--success)';
                        setTimeout(() => {
                            price.style.color = 'var(--primary)';
                        }, 1000);
                    }
                });
            }, 30000); // 30 seconds
        }
    }
    
    simulatePriceChanges();
    
    // ========== LAZY LOAD IMAGES ==========
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // ========== ADD TO CART / WISHLIST FUNCTIONALITY ==========
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') || 
            e.target.closest('.add-to-cart')) {
            e.preventDefault();
            alert('Product added to cart!');
        }
        
        if (e.target.classList.contains('add-to-wishlist') || 
            e.target.closest('.add-to-wishlist')) {
            e.preventDefault();
            alert('Added to wishlist!');
        }
    });
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: var(--shadow);
        z-index: 999;
        transition: var(--transition);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // ========== VISIT COUNTER (LocalStorage) ==========
    function updateVisitCounter() {
        let visits = localStorage.getItem('siteVisits') || 0;
        visits = parseInt(visits) + 1;
        localStorage.setItem('siteVisits', visits);
        
        // You could display this somewhere:
        // console.log(`Site visits: ${visits}`);
    }
    
    updateVisitCounter();
});

// ========== EXTERNAL FUNCTION FOR AFFILIATE LINKS ==========
function generateAffiliateLink(productId, platform) {
    // In real implementation, use your affiliate IDs
    const amazonTag = 'techdealshub-21';
    const flipkartTag = 'techdealsh';
    
    if (platform === 'amazon') {
        return `https://amzn.to/${amazonTag}?id=${productId}`;
    } else {
        return `https://dl.flipkart.com/s/${flipkartTag}?pid=${productId}`;
    }
}

// ========== PRICE COMPARISON FUNCTION ==========
function comparePrices(amazonPrice, flipkartPrice) {
    const difference = amazonPrice - flipkartPrice;
    const cheaperPlatform = difference > 0 ? 'Flipkart' : 'Amazon';
    const amount = Math.abs(difference);
    
    return {
        cheaperPlatform,
        amount,
        percentage: ((amount / Math.min(amazonPrice, flipkartPrice)) * 100).toFixed(1)
    };
}