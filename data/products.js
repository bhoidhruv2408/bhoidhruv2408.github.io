// data/products.js
const smartphoneProducts = {
    premium: [
        {
            id: "iphone16-pro-max",
            name: "Apple iPhone 16 Pro Max",
            brand: "Apple",
            category: "premium",
            badge: "Best iPhone 2025",
            priceSegment: "Above ₹1,20,000",
            image: "images/16pro.jpg",
            specs: {
                display: "6.9-inch Super Retina XDR OLED, Always-On",
                processor: "Apple A18 Pro (3nm)",
                storage: "256GB | 512GB | 1TB | 2TB",
                ram: "8GB RAM",
                camera: "48MP Quad Pixel + 12MP Ultra Wide + 12MP 5x Telephoto + LiDAR",
                battery: "5000mAh, 40W Fast Charging",
                os: "iOS 19",
                connectivity: "5G Advanced, Wi-Fi 7, Bluetooth 5.4"
            },
            rating: 4.9,
            reviews: "45,000+",
            amazonLink: "https://amzn.to/4pJrysw"
        },
        {
            id: "samsung-s25-ultra",
            name: "Samsung Galaxy S25 Ultra",
            brand: "Samsung",
            category: "premium",
            badge: "Best Android 2025",
            priceSegment: "₹1,10,000 - ₹1,40,000",
            image: "https://m.media-amazon.com/images/I/81qzhAnqQSL._SL1500_.jpg",
            specs: {
                display: "6.9-inch Dynamic AMOLED 3X, 120Hz LTPO",
                processor: "Snapdragon 8 Gen 4 for Galaxy",
                storage: "256GB | 512GB | 1TB",
                ram: "12GB/16GB RAM",
                camera: "200MP + 50MP + 12MP + 10MP Quad Camera",
                battery: "5500mAh, 65W Fast Charging, 25W Wireless",
                os: "One UI 7 (Android 15)",
                connectivity: "5G Advanced, Wi-Fi 7E, Bluetooth 5.4"
            },
            rating: 4.8,
            reviews: "38,000+",
            amazonLink: "https://amzn.to/4bq2Ycj"
        },
        {
            id: "google-pixel10-pro",
            name: "Google Pixel 10 Pro",
            brand: "Google",
            category: "premium",
            badge: "AI Powerhouse 2025",
            priceSegment: "₹95,000 - ₹1,20,000",
            image: "https://m.media-amazon.com/images/I/71Y3OwqXzLL._SL1500_.jpg",
            specs: {
                display: "6.8-inch Actua OLED Pro, 120Hz LTPO",
                processor: "Google Tensor G5 (Fully Custom)",
                storage: "256GB | 512GB | 1TB",
                ram: "12GB/16GB RAM",
                camera: "50MP + 50MP + 48MP Triple Camera",
                battery: "5200mAh, 45W Fast Charging, 30W Wireless",
                os: "Android 15 (7 Years Updates)",
                connectivity: "5G Advanced, Wi-Fi 7, Bluetooth 5.4"
            },
            rating: 4.7,
            reviews: "32,000+",
            amazonLink: "https://amzn.to/49jesNG"
        },
        {
            id: "oneplus-13",
            name: "OnePlus 13",
            brand: "OnePlus",
            category: "premium",
            badge: "Fastest Charging 2025",
            priceSegment: "₹75,000 - ₹95,000",
            image: "https://m.media-amazon.com/images/I/71uwl2j1A5L._SL1500_.jpg",
            specs: {
                display: "6.82-inch LTPO AMOLED 2K, 120Hz",
                processor: "Snapdragon 8 Gen 4",
                storage: "256GB | 512GB | 1TB",
                ram: "12GB/16GB LPDDR5X RAM",
                camera: "50MP LYT-900 + 64MP Periscope + 50MP Ultra Wide",
                battery: "6000mAh, 150W SUPERVOOC",
                os: "OxygenOS 15 (Android 15)",
                connectivity: "5G, Wi-Fi 7, Bluetooth 5.4"
            },
            rating: 4.6,
            reviews: "28,000+",
            amazonLink: "https://amzn.to/4pEnYjb"
        }
    ],
    midrange: [
        {
            id: "samsung-s25-fe",
            name: "Samsung Galaxy S25 FE",
            brand: "Samsung",
            category: "midrange",
            badge: "Fan Edition 2025",
            priceSegment: "₹45,000 - ₹60,000",
            image: "https://m.media-amazon.com/images/I/71VHfI8fC9L._SL1500_.jpg",
            specs: {
                display: "6.4-inch Dynamic AMOLED 2X, 120Hz",
                processor: "Exynos 2400 / Snapdragon 8 Gen 2",
                storage: "128GB | 256GB",
                ram: "8GB/12GB RAM",
                camera: "50MP + 12MP + 8MP Triple Camera",
                battery: "4700mAh, 45W Fast Charging",
                os: "One UI 7 (Android 15)",
                connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
            },
            rating: 4.5,
            reviews: "35,000+",
            amazonLink: "https://amzn.to/3NklDfJ"
        },
        {
            id: "google-pixel9a",
            name: "Google Pixel 9a",
            brand: "Google",
            category: "midrange",
            badge: "Best Camera Mid-Range",
            priceSegment: "₹35,000 - ₹45,000",
            image: "https://m.media-amazon.com/images/I/51rW2Xkx7bL._SL1500_.jpg",
            specs: {
                display: "6.1-inch Actua OLED, 90Hz",
                processor: "Google Tensor G4",
                storage: "128GB | 256GB",
                ram: "8GB RAM",
                camera: "64MP + 13MP Dual Camera",
                battery: "4600mAh, 30W Fast Charging",
                os: "Android 15 (5 Years Updates)",
                connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
            },
            rating: 4.7,
            reviews: "42,000+",
            amazonLink: "https://amzn.to/3LFr8oP"
        },
        {
            id: "oneplus-nord5",
            name: "OnePlus Nord 5",
            brand: "OnePlus",
            category: "midrange",
            badge: "Performance Beast",
            priceSegment: "₹30,000 - ₹40,000",
            image: "https://m.media-amazon.com/images/I/71GqZ-gR38L._SL1500_.jpg",
            specs: {
                display: "6.74-inch AMOLED, 120Hz, 1.5K",
                processor: "Snapdragon 7+ Gen 3",
                storage: "128GB | 256GB",
                ram: "8GB/12GB RAM",
                camera: "50MP Sony IMX890 + 8MP Ultra Wide",
                battery: "5600mAh, 100W SUPERVOOC",
                os: "OxygenOS 15 (Android 15)",
                connectivity: "5G, Wi-Fi 6, Bluetooth 5.3"
            },
            rating: 4.6,
            reviews: "38,000+",
            amazonLink: "https://amzn.to/3LtYs27"
        },
        {
            id: "nothing-phone3",
            name: "Nothing Phone 3",
            brand: "Nothing",
            category: "midrange",
            badge: "Unique Glyph 3.0",
            priceSegment: "₹40,000 - ₹55,000",
            image: "https://m.media-amazon.com/images/I/61a9q5gvMWL._SL1500_.jpg",
            specs: {
                display: "6.7-inch LTPO OLED, 120Hz",
                processor: "Snapdragon 8s Gen 3",
                storage: "256GB | 512GB",
                ram: "12GB RAM",
                camera: "50MP + 50MP Dual Camera",
                battery: "5200mAh, 55W Fast Charging",
                os: "Nothing OS 3.0 (Android 15)",
                connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
            },
            rating: 4.5,
            reviews: "32,000+",
            amazonLink: "https://amzn.to/4qMXtJ9"
        }
    ],
    budget: [
        {
            id: "samsung-m56-5g",
            name: "Samsung Galaxy M65 5G",
            brand: "Samsung",
            category: "budget",
            badge: "Under ₹20,000",
            priceSegment: "₹18,000 - ₹22,000",
            image: "https://m.media-amazon.com/images/I/61Y7CgjPq2L._SL1500_.jpg",
            specs: {
                display: "6.7-inch Super AMOLED+, 120Hz",
                processor: "Snapdragon 7s Gen 2",
                storage: "128GB | 256GB (Expandable)",
                ram: "8GB/12GB RAM",
                camera: "50MP OIS + 8MP + 2MP Triple",
                battery: "6500mAh, 45W Fast Charging",
                os: "One UI 6.1 (Android 14)",
                connectivity: "5G, Wi-Fi 6, Bluetooth 5.3"
            },
            rating: 4.4,
            reviews: "58,000+",
            amazonLink: "https://amzn.to/4sB47E2"
        },
        {
            id: "redmi-note15",
            name: "Redmi Note 15 Pro 5G",
            brand: "Xiaomi",
            category: "budget",
            badge: "Value King 2025",
            priceSegment: "₹17,000 - ₹21,000",
            image: "https://m.media-amazon.com/images/I/71MJMkzq8RL._SL1500_.jpg",
            specs: {
                display: "6.67-inch AMOLED, 120Hz, 1.5K",
                processor: "MediaTek Dimensity 8300",
                storage: "128GB | 256GB",
                ram: "8GB/12GB RAM",
                camera: "200MP OIS + 8MP + 2MP Triple",
                battery: "5200mAh, 67W Fast Charging",
                os: "HyperOS 2.0 (Android 15)",
                connectivity: "5G, Wi-Fi 6, Bluetooth 5.3"
            },
            rating: 4.5,
            reviews: "62,000+",
            amazonLink: "https://amzn.to/4pyqGXy"
        },
        {
            id: "realme-narzo80-pro",
            name: "Realme Narzo 80 Pro 5G",
            brand: "Realme",
            category: "budget",
            badge: "Gaming Performance",
            priceSegment: "₹16,000 - ₹20,000",
            image: "https://m.media-amazon.com/images/I/61U5zVk-2eL._SL1500_.jpg",
            specs: {
                display: "6.7-inch Curved AMOLED, 120Hz",
                processor: "MediaTek Dimensity 8200 Ultra",
                storage: "128GB | 256GB",
                ram: "8GB/12GB RAM",
                camera: "108MP OIS + 8MP Ultra Wide",
                battery: "5000mAh, 80W SuperVOOC",
                os: "Realme UI 5.0 (Android 14)",
                connectivity: "5G, Wi-Fi 6, Bluetooth 5.3"
            },
            rating: 4.3,
            reviews: "55,000+",
            amazonLink: "https://amzn.to/4qrnY7a"
        },
        {
            id: "poco-x7-pro",
            name: "Poco X8 Pro 5G",
            brand: "Poco",
            category: "budget",
            badge: "Performance Monster",
            priceSegment: "₹19,000 - ₹23,000",
            image: "https://m.media-amazon.com/images/I/61uE1XGgH+L._SL1500_.jpg",
            specs: {
                display: "6.67-inch AMOLED, 120Hz, 68B Colors",
                processor: "MediaTek Dimensity 9200+",
                storage: "256GB | 512GB",
                ram: "8GB/12GB LPDDR5X",
                camera: "64MP OIS + 8MP + 2MP Triple",
                battery: "5100mAh, 90W Fast Charging",
                os: "HyperOS 2.0 (Android 15)",
                connectivity: "5G, Wi-Fi 6, Bluetooth 5.3"
            },
            rating: 4.4,
            reviews: "48,000+",
            amazonLink: "https://amzn.to/4qPPw69"
        }
    ]
};

// Function to get all products
function getAllProducts() {
    return [
        ...smartphoneProducts.premium,
        ...smartphoneProducts.midrange,
        ...smartphoneProducts.budget
    ];
}

// Function to get products by category
function getProductsByCategory(category) {
    return smartphoneProducts[category] || [];
}

// Function to search products
function searchProducts(query) {
    const allProducts = getAllProducts();
    const searchTerm = query.toLowerCase().trim();
    
    return allProducts.filter(product => {
        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.specs.processor.toLowerCase().includes(searchTerm) ||
            product.specs.camera.toLowerCase().includes(searchTerm)
        );
    });
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        smartphoneProducts,
        getAllProducts,
        getProductsByCategory,
        searchProducts
    };
}