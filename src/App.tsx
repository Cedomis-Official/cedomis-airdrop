import { useEffect, useRef } from 'react'
import './App.css'

function App() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const page = pageRef.current
    if (!page) return

    const onMove = (e: MouseEvent) => {
      page.style.setProperty('--mouse-x', `${e.clientX}px`)
      page.style.setProperty('--mouse-y', `${e.clientY}px`)

      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      page.style.setProperty('--parallax-x', String(x))
      page.style.setProperty('--parallax-y', String(y))
    }

    const onLeave = () => {
      page.style.setProperty('--parallax-x', '0')
      page.style.setProperty('--parallax-y', '0')
    }

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="page" ref={pageRef}>
      <div className="cursor-glow" aria-hidden="true" />
      <div className="cursor-grid" aria-hidden="true" />

      <header className="header">
        <img src="/cedomis-logo.png" alt="Cedomis" className="logo" />
      </header>

      <main className="hero">
        <h1 className="headline">Stack claim begins soon</h1>
      </main>
    </div>
  )
}

export default App
