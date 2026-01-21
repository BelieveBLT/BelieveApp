document.addEventListener('DOMContentLoaded', () => {
    // Simple mobile menu logic placeholder
    const menuBtn = document.querySelector('.mobile-menu-btn');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            console.log('Toggle menu');
            // In a real app, this would toggle a class on the nav
        });
    }

    // Parallax effect for hero background (optional)
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
});
