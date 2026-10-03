import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fonts.css'
import App from './App.jsx'
import { PageIntro } from './PageIntro.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageIntro />
    <App />
  </StrictMode>,
)
