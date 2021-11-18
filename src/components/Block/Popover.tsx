import { forwardRef } from 'react'
import { ChevronUp, ChevronDown } from 'react-feather'
import useEditorStore from '../../hooks/state'
import Button from '../Button'

interface ToolbarPopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  // isOpen: boolean
  id: string | undefined
  blockId: string
  style: object
}

const ToolbarPopover = forwardRef<HTMLDivElement, ToolbarPopoverProps>(({ id, style, blockId }, ref) => {
  const { moveUp, moveDown } = useEditorStore((state) => state.blockActions)
  return (
    <div ref={ref} id={id} className="bg-white px-3 py-2 border rounded absolute z-50" style={style}>
      <div className="flex flex-col items-center justify-center">
        <Button onPress={() => moveUp(blockId)} className="mb-1">
          <ChevronUp size="16.5px" />
        </Button>
        <Button onPress={() => moveDown(blockId)}>
          <ChevronDown size="16.5px" />
        </Button>
      </div>
    </div>
  )
})

export default ToolbarPopover
