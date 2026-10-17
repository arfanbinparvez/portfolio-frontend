import { useEffect, useState } from 'react'
import ContactForm from './ContactForm.jsx'
import VisitCounter from './VisitCounter.jsx'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const TERMINAL_LINES = [
  { cmd: 'whoami', out: 'Arfan' },
  { cmd: 'cat focus.txt', out: 'Java · SQL · Backend · Web technologies · SDLC' },
  { cmd: 'cat status.txt', out: 'CS grad, Chandigarh University (2026)\nOpen to backend & full-stack roles' },
]

function useTypedTerminal() {
  const [lines, setLines] = useState([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function run() {
      for (let i = 0; i < TERMINAL_LINES.length; i++) {
        const { cmd, out } = TERMINAL_LINES[i]
        let typed = ''
        for (let c = 0; c < cmd.length; c++) {
          if (cancelled) return
          typed += cmd[c]
          setLines((prev) => {
            const next = [...prev]
            next[i] = { cmd: typed, out: '', showOut: false }
            return next
          })
          await new Promise((r) => setTimeout(r, 28))
        }
        await new Promise((r) => setTimeout(r, 200))
        if (cancelled) return
        setLines((prev) => {
          const next = [...prev]
          next[i] = { cmd, out, showOut: true }
          return next
        })
        await new Promise((r) => setTimeout(r, 350))
      }
      if (!cancelled) setDone(true)
    }
    run()
    return () => { cancelled = true }
  }, [])

  return { lines, done }
}

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

