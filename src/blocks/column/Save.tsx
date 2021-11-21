import { ColumnAttributes } from '.'
import { Block } from '../../hooks/state'

const Save = function ({ attributes, id, children }: Block<ColumnAttributes>) {
  return <div className="Column">{children}</div>
}

export default Save
