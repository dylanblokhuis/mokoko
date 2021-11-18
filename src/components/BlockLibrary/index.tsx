import { useRef } from 'react'
import { useOverlayTriggerState } from '@react-stately/overlays'
import { OverlayContainer, useOverlayPosition, useOverlayTrigger } from '@react-aria/overlays'

import styles from './index.module.css'
import BlockLibraryPopover from './Popover'
import Button from '../Button'

const BlockLibrary = function () {
  const state = useOverlayTriggerState({})
  const triggerRef = useRef(null)
  const overlayRef = useRef(null)

  // Get props for the trigger and overlay. This also handles
  // hiding the overlay when a parent element of the trigger scrolls
  // (which invalidates the popover positioning).
  const { triggerProps, overlayProps } = useOverlayTrigger({ type: 'dialog' }, state, triggerRef)

  // Get popover positioning props relative to the trigger
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: 'bottom',
    offset: 25,
    isOpen: state.isOpen
  })

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // popover closes.

  return (
    <div className={styles.BlockLibrary}>
      <Button onPress={() => state.open()} className="bg-blue-500 text-white px-3 py-1 rounded shadow" ref={triggerRef} {...triggerProps}>
        Add block
      </Button>

      {state.isOpen && (
        <OverlayContainer>
          <BlockLibraryPopover {...overlayProps} {...positionProps} ref={overlayRef} isOpen={state.isOpen} onClose={state.close} />
        </OverlayContainer>
      )}
    </div>
  )
}

export default BlockLibrary
