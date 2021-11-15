import { ButtonAttributes } from '.'
import { Block } from '../../hooks/state'

export default function Save({ attributes }: Block<ButtonAttributes>) {
  return <a href={attributes.url}>{attributes.text}</a>
}
