import { StrictMode, useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, Asterisk, Menu, MoveUpRight, X } from 'lucide-react'
import './styles.css'
import Velaris from './components/ui/velaris'
import HalftoneFlow from './components/ui/halftone-flow'
import HeroArtCard from './components/ui/hero-art-card'
import darkLogo from '../Dark Logo.svg'
import whiteLogo from '../White logo.svg'
import whiteBwLogo from '../white -bwLogo.svg'

const work = [
  { number: '01', title: 'Forma Objects', type: 'Brand world / 2024', color: 'clay', note: 'A tactile identity for objects made to outlive trends.', shape: 'ring' },
  { number: '02', title: 'Orbit House', type: 'Digital experience / 2023', color: 'teal', note: 'A new signal for culture, sound, and shared space.', shape: 'orbit' },
  { number: '03', title: 'Still Moving', type: 'Campaign system / 2023', color: 'gold', note: 'Motion, type, and image in a language of its own.', shape: 'bars' },
]

const testimonialColumns = [
  // Column 1
  [
    {
      id: 't1',
      theme: 'light',
      hasGrid: true,
      quote: '"Alpha & Omega has been a game-changer for us. Their service is top-notch and their team is incredibly responsive."',
      author: 'Guillermo Rauch',
      role: 'CEO of Enigma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 't2',
      theme: 'orange',
      hasGrid: false,
      quote: '"We\'ve seen incredible results with Alpha & Omega. Their expertise, dedication."',
      author: 'Rika Shinoda',
      role: 'CEO of Kintsugi',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
    },
  ],
  // Column 2
  [
    {
      id: 't3',
      theme: 'dark',
      hasGrid: false,
      quote: '"Their team is highly professional, and their innovative solutions have truly transformed the way we operate."',
      author: 'Reacher',
      role: 'CEO of OdeaoLabs',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 't4',
      theme: 'dark',
      hasGrid: false,
      quote: '"We\'re extremely satisfied with Alpha & Omega. Their expertise and dedication have exceeded our expectations."',
      author: 'John',
      role: 'CEO of Labsbo',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 't5',
      theme: 'dark',
      hasGrid: false,
      quote: '"Their customer support is absolutely exceptional. They are always available, incredibly helpful."',
      author: 'Steven Sunny',
      role: 'CEO of boxefi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    },
  ],
  // Column 3
  [
    {
      id: 't6',
      theme: 'orange',
      hasGrid: false,
      quote: '"Alpha & Omega has been a key partner in our growth journey."',
      author: 'Guillermo Rauch',
      role: 'CEO of OdeaoLabs',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 't7',
      theme: 'light',
      hasGrid: true,
      quote: '"Alpha & Omega has been a true game-changer for us. Their exceptional service, combined with their deep expertise and commitment to excellence, has made a significant impact on our business."',
      author: 'Paul Brauch',
      role: 'CTO of Spectrum',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80',
    },
  ],
]

function CustomCursor() {
  const dotRef = useRef(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const [cursorColor, setCursorColor] = useState('orange') // 'orange' (black/white background) | 'black' (orange background)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return

    const updateCursorAtPoint = (x, y) => {
      const target = document.elementFromPoint(x, y)
      if (!target) return

      const isClickable = Boolean(
        target.closest('a, button, [role="button"], .work-item, input, select, textarea, .faq-trigger')
      )
      setIsHovered(isClickable)

      // Orange background containers: ticker, hero art card, accent buttons, clay work card, approach section, orange testimonial card, contact submit button, footer banner
      // If hovering .light-link inside approach section, it is a white button, so it is treated as a light background
      const isOrangeBg = Boolean(
        target.closest(`
          .ticker,
          .hero-art,
          .btn-accent,
          .work-visual.clay,
          .approach-section,
          .testimonial-card-orange,
          .contact-submit-btn,
          .footer-banner
        `) && !target.closest('.light-link')
      )

      // Orange background -> black dot; Black and White background -> orange dot
      setCursorColor(isOrangeBg ? 'black' : 'orange')
    }

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }

      updateCursorAtPoint(e.clientX, e.clientY)
    }

    const onScroll = () => {
      if (mousePos.current.x >= 0 && mousePos.current.y >= 0) {
        updateCursorAtPoint(mousePos.current.x, mousePos.current.y)
      }
    }

    const onMouseDown = () => setIsClicked(true)
    const onMouseUp = () => setIsClicked(false)
    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      className={`custom-cursor-dot cursor-${cursorColor} ${isHovered ? 'cursor-hover' : ''} ${isClicked ? 'cursor-clicked' : ''} ${isVisible ? 'cursor-visible' : ''}`}
    />
  )
}

