// Decrypt and assign variables from the 'evar' object
function xorDecrypt(data, key) {
    let decrypted = '';
    const keyLength = key.length;

    data = atob(data);

    for (let i = 0; i < data.length; i++) {
        decrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % keyLength));
    }

    return decrypted;
}

// Decrypt variables and assign to window object
for (let key in evar) {
    if (evar.hasOwnProperty(key)) {
        let decryptedKey = xorDecrypt(key, "!SecretKey!");

        // If the value is literally true or false, don't decrypt
        if (evar[key] === true || evar[key] === false) {
            window[decryptedKey] = evar[key];
        } else {
            let decryptedValue = xorDecrypt(evar[key], "!SecretKey!");
            decryptedValue = decryptedValue.replace(/"/g, '');
            window[decryptedKey] = decryptedValue;
        }
    }
}

class SafeLinkHandler {
    constructor() {
        // Initialize variables from decrypted data
        this.initVariables();

        // Initialize the script
        this.init();
    }

    initVariables() {
        this.ajaxRetryCount = 0; // Counter for AJAX retry attempts
        this.maxAjaxRetries = 10; // Maximum number of AJAX retry attempts

        // The valid redirect URL fetched from AJAX request
        this.redirectUrl = null;

        // Variable to store adblock detection status
        this.isUserAdblockerEnabled = false;

        // Define local variables with JavaScript naming conventions
        this.earnTypeDataEncrypted = window.entpdtejs;
        this.ajaxPath = window.ajxpthjs;
        this.isLastPage = window.islastpgjs;
        this.captchaOnFinal = window.captonfinjs;
        this.countdownSeconds = parseInt(window.cntdnsecsjs);
        this.pleaseWaitDelay = parseInt(window.plswtdlyjs);
        this.enableAdblockerDetection = window.eabjs;
        this.forceAdblocker = window.fabjs;
        this.adblockClass = window.abcljs;
        this.cookiesExpiration = parseInt(window.cejs);
        this.randomId = window.randjs;
        this.nonce = window.noncejs;
        this.adblockBaitUrl = window.ablbturljs;
        this.defaultRedirectUrl = window.dfltredurljs;
        this.captchaType = window.cptchtpejs;
        this.hcaptchaSiteKey = window.hcptstkyjs;
        this.recaptchaSiteKey = window.rcptstkyjs;
        this.turnstileSiteKey = window.tcptstkyjs;

        // Bind handleCaptchaSuccess method to the global scope for captcha callback
        window.captchaCallback = (token) => {
            this.handleCaptchaSuccess(token);
        };

        // Define the selectors after defining this.randomId
        // Define class and ID selectors for easy editing
        this.selectors = {
            // Top section elements
            topContinueButton: 'top-continue-button',
            topCountdownTimer: 'top-countdown-timer',

            // Bottom section elements
            bottomCountdownSection: 'bottom-countdown-section',
            bottomContinueButton: 'bottom-continue-button',
            bottomCountdownTimer: 'bottom-countdown-timer',

            // CAPTCHA elements
            captchaContainer: 'captcha-container',
            captchaWrapper: 'captcha-wrapper',

            // Other elements
            earnFooterAds: 'earn-footer-ads',
            adblockMessage: this.randomId
        };

        // Dynamically build elements to remove based on selectors
        this.selectors.elementsToRemove = [
            this.selectors.topContinueButton,
            this.selectors.topCountdownTimer,
            this.selectors.bottomContinueButton,
            this.selectors.bottomCountdownTimer
        ];

        console.log("Initialization complete.");
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            // Start adblock detection
            if (this.enableAdblockerDetection) {
                this.adblockDetector();
            }

            if (this.isLastPage && this.captchaOnFinal) {
                // Last page and CAPTCHA is required
                this.startCountdown(this.countdownSeconds, this.selectors.topCountdownTimer, () => {
                    const captchaContainer = document.getElementById(this.selectors.captchaContainer);
                    if (captchaContainer) {
                        // Show the captcha container
                        captchaContainer.style.display = "block";
                        // Dynamically load the CAPTCHA
                        this.loadCaptcha(captchaContainer);
                    }
                });
            } else {
                // Not the last page or CAPTCHA is not required
                const continueButton = document.getElementById(this.selectors.topContinueButton);
                this.startCountdown(this.countdownSeconds, this.selectors.topCountdownTimer, () => this.enableElement(this.selectors.topContinueButton));

                continueButton?.addEventListener('click', e => {
                    e.preventDefault();

                    // Display the bottom download section
                    const bottomCountdownSection = document.getElementById(this.selectors.bottomCountdownSection);
                    if (bottomCountdownSection) {
                        bottomCountdownSection.style.display = 'block';
                    }

                    // Start the second countdown
                    this.startCountdown(this.pleaseWaitDelay, this.selectors.bottomCountdownTimer, () => this.enableElement(this.selectors.bottomContinueButton));

                    // Smoothly scroll to the footer ads
                    this.smoothScrollTo(this.selectors.earnFooterAds, 10000); // Duration in milliseconds
                });

                // New: Set up bottom continue button to open the stored redirect URL on click
                document.getElementById(this.selectors.bottomContinueButton)?.addEventListener('click', () => {
                    if (this.redirectUrl) {
                        window.location.href = this.redirectUrl; // Redirect on button click
                    } else {
                        console.error('Redirect URL is not set.');
                    }
                });
            }
        });
    }

    loadCaptcha(captchaContainer) {
        if (this.captchaType === 'hcaptcha') {
            // Load hCaptcha script
            const script = document.createElement('script');
            script.src = 'https://js.hcaptcha.com/1/api.js';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);

            // Create hCaptcha element
            const captchaDiv = document.createElement('div');
            captchaDiv.className = 'h-captcha';
            captchaDiv.setAttribute('data-sitekey', this.hcaptchaSiteKey);
            captchaDiv.setAttribute('data-callback', 'captchaCallback');
            captchaContainer.appendChild(captchaDiv);
        } else if (this.captchaType === 'recaptcha') {
            // Load reCAPTCHA script
            const script = document.createElement('script');
            script.src = 'https://www.google.com/recaptcha/api.js';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);

            // Create reCAPTCHA element
            const captchaDiv = document.createElement('div');
            captchaDiv.className = 'g-recaptcha';
            captchaDiv.setAttribute('data-sitekey', this.recaptchaSiteKey);
            captchaDiv.setAttribute('data-callback', 'captchaCallback');
            captchaContainer.appendChild(captchaDiv);
        } else if (this.captchaType === 'turnstile') {
            // Load Turnstile script
            const script = document.createElement('script');
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);

            // Create Turnstile element
            const captchaDiv = document.createElement('div');
            captchaDiv.className = 'cf-turnstile';
            captchaDiv.setAttribute('data-sitekey', this.turnstileSiteKey);
            captchaDiv.setAttribute('data-callback', 'captchaCallback');
            captchaContainer.appendChild(captchaDiv);
        } else {
            // Handle unknown captcha type
            captchaContainer.innerHTML = "<p>Error: Unknown captcha type selected.</p>";
        }
    }

    startCountdown(count, elementId, callback) {
        const intervalId = setInterval(() => {
            if (!document.hidden) {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerText = count--;
                }
                if (count < 0) {
                    clearInterval(intervalId);
                    callback();
                }
            }
        }, 1000);
    }

    enableElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.pointerEvents = 'auto';
            element.style.opacity = '1';
        }
    }

    adblockDetected() {
        // Display the adblock message
        const adblockMessage = document.getElementById(this.selectors.adblockMessage);
        if (adblockMessage) {
            adblockMessage.style.display = "block";
        }

        this.isUserAdblockerEnabled = true;

        if (this.forceAdblocker) {
            // Remove specified elements when forceAdblocker is enabled
            this.selectors.elementsToRemove.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.remove();
                }
            });
        }
    }

    adblockDetector() {
        // Use a bait URL to detect adblocker
        const baitUrl = this.adblockBaitUrl;
        const baitScript = document.createElement('script');
        baitScript.src = baitUrl;
        baitScript.async = false;
        baitScript.onerror = () => {
            // If the bait script fails to load, adblocker is likely enabled
            this.adblockDetected();
        };
        document.head.appendChild(baitScript);

        // Alternative check using ad elements
        if (this.adblockClass.length !== 0) {
            // Check if ad elements are not visible
            const adElements = document.querySelectorAll('.' + this.adblockClass);
            const visibleAds = Array.from(adElements).filter(el => el.offsetParent !== null);
            if (visibleAds.length === 0) {
                // All ads are hidden, adblocker is likely enabled
                this.adblockDetected();
            }
        }
    }

    detectIncognitoMode() {
        return new Promise((resolve) => {
            if (typeof detectIncognito === 'function') {
                detectIncognito().then((result) => {
                    resolve(result.isPrivate);
                }).catch((error) => {
                    console.error("Error detecting incognito mode:", error);
                    resolve(false); // Assume not in incognito mode on error
                });
            } else {
                console.warn("Incognito detection script is unavailable. Assuming not in incognito mode.");
                resolve(false); // Assume not in incognito mode if function is unavailable
            }
        });
    }

    retryAjaxRequest(hcaptchaResponse = null) {
        if (this.ajaxRetryCount < this.maxAjaxRetries) {
            this.ajaxRetryCount++;
            console.log(`Retrying AJAX request (${this.ajaxRetryCount}/${this.maxAjaxRetries})...`);

            return this.sendAjaxRequest(hcaptchaResponse);
        } else {
            console.error(`AJAX request failed after ${this.maxAjaxRetries} attempts. Redirecting to default URL.`);
            // Wrap the return value in a resolved Promise
            return Promise.resolve(this.processAjaxResponse(this.defaultRedirectUrl));
        }
    }

    async sendAjaxRequest(hcaptchaResponse = null) {
        // Get incognito status
        const isUserIncognitoEnabled = await this.detectIncognitoMode();

        // isAdFilled is always true for now
        const isAdFilled = true;

        // Prepare AJAX data with the correct order of indices
        const ajaxData = {
            ajax_meta_data: [
                hcaptchaResponse || '',              // hCaptcha response
                this.earnTypeDataEncrypted,          // Encrypted earn type data
                this.isUserAdblockerEnabled,         // Adblocker status
                isAdFilled,                          // Ad filled status
                isUserIncognitoEnabled               // Incognito status
            ]
        };

        return fetch(this.ajaxPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': this.nonce
            },
            body: JSON.stringify(ajaxData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.redirect_url) {
                    this.ajaxRetryCount = 0; // Reset retry counter on success
                    return this.processAjaxResponse(data.redirect_url);
                } else {
                    console.error('Error:', data.error);
                    return this.retryAjaxRequest(hcaptchaResponse); // Retry on error
                }
            })
            .catch(error => {
                console.error('Error:', error);
                return this.retryAjaxRequest(hcaptchaResponse); // Retry on fetch failure
            });
    }

    processAjaxResponse(redirectUrl) {
        this.redirectUrl = redirectUrl; // Store the URL instead of redirecting
        console.log("Stored redirect URL:", this.redirectUrl);
        return redirectUrl;
    }

    handleCaptchaSuccess(token) {
        if (this.isLastPage && this.captchaOnFinal) {
            let captchaResponse = '';
            if (this.captchaType === 'hcaptcha') {
                captchaResponse = hcaptcha.getResponse();
            } else if (this.captchaType === 'recaptcha') {
                captchaResponse = grecaptcha.getResponse();
            } else if (this.captchaType === 'turnstile') {
                captchaResponse = token; // Token passed from Turnstile callback
            }

            this.sendAjaxRequest(captchaResponse)
                .then(redirectUrl => {
                    if (redirectUrl) {
                        console.log("Redirecting to:", redirectUrl); // Add extra logging for verification
                        window.location.href = redirectUrl; // Redirect on successful URL resolution
                    } else {
                        console.error('Redirect URL was not resolved correctly. Falling back to default.');
                        window.location.href = this.defaultRedirectUrl; // Fallback redirect
                    }
                })
                .catch(error => {
                    console.error('Error in AJAX request:', error);
                    window.location.href = this.defaultRedirectUrl; // Fallback on AJAX error
                });
        }
    }


    // Smooth scroll to a specific element
    smoothScrollTo(elementId, duration) {
        const targetElement = document.getElementById(elementId);
        if (!targetElement) return; // Exit if the element is not found

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animationScroll(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1); // Progress between 0 and 1

            // Ease the scroll position using an ease-in-out function
            window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

            if (timeElapsed < duration) {
                requestAnimationFrame(animationScroll); // Continue scrolling until duration ends
            }
        }

        // An ease-in-out function to create a smooth transition effect
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        requestAnimationFrame(animationScroll); // Start the animation
    }
}

// Instantiate the SafeLinkHandler
const safeLinkHandler = new SafeLinkHandler();

// If not the last page or CAPTCHA is not required, send AJAX request on document ready
if (!safeLinkHandler.isLastPage || !safeLinkHandler.captchaOnFinal) {
    document.addEventListener('DOMContentLoaded', () => {
        safeLinkHandler.sendAjaxRequest();
    });
}