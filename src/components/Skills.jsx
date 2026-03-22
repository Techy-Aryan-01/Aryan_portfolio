import { useRef, useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { SectionHeader } from './About'

function SkillBar({ name, level, visible }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate2-2 w-28 shrink-0">{name}</span>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <div
          className="h-full rounded-full bg-gradient-main transition-all duration-[1500ms] ease-out"
          style={{ width: visible ? `${level}%` : '0%' }}
        />
      </div>
      <span className="text-xs text-slate2-3 w-8 text-right">{level}%</span>
    </div>
  )
}

function SkillCard({ category, icon, items }) {
  const [ref, visible] = useInView()

  return (
    <div ref={ref}
      className={`glass border border-white/8 rounded-2xl p-6 hover:border-accent/30 hover:shadow-glow transition-all duration-300 reveal ${visible ? 'visible' : ''}`}>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-display font-bold text-slate2">{category}</h3>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {items.slice(0, 4).map((it, i) => (
          <span key={i}
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${
              i < 2
                ? 'bg-gradient-main text-white border-transparent'
                : 'bg-emerald-500/10 border-emerald-500/20 text-accent'
            }`}>
            {it.name}
          </span>
        ))}
      </div>

      {/* Bars */}
      <div className="flex flex-col gap-3">
        {items.slice(0, 2).map((it, i) => (
          <SkillBar key={i} name={it.name} level={it.level} visible={visible} />
        ))}
      </div>
    </div>
  )
}

export default function Skills({ skills }) {
  return (
    <section id="skills" className="section-padding relative z-10" style={{ background: '#081220' }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Expertise" title="Skills & Technologies" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {skills?.map((s, i) => (
            <SkillCard key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
