import { useEffect } from "react";
import { Block } from "./state";

// export interface InitialBlockProps<T> {
//   setAttributes: (attributes:T) => void
//   attributes: T,
// }

interface BlockProps {
  className?: string
}

interface BlockPropsOptions {
  focusOnCreate?: boolean
}

export default function useBlockProps(props?: BlockPropsOptions): BlockProps {
  // this should become the hook that manages all block stuff, like extending a class for example
  // useEffect(() => {
  //   console.log(this);
  // }, [focusOnCreate]);

  return {
    className: "block"
  }
}