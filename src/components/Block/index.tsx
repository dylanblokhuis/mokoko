/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactNode, memo, useRef, useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { useOverlayTriggerState } from '@react-stately/overlays'
import { OverlayContainer, useOverlayTrigger } from '@react-aria/overlays'
import styles from './Block.module.css'
import useEditorStore from '../../hooks/state'
import ToolbarPopover from './Popover'

interface BlockProps {
  id: string
  children: ReactNode
  isFocused: boolean
  index: number
}

const cx = classNames.bind(styles)

const Block = function ({ id, children, isFocused, index }: BlockProps) {
  const state = useOverlayTriggerState({
    defaultOpen: true,
    isOpen: isFocused
  })
  const [overlayStyle, setOverlayStyle] = useState<{ left?: number; top?: number }>({ left: 0, top: 0 })
  const setFocusedBlock = useEditorStore((_state) => _state.setFocusedBlock)
  const triggerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const { triggerProps, overlayProps } = useOverlayTrigger({ type: 'dialog' }, state, triggerRef)

  const className = cx({
    'mk-block': true,
    'is-focused': isFocused
  })

  useEffect(() => {
    const offset = 10
    if (triggerRef.current && overlayRef.current) {
      const triggerHeight = overlayRef.current.clientHeight + offset

      setOverlayStyle({
        left: triggerRef.current.offsetLeft,
        top: triggerRef.current.offsetTop - triggerHeight
      })
    }
  }, [triggerRef, overlayRef, index, isFocused])

  function handleClick() {
    setFocusedBlock(id)
  }

  return (
    <>
      <div
        role="button"
        ref={triggerRef}
        tabIndex={0}
        onFocus={() => setFocusedBlock(id)}
        onClick={handleClick}
        className={className}
        {...triggerProps}
      >
        {children}
      </div>

      {isFocused && (
        <OverlayContainer>
          <ToolbarPopover id={overlayProps.id} blockId={id} style={overlayStyle} ref={overlayRef} />
        </OverlayContainer>
      )}
    </>
  )
}

export default memo(Block, (prev: BlockProps, next: BlockProps) => {
  return prev.index === next.index && prev.isFocused === next.isFocused
})
