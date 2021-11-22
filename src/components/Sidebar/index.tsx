import useEditorStore from '../../hooks/state'

const Sidebar = function () {
  const focusedKey = useEditorStore((state) => state.focusedBlockKey)
  const block = useEditorStore((state) => (focusedKey ? state.select(state, focusedKey) : undefined))

  if (!block) return null

  return <div className="Sidebar fixed right-0 top-0 mt-[50px] w-64 h-full bg-gray-100 p-5">{block.blockType.name}</div>
}
export default Sidebar
