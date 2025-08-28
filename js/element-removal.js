// Element Removal Script
// This script removes elements based on selectors configured in the plugin
(function() {
    // Get selectors from global variable if set
    if (typeof removeElementSelectors !== 'undefined' && removeElementSelectors) {
        document.addEventListener('DOMContentLoaded', function() {
            const selectorArray = removeElementSelectors.split(',').map(s => s.trim()).filter(s => s);
            
            function removeElements() {
                selectorArray.forEach(function(selector) {
                    try {
                        const elements = document.querySelectorAll(selector);
                        elements.forEach(function(element) {
                            element.remove();
                        });
                    } catch (e) {
                        console.error('Invalid selector:', selector);
                    }
                });
            }
            
            // Initial removal
            removeElements();
            
            // Also observe for dynamically added elements
            const observer = new MutationObserver(function(mutations) {
                removeElements();
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
})();