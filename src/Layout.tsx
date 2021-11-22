import './css/globals.css'
import { OverlayProvider } from '@react-aria/overlays'

import Editor from './components/Editor'
import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'

/**
 * TODO: lazy load blocks
 */
import './blocks/paragraph'
import './blocks/heading'
import './blocks/button'
import './blocks/column'

const Layout = function () {
  return (
    <OverlayProvider>
      <div className="Layout pt-12">
        <Toolbar />
        <Sidebar />
        <Editor />
      </div>
    </OverlayProvider>
  )
}

export default Layout
