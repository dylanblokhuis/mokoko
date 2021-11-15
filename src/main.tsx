import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './Layout'

const root = (ReactDOM as any).createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
)
