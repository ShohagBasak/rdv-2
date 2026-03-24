import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CustomCursor />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

const CustomCursor = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [mouseX, mouseY])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-[99999]"
        style={{
          x: mouseX,
          y: mouseY,
          marginLeft: '-6px',
          marginTop: '-6px',
          boxShadow: '0 0 15px rgba(34,211,238,1), 0 0 30px rgba(34,211,238,0.5)'
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-cyan-400/40 rounded-full pointer-events-none z-[99998]"
        style={{
          x: cursorX,
          y: cursorY,
          marginLeft: '-20px',
          marginTop: '-20px',
          boxShadow: '0 0 20px rgba(34,211,238,0.2)'
        }}
      />
    </>
  )
}

export default App
