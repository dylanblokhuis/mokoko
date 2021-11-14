import { registerBlockType } from "../../hooks/state";
import Paragraph from "./Paragraph";

export interface ParagraphAttributes {
  content: string
  marginBottom: string
}

registerBlockType<ParagraphAttributes>("core/paragraph", {
  name: "Paragraph",
  edit: Paragraph,
  attributes: {
    content: "",
    marginBottom: "15px"
  }
})