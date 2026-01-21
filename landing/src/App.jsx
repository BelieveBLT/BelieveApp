import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Terminal,
  Hash,
  Binary,
  Command,
  ShieldCheck,
  Zap,
  Database,
  Activity,
  Unplug,
  Cpu,
  Network,
  History,
  Server,
  Globe,
  Check,
  X,
  ArrowRight,
  ChevronDown,
  Menu,
  Lock,
  ArrowRightLeft,
  Search,
  Settings,
  ExternalLink,
  Copy,
  AlertTriangle
} from 'lucide-react';
import './App.css';

const TypewriterTag = ({ text, className = "ind-tag", style = {} }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <span
      ref={ref}
      className={`${className} ${inView ? 'typing' : ''}`}
      style={{ ...style, '--char-count': text.length }}
    >
      {text}
    </span>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-icon">B</div>
              <span className="logo-title">BELIEVE</span>
            </div>

            <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
              <a href="#problem" onClick={() => setMenuOpen(false)}>DILEMMA</a>
              <a href="#philosophy" onClick={() => setMenuOpen(false)}>MISSION</a>
              <a href="#acquisition" onClick={() => setMenuOpen(false)}>GET BLT</a>
              <a href="#airdrop" onClick={() => setMenuOpen(false)}>LEDGER</a>
              <div className="nav-mobile-actions">
                <button className="btn btn-secondary">WHITEPAPER</button>
                <button className="btn btn-primary">JOIN NOW</button>
              </div>
            </div>

            <div className="nav-actions">
              <button className="btn btn-secondary">WHITEPAPER</button>
              <button className="btn btn-primary">JOIN NOW</button>
            </div>

            <button className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              TRADING VS <br />
              <span className="text-gradient">BELIEVING.</span>
            </h1>

            <p className="hero-description">
              The noise of the market is designed to extract your value.
              Our architecture is built to preserve your conviction.
            </p>

            <div className="hero-industrial-grid">
              <div className="ind-item">
                <span className="ind-label">[ 01 ]</span>
                <h3>The Trader</h3>
                <p>Reactive, emotional, and systemic exposure.</p>
              </div>
              <div className="ind-divider"></div>
              <div className="ind-item">
                <span className="ind-label">[ 02 ]</span>
                <h3>The Believer</h3>
                <p>Strategic, calm, and community-aligned.</p>
              </div>
            </div>

            <div className="partners-marquee-container">
              <div className="partners-label">NETWORK PARTNERS & ECOSYSTEM</div>
              <div className="partners-marquee">
                <div className="marquee-content">
                  {[
                    "HYPERLIQUID", "HYPEREVM", "ETHEREUM", "AAVE", "BINANCE CHAIN",
                    "UNISWAP", "CHAINLINK", "CURSOR", "GOOGLE CLOUD", "ARBITRUM",
                    "POLYGON", "BASE", "OPTIMISM", "SOLANA"
                  ].map((partner, i) => (
                    <div key={i} className="partner-item">
                      <span className="partner-dot"></span>
                      {partner}
                    </div>
                  ))}
                  {/* Duplicate for infinite loop */}
                  {[
                    "HYPERLIQUID", "HYPEREVM", "ETHEREUM", "AAVE", "BINANCE CHAIN",
                    "UNISWAP", "CHAINLINK", "CURSOR", "GOOGLE CLOUD", "ARBITRUM",
                    "POLYGON", "BASE", "OPTIMISM", "SOLANA"
                  ].map((partner, i) => (
                    <div key={`dup-${i}`} className="partner-item">
                      <span className="partner-dot"></span>
                      {partner}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE DILEMMA (Industrial Split) */}
      <section id="problem" className="industrial-section">
        <div className="container">
          <div className="ind-header">
            <TypewriterTag text="SYSTEM_FAULT" />
            <h2>The Trader's Dilemma</h2>
          </div>

          <div className="ind-feature-row">
            <div className="ind-feature-col">
              <Terminal className="ind-icon" />
              <h3>Decision Fatigue</h3>
              <p>Every tick is a demand for action. Your peace of mind is the true cost of trading.</p>
            </div>
            <div className="ind-feature-col">
              <Hash className="ind-icon" />
              <h3>Monetized Movement</h3>
              <p>Exchanges profit from your activity. They don't want you to hold; they want you to churn.</p>
            </div>
            <div className="ind-feature-col">
              <Binary className="ind-icon" />
              <h3>Emotional Decay</h3>
              <p>Fear and greed are not strategies. They are the mechanisms of systemic loss.</p>
            </div>
          </div>

          <div className="ind-quote-box">
            <div className="quote-line"></div>
            <p>"The market is a machine for transferring money from the active to the patient."</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE ADVANTAGE */}
      <section className="industrial-section alternate">
        <div className="container">
          <div className="ind-header">
            <TypewriterTag text="STRATEGIC_ALPHA" />
            <h2>The Believer's Advantage</h2>
          </div>

          <div className="ind-grid-layout">
            <div className="ind-grid-main">
              <div className="grid-cell">
                <Command size={32} />
                <div>
                  <h4>Clarity of Purpose</h4>
                  <p>When you stop reacting to noise, you start seeing the signal. Holding is the ultimate alpha.</p>
                </div>
              </div>
              <div className="grid-cell">
                <ShieldCheck size={32} />
                <div>
                  <h4>Risk Mitigation</h4>
                  <p>Eliminate execution error and emotional slippage. Your conviction is your shield.</p>
                </div>
              </div>
              <div className="grid-cell">
                <Zap size={32} />
                <div>
                  <h4>Exponential Compounding</h4>
                  <p>Networks grow in waves. Believers stay for the entire tide, not just the ripples.</p>
                </div>
              </div>
            </div>
            <div className="ind-grid-side">
              <div className="side-content">
                <TypewriterTag className="side-tag" text="STATUS: ACTIVE" />
                <h3>Belief is not passive. It is a calculated decision to ignore the irrelevant.</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE ARCHITECTURE OF DISTRACTION */}
      <section className="industrial-section">
        <div className="container">
          <div className="ind-header">
            <TypewriterTag text="ERROR_LOG: SYSTEMIC_DISTRACTION" />
            <h2>Why Holders Fail</h2>
            <p className="ind-sub-text">Modern infrastructure is built to monetize volatility, not conviction.</p>
          </div>

          <div className="ind-feature-row">
            <div className="ind-feature-col">
              <Database className="ind-icon" />
              <h3>Forced Liquidity</h3>
              <p>When every asset is instantly tradable, nothing feels worth holding. The sacred is reduced to a price ticker.</p>
            </div>
            <div className="ind-feature-col">
              <Activity className="ind-icon" />
              <h3>Engineered Noise</h3>
              <p>Exchanges use high-frequency alerts to trigger your survival instincts. They profit from your panic.</p>
            </div>
            <div className="ind-feature-col">
              <Unplug className="ind-icon" />
              <h3>Attention Extraction</h3>
              <p>Your focus is harvested before your value can compound. You are being traded, even when you aren't trading.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW WE MOVE (The Engine) */}
      <section className="industrial-section alternate">
        <div className="container">
          <div className="ind-grid-layout inverted">
            <div className="ind-grid-side">
              <div className="side-content">
                <TypewriterTag className="side-tag" text="PROTOCOL: EXECUTION" style={{ color: '#FFF' }} />
                <h3>We don't react to the market. We coordinate within it.</h3>
              </div>
            </div>
            <div className="ind-grid-main">
              <div className="grid-cell">
                <Cpu size={32} />
                <div>
                  <h4>Synchronized Conviction</h4>
                  <p>Value is derived from collective non-action. Our architecture rewards the refusal to churn.</p>
                </div>
              </div>
              <div className="grid-cell">
                <Network size={32} />
                <div>
                  <h4>P2P Stability</h4>
                  <p>Direct exchange of conviction, bypassing the predatory loops of centralized liquidity pools.</p>
                </div>
              </div>
              <div className="grid-cell">
                <History size={32} />
                <div>
                  <h4>Cycle-Ready Design</h4>
                  <p>Engineered for years, not seconds. Our network thrives on the inevitable waves of market expansion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: PHILOSOPHY (The Mission) */}
      <section id="philosophy" className="industrial-section">
        <div className="container">
          <div className="philosophy-layout">
            <div className="phil-text">
              <TypewriterTag text="ROOT_PROTOCOL" />
              <h2>Back to the Source</h2>
              <p>
                Bitcoin wasn't built for leverage loops or high-frequency gambling.
                It was built for <strong>Peer-to-Peer Conviction.</strong>
              </p>
              <div className="phil-points">
                <div className="phil-point">
                  <span className="point-num">01</span>
                  <p>Sacred Value vs. Liquid Churn</p>
                </div>
                <div className="phil-point">
                  <span className="point-num">02</span>
                  <p>Community Sovereignty</p>
                </div>
                <div className="phil-point">
                  <span className="point-num">03</span>
                  <p>Long-term Network Security</p>
                </div>
              </div>
            </div>
            <div className="phil-visual">
              <div className="genesis-engine">
                <div className="core-source">
                  <div className="source-icon">₿</div>
                  <div className="source-glow"></div>
                </div>
                <div className="engine-rings">
                  <div className="engine-ring ring-1">
                    <span className="ring-data">0000000000000000000000</span>
                  </div>
                  <div className="engine-ring ring-2">
                    <span className="ring-data">GENESIS_BLOCK_DATA_STREAM</span>
                  </div>
                  <div className="engine-ring ring-3"></div>
                </div>
                <div className="flow-lines">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`flow-line line-${i + 1}`}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: AIRDROP (Industrial Ledger) */}
      <section id="airdrop" className="industrial-section alternate">
        <div className="container">
          <div className="ind-header center">
            <TypewriterTag text="DISTRIBUTION_LEDGER" />
            <h2>Belief Rewards</h2>
          </div>

          <div className="ledger-container">
            <div className="ledger-header">
              <div className="col">VALUATION_TARGET</div>
              <div className="col">ALLOCATION_STATUS</div>
              <div className="col">TIER</div>
            </div>
            {[
              { cap: '$250M', reward: 'COMMUNITY RECOGNITION', tier: 'ALPHA' },
              { cap: '$500M', reward: 'CONTRIBUTOR REWARDS', tier: 'BETA' },
              { cap: '$1B+', reward: 'GENESIS AIRDROP', tier: 'PRIME' },
              { cap: '$10B+', reward: 'HISTORIC DISTRIBUTION', tier: 'OMEGA' },
            ].map((item, i) => (
              <div key={i} className="ledger-row">
                <div className="col cap">{item.cap}</div>
                <div className="col reward">{item.reward}</div>
                <div className="col tier">{item.tier}</div>
              </div>
            ))}
          </div>

          <div className="ledger-footer">
            <div className="footer-item">
              <Check size={16} />
              <span>QUALIFIED: LONG-TERM HOLDERS & BUILDERS</span>
            </div>
            <div className="footer-item">
              <X size={16} />
              <span>BLACKLISTED: EXCHANGES & BOT FARMS</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: ACQUISITION PROTOCOL */}
      <section id="acquisition" className="industrial-section">
        <div className="container">
          <div className="ind-header center">
            <TypewriterTag text="ACQUISITION_PROTOCOL" />
            <h2>How to Get BELIEVE (BLT)</h2>
            <p className="ind-sub-text" style={{ margin: '12px auto 0' }}>
              Strategic participation models for the conviction-based network.
            </p>
          </div>

          <div className="ind-grid-layout" style={{ background: 'transparent', gap: '60px' }}>
            {/* Option 1 */}
            <div className="ind-feature-col">
              <TypewriterTag className="side-tag" text="PATH_01: DIRECT_ALLOCATION" style={{ color: '#FFF' }} />
              <h3 style={{ fontSize: '28px', marginBottom: '20px' }}>Community Entry</h3>
              <p style={{ color: '#888', marginBottom: '32px' }}>
                Acquire BLT directly through the secure contract deployer. This method is preferred for larger allocations to avoid market slippage.
              </p>

              <div className="terminal-block">
                <span className="terminal-label">DEPLOYER_WALLET_ADDRESS</span>
                <div className="terminal-address">
                  <code>0x62E3cCb91440D0228e197CAD59886081E688D4B5</code>
                  <button className="copy-btn" onClick={() => navigator.clipboard.writeText('0x62E3cCb91440D0228e197CAD59886081E688D4B5')}>
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              <div className="ind-stat-list" style={{ marginTop: '32px' }}>
                <div className="ind-stat-item">
                  <span className="stat-bullet"></span>
                  <div>
                    <strong>Fixed Rate:</strong> $0.005 Reference Price
                  </div>
                </div>
                <div className="ind-stat-item">
                  <span className="stat-bullet"></span>
                  <div>
                    <strong>Accepted Assets:</strong> USDT, USDC, HYPE
                  </div>
                </div>
                <div className="ind-stat-item">
                  <span className="stat-bullet"></span>
                  <div>
                    <strong>Processing:</strong> Within 24-Hour Cycle
                  </div>
                </div>
              </div>
            </div>

            {/* Option 2 */}
            <div className="ind-feature-col">
              <TypewriterTag className="side-tag" text="PATH_02: LIQUIDITY_POOL" style={{ color: '#555' }} />
              <h3 style={{ fontSize: '28px', marginBottom: '20px' }}>DEX Interface</h3>
              <p style={{ color: '#888', marginBottom: '32px' }}>
                For small quantities, BLT is available on HyperEVM decentralized exchanges. Expect higher volatility and slippage.
              </p>

              <div className="terminal-block secondary">
                <span className="terminal-label">DEX_INTERFACE_URL</span>
                <div className="terminal-address">
                  <a href="https://www.prjx.com" target="_blank" rel="noreferrer">
                    www.prjx.com <ExternalLink size={14} style={{ marginLeft: '8px' }} />
                  </a>
                </div>
              </div>

              <div className="terminal-block secondary" style={{ marginTop: '16px' }}>
                <span className="terminal-label">BLT_CONTRACT_ADDRESS</span>
                <div className="terminal-address">
                  <code>0xFEF20Fd2422a9d47Fe1a8C355A1AE83F04025EDF</code>
                  <button className="copy-btn" onClick={() => navigator.clipboard.writeText('0xFEF20Fd2422a9d47Fe1a8C355A1AE83F04025EDF')}>
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              <div className="ind-warning-box">
                <AlertTriangle size={16} color="#FF3B30" />
                <span>LIQUIDITY WARNING: High slippage risk on large orders via DEX.</span>
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="ind-quote-box" style={{ marginTop: '100px', background: 'rgba(255,255,255,0.02)', padding: '60px', borderRadius: '32px' }}>
            <div style={{ flex: '1' }}>
              <TypewriterTag text="P2P_VISION" />
              <h3 style={{ fontSize: '32px', margin: '16px 0' }}>Why Peer-to-Peer?</h3>
              <p style={{ color: '#666', fontSize: '18px', maxWidth: '800px' }}>
                BELIEVE was intentionally designed to support direct transactions between holders. This reduces extractive behavior, encourages community trust, and keeps BLT circulating among believers.
              </p>
            </div>
          </div>

          {/* Price Dynamics */}
          <div className="philosophy-layout" style={{ marginTop: '120px', gap: '60px' }}>
            <div className="phil-text">
              <TypewriterTag text="MARKET_DYNAMICS" />
              <h2>Value Evolution</h2>
              <p>
                The reference price reflects the community entry level. As participation increases, the floor price adjusts through natural market forces.
              </p>
            </div>
            <div className="phil-visual" style={{ height: 'auto' }}>
              <div className="ind-highlight-message">
                <div className="message-content">
                  <TypewriterTag text="SYSTEM_MANIFESTO" style={{ marginBottom: '12px' }} />
                  <h3>BELIEVE DOES NOT PROMISE OUTCOMES.</h3>
                  <h3>IT CREATES CONDITIONS.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: THE CHOICE */}
      <section id="join" className="industrial-section alternate">
        <div className="container">
          <div className="choice-container">
            <div className="choice-box unbeliever">
              <TypewriterTag className="choice-tag" text="PATH_A" />
              <h3>The Unbeliever</h3>
              <p>Extraction, noise, anxiety, and short-term decay.</p>
            </div>
            <div className="choice-divider">
              <div className="divider-line"></div>
              <div className="divider-label">OR</div>
              <div className="divider-line"></div>
            </div>
            <div className="choice-box believer">
              <TypewriterTag className="choice-tag" text="PATH_B" />
              <h3>The Believer</h3>
              <p>Conviction, signal, peace, and exponential growth.</p>
            </div>
          </div>

          <div className="final-call">
            <h2>The choice is yours. The network is ready.</h2>
            <button className="btn btn-primary btn-large">INITIATE CONNECTION</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column brand">
              <div className="logo">
                <div className="logo-icon">B</div>
                <span className="logo-title">BELIEVE</span>
              </div>
              <p className="brand-desc">
                The institutional standard for professional conviction.
              </p>
            </div>

            <div className="footer-column">
              <h4>NETWORK</h4>
              <ul>
                <li><a href="#">PROTOCOL</a></li>
                <li><a href="#">NODES</a></li>
                <li><a href="#">GOVERNANCE</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>COMMUNITY</h4>
              <ul>
                <li><a href="#">X / TWITTER</a></li>
                <li><a href="#">TELEGRAM</a></li>
                <li><a href="#">DISCORD</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>RESOURCES</h4>
              <ul>
                <li><a href="#">WHITEPAPER</a></li>
                <li><a href="#">AUDIT</a></li>
                <li><a href="#">DOCS</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>CORE_v1.0.4 // © 2024 BELIEVE NETWORK</p>
            <div className="footer-legal">
              <a href="#">PRIVACY</a>
              <a href="#">TERMS</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
