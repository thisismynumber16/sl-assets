// Element Removal Script
// Dynamically removes elements based on CSS selectors from settings

document.addEventListener('DOMContentLoaded', function() {
    // Get selectors from global variable set by PHP/Lua
    if (typeof elementRemovalSelectors === 'undefined' || !elementRemovalSelectors) {
        return;
    }
    
    const selectors = elementRemovalSelectors;
    const selectorArray = selectors.split(',').map(s => s.trim()).filter(s => s);
    
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
    
    // Also observe for dynamically added elements
    const observer = new MutationObserver(function(mutations) {
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
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
