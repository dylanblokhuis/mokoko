import { Block } from "./state";

export interface BlockProps<T> {
  setAttributes: (attributes:T) => void
  attributes: T
}

export default function useBlockProps(block: Block<any>) {
  return {
    setAttributes: (attributes: Record<string, unknown>) => {
      block.setAttributes(attributes)
    },
    attributes: block.attributes
  }
}