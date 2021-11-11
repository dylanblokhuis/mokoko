import { registerBlockType } from "../../hooks/state";
import Paragraph from "./Paragraph";

export interface ParagraphAttributes {
  content: string
  marginBottom: string
}

registerBlockType<ParagraphAttributes>({
  name: "Paragraph",
  edit: Paragraph,
  attributes: {
    content: "hello",
    marginBottom: "15px"
  }
})