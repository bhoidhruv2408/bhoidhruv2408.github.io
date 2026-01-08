// flipkart-api.js - Flipkart Affiliate API Integration

class FlipkartAPI {
    constructor(config) {
        this.token = config.token;
        this.affiliateId = config.affiliateId;
        this.baseUrl = 'https://affiliate-api.flipkart.net/affiliate/api';
    }
    
    // Search products
    async searchProducts(query, count = 10) {
        const url = `${this.baseUrl}/${this.affiliateId}.json?query=${encodeURIComponent(query)}&resultCount=${count}`;
        
        try {
            const response = await fetch(url, {
                headers: {
                    'Fk-Affiliate-Id': this.affiliateId,
                    'Fk-Affiliate-Token': this.token
                }
            });
            
            if (!response.ok) {
                throw new Error(`Flipkart API error: ${response.status}`);
            }
            
            const data = await response.json();
            return this.parseResponse(data);
            
        } catch (error) {
            console.error('Flipkart API error:', error);
            return this.getFallbackData(query);
        }
    }
    
    // Parse API response
    parseResponse(data) {
        const products = [];
        
        if (!data.productInfoList || !Array.isArray(data.productInfoList)) {
            return products;
        }
        
        for (let productInfo of data.productInfoList) {
            try {
                const product = this.parseProduct(productInfo);
                if (product) products.push(product);
            } catch (error) {
                console.error('Error parsing product:', error);
            }
        }
        
        return products;
    }
    
    // Parse individual product
    parseProduct(productInfo) {
        const product = productInfo.productBaseInfoV1;
        const attributes = product.productAttributes || {};
        
        const price = this.getPrice(product);
        if (!price.current) return null;
        
        return {
            pid: product.productId,
            title: attributes.title || 'Flipkart Product',
            price: price.current,
            original_price: price.original,
            discount: price.discount,
            image: this.getImage(product),
            rating: this.getRating(product),
            reviews: this.getReviewsCount(product),
            features: this.getFeatures(attributes),
            category: this.getCategory(attributes),
            platform: 'flipkart',
            url: this.generateAffiliateUrl(product.productId),
            stock: this.getStockStatus(product),
            delivery: this.getDeliveryInfo(product),
            last_updated: new Date().toISOString()
        };
    }
    
    // Get price information
    getPrice(product) {
        const pricing = product.productAttributes?.maximumRetailPrice || {};
        const selling = product.productAttributes?.sellingPrice || {};
        
        const originalPrice = pricing.amount || 0;
        const currentPrice = selling.amount || originalPrice;
        
        const discount = originalPrice > 0 ? 
            Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;
        
        return {
            current: currentPrice,
            original: originalPrice,
            discount: discount
        };
    }
    
    // Get image URL
    getImage(product) {
        const imageUrls = product.productAttributes?.imageUrls || {};
        
        // Try different image sizes
        return imageUrls['400x400'] || 
               imageUrls['200x200'] || 
               imageUrls['unknown'] ||
               'https://via.placeholder.com/400x400?text=Flipkart+Product';
    }
    
    // Get rating
    getRating(product) {
        const rating = product.productAttributes?.productRating || 0;
        return parseFloat(rating) || 0;
    }
    
    // Get reviews count
    getReviewsCount(product) {
        return product.productAttributes?.productReviews || 0;
    }
    
    // Get features
    getFeatures(attributes) {
        const features = [];
        const specs = attributes.productSpecificationList || [];
        
        for (let spec of specs) {
            if (features.length < 3 && spec.values && spec.values[0]) {
                features.push(`${spec.key}: ${spec.values[0]}`);
            }
        }
        
        return features.length > 0 ? features : ['Feature 1', 'Feature 2', 'Feature 3'];
    }
    
    // Get category
    getCategory(attributes) {
        return attributes.productFamily || 
               attributes.categoryPath || 
               'electronics';
    }
    
    // Generate affiliate URL
    generateAffiliateUrl(productId) {
        return `https://dl.flipkart.com/s/${this.affiliateId}/p/${productId}`;
    }
    
    // Get stock status
    getStockStatus(product) {
        const stock = product.productAttributes?.inStock;
        return stock ? 'In Stock' : 'Out of Stock';
    }
    
    // Get delivery info
    getDeliveryInfo(product) {
        const delivery = product.productAttributes?.deliveryInfo;
        return delivery || 'Free delivery';
    }
    
    // Fallback data for development
    getFallbackData(query) {
        console.log('Using fallback data for:', query);
        
        return [
            {
                pid: 'MOBGHCG2HZHUFDNJ',
                title: `Flipkart Product: ${query}`,
                price: 8999,
                original_price: 11999,
                discount: 25,
                image: 'https://images.unsplash.com/photo-1546054450-0245d6c0d1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                rating: 4.0,
                reviews: 89,
                features: ['Feature A', 'Feature B', 'Feature C'],
                category: 'electronics',
                platform: 'flipkart',
                url: `https://dl.flipkart.com/s/${this.affiliateId}/search?q=${encodeURIComponent(query)}`,
                stock: 'In Stock',
                delivery: 'Free delivery',
                last_updated: new Date().toISOString()
            }
        ];
    }
}

// Export
window.FlipkartAPI = FlipkartAPI;