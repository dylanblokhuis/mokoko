import { Plus } from 'react-feather'
import useEditorStore from '../../hooks/state'
import Block from '../Block'
import BlockLibrary from '../BlockLibrary'

interface InnerBlocksProps {
  blockId: string
}

const InnerBlocks = function ({ blockId }: InnerBlocksProps) {
  const parentBlock = useEditorStore((state) => state.select(state, blockId))
  const focusedBlockKey = useEditorStore((state) => state.focusedBlockKey)

  if (!parentBlock) return null

  if (!parentBlock.children || parentBlock.children?.length === 0) {
    return (
      <BlockLibrary className="border-2 w-full border-black flex items-center justify-center" blockId={parentBlock.id}>
        <Plus size="24" />
      </BlockLibrary>
    )
  }

  return (
    <div className="InnerBlock">
      {parentBlock?.children?.map((block, index) => (
        <Block id={block.id} index={index} isFocused={focusedBlockKey === block.id} key={block.id}>
          <block.blockType.edit {...block} />
        </Block>
      ))}
    </div>
  )
}

export default InnerBlocks
