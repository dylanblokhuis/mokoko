import { ParagraphAttributes } from '.'
import { Block } from '../../hooks/state'

const Save = function ({ attributes }: Block<ParagraphAttributes>) {
  return <p>{attributes.content}</p>
}

export default Save
