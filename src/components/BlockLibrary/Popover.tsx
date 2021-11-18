import { forwardRef } from 'react'
import { useOverlay, useModal, DismissButton } from '@react-aria/overlays'
import { useDialog } from '@react-aria/dialog'
import { FocusScope } from '@react-aria/focus'
import { mergeProps } from '@react-aria/utils'
import useEditorStore from '../../hooks/state'
import Button from '../Button'

interface BlockLibraryPopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
}

const BlockLibraryPopover = forwardRef<HTMLDivElement, BlockLibraryPopoverProps>(({ isOpen, onClose, ...otherProps }, ref) => {
  const blockTypes = useEditorStore((state) => [...state.blockTypes])
  const addBlock = useEditorStore((state) => state.addBlock)

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const { overlayProps } = useOverlay(
    {
      onClose,
      isOpen,
      isDismissable: true
    },
    ref as React.RefObject<HTMLDivElement>
  )

  // Hide content outside the modal from screen readers.
  const { modalProps } = useModal()

  // Get props for the dialog and its title
  const { dialogProps, titleProps } = useDialog({}, ref as React.RefObject<HTMLDivElement>)

  function handleClick(key: string) {
    addBlock(key)
    onClose()
  }

  return (
    <FocusScope restoreFocus>
      <div
        className="bg-white flex flex-col px-5 py-3 shadow border border-gray-300 rounded"
        ref={ref}
        {...mergeProps(overlayProps, dialogProps, otherProps, modalProps)}
      >
        <h2 {...titleProps} className="text-xl font-bold">
          Click on a block
        </h2>

        <hr className="mt-3 mb-4" />

        <div className="grid grid-cols-3 min-w-[350px] gap-5">
          {blockTypes.map(([key, blockType]) => (
            <Button className="py-5 bg-gray-100 hover:bg-gray-200 rounded" key={blockType.name} onPress={() => handleClick(key)}>
              {blockType.name}
            </Button>
          ))}
        </div>

        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  )
})

export default BlockLibraryPopover
