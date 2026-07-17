# RECOVERY PLUS — Landing Page

A production-ready landing page for **RECOVERY PLUS** high-pressure compression boots, built with vanilla HTML, CSS, and JavaScript. The visual design faithfully reproduces the source design draft and adds:

- Scroll-triggered reveal animations
- Sticky navigation with shrink-on-scroll
- Mobile drawer menu with full keyboard / focus management
- FAQ accordion with smooth transitions
- Product quick-view modal
- Cart drawer with quantity controls and localStorage persistence
- Search overlay
- Testimonial horizontal carousel (drag + buttons + keyboard)
- Press-to-compare comparison table with sticky header
- Cookie / newsletter banner
- Reduced-motion and color-scheme preference support
- Fully responsive (mobile / tablet / desktop / ultra-wide)

## Project structure

```
recovery-plus/
├── index.html         # All sections, semantic markup
├── css/
│   └── main.css       # Design tokens, layout, components, responsive
├── js/
│   └── main.js        # Interactions, observers, state
├── assets/            # Product / lifestyle imagery
├── package.json       # Convenience scripts (`npm start`)
└── README.md
```

## Run locally

The project is fully static — open `index.html` directly, or run a tiny server:

```bash
# Option 1: any static server
npx http-server . -p 8080 -c-1

# Option 2: Python
python3 -m http.server 8080

# Then open http://localhost:8080
```

If you prefer the bundled script:

```bash
npm start
```

## Browser support

Tested in the latest two versions of Chrome, Edge, Firefox, and Safari. Uses `backdrop-filter`, `aspect-ratio`, `scroll-snap`, and CSS variables — all widely supported in modern browsers.
