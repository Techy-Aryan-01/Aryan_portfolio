export default function Footer({ personal }) {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/5 py-7 relative z-10" style={{ background: '#030a14' }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        <a href="#home" onClick={e => { e.preventDefault(); window.scrollTo({ top:0, behavior:'smooth' }) }}
          className="font-display font-black text-xl text-gradient">
          &lt;A/&gt;
        </a>
        <p className="text-slate2-3 text-sm">
          Crafted with ❤️ by {personal?.name} · {year}
        </p>
        <div className="flex gap-5">
          {[
            { href: 'https://github.com/Keshav-goyal-1', label: 'GitHub' },
            { href: 'https://linkedin.com/in/keshav-goyal-b947a3282', label: 'LinkedIn' },
            { href: 'https://leetcode.com/u/Keshavgoyal1/', label: 'LeetCode' },
            { href: 'https://codolio.com/profile/keshavGoyal', label: 'Codolio' },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              className="text-sm text-slate2-3 hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
