// Video Page Scripts

function copyCurrentURLToClipboard() {
    // Create a temporary input to hold the decoded URL
    var tempInput = document.createElement("input");

    // Get encoded URL from global variable
    if (typeof encodedCurrentURL !== 'undefined') {
        // Decode the Base64-encoded URL
        var decodedURL = atob(encodedCurrentURL);

        // Set the input value to the decoded URL
        tempInput.value = decodedURL;
    } else {
        // Fallback to current URL if encodedCurrentURL is not defined
        tempInput.value = window.location.href;
    }

    // Append the input to the body (not visible)
    document.body.appendChild(tempInput);

    // Select the input value
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the value to the clipboard
    document.execCommand("copy");

    // Remove the input from the DOM
    document.body.removeChild(tempInput);

    // Show alert with the copied URL
    var copiedURL = tempInput.value;
    alert("URL copied to clipboard successfully!\n\n" + copiedURL);
}

// Check if Google Ads Loaded by using URL as Bait
async function detectAdBlock() {
    // Get bait URL from global variable or use default
    const baitUrl = (typeof adblockBaitUrl !== 'undefined' && adblockBaitUrl) ? 
                    adblockBaitUrl : 
                    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    
    const bait = document.createElement('script');
    const rd = "adblocker";
    bait.src = baitUrl;
    bait.async = false;
    bait.onerror = function () {
        console.log("Adblock detected!");
        const rdElement = document.getElementById(rd);
        if (rdElement) {
            rdElement.style.display = "block";
        }
    };
    document.head.appendChild(bait);
}

// Wait for the entire page (including resources) to load
document.addEventListener("DOMContentLoaded", function () {
    // Handle anchor tags with data-href attributes
    document.querySelectorAll("a[data-href]").forEach(function (anchor) {
        anchor.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor behavior

            var encodedHref = this.getAttribute("data-href");
            if (encodedHref) {
                var decodedHref = atob(encodedHref); // Decode Base64-encoded href

                // Open the decoded URL in a new tab
                window.open(decodedHref, "_blank");
            }
        });
    });

    // Handle back-to-top button
    var backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        
        // Smooth scroll to top
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    
    // Handle search form without exposing action URL
    (function() {
        var form = document.getElementById('searchform');
        var input = document.getElementById('s');
        var button = document.getElementById('searchsubmit');
        var searchBase = (typeof SL_SEARCH_B64 === 'string' && SL_SEARCH_B64) ? atob(SL_SEARCH_B64) : null;

        function doSearch() {
            if (!input) return;
            var q = (input.value || '').trim();
            if (!q || q === 'Search...') return;
            var base = searchBase || (window.location.origin + '/?s=');
            window.location.href = base + encodeURIComponent(q);
        }

        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                doSearch();
            });
        }
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                doSearch();
            });
        }
        if (input) {
            input.addEventListener("keydown", function(e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    doSearch();
                }
            });
        }
    })();

    detectAdBlock();
    
    // WP nav init (hamburger menu) with fallback
    (function($){
        if (!$ || !$("#site-navigation").length) return;
        var $nav = $("#site-navigation");
        try {
            if ($.fn && typeof $.fn.menumaker === "function") {
                $nav.menumaker({ format: "multitoggle" });
            }
        } catch (e) {}

        var $btn = $nav.find(".button-nav");
        var $menu = $nav.find("> ul");
        if ($btn.length && $menu.length) {
            $btn.off("click.slFallback").on("click.slFallback", function(){
                var open = $menu.hasClass("open");
                $menu.toggleClass("open");
                if (typeof $menu.slideToggle === "function") {
                    $menu.stop(true, true).slideToggle();
                } else {
                    $menu.css("display", open ? "none" : "block");
                }
            });
            var mediasize = 1000;
            if ($(window).width() <= mediasize) {
                $menu.css("display", "none").removeClass("open");
            }
        }
    })(window.jQuery || null);
});
