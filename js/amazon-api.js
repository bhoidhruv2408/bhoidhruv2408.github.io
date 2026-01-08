// amazon-api.js - Amazon Product Advertising API Integration

class AmazonAPI {
    constructor(config) {
        this.accessKey = config.accessKey;
        this.secretKey = config.secretKey;
        this.associateTag = config.associateTag;
        this.endpoint = 'https://webservices.amazon.in/onca/xml';
        this.baseParams = {
            Service: 'AWSECommerceService',
            AWSAccessKeyId: this.accessKey,
            AssociateTag: this.associateTag,
            Operation: 'ItemSearch',
            SearchIndex: 'All',
            ResponseGroup: 'ItemAttributes,Offers,Images',
            Timestamp: new Date().toISOString()
        };
    }
    
    // Search products
    async searchProducts(keywords, page = 1) {
        const params = {
            ...this.baseParams,
            Keywords: keywords,
            ItemPage: page
        };
        
        const signedUrl = this.signRequest(params);
        
        try {
            const response = await fetch(signedUrl);
            const xml = await response.text();
            return this.parseXMLResponse(xml);
        } catch (error) {
            console.error('Amazon API error:', error);
            return this.getFallbackData(keywords);
        }
    }
    
    // Get product by ASIN
    async getProduct(asin) {
        const params = {
            ...this.baseParams,
            Operation: 'ItemLookup',
            ItemId: asin,
            IdType: 'ASIN',
            ResponseGroup: 'ItemAttributes,Offers,Images,Reviews'
        };
        
        const signedUrl = this.signRequest(params);
        
        try {
            const response = await fetch(signedUrl);
            const xml = await response.text();
            return this.parseProductXML(xml);
        } catch (error) {
            console.error('Amazon API error:', error);
            return null;
        }
    }
    
    // Sign request (AWS Signature v2)
    signRequest(params) {
        // Sort parameters
        const sortedParams = Object.keys(params)
            .sort()
            .reduce((acc, key) => {
                acc[key] = params[key];
                return acc;
            }, {});
        
        // Create query string
        const queryString = new URLSearchParams(sortedParams).toString();
        
        // Create string to sign
        const stringToSign = `GET\nwebservices.amazon.in\n/onca/xml\n${queryString}`;
        
        // Sign with HMAC-SHA256
        const signature = CryptoJS.HmacSHA256(stringToSign, this.secretKey);
        const signatureBase64 = CryptoJS.enc.Base64.stringify(signature);
        
        // Add signature to params
        sortedParams.Signature = signatureBase64;
        
        // Build final URL
        const finalQueryString = new URLSearchParams(sortedParams).toString();
        return `${this.endpoint}?${finalQueryString}`;
    }
    
    // Parse XML response
    parseXMLResponse(xml) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, 'text/xml');
        
        const items = xmlDoc.getElementsByTagName('Item');
        const products = [];
        
        for (let item of items) {
            try {
                const product = this.parseItem(item);
                if (product) products.push(product);
            } catch (error) {
                console.error('Error parsing item:', error);
            }
        }
        
        return products;
    }
    
    // Parse individual item
    parseItem(item) {
        const asin = this.getText(item, 'ASIN');
        const title = this.getText(item, 'Title');
        const price = this.getPrice(item);
        
        if (!asin || !title) return null;
        
        return {
            asin: asin,
            title: title,
            price: price.current,
            original_price: price.original,
            discount: price.discount,
            image: this.getImage(item),
            rating: this.getRating(item),
            reviews: this.getReviewsCount(item),
            features: this.getFeatures(item),
            category: this.getCategory(item),
            platform: 'amazon',
            url: `https://www.amazon.in/dp/${asin}?tag=${this.associateTag}`,
            last_updated: new Date().toISOString()
        };
    }
    
    // Helper methods
    getText(element, tagName) {
        const tag = element.getElementsByTagName(tagName)[0];
        return tag ? tag.textContent : null;
    }
    
    getPrice(item) {
        try {
            const offer = item.getElementsByTagName('OfferSummary')[0];
            const lowestNewPrice = offer?.getElementsByTagName('LowestNewPrice')[0];
            const amount = lowestNewPrice?.getElementsByTagName('Amount')[0]?.textContent;
            
            const listPrice = item.getElementsByTagName('ListPrice')[0];
            const listAmount = listPrice?.getElementsByTagName('Amount')[0]?.textContent;
            
            const currentPrice = amount ? parseInt(amount) / 100 : null;
            const originalPrice = listAmount ? parseInt(listAmount) / 100 : currentPrice;
            
            const discount = originalPrice && currentPrice ?
                Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;
            
            return {
                current: currentPrice,
                original: originalPrice,
                discount: discount
            };
        } catch (error) {
            return { current: 0, original: 0, discount: 0 };
        }
    }
    
    getImage(item) {
        const largeImage = item.getElementsByTagName('LargeImage')[0];
        const url = largeImage?.getElementsByTagName('URL')[0]?.textContent;
        
        // Fallback to medium image
        if (!url) {
            const mediumImage = item.getElementsByTagName('MediumImage')[0];
            return mediumImage?.getElementsByTagName('URL')[0]?.textContent || 
                   'https://via.placeholder.com/400x400?text=Amazon+Product';
        }
        
        return url;
    }
    
    getRating(item) {
        const rating = item.getElementsByTagName('AverageRating')[0]?.textContent;
        return rating ? parseFloat(rating) : 0;
    }
    
    getReviewsCount(item) {
        const reviews = item.getElementsByTagName('TotalReviews')[0]?.textContent;
        return reviews ? parseInt(reviews) : 0;
    }
    
    getFeatures(item) {
        const features = [];
        const featureNodes = item.getElementsByTagName('Feature');
        
        for (let node of featureNodes) {
            if (features.length < 3) {
                features.push(node.textContent);
            }
        }
        
        return features;
    }
    
    getCategory(item) {
        const browseNodes = item.getElementsByTagName('BrowseNode');
        if (browseNodes.length > 0) {
            const name = browseNodes[0].getElementsByTagName('Name')[0]?.textContent;
            return name || 'General';
        }
        return 'General';
    }
    
    // Fallback data for development
    getFallbackData(keywords) {
        console.log('Using fallback data for:', keywords);
        
        return [
            {
                asin: 'B0CHX6T6WK',
                title: `Amazon Product: ${keywords}`,
                price: 9999,
                original_price: 12999,
                discount: 23,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                rating: 4.2,
                reviews: 156,
                features: ['Feature 1', 'Feature 2', 'Feature 3'],
                category: 'electronics',
                platform: 'amazon',
                url: `https://www.amazon.in/s?k=${encodeURIComponent(keywords)}`,
                last_updated: new Date().toISOString()
            }
        ];
    }
}

// Export
window.AmazonAPI = AmazonAPI;