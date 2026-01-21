
// 3D Tilt Effect
const tiltPanel = document.getElementById('tiltPanel');
const tiltSection = document.getElementById('v9');

if (tiltPanel && tiltSection) {
    tiltSection.addEventListener('mousemove', (e) => {
        const rect = tiltSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        tiltPanel.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    tiltSection.addEventListener('mouseleave', () => {
        tiltPanel.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
}
