import "./css/globals.css"
import useBlockProps from "./hooks/blocks"
import useEditorStore from "./hooks/state"
import "./components/paragraph";

function App() {
  const blockTypes = useEditorStore(state => state.blockTypes);
  const addBlock = useEditorStore(state => state.addBlock);
  const blocks = useEditorStore(state => state.blocks);

  // console.log(blocks);

  return (
    <div className="App">
      {blockTypes.map(blockType => (
        <button
          key={blockType.name}
          onClick={() => {
            addBlock(blockType)
          }}
        >
          Add {blockType.name} element
        </button>
      ))}

      <div className="prose prose-blue mx-auto mt-10 placeholder-gray-900">
        {blocks.map(block => (
          <block.blockType.edit key={block.id} {...useBlockProps(block)} />
        ))}
      </div>
    </div>

  )
}

export default App
