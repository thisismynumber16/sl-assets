/**
 * Referrer Masking Script
 * Prevents unwanted referrers from being tracked in Google Analytics
 * while preserving legitimate search engine referrers
 */
(function() {
    // Configuration passed from server-side
    if (typeof window.referrerMaskingConfig === 'undefined') {
        console.warn('Referrer masking config not found');
        return;
    }
    
    var config = window.referrerMaskingConfig;
    var shouldMaskReferrer = config.shouldMask || false;
    var allowedReferrer = config.allowedReferrer || '';
    
    if (!shouldMaskReferrer) {
        return; // Don't mask for search engines
    }
    
    // Override document.referrer for non-search engine traffic
    try {
        Object.defineProperty(document, 'referrer', {
            get: function() { return allowedReferrer; },
            configurable: true
        });
    } catch(e) {
        // Fallback for older browsers
    }
    
    // Clean URL parameters that might reveal origin
    if (window.history && window.history.replaceState) {
        var url = new URL(window.location.href);
        var paramsToRemove = [
            'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
            'fbclid', 'gclid', 'ref', 'source', 'referrer'
        ];
        var cleaned = false;
        
        paramsToRemove.forEach(function(param) {
            if (url.searchParams.has(param)) {
                url.searchParams.delete(param);
                cleaned = true;
            }
        });
        
        if (cleaned) {
            window.history.replaceState({}, document.title, url.toString());
        }
    }
    
    // Intercept GA/gtag initialization to ensure it reads our masked referrer
    if (window.ga) {
        var originalGa = window.ga;
        window.ga = function() {
            if (arguments[0] === 'create' || arguments[0] === 'config') {
                // Force GA to not read referrer from elsewhere
                if (arguments[2] && typeof arguments[2] === 'object') {
                    arguments[2].referrer = allowedReferrer;
                }
            }
            return originalGa.apply(this, arguments);
        };
    }
    
    // For gtag.js (GA4)
    if (window.gtag) {
        var originalGtag = window.gtag;
        window.gtag = function() {
            if (arguments[0] === 'config' && arguments[2]) {
                arguments[2].page_referrer = allowedReferrer;
            }
            return originalGtag.apply(this, arguments);
        };
    }
    
    // Also intercept dataLayer pushes for GTM
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
        var originalPush = window.dataLayer.push;
        window.dataLayer.push = function() {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] && typeof arguments[i] === 'object') {
                    // Remove or override referrer in dataLayer
                    if (arguments[i].event === 'gtm.dom' || arguments[i].event === 'gtm.load') {
                        arguments[i]['gtm.referrer'] = allowedReferrer;
                    }
                }
            }
            return originalPush.apply(this, arguments);
        };
    }
})();