function FAQSection() {
  const [openId, setOpenId] = useState('data-security')

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  const faqItems = [
    {
      id: 'data-security',
      question: 'Data Security',
      answer: 'We use industry-standard AES-256 encryption to protect your sensitive information at rest and in transit.',
    },
    {
      id: 'api-integration',
      question: 'API Integration',
      answer: 'Seamlessly connect with your existing toolchain and third-party services through our robust, well-documented REST and GraphQL APIs.',
    },
    {
      id: 'team-collaboration',
      question: 'Team Collaboration',
      answer: 'Invite unlimited team members with granular role-based access control, live shared workspaces, and real-time review workflows.',
    },
    {
      id: 'studio-engagement',
      question: 'Studio Engagement & Process',
      answer: 'We operate as an embedded senior partner, running focused 2-to-6 week sprints across brand world strategy, WebGL experiences, and full-stack engineering.',
    },
    {
      id: 'deliverables-ip',
      question: 'Deliverables & IP Ownership',
      answer: 'You retain 100% intellectual property ownership upon completion. We deliver production-ready code repositories, Figma design systems, and comprehensive documentation.',
    },
  ]

  return (
    <section className="faq-section" id="faq">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow"><span className="eyebrow-dot" /> 05 / Questions &amp; Answers</p>
          <p className="section-note">Everything you need to know<br />about our systems &amp; craft.</p>
        </div>

        <div className="faq-container">
          <div className="faq-list" role="region" aria-label="Frequently Asked Questions">
            {faqItems.map((item) => {
              const isOpen = openId === item.id
              return (
                <div
                  key={item.id}
                  className={`faq-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-trigger"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <span className="faq-question">{item.question}</span>
                    <span className="faq-icon-symbol" aria-hidden="true">
                      <span className="faq-icon-h" />
                      <span className="faq-icon-v" />
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${item.id}`}
                    className="faq-answer-collapse"
                  >
                    <div className="faq-answer-inner">
                      <p className="faq-answer-text">{item.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="faq-bottom-bar">
            <div className="faq-bottom-text">
              <span className="faq-bottom-title">Have a question not listed here?</span>
              <span className="faq-bottom-desc">We're always available to walk through custom technical needs and scopes.</span>
            </div>
            <a href="#contact" className="faq-bottom-link">
              <span>Ask a question</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'submitted'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.email) return
    setStatus('submitting')
    setTimeout(() => {
      setStatus('submitted')
    }, 600)
  }

  return (
    <section className="contact-section" id="contact">
      <div className="wrap">
        <div className="contact-top">
          <p className="eyebrow">06 / Contact</p>
          <span className="contact-aside">Now booking — Q4 2026</span>
        </div>

        <div className="contact-card-wrapper">
          <div className="contact-card">
            {/* Left Column: Atmospheric Visual with vertical glowing curtain folds */}
            <div className="contact-card-visual">
              <div className="contact-curtain-glow" />
              <div className="contact-curtain-shimmer" />
              <div className="contact-curtain-overlay" />
              <h3 className="contact-visual-title">
                Design and dev partner for startups and founders.
              </h3>
            </div>

            {/* Right Column: Clean White Form Panel */}
            <div className="contact-card-form">
              <div className="contact-form-sun" aria-hidden="true">
                <svg
                  className="contact-sun-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <line x1="12" y1="2" x2="12" y2="4.5" />
                  <line x1="12" y1="19.5" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="4.5" y2="12" />
                  <line x1="19.5" y1="12" x2="22" y2="12" />
                  <line x1="4.93" y1="4.93" x2="6.7" y2="6.7" />
                  <line x1="17.3" y1="17.3" x2="19.07" y2="19.07" />
                  <line x1="4.93" y1="19.07" x2="6.7" y2="17.3" />
                  <line x1="17.3" y1="6.7" x2="19.07" y2="4.93" />
                </svg>
              </div>

              <div className="contact-form-header">
                <h2 className="contact-form-title">Get Started</h2>
                <p className="contact-form-subtitle">
                  Welcome to Alpha &amp; Omega — Let's get started
                </p>
              </div>

              {status === 'submitted' ? (
                <div className="contact-success-box">
                  <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: '15px' }}>
                    Inquiry received!
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                    Thank you, {formData.name || 'there'}. We'll review your project details and get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    style={{
                      marginTop: '14px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--orange)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '12.5px',
                      textDecoration: 'underline'
                    }}
                    onClick={() => {
                      setStatus('idle')
                      setFormData({ name: '', email: '', message: '' })
                    }}
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-field-group">
                    <label className="contact-field-label" htmlFor="contact-name">
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      className="contact-input"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="contact-field-group">
                    <label className="contact-field-label" htmlFor="contact-email">
                      Your email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      className="contact-input"
                      placeholder="hi@alpha-omega.studio"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="contact-field-group">
                    <label className="contact-field-label" htmlFor="contact-message">
                      Tell us about your project
                    </label>
                    <textarea
                      id="contact-message"
                      className="contact-textarea"
                      placeholder="Briefly describe what you're looking to build..."
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="contact-submit-btn"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send message'}
                  </button>

                  <div className="contact-form-footer">
                    Prefer direct email?{' '}
                    <a href="mailto:hello@alpha-omega.studio">hello@alpha-omega.studio</a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FooterSection() {
  const columns = [
    {
      title: 'Product',
      links: [
        { label: 'Statement', href: '#statement' },
        { label: 'Solution', href: '#approach' },
        { label: 'Customers', href: '#testimonials' },
        { label: 'Pricing', href: '#contact' },
        { label: 'Help', href: '#faq' },
        { label: 'Terms', href: '#top' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#approach' },
        { label: 'Careers', href: '#contact' },
        { label: 'Blogs', href: '#work' },
        { label: 'Pricing', href: '#contact' },
        { label: 'Contact', href: '#contact' },
        { label: 'Privacy', href: '#top' },
      ],
    },
    {
      title: 'Social',
      links: [
        { label: 'X', href: 'https://x.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
        { label: 'Facebook', href: 'https://facebook.com' },
        { label: 'Threads', href: 'https://threads.net' },
        { label: 'Instagram', href: 'https://instagram.com' },
        { label: 'Youtube', href: 'https://youtube.com' },
      ],
    },
  ]

  return (
    <footer className="site-footer">
      {/* Main Architectural Slat Color Banner */}
      <div className="footer-banner">
        {/* Vertical Slat Grid Background */}
        <div className="footer-slats-bg" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="footer-slat" />
          ))}
        </div>

        <div className="wrap footer-content">
          {/* Left Column: Brand mark, Slogan, Socials & Copyright */}
          <div className="footer-left-col">
            <a href="#top" className="footer-brand-mark" aria-label="Alpha and Omega home">
              <img src={whiteBwLogo} alt="Alpha & Omega" className="footer-brand-logo-img" />
            </a>

            <h3 className="footer-slogan">
              Ship Tastefully Crafted<br />Marketing Pages
            </h3>

            <div className="footer-left-bottom">
              <div className="footer-social-icons">
                <a href="https://x.com" target="_blank" rel="noreferrer" className="footer-social-icon-link" aria-label="X (Twitter)">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-icon-link" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.5a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34" />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-icon-link" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="https://threads.net" target="_blank" rel="noreferrer" className="footer-social-icon-link" aria-label="Threads">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12c0 4.418-3.582 7-8 7-4.418 0-7-3.582-7-8s2.582-7 7-7c3.866 0 6.5 2.634 6.5 6.5 0 2.5-1.5 4.5-4 4.5s-3.5-1.5-3.5-3.5c0-1.5.8-2.5 2-2.5 1.5 0 2.5 1 2.5 2.5" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-icon-link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="footer-social-icon-link" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.891 2.896 2.896 0 0 1-2.892-2.891 2.896 2.896 0 0 1 2.892-2.892c.314 0 .615.05.897.142V9.387a6.34 6.34 0 0 0-.897-.063A6.338 6.338 0 0 0 3 15.662 6.338 6.338 0 0 0 9.338 22a6.338 6.338 0 0 0 6.338-6.338V9.083a8.21 8.21 0 0 0 4.911 1.621V7.27a4.82 4.82 0 0 1-1-.584z" />
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-icon-link" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>

              <p className="footer-copyright-text">
                &copy; 2026 Alpha &amp; Omega, All rights reserved
              </p>
            </div>
          </div>

          {/* Right Columns: Product, Company, Social */}
          <div className="footer-right-cols">
            {columns.map((col) => (
              <div key={col.title} className="footer-nav-col">
                <h4 className="footer-nav-title">{col.title}</h4>
                <ul className="footer-nav-list">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const initialScrollY = Math.max(0, window.scrollY)
    lastScrollY.current = initialScrollY
    setIsScrolled(initialScrollY > 20)
    if (initialScrollY > 60) {
      setIsHeaderVisible(false)
    }

    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY)

      setIsScrolled(currentScrollY > 20)

      // Always keep header visible when at or near top of the page
      if (currentScrollY <= 60) {
        setIsHeaderVisible(true)
      } else {
        const diff = currentScrollY - lastScrollY.current
        // Scrolling down -> hide header
        if (diff > 8) {
          setIsHeaderVisible(false)
        }
        // Scrolling back up towards top -> show header
        else if (diff < -8) {
          setIsHeaderVisible(true)
        }
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerVisible = isHeaderVisible || menuOpen

  return (
    <>
      <CustomCursor />
      <main>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''} ${!headerVisible ? 'is-hidden' : ''}`}>
        <nav className="nav wrap">
        <a href="#top" className="brand-mark" aria-label="Alpha and Omega home">
          <img src={whiteLogo} alt="Alpha and Omega" />
          <span>ALPHA<br />& OMEGA</span>
        </a>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a>
          <a href="#statement" onClick={() => setMenuOpen(false)}>Statement</a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <a className="nav-cta" href="#contact">Start a project <ArrowUpRight size={16} /></a>
        </nav>
      </header>

      <section className="hero" id="top">
        <Velaris
          bg="#000000"
          colors={['#ff6a1a', '#df5d14', '#9d4c20', '#171717']}
          speed={1.8}
          grain={0.32}
          height="100%"
          className="hero-velaris"
        />
        <div className="hero-inner wrap">
          <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Independent creative studio <span className="year">Est. 2019 / Worldwide</span></p>
          <h1>We make brands<br /><em>feel inevitable.</em></h1>
          <p className="hero-intro">Alpha & Omega is a small, senior-led studio building distinct identities and digital worlds for people moving culture forward.</p>
          <div className="hero-actions">
            <a className="btn btn-accent" href="#work">Explore the work <ArrowUpRight size={16} /></a>
            <a className="btn btn-secondary" href="#contact">Let’s talk <ArrowUpRight size={16} /></a>
          </div>
          </div>
          <HeroArtCard />
        </div>
      </section>

      <section className="ticker" aria-label="Studio disciplines">
        <div className="ticker-track"><span>Brand strategy</span><Asterisk /><span>Identity systems</span><Asterisk /><span>Digital experiences</span><Asterisk /><span>Brand strategy</span><Asterisk /><span>Identity systems</span><Asterisk /><span>Digital experiences</span><Asterisk /></div>
      </section>

      <section className="work-section" id="work">
        <div className="wrap">
          <div className="section-heading"><p className="eyebrow">01 / Selected work</p><p className="section-note">A few things we’ve made<br />with good people.</p></div>
          <div className="work-list">
            {work.map((item) => <article className="work-item" key={item.number}>
              <div className={`work-visual ${item.color}`}><div className={`visual-shape ${item.shape}`} /><span className="visual-label">{item.number} / {item.type.split(' / ')[0]}</span><ArrowUpRight className="visual-arrow" /></div>
              <div className="work-meta"><span className="work-number">{item.number}</span><div><h2>{item.title}</h2><p>{item.note}</p></div><a href="#contact" aria-label={`View ${item.title}`}><ArrowUpRight size={21} /></a></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="statement-section" id="statement">
        <HalftoneFlow className="statement-halftone">
          <div className="statement-overlay">
            <div className="statement-header-bar">
              <p className="eyebrow">02 / The Statement</p>
              <span className="statement-tag">Tactile Halftone Mechanics</span>
            </div>

            <div className="statement-content">
              <div className="statement-badge">
                <span className="statement-pulse" />
                <span>Procedural WebGL Rasterization</span>
              </div>
              <h2 className="statement-title">
                We craft digital worlds<br />
                <em>that refuse to fade.</em>
              </h2>
              <p className="statement-desc">
                Strategy, instinct, and kinetic craft converge. We engineer brand systems and digital environments that cut through transient noise with unmistakable gravity.
              </p>
              <div className="statement-actions">
                <a href="#contact" className="btn btn-accent">
                  Initiate a project <ArrowUpRight size={16} />
                </a>
                <span className="statement-spec">
                  Simulated Fluid Dynamics &bull; 60 FPS Halftone Shader
                </span>
              </div>
            </div>

            <div className="statement-footer-bar">
              <span>100VH Standalone Viewport</span>
              <span>Chromatic Spectrum &bull; #DF5D14 &bull; #9D4C20</span>
              <span>Alpha &amp; Omega Studio</span>
            </div>
          </div>
        </HalftoneFlow>
      </section>

      <section className="approach-section" id="approach">
        <div className="wrap approach-grid"><p className="eyebrow">03 / The approach</p><div><h2>Clarity is a<br /><span>creative act.</span></h2><p className="approach-copy">The best work happens when strategy and instinct share the same room. We find the sharpest version of an idea, then make it impossible to ignore.</p><a className="text-link light-link" href="#contact">More about how we work <ArrowUpRight size={16} /></a></div><div className="approach-index">A—O<br /><span>∞</span></div></div>
      </section>

      <section className="testimonials-section" id="testimonials">
        <div className="wrap">
          <div className="section-heading">
            <p className="eyebrow">04 / Voices & Trust</p>
            <p className="section-note">What our partners say<br />about building with us.</p>
          </div>

          <div className="testimonials-grid">
            {testimonialColumns.map((col, colIdx) => (
              <div className="testimonials-col" key={colIdx}>
                {col.map((item) => (
                  <article
                    key={item.id}
                    className={`testimonial-card testimonial-card-${item.theme} ${item.hasGrid ? 'card-has-grid' : ''}`}
                  >
                    {item.hasGrid && (
                      <div className="card-grid-header" aria-hidden="true">
                        <div className="card-grid-matrix">
                          {Array.from({ length: 21 }).map((_, i) => (
                            <span key={i} className="card-grid-cell" />
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="testimonial-card-body">
                      <p className="testimonial-quote">
                        {item.quote}
                      </p>
                      <div className="testimonial-author">
                        <div className="author-info">
                          <span className="author-name">{item.author}</span>
                          <span className="author-role">{item.role}</span>
                        </div>
                        <img
                          src={item.avatar}
                          alt={item.author}
                          className="author-avatar"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.author)}&background=232323&color=ffffff&bold=true`
                          }}
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
      <ContactSection />
      <FooterSection />
    </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
