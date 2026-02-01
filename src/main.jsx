import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode className="scroll-smooth">
    <div className='scroll-smooth'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
