import { useRef } from 'react';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { OverlayContainer, useOverlayPosition, useOverlayTrigger } from '@react-aria/overlays';

import useEditorStore from "../../hooks/state";
import styles from "./index.module.css";
import { useButton } from '@react-aria/button';
import BlockLibraryPopover from './Popover';

function BlockLibrary() {
  const state = useOverlayTriggerState({});
  const triggerRef = useRef(null);
  const overlayRef = useRef(null);

  // Get props for the trigger and overlay. This also handles
  // hiding the overlay when a parent element of the trigger scrolls
  // (which invalidates the popover positioning).
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    state,
    triggerRef
  );

  // Get popover positioning props relative to the trigger
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: 'top',
    offset: 5,
    isOpen: state.isOpen
  });

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // popover closes.
  const { buttonProps } = useButton(
    {
      onPress: () => state.open()
    },
    triggerRef
  );

  return (
    <div className={styles.BlockLibrary}>
      <button {...buttonProps} {...triggerProps} ref={triggerRef}>
        Add block
      </button>

      {state.isOpen && (
        <OverlayContainer>
          <BlockLibraryPopover
            {...overlayProps}
            {...positionProps}
            ref={overlayRef}
            isOpen={state.isOpen}
            onClose={state.close} />

        </OverlayContainer>
      )}
    </div>
  )
}

export default BlockLibrary;