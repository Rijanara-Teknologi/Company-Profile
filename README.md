# PT Rijanara Inovasi Teknologi - Company Profile Website

🚀 **Modern, responsive, and SEO-optimized company profile built with Tailwind CSS**

## 🎯 Project Overview

This is a fully refactored static website for PT Rijanara Inovasi Teknologi, featuring:
- ✅ 100% Tailwind CSS utilities (no legacy CSS)
- ✅ Modern interactive effects (parallax, 3D tilt, smooth scroll)
- ✅ Fully responsive (320px - 1536px+)
- ✅ Accessibility-focused (WCAG compliant)
- ✅ SEO-ready with complete meta tags and structured data
- ✅ Performance optimized with modular JavaScript

## 🛠️ Tech Stack

- **CSS Framework**: Tailwind CSS 3.4+
- **Build Tool**: Tailwind CLI
- **JavaScript**: Vanilla ES6 Modules
- **Hosting**: Netlify-ready (form handler included)

## 📦 Project Structure

```
/
├── assets/
│   └── js/
│       ├── main.js           # Main initialization
│       ├── smooth-scroll.js  # Smooth scrolling
│       ├── parallax.js       # Parallax effects
│       ├── tilt.js           # 3D tilt hover
│       └── reveal.js         # Scroll reveal animations
├── dist/
│   └── output.css            # Compiled Tailwind CSS (19KB minified)
├── index.html                # Main HTML file (100% Tailwind)
├── input.css                 # Tailwind source with custom utilities
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
├── package.json              # Dependencies and scripts
├── robots.txt                # SEO robots file
├── sitemap.xml               # XML sitemap
└── README.md                 # This file
```

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Development mode (watch for changes)
npm run dev

# Production build (minified)
npm run build
```

### Opening the Website

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000
```

Visit: `http://localhost:8000`

## 🎨 Brand Colors

Defined in `tailwind.config.js`:

- **brand-cyan**: `#00D4FF` - Primary accent
- **brand-blue**: `#0055FF` - Primary dark
- **brand-dark**: `#0f172a` - Background
- **brand-darker**: `#020617` - Darker sections
- **brand-card**: `#1e293b` - Card backgrounds
- **brand-border**: `#334155` - Borders

## ✨ Features

### 🎭 Modern Interactions

1. **Smooth Scroll**: Enhanced scrolling with `scroll-behavior: smooth` + JS enhancements
2. **Parallax Effects**: Decorative elements with layered parallax (disabled on mobile/reduced-motion)
3. **3D Tilt Hover**: Service and product cards with 3D tilt effect (desktop only)
4. **Scroll Reveal**: Elements fade and slide in as you scroll
5. **Sticky Navbar**: Navbar with blur effect on scroll

### ♿ Accessibility Features

- Respects `prefers-reduced-motion` preference
- Touch-safe (no hover effects on mobile)
- Keyboard navigation support
- ARIA labels and attributes
- Focus-visible states on all interactive elements
- Minimum 44px touch targets

### 📱 Responsive Design

Tested and optimized for:
- 📱 Mobile: 320px, 375px, 425px
- 📱 Tablet: 768px, 1024px
- 💻 Desktop: 1280px, 1536px+

### 🔍 SEO Optimization

- ✅ Complete meta tags (description, robots, canonical)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ JSON-LD structured data (Organization schema)
- ✅ Semantic HTML with proper heading hierarchy
- ✅ robots.txt and sitemap.xml
- ✅ Lazy loading for images (except hero)
- ✅ Optimized page load performance

## 🧩 JavaScript Modules

### Module: `smooth-scroll.js`
Handles smooth scrolling for anchor links with offset for sticky navbar.

### Module: `parallax.js`
Implements parallax scrolling on decorative elements:
- Uses IntersectionObserver for performance
- Only updates visible elements
- Disabled on touch devices and reduced-motion

### Module: `tilt.js`
3D tilt effect on cards:
- Only active on desktop (`pointer: fine`)
- Includes glare overlay effect
- Disabled on touch and reduced-motion
- Uses requestAnimationFrame for smooth updates

### Module: `reveal.js`
Scroll-triggered reveal animations:
- Opacity and translateY transitions
- Supports staggered delays via `data-reveal-delay`
- Respects reduced-motion preference

### Module: `main.js`
Initializes all modules and handles:
- Mobile menu toggle
- Active link highlighting
- FAQ accordion
- Contact form validation (Gmail only)
- Toast notifications

## 🎯 Data Attributes

Elements use data attributes for JavaScript targeting:

- `data-navbar` - Navbar element
- `data-mobile-menu-btn` - Mobile menu toggle button
- `data-nav-links` - Navigation links container
- `data-nav-link` - Individual nav link
- `data-reveal` - Elements to reveal on scroll
- `data-reveal-delay="100"` - Delay in milliseconds
- `data-tilt` - Elements with 3D tilt effect
- `data-parallax-layer="0.3"` - Parallax speed (0.1-1.0)
- `data-accordion-btn` - FAQ accordion buttons

## 📋 Customization

### Changing Brand Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  brand: {
    blue: '#YOUR_COLOR',
    cyan: '#YOUR_COLOR',
    // ...
  }
}
```

Then rebuild: `npm run build`

### Adding New Sections

1. Add HTML with Tailwind classes to `index.html`
2. Add `data-reveal` attribute for scroll animation
3. Rebuild CSS if using new utilities

### Modifying Animations

Edit `input.css` keyframes section:

```css
@keyframes yourAnimation {
  /* ... */
}
```

## 🧪 Testing Checklist

- [ ] No horizontal scroll on mobile (320px)
- [ ] All links work correctly
- [ ] Form validation works (Gmail-only)
- [ ] Tilt effect only on desktop
- [ ] Parallax disabled on mobile
- [ ] Reduced-motion disables animations
- [ ] FAQ accordion expands/collapses
- [ ] Mobile menu toggles correctly
- [ ] All images load correctly
- [ ] Meta tags present in `<head>`

## 📝 Build Output

Production build generates:
- `dist/output.css` - Minified Tailwind CSS (~19KB)
- Purged of unused styles
- Autoprefixed for browser compatibility

## 🌐 Deployment

### Netlify

1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `.` (root)
4. Form submissions will work automatically via Netlify Forms

### Other Hosts

Simply upload all files to your web host. No server-side processing required.

## 📄 License

© 2026 PT Rijanara Inovasi Teknologi. All rights reserved.

## 🤝 Support

For questions or support:
- Email: hello@rijanara.com
- CS: rijanarainovasiteknologi@gmail.com

---

**Built with ❤️ using Tailwind CSS**
