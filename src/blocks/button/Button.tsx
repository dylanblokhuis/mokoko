import { ButtonAttributes } from '.'
import { Block } from '../../hooks/state';

export default function Button({ attributes, setAttributes, id }: Block<ButtonAttributes>) {
  return (
    <a href={attributes.url}>
      {attributes.text}
    </a>
  )
}
