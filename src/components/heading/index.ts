import { registerBlockType } from "../../hooks/state";
import Heading from "./Heading";

export interface HeadingAttributes {
  content: string
}

registerBlockType<HeadingAttributes>("core/heading", {
  name: "Heading",
  edit: Heading,
  attributes: {
    content: "",
  }
})