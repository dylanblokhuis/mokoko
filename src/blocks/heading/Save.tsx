import { HeadingAttributes } from '.'
import { Block } from '../../hooks/state'

const Save = function ({ attributes }: Block<HeadingAttributes>) {
  return <h1>{attributes.content}</h1>
}

export default Save
