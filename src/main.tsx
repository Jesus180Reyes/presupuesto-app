import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HomePage } from './presentation/pages/HomePage'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>,
)
