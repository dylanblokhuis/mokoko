import { ReactNode, memo } from "react";
import classNames from "classnames/bind"
import styles from "./Block.module.css";
import useEditorStore from "../../hooks/state";

interface BlockProps {
  id: string
  children: ReactNode,
  isFocused: boolean
}

const cx = classNames.bind(styles);

function Block({ id, children, isFocused }: BlockProps) {
  const setFocusedBlock = useEditorStore(state => state.setFocusedBlock)
  const className = cx({
    "mk-block": true,
    "is-focused": isFocused
  })

  function handleClick() {
    setFocusedBlock(id)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

export default memo(Block, (prev: BlockProps, next: BlockProps) => {
  return prev.isFocused === next.isFocused
})