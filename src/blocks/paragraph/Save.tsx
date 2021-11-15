import { ParagraphAttributes } from '.'
import { Block } from '../../hooks/state';

export default function Save({ attributes }: Block<ParagraphAttributes>) {
  return <p>{attributes.content}</p>
}
