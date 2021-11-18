import { ButtonAttributes } from '.'
import { Block } from '../../hooks/state'

const Edit = function ({ attributes, setAttributes, id }: Block<ButtonAttributes>) {
  return <a href={attributes.url}>{attributes.text}</a>
}

export default Edit
