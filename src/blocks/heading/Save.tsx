import { HeadingAttributes } from '.'
import { Block } from '../../hooks/state'

export default function Save({ attributes }: Block<HeadingAttributes>) {
  return <h1>{attributes.content}</h1>
}