export default function App() {
  const { lines, done } = useTypedTerminal()
  const active = useScrollSpy(SECTIONS.map((s) => s.id))
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="#top" className="logo">arfan<span>@</span>mohammad</a>
          <ul className={`tabs ${menuOpen ? 'open' : ''}`}>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`tab ${active === s.id ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="tab-dot" />{s.label}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a className="nav-cta" href="mailto:arfan_sheikh@proton.me">Hire me</a>
            <button className="hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">☰</button>
          </div>
        </div>
      </nav>

      <div id="top" className="container">
        <header className="hero">
          <div>
            <p className="eyebrow">available for backend engineer roles</p>
 <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
  Growing as a backend developer <br />
  <span className="text-gray-400 font-medium text-xl md:text-2xl">
    focusing on core <span className="accent">Java</span>, <span className="accent">Spring Boot</span>, and structured <span className="accent">database systems</span>.
  </span>
</h1>
            <p className="hero-sub">
              Computer Science graduate and aspiring backend engineer focused on professional growth, with
              strong interest in Java and Spring Boot. Adaptable and eager to learn, with full readiness to acquire any technical stack a 
              team requires, such as React or Node.js, to support project goals.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#projects">View Projects →</a>
              <a className="btn btn-ghost" href="#contact">Get in touch</a>
            </div>
            <div className="hero-meta">
              <a href="https://github.com/arfanbinparvez" target="_blank" rel="noreferrer">github.com/arfanbinparvez</a>
              <a href="https://linkedin.com/in/arfanbinparvez" target="_blank" rel="noreferrer">linkedin.com/in/arfanbinparvez</a>
              <span>Mohali, India</span>
            </div>
          </div>

          <div className="terminal">
            <div className="terminal-bar">
              <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              <span className="terminal-title">arfan@portfolio: ~</span>
            </div>
            <div className="terminal-body">
              {lines.map((l, i) => (
                <div className="term-line" key={i}>
                  <span className="prompt">➜</span> {l.cmd}
                  {i === lines.length - 1 && !l.showOut && <span className="cursor" />}
                  {l.showOut && (
                    <span className="term-out">
                      {l.out.split('\n').map((part, j) => (
                        <span key={j} style={{ display: 'block' }}>
                          {j === 0 ? <span className="hl">{part}</span> : part}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
              ))}
              {done && (
                <div className="term-line">
                  <span className="prompt">➜</span> <span className="cursor" />
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="section" id="about">
          <div className="section-head">
            <span className="section-num">01</span>
            <span className="section-comment">// about</span>
          </div>
          <h2 style={{ marginBottom: 18 }}>About</h2>
          <p className="about-text">
            I'm a recent computer Science graduate with a strong foundation in software engineering built through comprehensive academic coursework and internship experiences. 
            Proficient in{' '} <strong>Java, SQL, and Web technologies</strong>, with hands-on experience designing APIs and modeling data through self-aligned independent projects.  
            Eager to leverage both academic knowledge and technical skills in a full-time Software Engineering role.
          </p>
        </section>

        <section className="section" id="experience">
          <div className="section-head">
            <span className="section-num">02</span>
            <span className="section-comment">// experience</span>
          </div>
          <h2 style={{ marginBottom: 8 }}>Experience</h2>

          <div className="exp-item">
            <div className="exp-date">May – Jul 2025</div>
            <div>
              <div className="exp-role">Summer Intern</div>
              <div className="exp-company">Attractive Mediaz</div>
              <ul className="exp-bullets">
                <li>Gained hands-on exposure to full-stack web development by collaborating with a team on a clinic appointment booking system built with React, Node.js, Express, and SQL.</li>
                <li>Learned the fundamentals of REST API implementation, frontend-backend integration, and version control using Git through structured code walkthroughs and direct mentor guidance.</li>
                <li>Supported team development by assisting with basic testing and debugging, gaining a foundational understanding of the software development lifecycle (SDLC).</li>
                <li>Participated in pair programming and team discussions to learn how clinic workflows, such as slot creation and double-booking prevention, translate into backend logic and API contracts.</li>
              </ul>
            </div>
          </div>

          <div className="exp-item">
            <div className="exp-date">May – Aug 2024</div>
            <div>
              <div className="exp-role">Summer Intern</div>
              <div className="exp-company">Metacrafters</div>
              <ul className="exp-bullets">
                <li>Wrote and deployed Solidity smart contracts across Ethereum, Avalanche, and Polygon test networks.</li>
                <li>Implemented ERC-20 and ERC-721A token standards, with attention to gas-efficient minting logic.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-head">
            <span className="section-num">03</span>
            <span className="section-comment">// projects</span>
          </div>
          <h2 style={{ marginBottom: 22 }}>Projects</h2>

          <div className="project-grid">
            <div className="project-card">
              <div className="project-file">/projects/school-record-system</div>
                  <h3>Offline School Record Management System</h3>
                  <p className="project-problem"><span>problem:</span> manual paper registers are prone to calculation errors, physical damage, and slow administrative workflows.</p>
                  <p className="project-desc">
                    Developed an offline Windows app by bundling a React UI, Spring Boot API, and a PostgreSQL server into an Electron installer. 
                    Architected a 22-table PostgreSQL schema with Flyway migrations and precise numeric types to eliminate financial data drift. 
                    Secured the system using Spring Security RBAC and built an encrypted backup system validated against abrupt power termination.
                </p>
                <div className="tech-chips">
                  <span className="chip">React</span><span className="chip">Spring Boot</span><span className="chip">Electron</span><span className="chip">PostgreSQL</span><span className="chip">Spring Security</span><span className="chip">Flyway</span>
                </div>
            </div>

            
            <div className="project-card">
              <div className="project-file">/projects/currency-converter</div>
              <h3>Real-Time Currency Converter</h3>
              <p className="project-problem"><span>problem:</span> exchange rates drift constantly; hardcoded values go stale within hours.</p>
              <p className="project-desc">
                A JavaFX desktop app that pulls live rates from a REST exchange-rate API, parses the JSON response
                with Jackson, and handles the networking layer with OkHttp, including retry and error states when
                the API is rate-limited or unavailable, so the UI never silently shows stale data.
              </p>
              <div className="tech-chips">
                <span className="chip">Java</span><span className="chip">JavaFX</span><span className="chip">OkHttp</span><span className="chip">Jackson</span><span className="chip">REST API</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-file">/projects/food-ordering</div>
              <h3>Full-Stack Food Ordering Platform</h3>
              <p className="project-problem"><span>problem:</span> small restaurants overpay commission fees to third-party delivery apps for basic ordering.</p>
              <p className="project-desc">
                A React frontend with cart state and a responsive UI, backed by a Node.js/Express REST API for
                menu management and order processing. Designed a token-based order-tracking system where
                the backend issues a unique token per order and the frontend polls it for live status, so
                customers can track an order without an account.
              </p>
              <div className="tech-chips">
                <span className="chip">React</span><span className="chip">Node.js</span><span className="chip">Express</span><span className="chip">REST API</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-file">/projects/nft-contracts</div>
              <h3>Multi-Chain NFT Smart Contracts</h3>
              <p className="project-problem"><span>problem:</span> minting logic that's cheap and safe on one chain often isn't on another.</p>
              <p className="project-desc">
                A set of ERC-721A smart contracts deployed and tested across Ethereum, Avalanche, and Polygon,
                built during a blockchain internship. Focused on gas-efficient batch minting and defending against
                reentrancy and overflow using established OpenZeppelin patterns.
              </p>
              <div className="tech-chips">
                <span className="chip">Solidity</span><span className="chip">ERC-721A</span><span className="chip">ERC-20</span>
              </div>
            </div>
            
            <div className="project-card">
              <div className="project-file">/projects/clinic-appointment-system</div>
              <h3>Clinic Appointment Booking </h3>
              <p className="project-problem"><span>problem:</span> manual scheduling leads to double-bookings and missed patient follow-ups.</p>
              <p className="project-desc">
                As part of a collaborative development team during my internship at Attractive Mediaz, I supported the 
                development of a live clinic scheduling system built with Node.js and Express.                
                 I worked closely with the team to set up event-driven email and SMS notifications, 
                 gaining hands-on exposure to production-level backend integration and workflows.
              </p>
              <div className="tech-chips">
                <span className="chip">Node.js</span><span className="chip">Express</span><span className="chip">MySQL</span><span className="chip">REST API</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="section-head">
            <span className="section-num">04</span>
            <span className="section-comment">// skills</span>
          </div>
          <h2 style={{ marginBottom: 22 }}>Skills</h2>
          <div className="skills-grid">
            <div className="skill-group">
              <div className="skill-group-title">Languages</div>
              <div className="skill-chips">
                <span className="skill-chip">Java</span><span className="skill-chip">Python</span>
              </div>
            </div>
            <div className="skill-group">
              <div className="skill-group-title">Backend</div>
              <div className="skill-chips">
                <span className="skill-chip">Spring Boot</span><span className="skill-chip">REST APIs</span><span className="skill-chip">SQL</span><span className="skill-chip">Node.js</span><span className="skill-chip">Express</span>
              </div>
            </div>
            <div className="skill-group">
              <div className="skill-group-title">Web</div>
              <div className="skill-chips">
                <span className="skill-chip">React</span><span className="skill-chip">HTML</span><span className="skill-chip">CSS</span><span className="skill-chip">Javascript</span>
              </div>
            </div>
            <div className="skill-group">
              <div className="skill-group-title">Core CS &amp; Tools</div>
              <div className="skill-chips">
                <span className="skill-chip">DBMS</span><span className="skill-chip">OOP</span><span className="skill-chip">DSA</span><span className="skill-chip">SDLC</span><span className="skill-chip">Git</span><span className="skill-chip">GitHub</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="education">
          <div className="section-head">
            <span className="section-num">05</span>
            <span className="section-comment">// education</span>
          </div>
          <h2 style={{ marginBottom: 22 }}>Education</h2>
          <div className="edu-card">
            <div className="edu-degree">Bachelor of Engineering, Computer Science &amp; Engineering</div>
            <div className="edu-school">Chandigarh University — May 2026</div>
            <div className="coursework">
              {['Java Programming', 'OOP (C++)', 'DSA', 'Web Technologies', 'Computer Networks', 'DAA', 'DBMS', 'Software Engineering', 'Operating Systems', 'Software Project Management'].map((c) => (
                <span className="course-tag" key={c}>{c}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="section-head">
            <span className="section-num">06</span>
            <span className="section-comment">// contact</span>
          </div>
          <h2 style={{ marginBottom: 22 }}>Contact</h2>
          <div className="contact-grid">
            <a className="contact-card" href="mailto:arfan_sheikh@proton.me">
              <div className="contact-label">EMAIL</div>
              <div className="contact-value">arfan_sheikh@proton.me</div>
            </a>
            <a className="contact-card" href="tel:+919797492006">
              <div className="contact-label">PHONE</div>
              <div className="contact-value">+91 97974 92006</div>
            </a>
            <a className="contact-card" href="https://linkedin.com/in/arfanbinparvez" target="_blank" rel="noreferrer">
              <div className="contact-label">LINKEDIN</div>
              <div className="contact-value">arfanbinparvez</div>
            </a>
            <a className="contact-card" href="https://github.com/arfanbinparvez" target="_blank" rel="noreferrer">
              <div className="contact-label">GITHUB</div>
              <div className="contact-value">arfanbinparvez</div>
            </a>
          </div>

          <div className="contact-form-wrap">
            <div className="project-file">POST /api/contact</div>
            <ContactForm />
          </div>
        </section>

        <footer className="footer">
          <span>&copy; {new Date().getFullYear()} Arfan &bull; Powered by React + Vite</span>
          <VisitCounter />
        </footer>
      </div>
    </>
  )
}
