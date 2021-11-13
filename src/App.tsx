import "./css/globals.css"
import useEditorStore from "./hooks/state"
import "./components/paragraph";
import "./components/heading";
import Block from "./components/block/Block";

function App() {
  const blockTypes = useEditorStore(state => state.blockTypes);
  const addBlock = useEditorStore(state => state.addBlock);
  const blocks = useEditorStore(state => state.blocks);
  const focusedBlockKey = useEditorStore(state => state.focusedBlockKey);

  return (
    <div className="App">
      {[...blockTypes].map(([key, blockType]) => (
        <button
          className="block"
          key={blockType.name}
          onClick={() => {
            addBlock(key)
          }}
        >
          Add {blockType.name} element
        </button>
      ))}

      <div className="prose prose-blue mx-auto mt-10 placeholder-gray-900">
        {blocks.map(block => (
          <Block id={block.id} isFocused={focusedBlockKey === block.id} key={block.id}>
            <block.blockType.edit {...block} />
          </Block>
        ))}
      </div>
    </div>

  )
}

export default App
