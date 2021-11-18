import './css/globals.css'
import { OverlayProvider } from '@react-aria/overlays'

import BlockLibrary from './components/BlockLibrary'
import Editor from './components/Editor'
import useEditorStore from './hooks/state'
import Button from './components/Button'

/**
 * TODO: lazy load blocks
 */
import './blocks/paragraph'
import './blocks/heading'
import './blocks/button'

const Layout = function () {
  const save = useEditorStore((state) => state.save)

  return (
    <OverlayProvider>
      <div className="Layout">
        <div className="Toolbar bg-gray-100 py-2 min-h-[50px] flex items-center justify-start px-6">
          <BlockLibrary />

          <Button onPress={save} className="bg-blue-500 text-white px-3 py-1 rounded shadow ml-5">
            Save
          </Button>
        </div>

        <Editor />
      </div>
    </OverlayProvider>
  )
}

export default Layout
