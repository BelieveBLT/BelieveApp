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
    }

    update() {
        // Constant slow rotation
        this.mesh.rotation.y += this.activeRotation;
        this.mesh.rotation.x += this.activeRotation * 0.5;

        // Particle pulse
        this.particles.rotation.y -= 0.002;
    }
}
