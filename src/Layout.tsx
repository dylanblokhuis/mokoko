import "./css/globals.css"
import { OverlayProvider } from "@react-aria/overlays";

import BlockLibrary from "./components/BlockLibrary";
import Editor from "./components/Editor";

/**
 * TODO: lazy load blocks
 */
import "./blocks/paragraph";
import "./blocks/heading";
import "./blocks/button";

function Layout() {
  return (
    <OverlayProvider>
      <div className="Layout">
        <div className="Toolbar bg-gray-100 py-2 min-h-[50px] flex items-center justify-start px-6">
          <BlockLibrary />
        </div>

        <Editor />
      </div>
    </OverlayProvider>
  )
}

export default Layout
