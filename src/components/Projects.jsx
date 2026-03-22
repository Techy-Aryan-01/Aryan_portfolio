import { useInView } from '../hooks/useInView'
import { SectionHeader } from './About'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

export default function Projects({ projects }) {
  const [ref, visible] = useInView()

  return (
    <section id="projects" className="section-padding relative z-10" style={{ background: '#081220' }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="What I've Built" title="Projects" />
        <div ref={ref} className={`grid md:grid-cols-2 gap-5 mt-14 reveal ${visible ? 'visible':''}`}>
          {projects?.map((p, i) => <ProjectCard key={i} project={p} idx={i} />)}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, idx }) {
  const [ref, visible] = useInView()

  const glows = [
    'rgba(16,185,129,0.15)',
    'rgba(6,182,212,0.15)',
    'rgba(139,92,246,0.15)',
    'rgba(245,158,11,0.15)',
  ]
  const borderHovers = [
    'hover:border-emerald-500/40',
    'hover:border-cyan-400/40',
    'hover:border-purple-400/40',
    'hover:border-amber-400/40',
  ]

  return (
    <div
      ref={ref}
      className={`relative glass border border-white/8 ${borderHovers[idx % 4]} rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-300 flex flex-col reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${idx * 80}ms` }}
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-36 h-36 rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 blur-2xl opacity-40"
        style={{ background: glows[idx % 4] }} />

      <div className="p-7 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <span className="text-3xl">{project.icon}</span>
          {project.featured && (
            <span className="text-[10px] font-bold uppercase tracking-widest bg-gradient-main text-white px-3 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>

        <h3 className="font-display font-bold text-lg text-slate2 mb-3">{project.title}</h3>
        <p className="text-slate2-2 text-sm leading-relaxed flex-1 mb-5">{project.description}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t, i) => (
            <span key={i}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-cyan-400/20 text-cyan-400 bg-cyan-400/8">
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl glass border border-white/10 hover:border-accent/40 hover:text-accent transition-all">
              <GitHubIcon /> Source Code
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-main text-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
