import { useInView } from '../hooks/useInView'
import { SectionHeader } from './About'

export default function Achievements({ data }) {
  const { leetcode: lc, gfg, codolio } = data
  const [ref, visible] = useInView()

  const badgeRow = [
    { icon: '🏆', text: `${lc?.badges || 24} LeetCode Badges` },
    { icon: '⚡', text: `${(parseInt(lc?.totalSolved, 10) || 1300) + (parseInt(gfg?.totalSolved, 10) || 316)}+ Total Problems` },
    { icon: '🌍', text: `Global ${lc?.globalRank || 'Top 4.23%'}` },
    { icon: '🔥', text: `${gfg?.potd || 123} POTD Solved` },
    { icon: '🎓', text: `Institute Rank ${gfg?.instituteRank || '#54'}` },
  ]

  return (
    <section id="achievements" className="section-padding relative z-10" style={{ background: '#050d1a' }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Track Record" title="Achievements & Stats" />

        <div ref={ref} className={`grid md:grid-cols-2 gap-6 mt-14 reveal ${visible ? 'visible' : ''}`}>
          {/* LeetCode */}
          <PlatformCard
            name="LeetCode"
            handle={lc.handle}
            url={lc.url}
            accentColor="#f59e0b"
            badge="LC"
            badgeGlow="rgba(245,158,11,0.2)"
            stats={[
              { label: 'Total Solved',    value: lc.totalSolved },
              { label: 'Contest Rating',  value: lc.contestRating },
              { label: 'Global Rank',     value: lc.globalRank },
              { label: 'Badges Earned',   value: lc.badges },
            ]}
            extra={
              <div className="mt-5 space-y-2.5">
                {[
                  { label: 'Easy',   count: lc.easy,   color: '#10b981', pct: Math.round(lc.easy/(lc.easy+lc.medium+lc.hard)*100) },
                  { label: 'Medium', count: lc.medium, color: '#f59e0b', pct: Math.round(lc.medium/(lc.easy+lc.medium+lc.hard)*100) },
                  { label: 'Hard',   count: lc.hard,   color: '#ef4444', pct: Math.round(lc.hard/(lc.easy+lc.medium+lc.hard)*100) },
                ].map(d => (
                  <div key={d.label} className="flex items-center gap-3">
                    <span className="text-xs font-semibold w-12" style={{ color: d.color }}>{d.label}</span>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                      <div className="h-full rounded-full" style={{ width: `${d.pct}%`, background: d.color, transition: 'width 1.4s ease' }} />
                    </div>
                    <span className="text-xs text-slate2-3 w-6 text-right">{d.count}</span>
                  </div>
                ))}
              </div>
            }
          />

          {/* GFG */}
          <PlatformCard
            name="GeeksforGeeks"
            handle={gfg.handle}
            url={gfg.url}
            accentColor="#10b981"
            badge="GFG"
            badgeGlow="rgba(16,185,129,0.2)"
            badgeSmall
            stats={[
              { label: 'Problems Solved', value: gfg.totalSolved },
              { label: 'Coding Score',    value: gfg.codingScore },
              { label: 'POTD Solved',     value: gfg.potd },
              { label: 'Institute Rank',  value: gfg.instituteRank },
            ]}
            extra={
              <div className="mt-5 grid grid-cols-2 gap-3">
                <StatMini icon="🔥" val={gfg.longestStreak} label="Day Streak" color="#f59e0b" />
                <StatMini icon="📅" val={gfg.potd} label="POTD Solved" color="#10b981" />
              </div>
            }
          />
        </div>

        {/* Codolio card */}
        {codolio && (
          <div className="mt-6">
            <a href={codolio.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between glass border border-white/8 rounded-2xl px-7 py-5 hover:border-cyan-400/40 hover:shadow-glow transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm border"
                  style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', color: '#06b6d4' }}>
                  CD
                </div>
                <div>
                  <h3 className="font-semibold text-slate2">Codolio</h3>
                  <p className="text-xs text-slate2-3">{codolio.handle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400">
                View Profile
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </a>
          </div>
        )}

        {/* Badge row */}
        <div className="flex flex-wrap gap-3 justify-center mt-10">
          {badgeRow.map((b, i) => (
            <div key={i} className="flex items-center gap-2 glass border border-white/8 px-4 py-2 rounded-full text-sm font-medium hover:border-accent/30 transition-all">
              <span>{b.icon}</span><span className="text-slate2-2">{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlatformCard({ name, handle, url, accentColor, badge, badgeGlow, badgeSmall, stats, extra }) {
  return (
    <div className="relative glass border border-white/8 rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300"
      style={{ '--glow': badgeGlow }}>
      {/* Glow blob */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 blur-3xl opacity-30"
        style={{ background: badgeGlow }} />

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black border"
          style={{ background: `${badgeGlow}`, border: `1px solid ${accentColor}33`, color: accentColor, fontSize: badgeSmall ? 11 : 14 }}>
          {badge}
        </div>
        <div>
          <h3 className="font-display font-bold text-slate2">{name}</h3>
          <a href={url} target="_blank" rel="noopener noreferrer"
            className="text-xs font-medium transition-colors hover:opacity-80" style={{ color: accentColor }}>
            {handle} ↗
          </a>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <p className="font-display font-black text-2xl text-gradient">{s.value}</p>
            <p className="text-xs text-slate2-3 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {extra}

      <a href={url} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-semibold mt-5 px-4 py-2 rounded-full border transition-all hover:opacity-80"
        style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}33`, color: accentColor }}>
        View Profile →
      </a>
    </div>
  )
}

function StatMini({ icon, val, label, color }) {
  return (
    <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
      <span className="text-xl">{icon}</span>
      <p className="font-display font-black text-xl mt-1" style={{ color }}>{val}</p>
      <p className="text-xs text-slate2-3">{label}</p>
    </div>
  )
}
