// 360view.js - 360° Product View Functionality

class Product360Viewer {
    constructor(containerId, imageUrls) {
        this.container = document.getElementById(containerId);
        this.imageUrls = imageUrls;
        this.currentIndex = 0;
        this.isAnimating = false;
        this.isDragging = false;
        this.startX = 0;
        this.dragThreshold = 30;
        
        this.init();
    }
    
    init() {
        if (!this.container || !this.imageUrls.length) return;
        
        // Create image elements
        this.createImages();
        
        // Add event listeners
        this.addEventListeners();
        
        // Show first image
        this.showImage(this.currentIndex);
    }
    
    createImages() {
        // Clear container
        this.container.innerHTML = '';
        
        // Create image elements
        this.imageUrls.forEach((url, index) => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = `Product view ${index + 1}`;
            img.style.display = 'none';
            this.container.appendChild(img);
        });
        
        this.images = this.container.querySelectorAll('img');
    }
    
    addEventListeners() {
        // Previous/Next buttons
        const prevBtn = this.container.parentElement.querySelector('.btn-360-prev');
        const nextBtn = this.container.parentElement.querySelector('.btn-360-next');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.previous());
        if (nextBtn) nextBtn.addEventListener('click', () => this.next());
        
        // Mouse drag events
        this.container.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.container.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.container.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.container.addEventListener('mouseleave', this.handleMouseUp.bind(this));
        
        // Touch events for mobile
        this.container.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.container.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.container.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
    
    showImage(index) {
        if (this.isAnimating || index < 0 || index >= this.images.length) return;
        
        this.isAnimating = true;
        
        // Hide current image
        this.images[this.currentIndex].style.display = 'none';
        this.images[this.currentIndex].classList.remove('active');
        
        // Update current index
        this.currentIndex = index;
        
        // Show new image
        this.images[this.currentIndex].style.display = 'block';
        setTimeout(() => {
            this.images[this.currentIndex].classList.add('active');
            this.isAnimating = false;
        }, 50);
        
        // Update indicator
        this.updateIndicator();
    }
    
    next() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(nextIndex);
    }
    
    previous() {
        const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(prevIndex);
    }
    
    updateIndicator() {
        const indicator = this.container.parentElement.querySelector('.360-indicator .current');
        if (indicator) {
            indicator.textContent = `${this.currentIndex + 1}/${this.images.length}`;
        }
    }
    
    // Mouse event handlers
    handleMouseDown(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        this.container.style.cursor = 'grabbing';
    }
    
    handleMouseMove(e) {
        if (!this.isDragging) return;
        
        const diffX = e.clientX - this.startX;
        
        if (Math.abs(diffX) > this.dragThreshold) {
            if (diffX > 0) {
                this.previous();
            } else {
                this.next();
            }
            this.startX = e.clientX;
        }
    }
    
    handleMouseUp() {
        this.isDragging = false;
        this.container.style.cursor = 'grab';
    }
    
    // Touch event handlers
    handleTouchStart(e) {
        this.isDragging = true;
        this.startX = e.touches[0].clientX;
        e.preventDefault();
    }
    
    handleTouchMove(e) {
        if (!this.isDragging) return;
        
        const diffX = e.touches[0].clientX - this.startX;
        
        if (Math.abs(diffX) > this.dragThreshold) {
            if (diffX > 0) {
                this.previous();
            } else {
                this.next();
            }
            this.startX = e.touches[0].clientX;
        }
        
        e.preventDefault();
    }
    
    handleTouchEnd() {
        this.isDragging = false;
    }
    
    // Keyboard navigation
    handleKeyDown(e) {
        if (document.activeElement !== document.body) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                this.previous();
                break;
            case 'ArrowRight':
                this.next();
                break;
        }
    }
    
    // Auto-rotate
    startAutoRotate(interval = 3000) {
        if (this.autoRotateInterval) clearInterval(this.autoRotateInterval);
        
        this.autoRotateInterval = setInterval(() => {
            this.next();
        }, interval);
    }
    
    stopAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.autoRotateInterval = null;
        }
    }
}

// Initialize 360° viewers when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Sample image URLs (replace with your actual product images)
    const iphoneImages = [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1691498369484-8c6f6c6c6c6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1691498369485-8c6f6c6c6c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1691498369486-8c6f6c6c6c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ];
    
    const samsungImages = [
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1610945265065-0e34e5519bbg?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1610945265066-0e34e5519bbh?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ];
    
    const dellImages = [
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1588872657579-7efd1f1555ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1588872657580-7efd1f1555ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ];
    
    // Initialize 360° viewers for each product
    if (document.getElementById('iphone15-360')) {
        const iphoneViewer = new Product360Viewer('iphone15-360', iphoneImages);
        
        // Auto-rotate on hover
        const iphoneContainer = document.querySelector('[data-product="iphone15"]');
        iphoneContainer.addEventListener('mouseenter', () => {
            iphoneViewer.startAutoRotate(2000);
        });
        iphoneContainer.addEventListener('mouseleave', () => {
            iphoneViewer.stopAutoRotate();
        });
    }
    
    if (document.getElementById('s24-360')) {
        const samsungViewer = new Product360Viewer('s24-360', samsungImages);
    }
    
    if (document.getElementById('dell-360')) {
        const dellViewer = new Product360Viewer('dell-360', dellImages);
    }
    
    // Add view toggle functionality
    document.querySelectorAll('.view-toggle').forEach(toggle => {
        const btns = toggle.querySelectorAll('button');
        const container = toggle.closest('.product-360-container');
        
        btns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                btns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const viewType = this.dataset.view;
                const viewElement = container.querySelector('.product-360-view');
                
                if (viewType === '360') {
                    // Show 360° view
                    viewElement.style.display = 'flex';
                    // Reinitialize 360° viewer if needed
                } else {
                    // Show static image
                    viewElement.style.display = 'none';
                    // You could show a static image gallery here
                }
            });
        });
    });
});

// Image lazy loading enhancement
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
        });
    }
}

// Image zoom functionality
function initImageZoom() {
    const productImages = document.querySelectorAll('.product-360-view img');
    
    productImages.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${this.src}" alt="${this.alt}">
                    <button class="modal-close">&times;</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal on click
            modal.addEventListener('click', function(e) {
                if (e.target === this || e.target.classList.contains('modal-close')) {
                    document.body.removeChild(modal);
                }
            });
            
            // Close on ESC key
            document.addEventListener('keydown', function closeOnEsc(e) {
                if (e.key === 'Escape') {
                    document.body.removeChild(modal);
                    document.removeEventListener('keydown', closeOnEsc);
                }
            });
        });
    });
}

// Initialize when page loads
window.addEventListener('load', function() {
    initLazyLoading();
    initImageZoom();
    
    // Add modal styles if not already present
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                max-width: 90%;
                max-height: 90%;
                position: relative;
            }
            
            .modal-content img {
                width: 100%;
                height: auto;
                border-radius: 8px;
            }
            
            .modal-close {
                position: absolute;
                top: -40px;
                right: -40px;
                background: none;
                border: none;
                color: white;
                font-size: 40px;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @media (max-width: 768px) {
                .modal-close {
                    top: -30px;
                    right: 0;
                    font-size: 30px;
                }
            }
        `;
        document.head.appendChild(style);
    }
});