/**
 * AUDIO MANAGER - DIRECTORS CUT
 * Synthesizes cinematic audio using Web Audio API (No external files needed)
 */

class AudioManager {
    constructor() {
        this.ctx = null;
        this.droneOscillators = [];
        this.gainNode = null;
        this.isMuted = true; // Start muted (autoplay policy)
        this.initialized = false;
        this.dataArray = null;
    }

    init() {
        if (this.initialized) return;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.gainNode = this.ctx.createGain();
            this.analyser = this.ctx.createAnalyser();
            this.analyser.fftSize = 256;

            this.gainNode.connect(this.analyser);
            this.analyser.connect(this.ctx.destination);

            this.gainNode.gain.value = 0.15; // Low master volume

            this.initialized = true;
            console.log("Audio System Initialized with Analyser");
        } catch (e) {
            console.error("Web Audio API not supported", e);
        }
    }

    startDrone() {
        if (!this.initialized) this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();
        this.isMuted = false;

        // Create a deep, dark drone using multiple oscillators
        const freqs = [55, 110, 111]; // Low A notes with slight detune for "beating" texture

        freqs.forEach(freq => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.value = freq;

            // Lowpass filter to make it "dark" and cinematic
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 120; // Cut off high frequencies

            // LFO for subtle movement
            const lfo = this.ctx.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.value = 0.1; // Very slow movement
            const lfoGain = this.ctx.createGain();
            lfoGain.gain.value = 50; // Filter modulation amount

            lfo.connect(lfoGain);
            lfoGain.connect(filter.frequency);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.gainNode);

            gain.gain.value = 0.1; // Individual osc volume

            osc.start();
            lfo.start();
            this.droneOscillators.push({ osc, lfo });
        });

        // Fade in
        this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
        this.gainNode.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 3);
    }

    stopDrone() {
        if (!this.initialized) return;
        this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1);
        setTimeout(() => {
            this.droneOscillators.forEach(o => {
                o.osc.stop();
                o.lfo.stop();
            });
            this.droneOscillators = [];
            this.isMuted = true;
        }, 1000);
    }

    playHoverSound() {
        if (this.isMuted || !this.initialized) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        // High tech "blip"
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    playClickSound() {
        if (this.isMuted || !this.initialized) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        // Low "thud"
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
    }

    getFrequencyData() {
        if (!this.initialized || this.isMuted) return null;
        if (!this.dataArray) {
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        }
        this.analyser.getByteFrequencyData(this.dataArray);
        return this.dataArray;
    }
}

// Global Instance
window.audioManager = new AudioManager();

// Attach UI events
document.addEventListener('DOMContentLoaded', () => {
    // Add audio control button
    const btn = document.createElement('div');
    btn.className = 'audio-control';
    btn.innerHTML = 'SOUND OFF';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        color: #fff;
        font-family: 'JetBrains Mono', monospace;
        font-size: 10px;
        opacity: 0.5;
        cursor: pointer;
        z-index: 1000;
        letter-spacing: 2px;
        border: 1px solid rgba(255,255,255,0.2);
        padding: 5px 10px;
        border-radius: 4px;
        transition: 0.3s;
    `;
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
        if (window.audioManager.isMuted) {
            window.audioManager.startDrone();
            btn.innerHTML = 'SOUND ON';
            btn.style.opacity = '1';
            btn.style.borderColor = 'var(--accent-red)';
            btn.style.color = 'var(--accent-red)';
        } else {
            window.audioManager.stopDrone();
            btn.innerHTML = 'SOUND OFF';
            btn.style.opacity = '0.5';
            btn.style.borderColor = 'rgba(255,255,255,0.2)';
            btn.style.color = '#fff';
        }
    });

    // Attach hover sounds to interactive elements
    const interactives = document.querySelectorAll('a, button, .tier-card, .phase-card, .address-box');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => window.audioManager.playHoverSound());
        el.addEventListener('click', () => window.audioManager.playClickSound());
    });
});
