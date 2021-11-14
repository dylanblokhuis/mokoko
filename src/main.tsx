import React from 'react'
// @ts-ignore
import { createRoot } from 'react-dom'
import Layout from './Layout'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
)