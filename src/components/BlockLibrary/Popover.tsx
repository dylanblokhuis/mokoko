import { forwardRef } from 'react'
import {
  useOverlay,
  useModal,
  DismissButton
} from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import useEditorStore from '../../hooks/state';

interface BlockLibraryPopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
}

const BlockLibraryPopover = forwardRef<HTMLDivElement, BlockLibraryPopoverProps>(
  ({ title, children, isOpen, onClose, style, ...otherProps }, ref) => {
    const blockTypes = useEditorStore(state => [...state.blockTypes]);
    const addBlock = useEditorStore(state => state.addBlock);

    // Handle interacting outside the dialog and pressing
    // the Escape key to close the modal.
    let { overlayProps } = useOverlay(
      {
        onClose,
        isOpen,
        isDismissable: true
      },
      ref as React.RefObject<HTMLDivElement>
    );

    // Hide content outside the modal from screen readers.
    let { modalProps } = useModal();

    // Get props for the dialog and its title
    let { dialogProps, titleProps } = useDialog({}, ref as React.RefObject<HTMLDivElement>);

    function handleClick(key: string) {
      addBlock(key);
      onClose();
    }

    return (
      <FocusScope restoreFocus>
        <div
          style={style}
          className="bg-gray-fff flex flex-col px-5 py-3 shadow-md rounded"
          ref={ref}
          {...mergeProps(overlayProps, dialogProps, otherProps, modalProps)}
        >
          <h2 {...titleProps} className="text-xl font-bold">
            Click on a block
          </h2>

          <div className="grid grid-cols-3">
            {blockTypes.map(([key, blockType]) => (
              <button
                className=""
                key={blockType.name}
                onClick={() => handleClick(key)}
              >
                {blockType.name}
              </button>
            ))}
          </div>


          <DismissButton onDismiss={onClose} />
        </div>
      </FocusScope>
    );
  }
);

export default BlockLibraryPopover