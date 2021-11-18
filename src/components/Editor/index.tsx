import useEditorStore from '../../hooks/state'
import Block from '../Block'

const Editor = function () {
  const blocks = useEditorStore((state) => state.blocks)
  const focusedBlockKey = useEditorStore((state) => state.focusedBlockKey)

  return (
    <div className="prose prose-blue mx-auto mt-10 placeholder-gray-900">
      {blocks.map((block, index) => (
        <Block id={block.id} index={index} isFocused={focusedBlockKey === block.id} key={block.id}>
          <block.blockType.edit {...block} />
        </Block>
      ))}
    </div>
  )
}

export default Editor
