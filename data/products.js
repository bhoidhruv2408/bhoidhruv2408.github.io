// data/products.js
const smartphoneProducts = {
    premium: [
        {
            id: "iphone-15",
            name: "Apple iPhone 15",
            brand: "Apple",
            category: "premium",
            badge: "Editor's Choice",
            priceSegment: "Above ₹70,000",
            image: "https://m.media-amazon.com/images/I/61bK6PMOC3L._SL1500_.jpg",
            storage: "128GB | 256GB | 512GB",
            specs: {
                display: "6.1-inch Super Retina XDR OLED, 2556x1179 pixels",
                processor: "Apple A16 Bionic (4nm)",
                ram: "6GB RAM",
                camera: "Dual: 48MP main (f/1.6) + 12MP ultra-wide (f/2.4)",
                frontCamera: "12MP TrueDepth camera (f/1.9)",
                battery: "3349mAh, 20W fast charging",
                os: "iOS 17",
                connectivity: "5G, Wi-Fi 6, Bluetooth 5.3"
            },
            rating: 4.5,
            reviews: "10,000+",
            amazonLink: "https://amzn.to/4aR5qsk" // Replace with your actual link
        },
        // Add more premium phones here...
    ],
    midrange: [
        {
            id: "oneplus-12",
            name: "OnePlus 12",
            brand: "OnePlus",
            category: "midrange",
            badge: "Value Pick",
            priceSegment: "₹50,000 - ₹70,000",
            image: "https://m.media-amazon.com/images/I/61bK6PMOC3L._SL1500_.jpg",
            storage: "256GB | 512GB",
            specs: {
                display: "6.82-inch LTPO AMOLED, 1440x3168 pixels, 120Hz",
                processor: "Qualcomm Snapdragon 8 Gen 3",
                ram: "12GB | 16GB RAM",
                camera: "Triple: 50MP Sony LYT-808 + 64MP periscope telephoto + 48MP ultra-wide",
                frontCamera: "32MP selfie camera",
                battery: "5400mAh, 100W wired charging",
                os: "OxygenOS 14 (Android 14)",
                connectivity: "5G, Wi-Fi 7, Bluetooth 5.4"
            },
            rating: 4.4,
            reviews: "8,000+",
            amazonLink: "https://amzn.to/4aR5qsk" // Replace with your actual link
        },
        // Add more mid-range phones here...
    ],
    budget: [
        {
            id: "samsung-m34",
            name: "Samsung Galaxy M34 5G",
            brand: "Samsung",
            category: "budget",
            badge: "Under 20K",
            priceSegment: "₹15,000 - ₹20,000",
            image: "https://m.media-amazon.com/images/I/61bK6PMOC3L._SL1500_.jpg",
            storage: "128GB | 256GB (expandable up to 1TB)",
            specs: {
                display: "6.5-inch sAMOLED, 120Hz refresh rate",
                processor: "Samsung Exynos 1280",
                ram: "6GB | 8GB RAM",
                camera: "Triple: 50MP main + 8MP ultra-wide + 2MP macro",
                frontCamera: "13MP selfie camera",
                battery: "6000mAh, 25W fast charging",
                os: "Android 13 with One UI 5.1",
                connectivity: "5G, Wi-Fi 5, Bluetooth 5.2"
            },
            rating: 4.3,
            reviews: "15,000+",
            amazonLink: "https://amzn.to/4aR5qsk" // Replace with your actual link
        },
        // Add more budget phones here...
    ]
};