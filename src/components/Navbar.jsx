import { useState, useEffect } from 'react'

const NAV_ITEMS = ['home','about','skills','achievements','projects','education','contact']

export default function Navbar({ cv }) {
  const [scrolled, setScrolled]   = useState(false)
  const [active, setActive]       = useState('home')
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const pos = window.scrollY + 90
      let cur = 'home'
      NAV_ITEMS.forEach(id => {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= pos) cur = id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-[70px] transition-all duration-300 ${
      scrolled ? 'glass-dark border-b border-white/5 shadow-card' : ''
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center gap-8">
        {/* Logo */}
        <a href="#home" onClick={e => { e.preventDefault(); scrollTo('home') }}
          className="font-display font-black text-xl text-gradient shrink-0">
          &lt;A/&gt;
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1 ml-auto">
          {NAV_ITEMS.map(id => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 relative
                  ${active === id ? 'text-accent' : 'text-slate2-2 hover:text-slate2'}`}
              >
                {id}
                {active === id && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Resume download */}
        {cv && (
          <a href={cv} download
            className="hidden md:inline-flex items-center gap-2 bg-gradient-main text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-glow hover:-translate-y-0.5 hover:shadow-glow-lg transition-all duration-200 ml-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Resume
          </a>
        )}

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden ml-auto p-2 flex flex-col gap-1.5"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-slate2-2 rounded transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-slate2-2 rounded transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-slate2-2 rounded transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-dark border-t border-white/5 px-6 py-4">
          {NAV_ITEMS.map(id => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`block w-full text-left py-3 px-2 text-sm font-medium capitalize border-b border-white/5 last:border-0
                ${active === id ? 'text-accent' : 'text-slate2-2'}`}
            >
              {id}
            </button>
          ))}
          {cv && (
            <a href={cv} download className="mt-3 inline-flex items-center gap-2 bg-gradient-main text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-glow">
              Download Resume
            </a>
          )}
        </div>
      )}
    </nav>
  )
}
