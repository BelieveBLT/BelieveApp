/**
 * BELIEVE TRUST — Page Loader Component
 * =====================================
 * Simple loading state and page transition animations
 */

class PageLoader {
    constructor() {
        this.createLoader();
        this.init();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.className = 'bt-page-loader';
        loader.id = 'page-loader';
        loader.setAttribute('role', 'status');
        loader.setAttribute('aria-label', 'Loading page');

        loader.innerHTML = `
            <div class="loader-content">
                <div class="spinner"></div>
                <span class="loader-text">BELIEVE</span>
            </div>
        `;

        // Add styles if brand.css not loaded
        if (!document.querySelector('link[href*="brand.css"]')) {
            const style = document.createElement('style');
            style.textContent = `
                .bt-page-loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #050505;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 99999;
                    transition: opacity 0.5s ease, visibility 0.5s ease;
                }
                .bt-page-loader.loaded {
                    opacity: 0;
                    visibility: hidden;
                    pointer-events: none;
                }
                .loader-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                }
                .bt-page-loader .spinner {
                    width: 40px;
                    height: 40px;
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    border-top-color: #ff3b30;
                    border-radius: 50%;
                    animation: bt-spin 1s linear infinite;
                }
                .loader-text {
                    font-family: 'Inter', sans-serif;
                    font-size: 12px;
                    letter-spacing: 4px;
                    color: rgba(255, 255, 255, 0.5);
                }
                @keyframes bt-spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.insertBefore(loader, document.body.firstChild);
        this.loader = loader;
    }

    init() {
        // Hide loader when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hide();
            }, 300); // Small delay for smoother transition
        });

        // Fallback: hide after max timeout
        setTimeout(() => {
            this.hide();
        }, 5000);
    }

    hide() {
        if (this.loader) {
            this.loader.classList.add('loaded');
            // Remove from DOM after animation
            setTimeout(() => {
                this.loader.remove();
            }, 500);
        }
    }

    static show() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.remove('loaded');
        }
    }
}

// Auto-initialize on script load
document.addEventListener('DOMContentLoaded', () => {
    new PageLoader();
});

// Page transition support
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link &&
        link.href &&
        !link.href.startsWith('#') &&
        !link.target &&
        !link.download &&
        link.hostname === window.location.hostname) {
        // Show loader for internal navigation
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.remove('loaded');
        }
    }
});
