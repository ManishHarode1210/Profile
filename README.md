# Manish Harode — Portfolio Architecture & Design Document

Welcome to the technical architecture and design documentation for the personal portfolio of **Manish Harode (AI Developer & Software Engineer)**. This document outlines the project structure, design system, interactive scripts, and performance strategies that power the high-tech, futuristic portfolio.

---

## 📂 Directory Structure

The project follows a modular, clean, and static web architecture, separating structural content, dynamic styling, and interactive JavaScript modules:

```text
Manish/
├── .vscode/               # Workspace-specific editor settings
├── assets/
│   └── images/            # Developer portrait and project preview assets
├── css/
│   └── style.css          # Core stylesheet containing the responsive design system
├── js/                    # Modular JavaScript layers
│   ├── certs.js           # Certificate filtering, spotlight hover, & blueprint modal
│   ├── contact.js         # Contact form validation & submission handler
│   ├── counter.js         # Scroll-based count-up telemetry
│   ├── cursor.js          # Interactive custom cursor (dot & ring)
│   ├── mobile-menu.js     # Responsive navigation toggle & accessibility wrapper
│   ├── nav.js             # Scroll progress, HUD UTC clock & ping simulator
│   ├── neural.js          # Main canvas-based interactive neural network background
│   ├── parallax.js        # Mouse and scroll-based depth movement
│   ├── project-neural.js  # Dedicated neural overlays inside project cards
│   ├── reveal.js          # Intersection Observer scroll-reveal animations
│   ├── skills-hud.js      # Interactive skill hover HUD diagnostic terminal
│   ├── tilt.js            # 3D hover tilt effects
│   └── typing.js          # Hero terminal typing animation
├── index.html             # Main entry point and markup structure
└── README.md              # Project architecture & documentation (This file)
```

---

## 🏗️ Architecture Design & Flow

```mermaid
graph TD
    index.html[index.html <br> Semantic Markup & DOM structure]
    style.css[style.css <br> Glassmorphism & Custom Properties CSS Variables]

    subgraph "Visual & Ambient FX"
        neural.js[neural.js <br> Global interactive particle network]
        cursor.js[cursor.js <br> Custom cursor dot & ring]
        parallax.js[parallax.js <br> Depth motion layers]
    end

    subgraph "Interactive UI Components"
        skills-hud.js[skills-hud.js <br> Diagnostic Terminal console]
        certs.js[certs.js <br> Spotlight Glow & holographic certificates modal]
        project-neural.js[project-neural.js <br> Individual hover-triggered canvas overlays]
        tilt.js[tilt.js <br> 3D transform card tilt]
        typing.js[typing.js <br> Terminal mock typist]
        counter.js[counter.js <br> Stats count-up]
        reveal.js[reveal.js <br> Element entrance triggers]
        nav.js[nav.js <br> HUD clock, fake ping, & scroll progress]
    end

    index.html --> style.css
    index.html --> Visual & Ambient FX
    index.html --> Interactive UI Components
```

---

## 🎨 Core Design System (`style.css`)

The portfolio implements a premium **Dark Sci-Fi Cyberpunk / Glassmorphic** theme utilizing modern CSS custom properties (variables) for theme management and cohesive styling:

### 1. Color Palette Tokens
- **Primary Backgrounds**: `--bg-dark` (`#030712` - Pitch black) and `--bg-card` (`rgba(17, 24, 39, 0.4)` - Semitransparent obsidian).
- **Accents**: 
  - `--cyan` (`#00d4ff`) - Cyber-diagnostic cyan.
  - `--purple` (`#8b5cf6`) - Amethyst purple.
  - `--green` (`#10b981`) - Success/Verified operational green.
  - `--blue` (`#3b82f6`) - Azure platform highlight.
- **Borders**: `--border-glow` (`rgba(0, 212, 255, 0.15)`) for subtle cybernetic outlines.

### 2. Typographical Hierarchy
Fonts are loaded dynamically from Google Fonts to reinforce the developer-engineer aesthetic:
- **Primary Headers**: `Outfit`, sans-serif (Clean, wide geometric structures).
- **Body Text**: `Inter`, sans-serif (Highly readable, neutral).
- **Diagnostics/HUD**: `JetBrains Mono`, monospace (Technical code blocks & console output).

