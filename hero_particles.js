/**
 * Hero Particles ("The Void")
 * Creates an immersive 3D starfield/particle system for the landing page hero.
 */
class HeroParticles {
    constructor() {
        this.mesh = new THREE.Group();
        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };
        this.init();

        // Track mouse for parallax
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    init() {
        // Create random particles
        const geometry = new THREE.BufferGeometry();
        const count = 1500;
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Spread wide but keep some depth
            positions[i * 3] = (Math.random() - 0.5) * 40; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z

            sizes[i] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Shader Material for soft glow points
        // Using standard PointsMaterial for performance simplicity initially
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.05,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        this.points = new THREE.Points(geometry, material);
        this.mesh.add(this.points);
    }

    onMouseMove(event) {
        // Normalize mouse position -1 to 1
        this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    update() {
        // 1. Audio Influence
        let audioBoost = 0;
        if (window.audioManager) {
            const freqData = window.audioManager.getFrequencyData();
            if (freqData) {
                let sum = 0;
                for (let i = 0; i < 20; i++) sum += freqData[i];
                audioBoost = (sum / 20) / 255;
            }
        }

        // 2. Mouse Parallax
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        this.mesh.rotation.x = this.mouse.y * 0.1;
        this.mesh.rotation.y = this.mouse.x * 0.1;

        // 3. Motion + Audio Sync
        this.mesh.rotation.z += 0.0002 + (audioBoost * 0.001);

        // Modulate point size slightly based on audio
        this.points.material.size = 0.05 + (audioBoost * 0.05);
    }

    // Resize handler called by manager
    onResize(width, height) {
        // Ensure scene scales if needed
    }
}
