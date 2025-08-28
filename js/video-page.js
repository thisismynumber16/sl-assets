// Video page scripts
function copyCurrentURLToClipboard() {
    var tempInput = document.createElement("input");
    if (typeof encodedCurrentURL !== 'undefined') {
        var decodedURL = atob(encodedCurrentURL);
        tempInput.value = decodedURL;
    } else {
        tempInput.value = window.location.href;
    }
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    
    // Optional: Show feedback
    var button = event.target;
    var originalText = button.innerHTML;
    button.innerHTML = '<i class="fa fa-check"></i> Copied!';
    setTimeout(function() {
        button.innerHTML = originalText;
    }, 2000);
}

// Handle back-to-top button
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Decode and handle base64 encoded links
    var encodedLinks = document.querySelectorAll('a[data-href]');
    encodedLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var encodedUrl = this.getAttribute('data-href');
            if (encodedUrl) {
                var decodedUrl = atob(encodedUrl);
                window.open(decodedUrl, '_blank');
            }
        });
    });
});