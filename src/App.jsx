import { usePortfolioData } from './hooks/usePortfolioData'
import ParticleCanvas from './components/ParticleCanvas'
import CursorGlow from './components/CursorGlow'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: '#050d1a' }}>
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-accent/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent animate-spin" />
          <div className="absolute inset-3 rounded-full border border-gold/20 border-b-gold animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        </div>
        <div className="font-display font-black text-2xl text-gradient">&lt;A/&gt;</div>
        <p className="text-slate2-3 text-sm">Loading portfolio…</p>
      </div>
    </div>
  )
}

function ErrorScreen({ message }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: '#050d1a' }}>
      <div className="text-center max-w-md px-6">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="font-display font-bold text-xl text-slate2 mb-2">Failed to load portfolio data</h2>
        <p className="text-slate2-2 text-sm mb-4">{message}</p>
        <p className="text-slate2-3 text-xs">Make sure <code className="text-accent">public/portfolio.txt</code> exists and contains valid JSON.</p>
        <button onClick={() => window.location.reload()} className="mt-6 bg-gradient-main text-white font-semibold px-6 py-2.5 rounded-full text-sm">
          Retry
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const { data, loading, error } = usePortfolioData()

  if (loading) return <LoadingScreen />
  if (error)   return <ErrorScreen message={error} />

  return (
    <div className="relative">
      {/* Global effects */}
      <ParticleCanvas />
      <CursorGlow />

      {/* Navigation */}
      <Navbar cv={data.cv} />

      {/* Main content */}
      <main>
        <Hero data={data} />
        <About data={data} />
        <Skills skills={data.skills} />
        <Achievements data={data.achievements} />
        <Projects projects={data.projects} />
        <Education education={data.education} />
        <Contact data={data} />
      </main>

      <Footer personal={data.personal} />
    </div>
  )
}
