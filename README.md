# SL Static Assets CDN

## Assets Structure

```
├── css/
│   ├── dedicated-styles.css    # Sidebar and layout styles
│   └── earn-styles.css         # All earn page styles
└── js/
    ├── earn-original.js        # Original unobfuscated JavaScript
    ├── earn-obfuscated.js      # Production obfuscated version
    ├── element-removal.js      # Dynamic element removal utility
    └── video-page-scripts.js   # Video page specific scripts
```

## CDN URLs

All files are served via GitHub's raw content CDN:

- Base URL: `https://raw.githubusercontent.com/thisismynumber16/sl-assets/main/`
- CSS: `https://raw.githubusercontent.com/thisismynumber16/sl-assets/main/css/[filename].css`
- JS: `https://raw.githubusercontent.com/thisismynumber16/sl-assets/main/js/[filename].js`

## Features

- **Fixed AdBlocker ID**: Uses consistent "adblocker" ID throughout
- **No Dynamic Generation**: All CSS classes are static
- **CDN Cached**: Leverages GitHub's CDN for fast global delivery
- **Clean Separation**: Complete separation from WordPress plugin code
