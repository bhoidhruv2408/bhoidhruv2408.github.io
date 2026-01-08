// live-products.js - Live Products Functionality

// Configuration
const CONFIG = {
    API_BASE_URL: '/api', // Your API endpoint
    REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
    PRODUCTS_PER_PAGE: 12,
    AMAZON_TAG: 'your-amazon-tag', // Replace with your Amazon affiliate tag
    FLIPKART_TAG: 'your-flipkart-tag', // Replace with your Flipkart affiliate tag
    ENABLE_REAL_API: false, // Set to true when you have real API
};

// State
let currentProducts = [];
let currentPage = 1;
let currentFilter = 'all';
let currentSort = 'featured';

// Initialize live products
async function initializeLiveProducts() {
    console.log('Initializing live products...');
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial products
    await loadProducts();
    
    // Start auto-refresh
    startAutoRefresh();
    
    // Initialize price ticker
    initializePriceTicker();
}

// Load products from API or fallback
async function loadProducts() {
    try {
        showLoading();
        
        let products;
        
        if (CONFIG.ENABLE_REAL_API) {
            // Fetch from real API
            products = await fetchFromAPI();
        } else {
            // Use mock data
            products = await fetchMockData();
        }
        
        currentProducts = products;
        renderProducts(products);
        updateLastUpdateTime();
        
    } catch (error) {
        console.error('Error loading products:', error);
        showError('Failed to load products. Please try again.');
    } finally {
        hideLoading();
    }
}

// Fetch from real API
async function fetchFromAPI() {
    const response = await fetch(`${CONFIG.API_BASE_URL}/products/live`);
    
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Add affiliate links
    return data.products.map(product => ({
        ...product,
        affiliate_link: generateAffiliateLink(product)
    }));
}

// Generate affiliate link based on platform
function generateAffiliateLink(product) {
    if (product.platform === 'amazon') {
        return `https://amzn.to/${CONFIG.AMAZON_TAG}?id=${product.asin}`;
    } else if (product.platform === 'flipkart') {
        return `https://dl.flipkart.com/s/${CONFIG.FLIPKART_TAG}?pid=${product.pid}`;
    }
    return product.url;
}

// Mock data for development
async function fetchMockData() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
        {
            id: 1,
            title: "Apple iPhone 15 (128 GB) - Black",
            image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            price: 79900,
            original_price: 89900,
            discount: 11,
            platform: "amazon",
            asin: "B0CHX6T6WK",
            rating: 4.5,
            reviews: 1245,
            features: ["48MP Camera", "A16 Bionic", "iOS 17"],
            category: "mobiles",
            last_updated: new Date().toISOString(),
            stock: "In Stock",
            delivery: "Free delivery"
        },
        {
            id: 2,
            title: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 12GB, 256GB)",
            image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            price: 129999,
            original_price: 139999,
            discount: 7,
            platform: "flipkart",
            pid: "MOBGHCG2HZHUFDNJ",
            rating: 4.8,
            reviews: 892,
            features: ["200MP Camera", "Snapdragon 8 Gen 3", "S Pen"],
            category: "mobiles",
            last_updated: new Date().toISOString(),
            stock: "In Stock",
            delivery: "Free delivery"
        },
        // Add more products as needed
    ].map(product => ({
        ...product,
        affiliate_link: generateAffiliateLink(product)
    }));
}

// Render products to the page
function renderProducts(products) {
    const container = document.getElementById('productsContainer');
    
    if (!products || products.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try changing your filters or check back later</p>
            </div>
        `;
        return;
    }
    
    const productsHTML = products.map(product => createProductHTML(product)).join('');
    container.innerHTML = productsHTML;
}

// Create product HTML
function createProductHTML(product) {
    const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);
    
    return `
        <div class="live-product-card" 
             data-platform="${product.platform}" 
             data-category="${product.category}" 
             data-discount="${discount}"
             data-price="${product.price}">
            
            ${discount >= 20 ? `
                <div class="hot-deal-badge">
                    <i class="fas fa-fire"></i> HOT DEAL
                </div>
            ` : ''}
            
            <div class="product-platform ${product.platform}">
                <i class="${product.platform === 'amazon' ? 'fab fa-amazon' : 'fas fa-shopping-cart'}"></i>
                ${product.platform === 'amazon' ? 'Amazon' : 'Flipkart'}
                <span class="update-time">${formatTimeAgo(product.last_updated)}</span>
            </div>
            
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            
            <div class="product-details">
                <h3 class="product-title">${product.title}</h3>
                
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span class="rating-text">${product.rating}/5 (${product.reviews.toLocaleString()})</span>
                </div>
                
                <div class="price-section">
                    <div class="current-price">₹${product.price.toLocaleString('en-IN')}</div>
                    <div class="original-price">₹${product.original_price.toLocaleString('en-IN')}</div>
                    <div class="discount-badge">${discount}% OFF</div>
                </div>
                
                <div class="stock-info">
                    <span class="stock-status ${product.stock === 'In Stock' ? 'in-stock' : 'out-stock'}">
                        <i class="fas fa-${product.stock === 'In Stock' ? 'check-circle' : 'times-circle'}"></i>
                        ${product.stock}
                    </span>
                    <span class="delivery-info">
                        <i class="fas fa-shipping-fast"></i>
                        ${product.delivery}
                    </span>
                </div>
                
                <div class="product-features">
                    ${product.features.slice(0, 3).map(feature => `
                        <span><i class="fas fa-check"></i> ${feature}</span>
                    `).join('')}
                </div>
                
                <div class="product-actions">
                    <a href="${product.affiliate_link}" 
                       target="_blank" 
                       class="btn ${product.platform === 'amazon' ? 'btn-amazon' : 'btn-flipkart'}"
                       onclick="trackProductClick(${product.id})">
                        <i class="${product.platform === 'amazon' ? 'fab fa-amazon' : 'fas fa-shopping-cart'}"></i>
                        Buy on ${product.platform === 'amazon' ? 'Amazon' : 'Flipkart'}
                    </a>
                    <button class="btn btn-outline compare-btn" onclick="addToCompare(${product.id})">
                        <i class="fas fa-balance-scale"></i> Compare
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Generate star ratings HTML
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Format time ago
function formatTimeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
}

// Update last update time
function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('lastUpdateTime').textContent = timeString;
    
    // Reset countdown timer
    resetUpdateTimer();
}

