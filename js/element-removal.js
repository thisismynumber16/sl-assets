// Element Removal Script
// Dynamically removes elements based on CSS selectors from settings

document.addEventListener('DOMContentLoaded', function() {
    // Get selectors from global variable set by PHP
    if (typeof elementRemovalSelectors === 'undefined' || !elementRemovalSelectors) {
        return;
    }
    
    const selectors = elementRemovalSelectors;
    const selectorArray = selectors.split(',').map(s => s.trim()).filter(s => s);
    
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
