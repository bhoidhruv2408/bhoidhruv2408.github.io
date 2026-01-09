// Premium Effects JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Scroll Animations
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => observer.observe(el));
    
    // 2. Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // 3. Back to Top Button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // 4. Toast Notification System
    window.showToast = function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };
    
    // 5. Ripple Effect on Buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('#loadMoreBtn')) {
            const btn = e.target.closest('#loadMoreBtn');
            btn.classList.add('ripple');
            setTimeout(() => btn.classList.remove('ripple'), 600);
        }
    });
    
    // 6. Star Rating Animation
    const stars = document.querySelectorAll('.product-rating i');
    stars.forEach((star, index) => {
        star.style.animationDelay = `${index * 0.1}s`;
    });
    
    // 7. Floating Animation
    const floatElements = document.querySelectorAll('.hero-image, .step-icon');
    floatElements.forEach(el => {
        el.style.animationDelay = `${Math.random() * 2}s`;
    });
    
    // 8. Loading Animation
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loadingOverlay);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => loadingOverlay.remove(), 500);
        }, 1000);
    });
    
    // 9. Mouse Move Parallax
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        const parallaxElements = document.querySelectorAll('.parallax-layer');
        parallaxElements.forEach(el => {
            el.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
    
    // 10. Dynamic Gradient Background
    const heroSection = document.querySelector('.hero');
    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 1) % 360;
        heroSection.style.background = `
            linear-gradient(
                135deg,
                hsl(${hue}, 100%, 96%),
                hsl(${(hue + 60) % 360}, 100%, 92%)
            )
        `;
    }, 50);
});