// Reset update timer
function resetUpdateTimer() {
    let minutes = 5;
    let seconds = 0;
    
    const timerElement = document.getElementById('nextUpdateTimer');
    
    const timer = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer);
                refreshProducts();
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Refresh products
async function refreshProducts() {
    console.log('Refreshing products...');
    await loadProducts();
}

// Start auto-refresh
function startAutoRefresh() {
    setInterval(refreshProducts, CONFIG.REFRESH_INTERVAL);
}

// Initialize price ticker
function initializePriceTicker() {
    const tickerItems = document.querySelectorAll('.ticker-items span');
    
    setInterval(() => {
        tickerItems.forEach(item => {
            // Simulate price changes
            if (Math.random() > 0.5) {
                item.classList.add('price-up');
                item.classList.remove('price-down');
            } else {
                item.classList.add('price-down');
                item.classList.remove('price-up');
            }
        });
    }, 5000);
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            applyFilter(filter);
        });
    });
    
    // Sort select
    document.getElementById('sortProducts').addEventListener('change', (e) => {
        applySort(e.target.value);
    });
    
    // Refresh button
    document.querySelector('.btn-refresh').addEventListener('click', refreshProducts);
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
}

// Apply filter
function applyFilter(filter) {
    currentFilter = filter;
    filterAndSortProducts();
}

// Apply sort
function applySort(sort) {
    currentSort = sort;
    filterAndSortProducts();
}

// Filter and sort products
function filterAndSortProducts() {
    let filtered = [...currentProducts];
    
    // Apply filter
    if (currentFilter !== 'all') {
        if (currentFilter === 'amazon' || currentFilter === 'flipkart') {
            filtered = filtered.filter(p => p.platform === currentFilter);
        } else if (currentFilter === 'discount') {
            filtered = filtered.filter(p => 
                Math.round(((p.original_price - p.price) / p.original_price) * 100) >= 20
            );
        }
    }
    
    // Apply sort
    switch (currentSort) {
        case 'price_low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price_high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'discount':
            filtered.sort((a, b) => {
                const discountA = Math.round(((a.original_price - a.price) / a.original_price) * 100);
                const discountB = Math.round(((b.original_price - b.price) / b.original_price) * 100);
                return discountB - discountA;
            });
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Default/featured sorting
            break;
    }
    
    renderProducts(filtered);
}

// Search products
async function searchProducts() {
    const query = document.getElementById('searchInput').value.trim();
    
    if (!query) {
        alert('Please enter a search term');
        return;
    }
    
    try {
        showLoading();
        
        let results;
        if (CONFIG.ENABLE_REAL_API) {
            results = await searchAPI(query);
        } else {
            results = await searchMockData(query);
        }
        
        currentProducts = results;
        renderProducts(results);
        
    } catch (error) {
        console.error('Search error:', error);
        showError('Search failed. Please try again.');
    } finally {
        hideLoading();
    }
}

// Search API
async function searchAPI(query) {
    const response = await fetch(`${CONFIG.API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}

// Mock search
async function searchMockData(query) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filter mock data by query
    return currentProducts.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
}

// Track product click
function trackProductClick(productId) {
    // Send to analytics
    console.log('Product clicked:', productId);
    
    // In real implementation
    // gtag('event', 'product_click', { product_id: productId });
}

// Add to compare
function addToCompare(productId) {
    alert(`Product ${productId} added to comparison list`);
    // Implement comparison functionality
}

// Loading state
function showLoading() {
    document.getElementById('loadingProducts').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loadingProducts').style.display = 'none';
}

// Error handling
function showError(message) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Error Loading Products</h3>
            <p>${message}</p>
            <button onclick="loadProducts()" class="btn btn-primary">
                <i class="fas fa-redo"></i> Try Again
            </button>
        </div>
    `;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeLiveProducts);

// Export for use in HTML
window.refreshProducts = refreshProducts;
window.searchProducts = searchProducts;
window.trackProductClick = trackProductClick;
window.addToCompare = addToCompare;