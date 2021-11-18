import { useRef, useEffect, KeyboardEvent } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import classNames from 'classnames'
import useEditorStore from '../../hooks/state'

export interface RichTextProps {
  as: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  html: string
  blockId: string
  onChange: (event: ContentEditableEvent) => void
  placeholder?: string
}

const RichText = function ({ placeholder = 'Type here...', as, html, onChange, blockId }: RichTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const addBlock = useEditorStore((state) => state.addBlock)
  const isFocused = useEditorStore((state) => state.focusedBlockKey) === blockId
  const isPlaceholder = html === '' && !isFocused

  const className = classNames({
    'outline-none': true,
    'opacity-80': isPlaceholder
  })

  const onKeyDownHandler = (event: KeyboardEvent<HTMLParagraphElement>) => {
    if (isPlaceholder) {
      event.preventDefault()
    }

    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault()

      addBlock('core/paragraph', blockId)
    }
  }

  useEffect(() => {
    if (!isFocused) return
    if (!ref.current) return

    const el = ref.current
    el.focus()

    // set caret
    const range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
  }, [isFocused, ref])

  return (
    <ContentEditable
      innerRef={ref}
      tagName={as}
      html={isPlaceholder ? placeholder : html}
      className={className}
      onKeyDown={onKeyDownHandler}
      onChange={onChange}
    />
  )
}

export default RichText
