import { registerBlockType } from "../../hooks/state";
import Button from "./Button";

export interface ButtonAttributes {
  url: string
  text: string
}

registerBlockType<ButtonAttributes>("core/button", {
  name: "Button",
  edit: Button,
  attributes: {
    url: "",
    text: "I'm a button!"
  }
})