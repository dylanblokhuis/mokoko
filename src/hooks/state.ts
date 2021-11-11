import { produce } from 'immer'
import type { Draft } from 'immer'
import createReact from 'zustand'
import create, {
  GetState,
  SetState,
  State,
  StateCreator,
  StoreApi,
} from 'zustand/vanilla'
import { devtools } from 'zustand/middleware'
import { v4 } from 'uuid'
import type { BlockProps } from './blocks'

const immer =
  <
    T extends State,
    CustomSetState extends SetState<T>,
    CustomGetState extends GetState<T>,
    CustomStoreApi extends StoreApi<T>
  >(
    config: StateCreator<
      T,
      (partial: ((draft: Draft<T>) => void) | T, replace?: boolean) => void,
      CustomGetState,
      CustomStoreApi
    >
  ): StateCreator<T, CustomSetState, CustomGetState, CustomStoreApi> =>
  (set, get, api) =>
    config(
      (partial, replace) => {
        const nextState =
          typeof partial === 'function'
            ? produce(partial as (state: Draft<T>) => T)
            : (partial as T)
        return set(nextState, replace)
      },
      get,
      api
    )

interface EditorStore {
  blockTypes: BlockType<any>[]
  blocks: Block<any>[]
  addBlock: (blockType: BlockType<any>) => void
}

interface BlockType<T> {
  // id: string
  name: string
  attributes: T
  edit: React.FC<BlockProps<T>>
  // setAttributes: (attributes: Record<string, T>) => void
}

export interface Block<T> {
  id: string
  blockType: BlockType<T>
  // element: React.FC<BlockProps<T>>
  attributes: T
  setAttributes: (attributes: T) => void
}

const editorStore = create<EditorStore>(devtools(immer((set, get) => ({
  blockTypes: [],
  registerBlockType: function <T>(object: BlockType<T>) {
    set(state => {
      state.blockTypes.push(object)
    })
  },
  blocks: [],
  addBlock: (blockType) => set(state => {
    const id = v4();
    state.blocks.push({
      id: id,
      blockType: blockType,
      // set defaults if given
      attributes: blockType.attributes,
      setAttributes: function (attributes) {
        console.log(attributes);        
        set(state => {
          const it = state.blocks.find(it => it.id === id)
          if (it) {
            it.attributes = attributes;
          }
        })
      },
    })
  })
}))))

export function registerBlockType<T>(object: BlockType<T>) {
  const { setState } = editorStore;

  setState(state => {
    state.blockTypes.push(object)
  })
}

const useEditorStore = createReact(editorStore)

export default useEditorStore;