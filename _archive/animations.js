// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// 1. Orbital Expansion
// Concept: Sun grows to fill screen, rings dissolve out
gsap.to(".sun-core", {
    scale: 50, // Massive expansion
    opacity: 0, // Fades out as it consumes view
    ease: "power2.inOut",
    scrollTrigger: {
        trigger: ".a1-orbit",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true
    }
});

gsap.to(".orbit-ring", {
    scale: 3,
    opacity: 0,
    stagger: 0.1,
    scrollTrigger: {
        trigger: ".a1-orbit",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// 2. Parallax Ledger Streams
// Generate rows first
const streamContainer = document.querySelector('.stream-container');
if (streamContainer) {
    for (let i = 0; i < 10; i++) {
        const div = document.createElement('div');
        div.className = 'stream-row';
        div.innerText = `BLOCK ${8920 + i} • HASH: 0x${Math.random().toString(16).substr(2, 6)}... • VERIFIED`;
        // Alternate directions
        div.style.alignSelf = i % 2 === 0 ? 'flex-start' : 'flex-end';
        div.style.transform = `translateX(${i % 2 === 0 ? '-20%' : '20%'})`;
        streamContainer.appendChild(div);
    }
}

// Animate them
gsap.utils.toArray(".stream-row").forEach((row, i) => {
    gsap.to(row, {
        x: i % 2 === 0 ? "20%" : "-20%", // Move opposite to initial offset
        ease: "none",
        scrollTrigger: {
            trigger: ".a2-stream",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

// 3. Text Emergence (Clarify)
gsap.utils.toArray(".blur-text").forEach((text, i) => {
    gsap.to(text, {
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".a3-focus",
            start: "top 60%", // Start when section is 60% in view
            toggleActions: "play none none reverse"
        }
    });
});

// 4. Sticky Stacking (Handled by CSS sticky mostly, added scale effect)
// No JS needed for sticky, but let's add a scale-down for the ones leaving
['.card-1', '.card-2'].forEach((cardClass, i) => {
    gsap.to(cardClass, {
        scale: 0.9,
        opacity: 0.5,
        scrollTrigger: {
            trigger: cardClass,
            start: "top top", // When card hits top
            end: "bottom top", // When it leaves
            scrub: true
        }
    });
});

// 5. The Trust Thread
gsap.fromTo(".thread-line",
    { drawSVG: "0%" }, // Needs DrawSVG plugin (paid), fallback below using stroke-dashoffset
    {
        strokeDashoffset: 0,
        scrollTrigger: {
            trigger: ".a5-thread",
            start: "top center",
            end: "bottom center",
            scrub: 1
        }
    }
);
// Manual dashoffset implementation since DrawSVG is premium
const path = document.querySelector('.thread-line');
if (path) {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
            trigger: ".a5-thread",
            start: "top center",
            end: "bottom center",
            scrub: true
        }
    });
}


// 6. Lens / Spotlight
const lens = document.querySelector('.lens-cursor');
const section6 = document.querySelector('.a6-lens');
if (section6 && lens) {
    section6.addEventListener('mousemove', (e) => {
        gsap.to(lens, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });
}

// 7. 3D Velocity Tilt
let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(".tilt-plane", "rotateX", "deg"), // fast
    clamp = gsap.utils.clamp(-20, 20); // don't tile too much

ScrollTrigger.create({
    onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -100);
        // Ease back to 0
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, { skew: 0, duration: 0.8, ease: "power3", onUpdate: () => skewSetter(proxy.skew) });
        }
    }
});

// 8. Mask Typography (Background moves inside text)
// CSS supports mix-blend-mode for this. Let's animate the text spreading apart.
gsap.to(".masked-text", {
    letterSpacing: "2rem",
    scale: 1.5,
    scrollTrigger: {
        trigger: ".a8-mask",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

// 9. Particle Assembler
const pCanvas = document.getElementById('particleCanvas');
if (pCanvas) {
    const pCtx = pCanvas.getContext('2d');
    pCanvas.width = window.innerWidth;
    pCanvas.height = window.innerHeight;

    const particles = [];
    const targetX = pCanvas.width / 2;
    const targetY = pCanvas.height / 2;

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * pCanvas.width,
            y: Math.random() * pCanvas.height,
            originX: Math.random() * pCanvas.width,
            originY: Math.random() * pCanvas.height,
            size: Math.random() * 3 + 1
        });
    }

    // Animation Loop
    function renderParticles() {
        pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
        pCtx.fillStyle = "#fff";

        particles.forEach(p => {
            pCtx.beginPath();
            pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            pCtx.fill();
        });
        requestAnimationFrame(renderParticles);
    }
    renderParticles();

    // GSAP Controls the particle positions
    // Assemble into a circle
    particles.forEach((p, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const radius = 100;
        const destX = targetX + Math.cos(angle) * radius;
        const destY = targetY + Math.sin(angle) * radius;

        gsap.to(p, {
            x: destX,
            y: destY,
            scrollTrigger: {
                trigger: ".a9-particles",
                start: "top center",
                end: "bottom center",
                scrub: 1
            }
        });
    });
}

// 10. Smooth Skew
let skewContent = document.querySelector(".skew-content");
if (skewContent) {
    let proxySkew = { skew: 0 };
    let setter = gsap.quickSetter(skewContent, "skewY", "deg");

    ScrollTrigger.create({
        trigger: ".a10-skew",
        onUpdate: (self) => {
            let s = self.getVelocity() / 300;
            if (Math.abs(s) > Math.abs(proxySkew.skew)) {
                proxySkew.skew = s;
                gsap.to(proxySkew, { skew: 0, duration: 0.5, ease: "power3", onUpdate: () => setter(proxySkew.skew) });
            }
        }
    });
}
