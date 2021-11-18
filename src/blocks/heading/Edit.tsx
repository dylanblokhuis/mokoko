import React from 'react'
import { HeadingAttributes } from '.'
import { Block } from '../../hooks/state'
import RichText from '../../components/RichText'

const Edit = function ({ attributes, setAttributes, id }: Block<HeadingAttributes>) {
  return (
    <RichText
      as="h1"
      html={attributes.content}
      blockId={id}
      onChange={(event: React.FormEvent<HTMLHeadingElement>) => {
        setAttributes({
          ...attributes,
          content: event.currentTarget.innerHTML
        })
      }}
    />
  )
}

export default Edit
