import { ColumnAttributes } from '.'
import InnerBlocks from '../../components/InnerBlocks'
import { Block } from '../../hooks/state'

const Edit = function ({ attributes, setAttributes, id }: Block<ColumnAttributes>) {
  return (
    <div className="Column">
      <InnerBlocks blockId={id} />
    </div>
  )
}

export default Edit
