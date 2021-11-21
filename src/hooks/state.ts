import { produce, enableMapSet } from 'immer'
import type { Draft } from 'immer'
import createReact from 'zustand'
import create, { GetState, SetState, State, StateCreator, StoreApi } from 'zustand/vanilla'
import { devtools } from 'zustand/middleware'
import { v4 } from 'uuid'
import { createElement } from 'react'
import { WritableDraft } from 'immer/dist/internal'

enableMapSet()

const immer =
  <T extends State, CustomSetState extends SetState<T>, CustomGetState extends GetState<T>, CustomStoreApi extends StoreApi<T>>(
    config: StateCreator<T, (partial: ((draft: Draft<T>) => void) | T, replace?: boolean) => void, CustomGetState, CustomStoreApi>
  ): StateCreator<T, CustomSetState, CustomGetState, CustomStoreApi> =>
  (set, get, api) =>
    config(
      (partial, replace) => {
        const nextState = typeof partial === 'function' ? produce(partial as (state: Draft<T>) => T) : (partial as T)
        return set(nextState, replace)
      },
      get,
      api
    )

interface BlockType<T> {
  name: string
  attributes: T
  edit: React.FC<Block<T>>
  save: React.FC<Block<T>>
}

interface AddBlockOptions {
  insertAfterBlock?: string
  blockId?: string
  toChildren?: boolean
}

interface EditorStore {
  blockTypes: Map<string, BlockType<any>>
  registerBlockType: (key: string, object: BlockType<any>) => void
  focusedBlockKey: string | undefined
  setFocusedBlock: (key: string | undefined) => void
  save: () => void

  blocks: Block<any>[]
  addBlock: (blockTypeKey: string, options?: AddBlockOptions) => void
  select: (immerState: WritableDraft<EditorStore>, block: string | Block<any>) => WritableDraft<Block<any>>
  container: (immerState: WritableDraft<EditorStore>, blockId: string) => WritableDraft<Block<any>[]>
}

export interface Block<T> {
  id: string
  blockType: BlockType<T>
  attributes: T
  setAttributes: (attributes: T) => void
  parentId?: string
  children: Block<T>[]
  actions: {
    moveUp: () => void
    moveDown: () => void
  }
}

function findItemNested(blocks: Block<any>[], itemId: string): Block<any> | undefined {
  const res = blocks.reduce<Block<any> | undefined>((prev: Block<any> | undefined, curr: Block<any>) => {
    if (prev) return prev
    if (curr.id === itemId) return curr
    if (curr.children) return findItemNested(curr.children, itemId)

    return prev
  }, undefined)

  return res
}

const editorStore = create<EditorStore>(
  devtools(
    immer((set, get) => ({
      blockTypes: new Map<string, BlockType<any>>(),
      registerBlockType<T>(key: string, object: BlockType<T>) {
        set((state) => {
          state.blockTypes.set(key, object)
        })
      },
      blocks: [],
      addBlock: (blockTypeKey, options) =>
        set((state) => {
          const id = v4()
          const blockType = state.blockTypes.get(blockTypeKey)
          if (!blockType) {
            throw new Error('Block type does not exist inside the blockTypes store.')
          }

          const block: Block<any> = {
            id,
            blockType,
            attributes: blockType.attributes,
            setAttributes(attributes) {
              set((draft) => {
                const targetBlock = draft.select(draft, id)

                if (targetBlock) {
                  targetBlock.attributes = attributes
                }
              })
            },
            actions: {
              moveUp() {
                set((draft) => {
                  const children = draft.container(draft, id)
                  const index = children.findIndex((it) => it.id === id)
                  if (index - 1 === -1) {
                    return
                  }

                  const from = children.splice(index, 1)[0]
                  children.splice(index - 1, 0, from)
                })
              },
              moveDown() {
                set((draft) => {
                  const children = draft.container(draft, id)
                  const index = children.findIndex((it) => it.id === id)
                  if (index === children.length - 1) {
                    return
                  }

                  const from = children.splice(index, 1)[0]
                  children.splice(index + 1, 0, from)
                })
              }
            },
            children: [],
            parentId: options?.toChildren ? options?.blockId : undefined
          }

          if (options && options.blockId) {
            const container = options?.toChildren ? state.select(state, options.blockId).children : state.container(state, options.blockId)

            if (options.insertAfterBlock) {
              const index = container.findIndex((it) => it.id === options.insertAfterBlock)
              if (index === undefined) throw new Error('whoops')
              container.splice(index + 1, 0, block)
            } else {
              container.push(block)
            }
          } else if (options && options.insertAfterBlock) {
            const index = state.blocks.findIndex((it) => it.id === options.insertAfterBlock)
            state.blocks.splice(index + 1, 0, block)
          } else {
            state.blocks.push(block)
          }

          state.focusedBlockKey = id
        }),
      focusedBlockKey: undefined,
      setFocusedBlock: (key: string | undefined) =>
        set((state) => {
          state.focusedBlockKey = key
        }),
      save: async () => {
        const ReactDOMServer = await import('react-dom/server')
        const { blocks } = get()

        /**
         * Recursively create all the react elements
         */
        function createReactElements(fnBlocks: Block<any>[]): React.ReactElement<Block<any>>[] {
          return fnBlocks.map((block) => {
            const children = createReactElements(block.children)
            return createElement(block.blockType.save, block, children)
          })
        }

        const rendered = createReactElements(blocks).map((block) => {
          return ReactDOMServer.renderToString(block)
        })

        alert(JSON.stringify(rendered))
      },

      select: (state, block) => {
        const { blocks } = state
        const find = () => {
          if (typeof block === 'string') {
            return findItemNested(blocks, block)
          }

          if (block?.parentId) {
            return findItemNested(blocks, block?.parentId)
          }

          return findItemNested(blocks, block.id)
        }

        const result = find()
        if (!result) throw new Error('No block found in select')
        return result
      },
      container: (state, blockId) => {
        const { select, blocks } = state

        const block = select(state, blockId)

        if (!block) {
          throw new Error('Couldnt find block')
        }

        if (block.parentId) {
          const item = select(state, block.parentId)
          if (!item) throw new Error('Couldnt find container of block')

          return item.children
        }

        return blocks
      }
    }))
  )
)

export function registerBlockType<T>(key: string, object: BlockType<T>) {
  const { setState } = editorStore

  setState((state) => {
    if (state.blockTypes.has(key)) {
      throw new Error(`Block type: ${key} is already registered.`)
    }
    state.blockTypes.set(key, object)
  })
}

const useEditorStore = createReact(editorStore)

export default useEditorStore
