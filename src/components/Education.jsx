import { useInView } from '../hooks/useInView'
import { SectionHeader } from './About'

export default function Education({ education }) {
  const [ref, visible] = useInView()

  return (
    <section id="education" className="section-padding relative z-10" style={{ background: '#050d1a' }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="My Journey" title="Education" />
        <div ref={ref} className={`mt-14 max-w-3xl mx-auto reveal ${visible ? 'visible' : ''}`}>
          {education?.map((edu, i) => (
            <div key={i} className="relative pl-10">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent to-transparent" />
              {/* Timeline dot */}
              <div className="absolute left-0 top-7 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-main border-2 border-bg shadow-glow" />

              <div className="glass border border-white/8 rounded-2xl p-8 hover:border-accent/30 hover:shadow-glow transition-all duration-300">
                <div className="flex items-start gap-4 mb-5">
                  <span className="text-3xl">🎓</span>
                  <div>
                    <h3 className="font-display font-bold text-slate2 mb-1">{edu.degree}</h3>
                    <p className="text-accent text-sm font-semibold">{edu.institution}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Chip icon="📅">{edu.period}</Chip>
                  <Chip icon="🟢" green>{edu.status}</Chip>
                  <Chip icon="📍">{edu.location}</Chip>
                </div>
                <ul className="space-y-3">
                  {edu.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-sm text-slate2-2">
                      <span className="text-accent font-bold shrink-0 mt-0.5">▸</span>
                      <span dangerouslySetInnerHTML={{
                        __html: pt.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate2">$1</strong>')
                               .replace(/#(\S+)/g, '<strong class="text-accent">$1</strong>')
                      }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Chip({ icon, children, green }) {
  return (
    <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${
      green
        ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
        : 'glass border-white/10 text-slate2-2'
    }`}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  )
}
