/* ==========================================================================
   DREAMY LIGHT BLUE BIRTHDAYSURPRISE - SCRIPT.JS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. INITIATION & SETUP
    document.body.classList.add("no-scroll");
    generateStars("intro-stars-bg", 45); // Twinkling stars for intro
    generateStars("stars-bg", 95);       // Increased star count for richer background prominence
    generateClouds();                    // Slow drifting background clouds

    // DOM Selection
    const introOverlay = document.getElementById("intro-overlay");
    const giftBox = document.getElementById("gift-box");
    const mainContent = document.getElementById("main-content");
    const musicToggle = document.getElementById("music-toggle");
    const iconSoundOn = document.getElementById("icon-sound-on");
    const iconSoundOff = document.getElementById("icon-sound-off");

    // Audio & Synthesizer State
    let audioPlayed = false;
    let isMuted = false;
    let mainAudio = null;
    let synthIntervalId = null;
    let audioCtx = null;
    let delayNode = null;
    let feedbackNode = null;
    let masterVolume = null;

    // 2. SURPRISE GIFT OPENING INTERACTION
    giftBox.addEventListener("click", () => {
        // Prevent double triggers
        if (audioPlayed) return;
        audioPlayed = true;

        // Perform instant stunning multi-burst confetti celebration
        triggerPremiumConfetti();

        // Smooth fade-out of intro overlay and fade-in of main content
        introOverlay.classList.add("fade-out");
        mainContent.classList.remove("hidden");
        document.body.classList.remove("no-scroll");

        // Remove overlay from DOM after animation completes to free resources
        setTimeout(() => {
            introOverlay.remove();
        }, 1200);

        // Start dynamic interactive systems
        startTypewriter();
        startBalloonSpawning();
        initializeAudio();
    });

    // 3. CANVAS-CONFETTI CELEBRATION
    function triggerPremiumConfetti() {
        const count = 200;
        const defaults = {
            origin: { y: 0.6 },
            colors: ['#38bdf8', '#bae6fd', '#0284c7', '#ffffff', '#fef08a']
        };

        function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }

        // Beautiful multi-staged celebration sequence
        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });

        // Extra delayed burst from both bottom corners for cinematic touch
        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.8 },
                colors: ['#38bdf8', '#bae6fd', '#fef08a']
            });
        }, 300);

        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.8 },
                colors: ['#38bdf8', '#bae6fd', '#fef08a']
            });
        }, 450);
    }

    // 4. MUSIC MANAGER & WEB AUDIO API LULLABY FALLBACK SYNTH
    function initializeAudio() {
        mainAudio = new Audio("lullaby.mp3");
        mainAudio.loop = true;
        mainAudio.volume = 0.55;

        // Attempt playback of local lullaby.mp3
        mainAudio.play().then(() => {
            console.log("lullaby.mp3 loaded and playing successfully.");
        }).catch(err => {
            // Audio context / file issue. Initialize synthesized bell lullaby fallback
            console.warn("lullaby.mp3 not found or blocked. Initializing gorgeous Web Audio bell synthesizer fallback...", err);
            startSynthLullaby();
        });

        // Set up interactive mute/unmute control
        musicToggle.addEventListener("click", toggleMusic);
    }

    function toggleMusic() {
        if (!audioPlayed) return;

        isMuted = !isMuted;
        
        if (isMuted) {
            // Mute standard audio
            if (mainAudio) mainAudio.muted = true;
            // Mute Synthesizer
            if (masterVolume) masterVolume.gain.setValueAtTime(0, audioCtx.currentTime);
            
            iconSoundOn.classList.add("hidden");
            iconSoundOff.classList.remove("hidden");
        } else {
            // Unmute standard audio
            if (mainAudio) {
                mainAudio.muted = false;
                mainAudio.play().catch(() => {}); // Re-trigger play if paused
            }
            // Unmute Synthesizer
            if (masterVolume) masterVolume.gain.setValueAtTime(0.12, audioCtx.currentTime);
            
            iconSoundOff.classList.add("hidden");
            iconSoundOn.classList.remove("hidden");
        }
    }

    // WEB AUDIO API DREAMY BELL SYNTHESIZER
    function startSynthLullaby() {
        try {
            // Create AudioContext
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();

            // Dreamy echo/delay setup
            delayNode = audioCtx.createDelay(1.0);
            feedbackNode = audioCtx.createGain();
            masterVolume = audioCtx.createGain();

            // Low volume for gentle bell atmosphere
            masterVolume.gain.setValueAtTime(isMuted ? 0 : 0.12, audioCtx.currentTime);

            // Delay time (ideal for dreamy bell resonance)
            delayNode.delayTime.setValueAtTime(0.4, audioCtx.currentTime);
            feedbackNode.gain.setValueAtTime(0.5, audioCtx.currentTime);

            // Feedback loop wiring
            delayNode.connect(feedbackNode);
            feedbackNode.connect(delayNode);

            // Main routing: Synth -> Master -> Delay -> Destination & Synth -> Master -> Destination
            masterVolume.connect(audioCtx.destination);
            masterVolume.connect(delayNode);
            delayNode.connect(audioCtx.destination);

            // Cheerful, Up-tempo "You Are My Sunshine" melody with automatic duet harmonies!
            // Frequencies map: D4=293.66, G4=392.00, A4=440.00, B4=493.88, C5=523.25, D5=587.33, E5=659.25, F5=698.46, G5=783.99
            const notes = [
                { note: "D4", freq: 293.66, harm: 246.94, dur: 1.0 }, // You (B3 harm)
                { note: "G4", freq: 392.00, harm: 493.88, dur: 1.0 }, // are (B4 harm)
                { note: "A4", freq: 440.00, harm: 523.25, dur: 1.0 }, // my (C5 harm)
                { note: "B4", freq: 493.88, harm: 587.33, dur: 1.5 }, // sun- (D5 harm)
                { note: "B4", freq: 493.88, harm: 587.33, dur: 0.5 }, // -shine
                { note: "B4", freq: 493.88, harm: 587.33, dur: 1.0 }, // my
                { note: "A4", freq: 440.00, harm: 523.25, dur: 1.0 }, // on-
                { note: "B4", freq: 493.88, harm: 587.33, dur: 1.0 }, // -ly
                { note: "G4", freq: 392.00, harm: 493.88, dur: 2.0 }, // sunshine
                { note: "G4", freq: 392.00, harm: 311.13, dur: 1.0 }, // (rest / breath)

                { note: "G4", freq: 392.00, harm: 493.88, dur: 1.0 }, // You
                { note: "A4", freq: 440.00, harm: 523.25, dur: 1.0 }, // make
                { note: "B4", freq: 493.88, harm: 587.33, dur: 1.0 }, // me
                { note: "C5", freq: 523.25, harm: 659.25, dur: 1.5 }, // hap- (E5 harm)
                { note: "E5", freq: 659.25, harm: 783.99, dur: 0.5 }, // -py (G5 harm)
                { note: "E5", freq: 659.25, harm: 783.99, dur: 1.0 }, // when
                { note: "D5", freq: 587.33, harm: 698.46, dur: 1.0 }, // skies (F5 harm)
                { note: "C5", freq: 523.25, harm: 659.25, dur: 1.0 }, // are
                { note: "B4", freq: 493.88, harm: 587.33, dur: 2.0 }, // grey
                { note: "G4", freq: 392.00, harm: 311.13, dur: 1.0 }, // (rest / breath)

                { note: "G4", freq: 392.00, harm: 493.88, dur: 1.0 }, // You'll
                { note: "A4", freq: 440.00, harm: 523.25, dur: 1.0 }, // ne-
                { note: "B4", freq: 493.88, harm: 587.33, dur: 1.0 }, // -ver
                { note: "C5", freq: 523.25, harm: 659.25, dur: 1.5 }, // know
                { note: "E5", freq: 659.25, harm: 783.99, dur: 0.5 }, // dear
                { note: "E5", freq: 659.25, harm: 783.99, dur: 1.0 }, // how
                { note: "D5", freq: 587.33, harm: 698.46, dur: 1.0 }, // much
                { note: "C5", freq: 523.25, harm: 659.25, dur: 1.0 }, // I
                { note: "G4", freq: 392.00, harm: 493.88, dur: 2.0 }, // love
                { note: "G4", freq: 392.00, harm: 311.13, dur: 1.0 }, // you (rest / breath)

                { note: "G4", freq: 392.00, harm: 493.88, dur: 1.0 }, // Please
                { note: "A4", freq: 440.00, harm: 523.25, dur: 1.0 }, // don't
                { note: "B4", freq: 493.88, harm: 587.33, dur: 1.0 }, // take
                { note: "C5", freq: 523.25, harm: 659.25, dur: 1.5 }, // my
                { note: "A4", freq: 440.00, harm: 523.25, dur: 0.5 }, // sun-
                { note: "A4", freq: 440.00, harm: 523.25, dur: 1.0 }, // -shine
                { note: "B4", freq: 493.88, harm: 587.33, dur: 1.0 }, // a-
                { note: "G4", freq: 392.00, harm: 493.88, dur: 2.0 }, // -way
                { note: "G4", freq: 392.00, harm: 311.13, dur: 2.0 }  // (outro rest)
            ];

            let noteIndex = 0;
            const tempo = 520; // Cheerful tempo: 520ms per beat for a playful, bouncier rhythm

            function playNote() {
                if (isMuted) {
                    const nextTime = notes[noteIndex].dur * tempo;
                    noteIndex = (noteIndex + 1) % notes.length;
                    synthIntervalId = setTimeout(playNote, nextTime);
                    return;
                }

                const currentNote = notes[noteIndex];
                const now = audioCtx.currentTime;

                // 1. Core Fundamental Chime (Triangle oscillator - warm and gentle)
                const oscMelody = audioCtx.createOscillator();
                const melodyGain = audioCtx.createGain();
                oscMelody.type = "triangle";
                oscMelody.frequency.setValueAtTime(currentNote.freq, now);
                
                // Exponential decay envelope for music-box plucking feel
                melodyGain.gain.setValueAtTime(0.08, now);
                melodyGain.gain.exponentialRampToValueAtTime(0.0001, now + (currentNote.dur * 1.6));

                // 2. High Sparkle Chime (FM Sine wave - 1 octave up for crystal metallic ding)
                const oscSparkle = audioCtx.createOscillator();
                const sparkleGain = audioCtx.createGain();
                oscSparkle.type = "sine";
                oscSparkle.frequency.setValueAtTime(currentNote.freq * 2, now);
                
                sparkleGain.gain.setValueAtTime(0.04, now);
                sparkleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

                // 3. Perfect Duet Harmony (Triangle wave - soft backing 3rd/5th intervals)
                const oscHarmony = audioCtx.createOscillator();
                const harmonyGain = audioCtx.createGain();
                oscHarmony.type = "sine"; // Sine for soft texture backing
                oscHarmony.frequency.setValueAtTime(currentNote.harm, now);
                
                // Softer volume to back the melody beautifully
                harmonyGain.gain.setValueAtTime(0.05, now);
                harmonyGain.gain.exponentialRampToValueAtTime(0.0001, now + (currentNote.dur * 1.5));

                // Connect to master channel
                oscMelody.connect(melodyGain);
                oscSparkle.connect(sparkleGain);
                oscHarmony.connect(harmonyGain);

                melodyGain.connect(masterVolume);
                sparkleGain.connect(masterVolume);
                harmonyGain.connect(masterVolume);

                // Play pluck
                oscMelody.start(now);
                oscSparkle.start(now);
                oscHarmony.start(now);

                // Stop pluck
                oscMelody.stop(now + (currentNote.dur * 1.8));
                oscSparkle.stop(now + 0.9);
                oscHarmony.stop(now + (currentNote.dur * 1.6));

                // Schedule next beat
                const nextTime = currentNote.dur * tempo;
                noteIndex = (noteIndex + 1) % notes.length;
                synthIntervalId = setTimeout(playNote, nextTime);
            }

            // Start nursery duet chime loop
            playNote();
        } catch (e) {
            console.error("Web Audio API duet chime bypassed:", e);
        }
    }

    // 5. HERO TYPING SUBTITLE ANIMATION
    function startTypewriter() {
        const textElement = document.getElementById("typewriter-text");
        const message = "Our little prince deserves all the happiness in the world ✨";
        let index = 0;

        function type() {
            if (index < message.length) {
                textElement.textContent += message.charAt(index);
                index++;
                setTimeout(type, 75); // Professional speed
            }
        }
        type();
    }

    // 6. CONTINUOUS FLOATING BALLOON GENERATOR
    function startBalloonSpawning() {
        const bgContainer = document.getElementById("balloons-bg");
        
        // Initial package of balloons
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                createBalloon(bgContainer);
            }, i * 1200);
        }

        // Continuous spawner loop
        setInterval(() => {
            createBalloon(bgContainer);
        }, 1800);
    }

    function createBalloon(container) {
        if (!container) return;

        const balloon = document.createElement("div");
        balloon.className = "balloon";

        // Randomizing colors: dreamy light blues, sky blues, soft golds, white
        const colors = [
            "rgba(186, 230, 253, 0.72)", // Sky blue light
            "rgba(125, 211, 252, 0.72)", // Mid baby blue
            "rgba(56, 189, 248, 0.72)",  // Deep sky blue
            "rgba(254, 240, 138, 0.72)", // Cozy gold yellow
            "rgba(240, 249, 255, 0.8)",  // Pure soft white
            "rgba(224, 242, 254, 0.75)"  // Pale baby blue
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.backgroundColor = randomColor;
        balloon.style.color = randomColor; // For the knot border-bottom

        // Create the small knot element under balloon
        const knot = document.createElement("div");
        knot.className = "balloon-knot";
        balloon.appendChild(knot);

        // Randomize dimensions
        const sizeWidth = Math.floor(Math.random() * 20) + 38; // 38px to 58px width
        const sizeHeight = sizeWidth * 1.25;                  // Beautiful egg-proportion
        balloon.style.width = `${sizeWidth}px`;
        balloon.style.height = `${sizeHeight}px`;

        // Randomize positioning & drift dynamics
        const leftPos = Math.random() * 92 + 4; // Keep away from screen edges
        balloon.style.left = `${leftPos}%`;

        const duration = Math.random() * 7 + 9; // 9s to 16s float speed
        balloon.style.animationDuration = `${duration}s`;

        const driftDist = (Math.random() * 150 - 75) + "px"; // Sway width
        balloon.style.setProperty("--drift-distance", driftDist);

        const swayRotation = (Math.random() * 25 - 12.5) + "deg"; // Sway angle
        balloon.style.setProperty("--sway-rotation", swayRotation);

        // INTERACTIVE POPPING ACTION
        balloon.addEventListener("pointerdown", (event) => {
            // Prevent duplicate popping clicks
            if (balloon.classList.contains("popped")) return;
            balloon.classList.add("popped");

            // Pop sound chime
            playPopSound();

            // Local confetti burst at exact click coordinate
            const x = event.clientX / window.innerWidth;
            const y = event.clientY / window.innerHeight;
            confetti({
                origin: { x, y },
                particleCount: 20,
                spread: 40,
                startVelocity: 20,
                colors: ['#38bdf8', '#bae6fd', '#fef08a', '#ffffff']
            });

            // Smooth scale puff out animation and immediate removal
            balloon.style.transition = "transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.15s ease";
            balloon.style.transform = "scale(0.1)";
            balloon.style.opacity = "0";

            setTimeout(() => {
                balloon.remove();
            }, 150);
        });

        // Remove element from DOM once it rises above screen
        balloon.addEventListener("animationend", () => {
            balloon.remove();
        });

        container.appendChild(balloon);
    }

    // 7. BACKGROUND CLOUDS & STARS DYNAMIC PLACEMENT
    function generateStars(containerId, count) {
        const container = document.getElementById(containerId);
        if (!container) return;

        for (let i = 0; i < count; i++) {
            const star = document.createElement("div");
            star.className = "star";
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // Randomize size, scale and speed
            const size = Math.random() * 3.5 + 1.5;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            const delay = Math.random() * 5;
            star.style.animationDelay = `${delay}s`;
            
            const duration = Math.random() * 3 + 3;
            star.style.animationDuration = `${duration}s`;

            container.appendChild(star);
        }
    }

    function generateClouds() {
        const container = document.getElementById("clouds-bg");
        if (!container) return;

        // Exactly 5 large decorative cartoon clouds drifting at different levels
        const cloudConfigs = [
            { top: 12, sizeClass: "style-1", speed: 55, delay: 0 },
            { top: 28, sizeClass: "style-2", speed: 85, delay: -20 },
            { top: 48, sizeClass: "style-1", speed: 65, delay: -10 },
            { top: 68, sizeClass: "style-2", speed: 95, delay: -45 },
            { top: 82, sizeClass: "style-1", speed: 75, delay: -5 }
        ];

        cloudConfigs.forEach(cfg => {
            const cloud = document.createElement("div");
            cloud.className = `cloud ${cfg.sizeClass}`;
            cloud.style.top = `${cfg.top}%`;
            cloud.style.animationDuration = `${cfg.speed}s`;
            cloud.style.animationDelay = `${cfg.delay}s`;
            container.appendChild(cloud);
        });
    }

    // 7.5 INTERACTIVE GUESTBOOK & WISH WALL ENGINE
    const defaultWishes = []; // Started empty so you can pin wishes yourself!

    let wishes = [];

    function initGuestbook() {
        // Changed key to v2 to automatically clear original cached wishes in your browser
        const savedWishes = localStorage.getItem("hassan_birthday_wishes_v2");
        if (savedWishes) {
            wishes = JSON.parse(savedWishes);
        } else {
            wishes = [...defaultWishes];
            localStorage.setItem("hassan_birthday_wishes_v2", JSON.stringify(wishes));
        }
        renderWishes();
    }

    function renderWishes() {
        const board = document.getElementById("wishes-board");
        if (!board) return;
        
        board.innerHTML = "";
        
        // Handle beautiful empty state layout
        if (wishes.length === 0) {
            board.innerHTML = `
                <div class="empty-wishes-placeholder">
                    <div class="placeholder-icon">💌</div>
                    <p>No blessings pinned yet</p>
                    <span>Be the first to leave a sweet wish for Baby Hassan below! 💙</span>
                </div>
            `;
            board.style.display = "block";
            return;
        } else {
            board.style.display = "grid";
        }
        
        wishes.forEach((w, idx) => {
            const sticker = document.createElement("div");
            
            // Force Hussam wish card to be butter yellow
            let stickerColor = w.color || 'tint-blue';
            if (w.sender.trim() === "Hussam") {
                stickerColor = "tint-yellow";
            }
            
            sticker.className = `wish-sticker ${stickerColor}`;
            
            // Handcrafted scrapbook styling: randomized slight sticky note rotations
            const rotationVal = ((idx * 7) % 7) - 3; // Keep rotations stable per note (-3deg to +3deg)
            sticker.style.transform = `rotate(${rotationVal}deg)`;
            
            sticker.innerHTML = `
                <div class="wish-sticker-header">
                    <span>${escapeHtml(w.sender)}</span>
                </div>
                <div class="wish-sticker-text">
                    “${escapeHtml(w.message)}”
                </div>
                <div class="wish-sticker-date">${escapeHtml(w.date)}</div>
            `;
            
            board.appendChild(sticker);
        });
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    // Modal Form Elements
    const wishModal = document.getElementById("wish-modal");
    const openModalBtn = document.getElementById("open-wish-modal-btn");
    const closeModalBtn = document.getElementById("close-wish-modal-btn");
    const wishForm = document.getElementById("wish-form");

    if (openModalBtn && wishModal) {
        openModalBtn.addEventListener("click", () => {
            wishModal.classList.remove("hidden");
            document.body.classList.add("no-scroll");
        });
    }

    if (closeModalBtn && wishModal) {
        closeModalBtn.addEventListener("click", () => {
            wishModal.classList.add("hidden");
            document.body.classList.remove("no-scroll");
        });
    }

    // Close modal when clicking overlay background
    if (wishModal) {
        wishModal.addEventListener("click", (e) => {
            if (e.target === wishModal) {
                wishModal.classList.add("hidden");
                document.body.classList.remove("no-scroll");
            }
        });
    }

    if (wishForm) {
        wishForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const senderInput = document.getElementById("wish-sender");
            const messageInput = document.getElementById("wish-message");
            
            if (!senderInput || !messageInput) return;
            
            const sender = senderInput.value.trim();
            const message = messageInput.value.trim();
            
            if (!sender || !message) return;
            
            // Format current date beautifully
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            const today = new Date().toLocaleDateString("en-US", options);
            
            // Random sticky tint colors
            const tints = ["tint-blue", "tint-pink", "tint-yellow", "tint-lavender", "tint-mint"];
            let randomColor = tints[Math.floor(Math.random() * tints.length)];
            
            // Force butter yellow if name is Hussam
            if (sender.trim() === "Hussam") {
                randomColor = "tint-yellow";
            }
            
            const newWish = {
                sender,
                message,
                date: today,
                color: randomColor
            };
            
            wishes.push(newWish);
            localStorage.setItem("hassan_birthday_wishes_v2", JSON.stringify(wishes));
            
            // Re-render
            renderWishes();
            
            // Fire local celebration burst above submit form as reward
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.85 },
                colors: ['#38bdf8', '#bae6fd', '#fef08a', '#ffffff']
            });
            
            // Reset input and close
            wishForm.reset();
            wishModal.classList.add("hidden");
            document.body.classList.remove("no-scroll");
        });
    }

    // Initialize board
    initGuestbook();
});

// ==========================================================================
// 7.8 PROCEDURAL WEB AUDIO SYNTHESIZED BUBBLE POP
// ==========================================================================
function playPopSound() {
    // Check if muted or if AudioContext isn't created/running
    // If main fallback synth is playing, audioCtx exists globally. Otherwise, spawn a temp one!
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        let tempCtx = window.audioCtx || new AudioContextClass();
        
        // Return if user muted
        // Wait, to get isMuted check: we check document icon toggle state since it is at root scope
        const soundOffIcon = document.getElementById("icon-sound-off");
        const isCurrentlyMuted = soundOffIcon && !soundOffIcon.classList.contains("hidden");
        if (isCurrentlyMuted) return;

        const now = tempCtx.currentTime;
        const osc = tempCtx.createOscillator();
        const gainNode = tempCtx.createGain();
        
        // Sine wave pitched down extremely quickly matches a realistic bubble pop
        osc.type = "sine";
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);
        
        gainNode.gain.setValueAtTime(0.24, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        
        osc.connect(gainNode);
        gainNode.connect(tempCtx.destination);
        
        osc.start(now);
        osc.stop(now + 0.09);
    } catch (e) {
        console.warn("Pop synthesizer bypassed:", e);
    }
}

// 8. GRACEFUL IMAGE ERROR & SVGS ILLUSTRATIONS FALLBACK SYSTEM
function handleImageError(imgElement, index) {
    if (!imgElement) return;

    // Check if we already tried the alternative extension
    if (imgElement.src.endsWith(".jpeg")) {
        // If images/1.jpeg failed, attempt images/1.jpg before triggering SVGs
        imgElement.src = imgElement.src.replace(".jpeg", ".jpg");
        return;
    }

    // Both .jpeg and .jpg failed, or direct .jpg failed. Trigger elegant animated SVG fallback!
    imgElement.classList.add("hidden");
    
    const fallbackContainer = document.getElementById(`fallback-${index}`);
    if (!fallbackContainer) return;
    
    fallbackContainer.classList.add("active");

    // Array of beautiful custom Baby SVG illustrations for the 8 cards
    const babySvgs = [
        // 1. Sunshine / Sun Vector ☀️
        `<svg class="fallback-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="22" fill="#fef08a" stroke="#f59e0b" stroke-width="2"/>
            <g stroke="#f59e0b" stroke-width="3" stroke-linecap="round">
                <line x1="50" y1="12" x2="50" y2="22"/>
                <line x1="50" y1="78" x2="50" y2="88"/>
                <line x1="12" y1="50" x2="22" y2="50"/>
                <line x1="78" y1="50" x2="88" y2="50"/>
                <line x1="23" y1="23" x2="31" y2="31"/>
                <line x1="69" y1="69" x2="77" y2="77"/>
                <line x1="77" y1="23" x2="69" y2="31"/>
                <line x1="31" y1="69" x2="23" y2="77"/>
            </g>
            <circle cx="43" cy="46" r="2.5" fill="#0369a1"/>
            <circle cx="57" cy="46" r="2.5" fill="#0369a1"/>
            <path d="M43 56 Q50 61 57 56" fill="none" stroke="#0369a1" stroke-width="2" stroke-linecap="round"/>
        </svg>`,

        // 2. Cute Baby Bear Vector 🧸
        `<svg class="fallback-svg" viewBox="0 0 100 100">
            <circle cx="32" cy="32" r="11" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
            <circle cx="32" cy="32" r="6" fill="#f1f5f9"/>
            <circle cx="68" cy="32" r="11" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
            <circle cx="68" cy="32" r="6" fill="#f1f5f9"/>
            <circle cx="50" cy="54" r="26" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
            <circle cx="50" cy="58" r="10" fill="#f1f5f9"/>
            <circle cx="44" cy="46" r="3" fill="#0f172a"/>
            <circle cx="56" cy="46" r="3" fill="#0f172a"/>
            <ellipse cx="50" cy="54" rx="4" ry="2.5" fill="#94a3b8"/>
            <path d="M47 58 Q50 61 53 58" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/>
            <path d="M38 72 C30 76, 25 85, 36 86 C42 86, 42 78, 42 78 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
            <path d="M62 72 C70 76, 75 85, 64 86 C58 86, 58 78, 58 78 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
        </svg>`,

        // 3. Cute Pacifier / Feet Vector 👣
        `<svg class="fallback-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="40" r="18" fill="none" stroke="#bae6fd" stroke-width="7"/>
            <rect x="32" y="52" width="36" height="8" rx="4" fill="#38bdf8"/>
            <path d="M50 60 L50 82 C50 87, 44 92, 50 92 C56 92, 50 87, 50 82 Z" fill="#7dd3fc" stroke="#38bdf8" stroke-width="2"/>
            <circle cx="50" cy="40" r="10" fill="#ffffff" opacity="0.6"/>
            <!-- Sparkles -->
            <path d="M22 25 L25 22 M25 25 L22 22" stroke="#bae6fd" stroke-width="2" stroke-linecap="round"/>
            <path d="M75 25 L78 22 M78 25 L75 22" stroke="#bae6fd" stroke-width="2" stroke-linecap="round"/>
        </svg>`,

        // 4. Baby Rainbow Vector 🌈
        `<svg class="fallback-svg" viewBox="0 0 100 100">
            <path d="M20 70 A30 30 0 0 1 80 70" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
            <path d="M28 70 A22 22 0 0 1 72 70" fill="none" stroke="#7dd3fc" stroke-width="6" stroke-linecap="round"/>
            <path d="M36 70 A14 14 0 0 1 64 70" fill="none" stroke="#bae6fd" stroke-width="6" stroke-linecap="round"/>
            <!-- Cute cartoon clouds at base -->
            <circle cx="20" cy="72" r="9" fill="#ffffff"/>
            <circle cx="28" cy="72" r="7" fill="#ffffff"/>
            <circle cx="72" cy="72" r="9" fill="#ffffff"/>
            <circle cx="80" cy="72" r="7" fill="#ffffff"/>
        </svg>`,

        // 5. Twinkling Star Vector ⭐
        `<svg class="fallback-svg" viewBox="0 0 100 100">
            <path d="M50 12 L61 38 L88 38 L66 54 L75 80 L50 63 L25 80 L34 54 L12 38 L39 38 Z" fill="#fef08a" stroke="#f59e0b" stroke-width="2" stroke-linejoin="round"/>
            <circle cx="43" cy="44" r="2.5" fill="#0369a1"/>
            <circle cx="57" cy="44" r="2.5" fill="#0369a1"/>
            <path d="M44 52 Q50 56 56 52" fill="none" stroke="#0369a1" stroke-width="2" stroke-linecap="round"/>
        </svg>`,

        // 6. Magic Crown Vector 💫
        `<svg class="fallback-svg" viewBox="0 0 100 100">
            <path d="M20 75 L15 35 L38 52 L50 25 L62 52 L85 35 L80 75 Z" fill="#e0f2fe" stroke="#38bdf8" stroke-width="3" stroke-linejoin="round"/>
            <rect x="20" y="70" width="60" height="7" fill="#38bdf8" rx="2.5"/>
            <!-- Little gems on tips -->
            <circle cx="15" cy="35" r="4.5" fill="#bae6fd" stroke="#38bdf8" stroke-width="1.5"/>
            <circle cx="50" cy="25" r="4.5" fill="#bae6fd" stroke="#38bdf8" stroke-width="1.5"/>
            <circle cx="85" cy="35" r="4.5" fill="#bae6fd" stroke="#38bdf8" stroke-width="1.5"/>
            <!-- Gem on body -->
            <polygon points="50,50 56,58 50,66 44,58" fill="#ffffff" stroke="#38bdf8" stroke-width="2"/>
        </svg>`,

        // 7. Cute Camera Vector 📸
        `<svg class="fallback-svg" viewBox="0 0 100 100">
            <rect x="20" y="32" width="60" height="42" rx="10" fill="#e0f2fe" stroke="#38bdf8" stroke-width="3"/>
            <path d="M38 32 L44 22 L56 22 L62 32 Z" fill="#bae6fd" stroke="#38bdf8" stroke-width="3" stroke-linejoin="round"/>
            <circle cx="50" cy="53" r="16" fill="#ffffff" stroke="#38bdf8" stroke-width="3"/>
            <circle cx="50" cy="53" r="10" fill="#38bdf8"/>
            <circle cx="50" cy="53" r="4" fill="#ffffff"/>
            <!-- Flash bulb -->
            <circle cx="70" cy="42" r="4.5" fill="#fef08a"/>
        </svg>`,

        // 8. Cute Stroller / Cradle Vector 💙
        `<svg class="fallback-svg" viewBox="0 0 100 100">
            <path d="M22 55 A24 24 0 0 0 70 55 M70 55 L75 35 M22 55 L16 35" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
            <path d="M25 55 C25 25, 65 25, 65 55 Z" fill="#e0f2fe" stroke="#38bdf8" stroke-width="3" stroke-linejoin="round" opacity="0.8"/>
            <circle cx="34" cy="74" r="10" fill="#ffffff" stroke="#38bdf8" stroke-width="3"/>
            <circle cx="34" cy="74" r="3" fill="#38bdf8"/>
            <circle cx="62" cy="74" r="10" fill="#ffffff" stroke="#38bdf8" stroke-width="3"/>
            <circle cx="62" cy="74" r="3" fill="#38bdf8"/>
            <path d="M16 35 C12 35, 12 30, 16 30 C20 30, 20 35, 16 35 Z" fill="#38bdf8"/>
        </svg>`
    ];

    fallbackContainer.innerHTML = babySvgs[index - 1];
}