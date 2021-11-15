import { registerBlockType } from '../../hooks/state'
import Edit from './Edit'
import Save from './Save'

export interface HeadingAttributes {
  content: string
}

registerBlockType<HeadingAttributes>('core/heading', {
  name: 'Heading',
  edit: Edit,
  save: Save,
  attributes: {
    content: ''
  }
})
