import { useInView } from '../hooks/useInView'

export default function About({ data }) {
  const { personal, cv, achievements } = data
  const [ref, visible] = useInView()

  const lc = achievements?.leetcode
  const gfg = achievements?.gfg

  const miniCards = [
    { icon: '🎓', title: 'LPU', sub: 'B.Tech CSE · 2027' },
    { icon: '📍', title: personal.location?.split(',')[0] || 'India', sub: personal.location || 'India' },
    { icon: '🏆', title: `Rank ${gfg?.instituteRank || '#54'}`, sub: 'Institute (GFG)' },
  ]

  const highlights = [
    { icon: '💡', title: 'Problem Solver', desc: `${lc?.totalSolved || '1300+'} LeetCode · ${gfg?.totalSolved || '316+'} GFG · ${lc?.badges || 24} Badges` },
    { icon: '🛠️', title: 'Builder',        desc: 'Full-stack apps with React & Node.js' },
    { icon: '📈', title: 'Grower',         desc: `${gfg?.longestStreak || 26}-day streak, ${gfg?.potd || 123} GFG POTD solved` },
  ]

  return (
    <section id="about" className="section-padding relative z-10"
      style={{ background: 'linear-gradient(180deg, #050d1a 0%, #081220 100%)' }}>
      <div className="max-w-6xl mx-auto">

        <SectionHeader label="Who I Am" title="About Me" />

        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-16 items-center mt-16 reveal ${visible ? 'visible' : ''}`}
        >
          {/* Left — visual */}
          <div className="flex flex-col items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="absolute inset-[-3px] rounded-full bg-gradient-main opacity-60 blur-sm animate-spin-slow" />
              <div className="relative w-44 h-44 rounded-full flex items-center justify-center border border-white/10"
                style={{ background: 'linear-gradient(135deg, #0e1f35, #0a1628)' }}>
                <span className="font-display font-black text-5xl text-gradient">A</span>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-bg-card border border-white/10 rounded-full px-3 py-1 text-xs font-semibold text-emerald-400 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
                Open to Work
              </div>
            </div>

            {/* Mini cards */}
            <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
              {miniCards.map((c, i) => (
                <div key={i} className="flex items-center gap-3 glass border border-white/8 rounded-xl px-4 py-3 hover:border-accent/30 transition-all duration-200">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate2">{c.title}</p>
                    <p className="text-xs text-slate2-2">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — content */}
          <div>
            <p className="text-lg text-slate2 font-medium leading-relaxed mb-4">
              I'm a passionate <span className="text-accent font-semibold">Full Stack Developer</span> &amp;{' '}
              <span className="text-gold font-semibold">Competitive Programmer</span> currently in my 3rd year at{' '}
              <span className="text-slate2 font-semibold">Lovely Professional University</span>.
            </p>
            {personal.bio.slice(1).map((para, i) => (
              <p key={i} className="text-slate2-2 text-[0.97rem] leading-[1.85] mb-4">{para}</p>
            ))}

            {/* Highlights */}
            <div className="flex flex-col gap-4 my-7">
              {highlights.map((h, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 shrink-0 glass border border-white/8 rounded-xl flex items-center justify-center text-xl">
                    {h.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate2">{h.title}</p>
                    <p className="text-xs text-slate2-2">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {cv && (
              <a href={cv} download
                className="inline-flex items-center gap-2 bg-gradient-main text-white font-semibold px-7 py-3.5 rounded-full shadow-glow hover:-translate-y-0.5 hover:shadow-glow-lg transition-all duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download Full Resume
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function SectionHeader({ label, title, sub }) {
  return (
    <div className="text-center mb-4">
      <span className="inline-block text-xs font-semibold tracking-[3px] uppercase text-accent bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-4">
        {label}
      </span>
      <h2 className="font-display font-black text-gradient" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
        {title}
      </h2>
      {sub && <p className="text-slate2-2 mt-3 max-w-lg mx-auto">{sub}</p>}
    </div>
  )
}
