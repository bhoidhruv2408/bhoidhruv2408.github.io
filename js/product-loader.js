// js/product-loader.js
const products = [
    // PREMIUM PHONES (₹50,000+)
    {
        id: 1,
        name: "Apple iPhone 15 Pro",
        category: "premium",
        badge: "Flagship",
        image: "https://m.media-amazon.com/images/I/81Os1SDWpcL._SL1500_.jpg",
        storage: "128GB | 256GB | 512GB | 1TB",
        specs: {
            display: "6.1-inch Super Retina XDR OLED (2556x1179)",
            processor: "Apple A17 Pro (3nm)",
            ram: "8GB RAM",
            camera: "48MP main + 12MP telephoto + 12MP ultra-wide",
            frontCamera: "12MP with TrueDepth",
            battery: "3274mAh, 27W fast charging",
            os: "iOS 17",
            special: "Titanium frame, Action button, USB-C"
        },
        rating: 4.6,
        reviews: "12,500+",
        amazonLink: "https://amzn.to/4aR5qsk"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        category: "premium",
        badge: "Best Android",
        image: "https://m.media-amazon.com/images/I/81qzhAnqQSL._SL1500_.jpg",
        storage: "256GB | 512GB | 1TB",
        specs: {
            display: "6.8-inch Dynamic AMOLED 2X (3088x1440)",
            processor: "Snapdragon 8 Gen 3 for Galaxy",
            ram: "12GB RAM",
            camera: "200MP main + 50MP periscope + 12MP ultra-wide + 10MP telephoto",
            frontCamera: "12MP",
            battery: "5000mAh, 45W fast charging",
            os: "Android 14 with One UI 6.1",
            special: "Built-in S Pen, 7 years updates, Titanium frame"
        },
        rating: 4.8,
        reviews: "8,000+",
        amazonLink: "https://amzn.to/4aR5qsk"
    },
    // Add 98 more products following the same structure...
];

// Generate product cards
function generateProductCards(productList) {
    return productList.map(product => `
        <div class="affiliate-product-card" data-category="${product.category}">
            <div class="product-badge">${product.badge}</div>
            <div class="product-image">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     data-src="${product.image}"
                     loading="lazy">
            </div>
            
            <div class="product-content">
                <div class="product-platform">
                    <i class="fab fa-amazon"></i> Amazon Product
                </div>
                
                <h3 class="product-title">${product.name}</h3>
                
                <div class="product-specs-grid">
                    <div class="spec-item">
                        <i class="fas fa-mobile-alt"></i>
                        <span>${product.specs.display}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-microchip"></i>
                        <span>${product.specs.processor}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-camera"></i>
                        <span>${product.specs.camera}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-battery-full"></i>
                        <span>${product.specs.battery}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-hdd"></i>
                        <span>Storage: ${product.storage}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fab fa-android"></i>
                        <span>${product.specs.os}</span>
                    </div>
                </div>
                
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>${product.rating}/5 (${product.reviews})</span>
                </div>
                
                <div class="affiliate-action">
                    <a href="${product.amazonLink}" 
                       target="_blank" 
                       rel="nofollow sponsored" 
                       class="amazon-btn"
                       data-product="${product.name}"
                       onclick="trackAffiliateClick('${product.name}')">
                        <i class="fab fa-amazon"></i> View on Amazon
                    </a>
                    <div class="product-actions">
                        <button class="btn-wishlist-toggle" data-product="${product.name}">
                            <i class="far fa-heart"></i> Wishlist
                        </button>
                        <button class="btn-share" data-product="${product.name}">
                            <i class="fas fa-share-alt"></i> Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
    if (hasHalfStar) stars += '<i class="fas fa-star-half-alt"></i>';
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) stars += '<i class="far fa-star"></i>';
    
    return stars;
}

// Load products on page load
document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.querySelector('.affiliate-products-grid');
    if (productsGrid) {
        // Load first 20 products
        const initialProducts = products.slice(0, 20);
        productsGrid.innerHTML = generateProductCards(initialProducts);
        
        // Load more button functionality
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            let loadedCount = 20;
            
            loadMoreBtn.addEventListener('click', function() {
                const nextProducts = products.slice(loadedCount, loadedCount + 20);
                if (nextProducts.length > 0) {
                    productsGrid.innerHTML += generateProductCards(nextProducts);
                    loadedCount += nextProducts.length;
                    
                    if (loadedCount >= products.length) {
                        loadMoreBtn.style.display = 'none';
                        document.querySelector('.load-more-note').textContent = 
                            `All ${products.length} smartphones loaded`;
                    } else {
                        document.querySelector('.load-more-note').textContent = 
                            `Showing ${loadedCount} of ${products.length} smartphones`;
                    }
                }
            });
        }
    }
});