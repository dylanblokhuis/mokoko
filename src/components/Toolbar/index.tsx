import useEditorStore from '../../hooks/state'
import BlockLibrary from '../BlockLibrary'
import Button from '../Button'

const Toolbar = function () {
  const save = useEditorStore((state) => state.save)
  return (
    <div className="Toolbar bg-gray-100 py-2 min-h-[50px] flex items-center justify-start px-6 fixed left-0 top-0 w-full">
      <BlockLibrary className="bg-blue-500 text-white px-3 py-1 rounded shadow">Add block</BlockLibrary>

      <Button onPress={save} className="bg-blue-500 text-white px-3 py-1 rounded shadow ml-5">
        Save
      </Button>
    </div>
  )
}

export default Toolbar
