import { registerBlockType } from '../../hooks/state'
import Edit from './Edit'
import Save from './Save'

export interface ColumnAttributes {}

registerBlockType<ColumnAttributes>('core/column', {
  name: 'Column',
  edit: Edit,
  save: Save,
  attributes: {}
})
