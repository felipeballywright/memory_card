import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RenderContainer } from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <header id='header'>
      <h1>Pokemon Memory Game</h1>
      <p>Get points by clicking on an image but don't click on any more than once!</p>
    </header>
    <RenderContainer/>
  </StrictMode>,
)
