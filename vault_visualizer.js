/**
 * VaultVisualizer - Concept A
 * Renders a 3D tunnel of glass ledger cubes.
 * Optimized with InstancedMesh for performance.
 */
class VaultVisualizer {
    constructor() {
        this.mesh = new THREE.Group();
        this.cubeCount = 800;
        this.tunnelRadius = 15;
        this.tunnelLength = 400;
        this.init();
    }

    init() {
        // 1. Geometry & Material
        const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

        // High-end glass material
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0.05,
            transmission: 0.95,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
            transparent: true,
            opacity: 0.3
        });

        // 2. InstancedMesh for performance
        this.instancedCubes = new THREE.InstancedMesh(geometry, material, this.cubeCount);

        const dummy = new THREE.Object3D();
        const matrix = new THREE.Matrix4();

        for (let i = 0; i < this.cubeCount; i++) {
            // Distribute cubes in a spiral/random tunnel
            const angle = Math.random() * Math.PI * 2;
            const r = this.tunnelRadius + (Math.random() - 0.5) * 8;
            const z = -Math.random() * this.tunnelLength;

            dummy.position.set(
                Math.cos(angle) * r,
                Math.sin(angle) * r,
                z
            );

            dummy.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            dummy.updateMatrix();
            this.instancedCubes.setMatrixAt(i, dummy.matrix);
        }

        this.mesh.add(this.instancedCubes);

        // 3. Central Line "The Thread" inside the vault
        const curve = new THREE.LineCurve3(
            new THREE.Vector3(0, 0, 10),
            new THREE.Vector3(0, 0, -this.tunnelLength)
        );
        const points = curve.getPoints(50);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({ color: 0xff3b30, opacity: 0.5, transparent: true });
        this.thread = new THREE.Line(lineGeo, lineMat);
        this.mesh.add(this.thread);

        // 4. Lights inside the tunnel
        this.lights = [];
        for (let i = 0; i < 5; i++) {
            const light = new THREE.PointLight(0xff9500, 20, 100);
            light.position.set(0, 0, -i * (this.tunnelLength / 5));
            this.mesh.add(light);
            this.lights.push(light);
        }
    }

    update() {
        // Slow rotation of the whole tunnel
        this.instancedCubes.rotation.z += 0.0005;

        // Slight wobble to lights
        const time = Date.now() * 0.001;
        this.lights.forEach((light, i) => {
            light.position.x = Math.sin(time + i) * 2;
            light.position.y = Math.cos(time + i * 0.5) * 2;
        });
    }

    /**
     * Move camera based on scroll progress (0 to 1)
     */
    updateCamera(camera, progress) {
        // Move camera from z=5 to z=-tunnelLength
        const targetZ = 5 - (progress * (this.tunnelLength - 20));
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);

        // Slight tilt based on progress
        camera.rotation.z = progress * Math.PI * 0.1;
    }
}