### 3. Glassmorphic Rules & Overlays
- **Backdrop Filters**: Header bars and dialog boxes use `backdrop-filter: blur(16px)` and border highlights to simulate futuristic frosted interfaces.
- **Ambient Overlays**: A CSS-based `.noise-overlay` combined with linear-gradient scanlines gives the feeling of physical CRT screens or military-grade diagnostics panels.

---

## ⚡ JavaScript Modules & Interactive Features

JavaScript is authored in **Modular Vanilla ES6+** utilizing IIFEs (Immediately Invoked Function Expressions) to avoid global namespace pollution.

### 1. The Global Neural Grid (`neural.js`)
- Deploys a Fullscreen `<canvas>` representing an interconnected system of `120` moving particles.
- Real-time mouse tracking calculates distance matrices to draw dynamic linear gradients (`--cyan` to `--purple`) between particles.
- Implements a mouse repulsion physics vector to gently push particles away from the cursor when within `120px` radius.

### 2. Interactive Skills HUD Console (`skills-hud.js`)
- Monitors hover actions on `.skill-node` items.
- Upon focus/hover, pauses the scrolling ambient log buffer and triggers a **decoding cipher animation** on the diagnostic panel.
- Outputs rich telemetry fields including Level, Layer Category, Custom Hex Strings (`data-hex`), Status Pills, and a description letter-by-letter typing animation.
- Restores an active scrolling loop of system diagnostics when the console becomes idle.

### 3. Certifications Holographic Modal (`certs.js`)
- **Interactive Spotlight**: Updates CSS variables `--mouse-x` and `--mouse-y` dynamically to generate cursor-bound radial gradients on cards.
- **Holographic Blueprint Modal**: Instantiates an SVG cloning tool that replicates the specific certification authority logo, displays telemetry details, and triggers a text-decryption scanner effect on the modal title.

### 4. Card Neural Overlays (`project-neural.js`)
- Each project card mounts an isolated canvas.
- Canvas rendering only activates on `mouseenter` and terminates on `mouseleave` to optimize browser rendering loops, preventing unnecessary GPU overhead.

### 5. Utilities & UI Polish
- **`nav.js`**: Drives scroll-progress meters, highlights active anchor links based on window position, and updates telemetry timestamps (UTC and simulated server ping).
- **`counter.js`**: Harnesses the `IntersectionObserver` API to execute fluid count-up animations for portfolio statistics (`750+ DSA Problems`, etc.).
- **`reveal.js`**: Orchestrates entry animations as items enter the viewport.
- **`tilt.js`**: Computes mouse coordinate percentage offsets inside cards to apply dynamic `perspective(1000px) rotateX(...) rotateY(...)` transformations.

---

## 🚀 Performance & Optimization Strategies

- **Active Event Listener Optimization**: Uses passive event listeners where applicable (e.g., scroll/resize actions) to bypass main-thread blocking.
- **GPU Acceleration**: Heavy transformations, card rotations (`tilt.js`), and neural canvases use hardware-accelerated CSS properties (`transform: translate3d(...)` / `will-change`).
- **Conditional Animation Loops**: Canvas renders are only run while elements are visible or focused (saving processor cycles on background tabs).
- **Lazy Loading**: Images inside project and certificate grids are set to `loading="lazy"` to defer network consumption.

---

## 🔍 SEO & Accessibility (a11y) Integration

- **Semantic HTML5**: Styled entirely with semantic elements (`<nav>`, `<section>`, `<article>`, `<footer>`).
- **ARIA Compatibility**: Interactive components implement `role="dialog"`, `role="list"`, `aria-modal="true"`, `aria-label`, and `aria-hidden="true"` (for decorative graphics/canvases).
- **SEO Readiness**: Metadata tags, schema details, unique IDs (`id="contact-form"`, etc.), and search keywords are embedded to ensure maximum crawability.
#   P r o f i l e  
 