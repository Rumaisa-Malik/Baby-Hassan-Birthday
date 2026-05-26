# Premium Cinematic Birthday Surprise Website for Hassan 💙

An elegant, emotional, and responsive birthday surprise website designed for a baby boy named Hassan. Featuring a dreamy light-blue aesthetic, premium glassmorphic cards, drifting cartoon clouds, twinkling stars, and interactive hardware-accelerated animations.

---

## ✨ Key Features
1. **Interactive Magical Intro**: Opens with a full-screen starry sky and a centered, 3D-styled animated pulsing gift box 🎁. Tap the box to unlock the surprise!
2. **Confetti Blast Celebration**: Fires a gorgeous multi-directional canvas-confetti explosion instantly when opened.
3. **Dreamy Audio Control & Synth Fallback**: 
   - Music begins immediately on opening the box.
   - If `lullaby.mp3` is missing or fails, a **Web Audio API dreamy bell synthesizer** automatically starts playing a soothing chime lullaby ("Twinkle Twinkle Little Star" melody with soft echo effects).
   - Includes a floating glassmorphic mute/unmute control.
4. **Animated Cartoon Backdrop**: Continuous floating balloons rise, cute vector clouds drift at custom speeds, and stars twinkle in the background.
5. **Interactive Carousel/Grid Photo Gallery**: Exactly 8 premium rounded card slots with lift-up hover animations.
6. **Graceful SVG Illustration Engine**: If images are missing, it automatically swaps broken image boxes with beautiful animated baby-themed vector drawings.
7. **Mobile Optimized**: Fully responsive across mobile, tablet, and desktop viewports.

---

## 📁 File Structure
```text
Baby-Hassan-Birthday/
│
├── index.html       # Structured semantic markup, overlays, CDN hooks
├── style.css        # Premium typography, glassmorphism, keyframe animations
├── script.js        # Synthesizer fallback, typewriter, spawner logic
├── lullaby.mp3      # Place your custom background audio here (Optional)
│
└── images/          # Place your 8 gallery photos here
    ├── README.md    # Instructions on naming images (1.jpg to 8.jpg)
    ├── 1.jpg
    ├── 2.jpg
    └── ...
```

---

## 🚀 How to Run Locally

1. **Launch Website**: Simply double-click the `index.html` file or run a local server (e.g. VS Code Live Server or python HTTP server).
2. **Adding Custom Music**: Place any MP3 lullaby in the root directory and rename it to `lullaby.mp3`.
3. **Adding Custom Photos**: Place up to 8 square baby photos inside the `images/` folder and name them `1.jpg` to `8.jpg` (or `.jpeg`).

---

## 🛠️ Built With
- **HTML5** & **CSS3** (Vanilla for custom precision, hardware-accelerated transforms)
- **JavaScript** (Vanilla)
- **Canvas-Confetti** (Premium interactive canvas effects)
- **Web Audio API** (Procedural bell synth fallback)
- **Google Fonts** (*Outfit* & *Quicksand*)
