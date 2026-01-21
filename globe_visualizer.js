/**
 * Globe Visualizer
 * Renders a stylized 3D globe with network connections and orbiting particles.
 */
class GlobeVisualizer {
    constructor() {
        this.mesh = new THREE.Group();
        this.init();
    }

    init() {
        // 1. Core Sphere (Dark/Glassy)
        const geometry = new THREE.IcosahedronGeometry(2, 2); // Low poly look suitable for network
        const material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        this.core = new THREE.Mesh(geometry, material);
        this.mesh.add(this.core);

        // 2. Network Lines (The Connections)
        const lineGeo = new THREE.EdgesGeometry(geometry);
        const lineMat = new THREE.LineBasicMaterial({
            color: 0xc5a47e, // Gold accent
            transparent: true,
            opacity: 0.3
        });
        this.lines = new THREE.LineSegments(lineGeo, lineMat);
        this.mesh.add(this.lines);

        // 3. Particles (Orbiting Believers)
        const particlesGeo = new THREE.BufferGeometry();
        const particleCount = 200;
        const posArray = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            // Spread particles in a cloud around the globe
            posArray[i] = (Math.random() - 0.5) * 8;
        }

        particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMat = new THREE.PointsMaterial({
            size: 0.03,
            color: 0xffffff,
            transparent: true,
            opacity: 0.6
        });

        this.particles = new THREE.Points(particlesGeo, particlesMat);
        this.mesh.add(this.particles);

        // Interaction State
        this.activeRotation = 0.001;
        this.lastPulse = 0;

        // 4. Pulse Sphere (The Trust Wave)
        const pulseGeo = new THREE.IcosahedronGeometry(2.1, 2);
        this.pulseMat = new THREE.MeshBasicMaterial({
            color: 0xc5a47e,
            transparent: true,
            opacity: 0,
            wireframe: true,
            blending: THREE.AdditiveBlending
        });
        this.pulseSphere = new THREE.Mesh(pulseGeo, this.pulseMat);
        this.pulseSphere.scale.set(0.1, 0.1, 0.1);
        this.mesh.add(this.pulseSphere);
    }

    triggerPulse(color = 0xc5a47e) {
        this.pulseMat.color.set(color);

        // Reset scale and opacity
        this.pulseSphere.scale.set(0.8, 0.8, 0.8);
        this.pulseMat.opacity = 0.6;

        // Animate out
        gsap.to(this.pulseSphere.scale, {
            x: 2.5,
            y: 2.5,
            z: 2.5,
            duration: 1.5,
            ease: "power2.out"
        });
        gsap.to(this.pulseMat, {
            opacity: 0,
            duration: 1.5,
            ease: "power2.out"
        });

        // Flash lines
        gsap.to(this.lines.material, {
            opacity: 0.8,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });
    }

    update() {
        // 1. Audio Mapping
        let audioBoost = 0;
        if (window.audioManager) {
            const freqData = window.audioManager.getFrequencyData();
            if (freqData) {
                // Get average of low frequencies (the drone)
                let sum = 0;
                for (let i = 0; i < 10; i++) sum += freqData[i];
                audioBoost = (sum / 10) / 255; // 0 to 1
            }
        }

        // 2. Base Rotation + Audio Influence
        const rotationSpeed = this.activeRotation + (audioBoost * 0.005);
        this.mesh.rotation.y += rotationSpeed;
        this.mesh.rotation.x += rotationSpeed * 0.5;

        // 3. Sub-pulse (micro-scaling based on audio)
        const scaleBase = 1.0 + (audioBoost * 0.05);
        this.core.scale.set(scaleBase, scaleBase, scaleBase);

        // Particle pulse
        this.particles.rotation.y -= 0.002;

        // Random simulated pulses
        const now = Date.now();
        if (now - this.lastPulse > 5000) {
            this.triggerPulse();
            this.lastPulse = now + (Math.random() * 3000);
        }
    }
}
