# Image Optimization Guide

## Current Issues
- `Firefly.png` is 1.17MB - too large for a hero image
- No image optimization in build process

## Quick Fixes Applied
1. ✅ Added image preloading in `index.html`
2. ✅ Added loading state with placeholder in Hero component
3. ✅ Added fade-in transition for smoother loading

## Recommended Actions

### 1. Optimize Hero Image (CRITICAL)
The hero image should be optimized for web:

**Option A: Use Online Tools**
- Go to https://tinypng.com or https://squoosh.app
- Upload `frontend/public/images/Firefly.png`
- Download optimized version (should be ~200-400KB)
- Replace the original file

**Option B: Use ImageMagick (if installed)**
```bash
# Convert to WebP (better compression)
magick frontend/public/images/Firefly.png -quality 85 -resize 1920x1080 frontend/public/images/Firefly.webp

# Or optimize PNG
magick frontend/public/images/Firefly.png -quality 85 -resize 1920x1080 frontend/public/images/Firefly-optimized.png
```

**Option C: Use Sharp (Node.js)**
```bash
npm install --save-dev sharp
```

Then create `scripts/optimize-images.js`:
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = 'frontend/public/images/Firefly.png';
const outputPath = 'frontend/public/images/Firefly-optimized.webp';

sharp(inputPath)
  .resize(1920, 1080, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile(outputPath)
  .then(() => console.log('✅ Image optimized!'))
  .catch(err => console.error('❌ Error:', err));
```

Run: `node scripts/optimize-images.js`

### 2. Use Modern Image Formats
WebP provides 25-35% better compression than PNG/JPEG:

Update Hero.jsx to use WebP with PNG fallback:
```jsx
<div 
  className="absolute inset-0 w-full h-full"
  style={{
    backgroundImage: 'url(/images/Firefly.webp), url(/images/Firefly.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
```

### 3. Implement Responsive Images
Serve different sizes for different devices:

```jsx
<picture>
  <source 
    media="(max-width: 768px)" 
    srcSet="/images/Firefly-mobile.webp" 
  />
  <source 
    media="(max-width: 1200px)" 
    srcSet="/images/Firefly-tablet.webp" 
  />
  <img 
    src="/images/Firefly.webp" 
    alt="Hero" 
    className="w-full h-full object-cover"
  />
</picture>
```

### 4. Add Image CDN (Advanced)
Consider using Cloudinary or imgix for automatic optimization:
- Automatic format conversion (WebP, AVIF)
- Automatic resizing
- CDN delivery
- Lazy loading

### 5. Enable Compression in Nginx
Add to your Nginx config:
```nginx
# Enable gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json image/svg+xml;

# Enable Brotli (if available)
brotli on;
brotli_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json image/svg+xml;
```

## Performance Targets
- Hero image: < 300KB
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s

## Testing
After optimization, test with:
- Chrome DevTools Lighthouse
- https://pagespeed.web.dev
- https://gtmetrix.com

## Current Status
✅ Preloading added
✅ Loading state added
⚠️ Image still needs compression (1.17MB → ~300KB target)
