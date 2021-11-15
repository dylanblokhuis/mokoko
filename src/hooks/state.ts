import { produce, enableMapSet } from 'immer'
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
import { createElement } from 'react';

enableMapSet();

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
  blockTypes: Map<string, BlockType<any>>
  registerBlockType: (key: string, object: BlockType<any>) => void
  blocks: Block<any>[]
  addBlock: (blockTypeKey: string, insertAfter?: string) => void
  focusedBlockKey: string | undefined
  setFocusedBlock: (key: string | undefined) => void
  save: () => void
}

interface BlockType<T> {
  name: string
  attributes: T
  edit: React.FC<Block<T>>
  save: React.FC<Block<T>>
}

export interface Block<T> {
  id: string
  blockType: BlockType<T>
  attributes: T
  setAttributes: (attributes: T) => void
}

const editorStore = create<EditorStore>(devtools(immer((set, get) => ({
  blockTypes: new Map<string, BlockType<any>>(),
  registerBlockType: function <T>(key: string, object: BlockType<T>) {
    set(state => {
      state.blockTypes.set(key, object)
    })
  },
  blocks: [],
  addBlock: (blockTypeKey, insertAfter) => set(state => {
    const id = v4();
    const blockType = state.blockTypes.get(blockTypeKey);
    if (!blockType) {
      throw new Error("Block type does not exist inside the blockTypes store.")
    }

    const block = {
      id: id,
      blockType: blockType,
      attributes: blockType.attributes,
      setAttributes: function (attributes: any) {
        set(state => {
          const it = state.blocks.find(it => it.id === id)
          if (it) {
            it.attributes = attributes;
          }
        })
      },
    }

    if (insertAfter) {
      const index = state.blocks.findIndex(it => it.id === insertAfter)
      state.blocks.splice(index + 1, 0, block)
    } else {
      state.blocks.push(block)
    }

    state.focusedBlockKey = id;
  }),
  focusedBlockKey: undefined,
  setFocusedBlock: (key: string | undefined) => set(state => {
    state.focusedBlockKey = key;
  }),
  save: async () => {
    const ReactDOMServer = await import('react-dom/server');
    const blocks = get().blocks;

    const rendered = blocks.map(block => {
      return ReactDOMServer.renderToStaticMarkup(createElement(block.blockType.save, block))
    })

    alert(JSON.stringify(rendered))
  }
}))))

export function registerBlockType<T>(key: string, object: BlockType<T>) {
  const { setState } = editorStore;

  setState(state => {
    state.blockTypes.set(key, object)
  })
}

const useEditorStore = createReact(editorStore)

export default useEditorStore;