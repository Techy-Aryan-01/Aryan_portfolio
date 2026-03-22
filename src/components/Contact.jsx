import { useInView } from '../hooks/useInView'
import { SectionHeader } from './About'

const PLATFORMS = [
  {
    key: 'github',
    name: 'GitHub',
    handle: 'Aryan',
    style: { bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.15)', color: '#e2e8f0' },
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    key: 'linkedin',
    name: 'LinkedIn',
    handle: 'Aryan',
    style: { bg: 'rgba(10,102,194,0.15)', border: 'rgba(10,102,194,0.3)', color: '#0a66c2' },
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    key: 'leetcode',
    name: 'LeetCode',
    handle: '@Aryan',
    style: { bg: 'rgba(255,161,22,0.12)', border: 'rgba(255,161,22,0.3)', color: '#ffa116' },
    icon: <span className="font-black text-sm" style={{ color: '#ffa116' }}>LC</span>,
  },
  {
    key: 'gfg',
    name: 'GeeksforGeeks',
    handle: '@Aryan',
    style: { bg: 'rgba(47,141,70,0.12)', border: 'rgba(47,141,70,0.3)', color: '#2f8d46' },
    icon: <span className="font-black text-[10px]" style={{ color: '#2f8d46' }}>GFG</span>,
  },
  {
    key: 'codolio',
    name: 'Codolio',
    handle: '@Aryan',
    style: { bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.3)', color: '#06b6d4' },
    icon: <span className="font-black text-xs" style={{ color: '#06b6d4' }}>CD</span>,
  },
]

export default function Contact({ data }) {
  const { socials, cv } = data
  const [ref, visible] = useInView()

  return (
    <section id="contact" className="section-padding relative z-10" style={{ background: '#081220' }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Get In Touch"
          title="Let's Connect"
          sub="I'm actively looking for new opportunities. Whether it's a project, internship, or just a chat — I'm all ears."
        />

        <div ref={ref} className={`grid lg:grid-cols-2 gap-8 mt-14 reveal ${visible ? 'visible' : ''}`}>
          {/* Platform cards */}
          <div className="flex flex-col gap-4">
            {PLATFORMS.map(p => (
              <a key={p.key}
                href={socials?.[p.key] || '#'}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 glass border border-white/8 rounded-xl px-5 py-4 hover:border-accent/30 hover:translate-x-1 transition-all duration-200 group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
                  style={{ background: p.style.bg, borderColor: p.style.border }}>
                  {p.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate2">{p.name}</p>
                  <p className="text-xs text-slate2-3">{p.handle}</p>
                </div>
                <svg className="w-4 h-4 text-slate2-3 group-hover:text-accent group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            ))}
          </div>

          {/* CTA box */}
          <div className="relative glass border border-white/8 rounded-2xl p-10 flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(#10b981, #06b6d4, transparent)' }} />
            </div>

            <div className="relative">
              <span className="text-4xl mb-4 block">🚀</span>
              <h3 className="font-display font-black text-2xl text-slate2 mb-3">
                Ready to build something{' '}
                <span className="text-gradient">amazing</span>?
              </h3>
              <p className="text-slate2-2 text-sm mb-8 max-w-xs">
                Open to full-time roles, internships, and freelance projects. Let's talk!
              </p>

              {cv && (
                <a href={cv} download
                  className="inline-flex items-center gap-2.5 bg-gradient-main text-white font-bold text-base px-8 py-4 rounded-full shadow-glow hover:-translate-y-0.5 hover:shadow-glow-lg transition-all duration-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download My Resume
                </a>
              )}
              <p className="text-slate2-3 text-xs mt-5">📍 Panipat, Haryana, India · Open to Remote</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
