# SL Static Assets CDN

## Assets Structure

```
├── css/
│   └── earn-styles.css         # All earn page styles
└── js/
    ├── earn-original.js        # Original unobfuscated JavaScript
    ├── earn-obfuscated.js      # Production obfuscated version
    ├── element-removal.js      # Dynamic element removal utility
    └── video-page-scripts.js   # Video page specific scripts
```

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

### JS Files
- [Purge earn-original.js](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/js/earn-original.js)
- [Purge earn-obfuscated.js](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/js/earn-obfuscated.js)
- [Purge element-removal.js](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/js/element-removal.js)
- [Purge video-page-scripts.js](https://purge.jsdelivr.net/gh/thisismynumber16/sl-assets@main/js/video-page-scripts.js)

**Note:** After purging, the CDN will fetch the latest version from GitHub. Cache purge may take a few minutes to propagate globally.

## Features

- **Fixed AdBlocker ID**: Uses consistent "adblocker" ID throughout
- **No Dynamic Generation**: All CSS classes are static
- **CDN Cached**: Leverages GitHub's CDN for fast global delivery
- **Clean Separation**: Complete separation from WordPress plugin code
