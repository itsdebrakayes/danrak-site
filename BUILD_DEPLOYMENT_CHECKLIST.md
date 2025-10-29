# Build & Deployment Checklist ✅

## Summary of Changes for Production Build

All assets have been properly configured to work in production builds using ES6 module imports and Vite's bundling system.

---

## ✅ Completed Fixes

### 1. **Image Import System** (`src/assets/images.ts`)
- ✅ Created centralized image imports file
- ✅ All images imported as ES6 modules (not string paths)
- ✅ Organized by service category for maintainability
- ✅ Includes all image types: PNG, JPG, JPEG, MP4, MOV

### 2. **Project Data** (`src/data/projects.ts`)
- ✅ Updated to use imported images from `@/assets/images`
- ✅ All service images (image, carouselImage, backgroundImage) use imports
- ✅ All gallery images use imported arrays
- ✅ All newspaper clippings use imported images
- ✅ Removed all `/src/assets/...` string paths

### 3. **Vite Build Configuration** (`vite.config.ts`)
- ✅ Added build optimization for asset organization
- ✅ Images output to `assets/images/` folder
- ✅ Videos output to `assets/videos/` folder
- ✅ Automatic hash naming for cache busting

### 4. **Page Components**
- ✅ Home.tsx - Uses ES6 imports for hero images
- ✅ About.tsx - Uses ES6 imports for about section images
- ✅ Showcase.tsx - Uses project data (which now has ES6 imports)
- ✅ ProjectDetails.tsx - Renders images from project data correctly

---

## 🎯 What This Fixes

### Before (Broken in Production):
```typescript
image: "/src/assets/corporate-comms-image.png"  // ❌ Won't work after build
```

### After (Works in Production):
```typescript
import corporateCommsImage from './corporate-comms-image.png';
// ...
image: corporateCommsImage  // ✅ Vite bundles and rewrites path
```

---

## 📦 What Happens During Build

1. **`npm run build`** or **`bun run build`**
   - Vite processes all ES6 imports
   - Images/videos are copied to `dist/assets/images/` and `dist/assets/videos/`
   - Files are hashed (e.g., `hero-portrait-abc123.png`)
   - All references are automatically updated

2. **Result in `dist/` folder:**
   ```
   dist/
   ├── index.html (with updated asset references)
   ├── assets/
   │   ├── index-xyz789.js (all your JS code)
   │   ├── index-abc456.css (all your CSS)
   │   ├── images/
   │   │   ├── corporate-comms-image-def123.png
   │   │   ├── hero-portrait-ghi456.png
   │   │   └── ... (all images with hashes)
   │   └── videos/
   │       ├── MOEY-Trend-Content-jkl789.mp4
   │       └── ... (all videos with hashes)
   ```

---

## 🚀 Deployment Instructions

### Upload to Your Hosting Platform:

1. **Build the project:**
   ```bash
   npm run build
   # or
   bun run build
   ```

2. **Upload the `dist/` folder contents:**
   - Upload **everything** inside the `dist/` folder to your `public_html` (or root web directory)
   - **DO NOT** upload the `dist` folder itself, upload its **contents**
   - Your hosting root should have: `index.html`, `assets/`, etc.

3. **Verify on your live site:**
   - All images should load correctly
   - All videos should play
   - YouTube embeds will work (they use external URLs)
   - Newspaper clippings should be clickable and display images

---

## ✅ Assets Verified

### Service Carousel Images:
- ✅ Corporate Communications (image, carousel, background)
- ✅ Campaign Development (image, carousel, background)
- ✅ Project & Event Planning (image, carousel, background)
- ✅ Video & TV Production (image, carousel, background)
- ✅ On-Air Talent (image, carousel, background)

### Gallery Images (All Events):
- ✅ Access Financial Services gallery (8 images)
- ✅ Ministry of Education gallery (5 images)
- ✅ Port Authority gallery (5 images)
- ✅ TREND Campaign gallery (11 items including video)
- ✅ EU/Jamaica Citizen Security gallery (6 images)
- ✅ AFS Marcus James Scholarship gallery (10 images)
- ✅ AFS 25th Anniversary Gala gallery (12 images)
- ✅ On-Air Hosting gallery (19 items including videos)
- ✅ Stronger Together web-series (3 videos)
- ✅ MOEY videos (1 video)

### Featured Content:
- ✅ It's A Woman's World (YouTube embed + header image)
- ✅ All newspaper clippings (13 images with external links)

### Hero & About Pages:
- ✅ Hero portrait image
- ✅ DanRak logo
- ✅ About section leaning image

---

## 🎬 Media Types Handled

- ✅ **Images**: PNG, JPG, JPEG
- ✅ **Videos**: MP4, MOV, WEBM
- ✅ **External Videos**: YouTube embeds (use external URLs - no bundling needed)
- ✅ **External Links**: Newspaper article URLs (external - no bundling needed)

---

## 🔍 Testing Checklist

After deployment, verify:

- [ ] Homepage hero image loads
- [ ] About page image loads
- [ ] Showcase carousel shows all 5 services with images
- [ ] Each service detail page shows:
  - [ ] Header image
  - [ ] Service description (with bold text)
  - [ ] Gallery images/videos
  - [ ] Newspaper clippings (if applicable)
  - [ ] YouTube videos (if applicable)
- [ ] All images are sharp and properly sized
- [ ] Videos play correctly
- [ ] No broken image icons
- [ ] All "Read Article" links on newspaper clippings work

---

## 🆘 If Images Still Don't Load

1. **Check browser console** (F12) for 404 errors
2. **Verify folder structure** in hosting:
   - Should have `assets/images/` folder
   - Should have `assets/videos/` folder
3. **Check file permissions** on hosting (should be 644 for files, 755 for folders)
4. **Clear browser cache** and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
5. **Verify you uploaded the `dist/` contents**, not the `dist/` folder itself

---

## ✨ Additional Optimizations

- ✅ Hash-based filenames for automatic cache busting
- ✅ Organized asset folders (images/ and videos/ separation)
- ✅ Preloading of critical images for better performance
- ✅ Lazy loading support for gallery images

---

**Last Updated:** Build verified for production deployment
**Status:** ✅ Ready for production
