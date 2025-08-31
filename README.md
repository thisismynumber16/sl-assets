# SL Static Assets CDN

## Assets Structure

## CDN URLs (jsDelivr)

All files are served via jsDelivr CDN for proper MIME types:

- Base URL: `https://cdn.jsdelivr.net/gh/thisismynumber16/sl-assets@main/`
- CSS: `https://cdn.jsdelivr.net/gh/thisismynumber16/sl-assets@main/css/[filename].css`
- JS: `https://cdn.jsdelivr.net/gh/thisismynumber16/sl-assets@main/js/[filename].js`

## Cache Purge URLs

To force jsDelivr to refresh cached files, use these purge URLs:

### CSS Files
- [Purge earn-styles.css](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/css/earn-styles.css)
- [Purge video-page-default.css](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/css/video-page-default.css)
- [Purge video-page-sngtd.css](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/css/video-page-sngtd.css)
- [Purge video-page-layout.css](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/css/video-page-layout.css)
- [Purge adblocker-display.css](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/css/adblocker-display.css)
- [Purge ctpl-player.css](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/css/ctpl-player.css)

### JS Files
- [Purge earn-original.js](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/js/earn-original.js)
- [Purge earn-obfuscated.js](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/js/earn-obfuscated.js)
- [Purge element-removal.js](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/js/element-removal.js)
- [Purge video-page-scripts.js](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/js/video-page-scripts.js)
- [Purge referrer-masking.js](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/js/referrer-masking.js)
- [Purge jquery-3.4.1.slim.min.js](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/js/jquery-3.4.1.slim.min.js)
- [Purge fluidplayer-3.0.4.min.js](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/js/fluidplayer-3.0.4.min.js)
- [Purge video-player.js](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/js/video-player.js)

**Note:** After purging, the CDN will fetch the latest version from GitHub. Cache purge may take a few minutes to propagate globally.

## Features

- **Fixed AdBlocker ID**: Uses consistent "adblocker" ID throughout
- **No Dynamic Generation**: All CSS classes are static
- **CDN Cached**: Leverages GitHub's CDN for fast global delivery
- **Clean Separation**: Complete separation from WordPress plugin code
