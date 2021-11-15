/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactNode, memo, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './Block.module.css'
import useEditorStore from '../../hooks/state'

interface BlockProps {
  id: string
  children: ReactNode
  isFocused: boolean
}

const cx = classNames.bind(styles)

function Block({ id, children, isFocused }: BlockProps) {
  const ref = useRef(null)
  const setFocusedBlock = useEditorStore((state) => state.setFocusedBlock)
  const className = cx({
    'mk-block': true,
    'is-focused': isFocused
  })

  function handleClick() {
    setFocusedBlock(id)
  }

  return (
    <div
      role="button"
      ref={ref}
      tabIndex={0}
      onBlur={() => setFocusedBlock(undefined)}
      onFocus={() => setFocusedBlock(id)}
      onClick={handleClick}
      className={className}
    >
      {children}
    </div>
  )
}

export default memo(Block, (prev: BlockProps, next: BlockProps) => {
  return prev.isFocused === next.isFocused
})
