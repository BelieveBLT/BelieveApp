# BELIEVE // Design System & Architecture

## 1. Visual Identity: "Industrial Monochrome"
The design follows a strict **Premium Monochrome** system, moving away from traditional consumer-grade "cards" toward an **Institutional-Standard Architecture**.

### Color Palette
- **Primary Background**: `#000000` (Pure Black)
- **Secondary Background**: `#050505` (Deep Charcoal)
- **Primary Text**: `#FFFFFF` (Pure White)
- **Secondary Text**: `#888888` (Mid-Gray)
- **Accents**: `#0F0` (Green) for system status indicators.

---

## 2. Typography & Hierarchy
The typography is designed to feel authoritative and precise.

- **Display Headers**: Large, bold `Plus Jakarta Sans` with negative letter-spacing (`-4px`) and subtle gradients.
- **System Tags**: Monospace labels (e.g., `SYSTEM_FAULT`, `ERROR_LOG`) that act as metadata identifiers.
- **Body Text**: `Inter` for maximum legibility in high-density information sections.

---

## 3. Structural Architecture (No-Card Layout)
To achieve a "production-standard" feel, the design eliminates isolated boxes (cards) in favor of **integrated structural grids**.

- **Thin Dividers**: Using `1px` borders with low opacity (`rgba(255,255,255,0.1)`) to separate logical units without breaking the visual flow.
- **Bento Grids**: Sophisticated, multi-cell layouts that anchor information into the page's core structure.
- **Industrial Split-Paths**: Symmetrical layouts used to contrast opposing concepts (e.g., Unbeliever vs. Believer).

---

## 4. Interaction Design & Motion
Motion is used to simulate a live "computing" environment rather than just for decoration.

### Typewriter Logic
System tags across the site use a custom `TypewriterTag` component that triggers on scroll.
- **Animation**: Character-by-character reveals using CSS `steps()`.
- **Cursor**: A blinking underscore (`_`) that persists after typing to simulate a terminal waiting for input.

### The Genesis Engine
A high-quality visual anchor in the Philosophy section:
- **Bitcoin Core**: A central pulsing node.
- **Flow Streams**: Eight animated particle paths flowing inward, symbolizing the return to original P2P principles.
- **Rotating Rings**: Multi-layered geometric rings rotating at varying speeds with embedded data strings.

### Hero Marquee
An infinite, auto-scrolling partner marquee with a linear gradient mask for a "fade-out" effect on the edges.

---

## 5. Iconography
The icon set has been transitioned from generic consumer icons to a **Computer-Industrial** set:
- `Terminal`, `Cpu`, `Binary`, `Hash`, `Database`, `Network`, `History`.
- These icons reinforce the "system log" and "protocol" narrative of the project.

---

## 6. Information Architecture
The content follows a logical **Strategic Narrative**:
1. **The Choice**: Immediate confrontation of Trading vs. Believing.
2. **The Problem**: Identification of systemic failure and distraction.
3. **The Solution**: Defining the Believer's advantage and the execution engine.
4. **The Roots**: Reconnecting with the original mission of Bitcoin.
5. **The Reward**: A professional ledger displaying distribution milestones.

---

## 7. Deployment Standards
- **Framework**: React 19.2.3 + Vite.
- **Performance**: Zero heavy JS animation libraries where possible; primarily CSS-driven motion for high performance.
- **Responsiveness**: Fluid layout that transitions from a complex industrial grid on desktop to a stacked linear log on mobile.



