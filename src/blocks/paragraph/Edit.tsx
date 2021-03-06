import React from 'react'
import { ParagraphAttributes } from '.'
import { Block } from '../../hooks/state'
import RichText from '../../components/RichText'

const Edit = function ({ attributes, setAttributes, id }: Block<ParagraphAttributes>) {
  return (
    <RichText
      as="p"
      html={attributes.content}
      blockId={id}
      onChange={(event: React.FormEvent<HTMLParagraphElement>) => {
        setAttributes({
          ...attributes,
          content: event.currentTarget.innerHTML
        })
      }}
    />
  )
}

export default Edit
