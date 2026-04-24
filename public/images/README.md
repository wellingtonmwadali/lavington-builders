# Image Assets

Add your project images here. The folders are organized as follows:

## Folder Structure

### `/hero/`
Add main hero/banner images:
- `hero-main.jpg` - Main homepage hero image
- Recommended size: 1920x1080px (landscape)

### `/projects/`
Add individual project images:
- `lavington-residence.jpg`
- `westlands-office.jpg`
- `karen-villa.jpg`
- etc.
- Recommended size: 800x600px or similar

### `/services/`
Add service-related images (optional):
- Icons or photos representing each service
- Recommended size: 400x400px (square)

## Image Guidelines

1. **Format**: Use `.jpg` for photos, `.png` for graphics with transparency
2. **Optimization**: Compress images before adding (use tools like TinyPNG)
3. **Naming**: Use lowercase, hyphens instead of spaces (e.g., `project-name.jpg`)
4. **Alt Text**: Always provide descriptive alt text in the code

## How to Use in Code

Replace Unsplash URLs in `src/app/App.tsx`:

**Before:**
```jsx
img: 'https://images.unsplash.com/photo-1600585154340-...'
```

**After:**
```jsx
img: '/images/projects/lavington-residence.jpg'
```

Vite will automatically serve files from the `public` folder at the root URL.
