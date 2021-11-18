import { ButtonAttributes } from '.'
import { Block } from '../../hooks/state'

const Save = function ({ attributes }: Block<ButtonAttributes>) {
  return <a href={attributes.url}>{attributes.text}</a>
}

export default Save
