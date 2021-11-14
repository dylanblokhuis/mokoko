import "./css/globals.css"
import { OverlayProvider } from "@react-aria/overlays";

import BlockLibrary from "./components/BlockLibrary";
import Editor from "./components/Editor";

/**
 * TODO: lazy load blocks
 */
import "./blocks/paragraph";
import "./blocks/heading";

function Layout() {
  return (
    <OverlayProvider>
      <div className="Layout">
        <BlockLibrary />
        <Editor />
      </div>
    </OverlayProvider>
  )
}

export default Layout
