/**
 * WebGL Manager
 * Handles the Three.js scene, camera, renderer, and global resizing.
 * optimized for performance on the Believe Trust site.
 */
class WebGLManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.warn(`WebGL Container ${containerId} not found.`);
            return;
        }

        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.camera.position.z = 5;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x for performance
        this.container.appendChild(this.renderer.domElement);

        // State
        this.isPlaying = true;
        this.visualizers = [];

        // Events
        window.addEventListener('resize', this.onResize.bind(this));
        this.animate();
    }

    addVisualizer(visualizer) {
        this.visualizers.push(visualizer);
        this.scene.add(visualizer.mesh);
    }

    onResize() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Notify visualizers if they need to resize
        this.visualizers.forEach(v => {
            if (v.onResize) v.onResize(this.width, this.height);
        });
    }

    animate() {
        if (!this.isPlaying) return;

        requestAnimationFrame(this.animate.bind(this));

        // Update all attached visualizers
        this.visualizers.forEach(v => {
            if (v.update) v.update();
        });

        this.renderer.render(this.scene, this.camera);
    }
}
