import React, { useRef, useEffect } from 'react'
import { ParagraphAttributes } from '.'
import { BlockProps } from '../../hooks/blocks'

export default function Paragraph({ attributes, setAttributes }: BlockProps<ParagraphAttributes>) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = attributes.content;
  }, [ref])

  return (
    <p
      ref={ref}
      contentEditable
      className="border-2"
      onInput={(event: React.FormEvent<HTMLParagraphElement>) => {
        setAttributes({
          ...attributes,
          content: event.currentTarget.innerHTML
        })
      }}
    />
  )
}
