import { registerBlockType } from '../../hooks/state'
import Edit from './Edit'
import Save from './Save'

export interface ParagraphAttributes {
  content: string
  marginBottom: string
}

registerBlockType<ParagraphAttributes>('core/paragraph', {
  name: 'Paragraph',
  edit: Edit,
  save: Save,
  attributes: {
    content: '',
    marginBottom: '15px'
  }
})
