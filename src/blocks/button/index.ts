import { registerBlockType } from "../../hooks/state";
import Edit from "./Edit";
import Save from "./Save";

export interface ButtonAttributes {
  url: string
  text: string
}

registerBlockType<ButtonAttributes>("core/button", {
  name: "Button",
  edit: Edit,
  save: Save,
  attributes: {
    url: "",
    text: "I'm a button!"
  }
})