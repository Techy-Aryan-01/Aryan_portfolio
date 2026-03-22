import { useState, useEffect } from 'react'
import { useCountUp } from '../hooks/useCountUp'
import { useInView } from '../hooks/useInView'

const ROLES = ['Full Stack Web Apps', 'DSA Solutions', 'Modern UIs', 'Scalable Backends']

function StatCounter({ value, suffix, label, start }) {
  const count = useCountUp(value, 1800, start)
  return (
    <div className="flex flex-col items-center px-6 py-1">
      <span className="font-display font-black text-2xl md:text-3xl text-gradient">
        {count.toLocaleString()}{count === value ? suffix : ''}
      </span>
      <span className="text-xs text-slate2-2 text-center mt-0.5 leading-tight">{label}</span>
    </div>
  )
}

export default function Hero({ data }) {
  const { personal, socials, cv, stats, achievements } = data
  const [roleIdx, setRoleIdx]           = useState(0)
  const [ref, inView]                   = useInView()

  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center z-10">
      <div className="max-w-6xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-16 items-center pt-24 pb-16">

        {/* Left — Text */}
        <div className="flex flex-col items-start">
          {/* Available badge */}
          {personal.openToWork && (
            <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-full mb-7">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
              Available for opportunities
            </div>
          )}

          {/* Name */}
          <h1 className="font-display font-black leading-tight mb-4">
            <span className="block text-slate2-2 text-base font-medium mb-1">Hello, I'm</span>
            <span className="block text-gradient" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              {personal.name}
            </span>
          </h1>

          {/* Role slider */}
          <div className="flex items-center gap-2.5 text-base font-semibold mb-6 h-7 overflow-hidden">
            <span className="text-slate2-3">I build</span>
            <span key={roleIdx} className="text-accent animate-slide-up">
              {ROLES[roleIdx]}
            </span>
          </div>

          {/* Bio (first paragraph) */}
          <p className="text-slate2-2 text-[0.98rem] leading-[1.8] mb-8 max-w-[520px]">
            {personal.bio[0].replace('Full Stack Developer and Competitive Programmer', '')
              ? personal.bio[0] : personal.bio[0]}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center glass border border-white/8 rounded-2xl px-2 py-3 mb-8 w-fit divide-x divide-white/10">
            {stats?.map((s, i) => (
              <StatCounter key={i} value={s.value} suffix={s.suffix} label={s.label} start={inView} />
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-gradient-main text-white font-semibold px-7 py-3.5 rounded-full shadow-glow hover:-translate-y-0.5 hover:shadow-glow-lg transition-all duration-200"
            >
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            {cv && (
              <a href={cv} download
                className="inline-flex items-center gap-2 text-slate2 font-semibold px-7 py-3.5 rounded-full border border-white/15 hover:border-accent/50 hover:bg-white/5 transition-all duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download CV
              </a>
            )}
          </div>

          {/* Socials */}
          <div className="flex gap-3">
            {socials?.github && <SocialIcon href={socials.github} label="GitHub" icon="github" />}
            {socials?.linkedin && <SocialIcon href={socials.linkedin} label="LinkedIn" icon="linkedin" />}
            {socials?.leetcode && <SocialIcon href={socials.leetcode} label="LeetCode" text="LC" />}
            {socials?.gfg && <SocialIcon href={socials.gfg} label="GFG" text="GFG" small />}
            {socials?.codolio && <SocialIcon href={socials.codolio} label="Codolio" text="CD" />}
          </div>
        </div>

        {/* Right — Code card */}
        <div className="hidden lg:flex flex-col items-center relative">
          <CodeCard personal={personal} achievements={achievements} />
          <FloatingPills achievements={achievements} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 animate-float">
        <span className="text-xs text-slate2-3">scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate2-3">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </section>
  )
}

function SocialIcon({ href, label, icon, text, small }) {
  const iconEl = icon === 'github' ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ) : icon === 'linkedin' ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ) : null

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="w-10 h-10 flex items-center justify-center glass border border-white/8 rounded-xl text-slate2-2 hover:text-accent hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-200">
      {iconEl || <span className={`font-black ${small ? 'text-[10px]' : 'text-xs'}`}>{text}</span>}
    </a>
  )
}

function CodeCard({ personal, achievements }) {
  const lc = achievements?.leetcode
  const gfg = achievements?.gfg
  return (
    <div className="relative w-full max-w-[440px] animate-float">
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-card"
        style={{ background: '#0c1a2e' }}>
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-3 font-code text-xs text-slate2-3">developer.js</span>
        </div>
        {/* Code */}
        <pre className="font-code text-[13px] leading-[2] p-6 overflow-x-auto">
          <code>
            <span className="code-kw">const </span>
            <span className="code-var">developer</span>
            <span className="text-slate2-2"> = {'{'}</span>{'\n'}
            <span className="text-slate2-2">  </span>
            <span className="code-key">name</span>
            <span className="text-slate2-2">: </span>
            <span className="code-str">"{personal.name}"</span>,{'\n'}
            <span className="text-slate2-2">  </span>
            <span className="code-key">rating</span>
            <span className="text-slate2-2">: </span>
            <span className="code-num">{lc?.contestRating ?? 1950}</span>,{'\n'}
            <span className="text-slate2-2">  </span>
            <span className="code-key">leetcode</span>
            <span className="text-slate2-2">: </span>
            <span className="code-str">"{lc?.totalSolved || '1300+'} problems"</span>,{'\n'}
            <span className="text-slate2-2">  </span>
            <span className="code-key">gfg</span>
            <span className="text-slate2-2">: </span>
            <span className="code-str">"{gfg?.totalSolved || '316+'} problems"</span>,{'\n'}
            <span className="text-slate2-2">  </span>
            <span className="code-key">stack</span>
            <span className="text-slate2-2">: [</span>
            <span className="code-str">"C++"</span>
            <span className="text-slate2-2">, </span>
            <span className="code-str">"React"</span>
            <span className="text-slate2-2">, </span>
            <span className="code-str">"Node"</span>
            <span className="text-slate2-2">],</span>{'\n'}
            <span className="text-slate2-2">  </span>
            <span className="code-key">available</span>
            <span className="text-slate2-2">: </span>
            <span className="code-kw">true</span>{'\n'}
            <span className="text-slate2-2">{'}'}</span>
          </code>
        </pre>
      </div>
      {/* Glow behind card */}
      <div className="absolute inset-0 -z-10 blur-3xl rounded-full opacity-20" style={{ background: 'radial-gradient(#10b981, #06b6d4, transparent)' }} />
    </div>
  )
}

function FloatingPills({ achievements }) {
  const lc = achievements?.leetcode
  const pills = [
    { text: `🏆 ${lc?.globalRank || 'Top 4.23%'} LeetCode`, delay: '0s' },
    { text: `⚡ Rating: ${lc?.contestRating || '1950+'}`, delay: '0.8s' },
    { text: `🔥 ${lc?.badges || 24} LC Badges`, delay: '1.6s' },
  ]
  return (
    <div className="absolute -right-10 top-4 flex flex-col gap-3">
      {pills.map((p, i) => (
        <div key={i}
          className="glass border border-white/12 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate2 whitespace-nowrap animate-float"
          style={{ animationDelay: p.delay }}>
          {p.text}
        </div>
      ))}
    </div>
  )
}
