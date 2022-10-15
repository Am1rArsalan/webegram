import { mergeProps, splitProps } from "solid-js";
import styles from "./Button.module.css";
import { classNames } from "../utils/classNames";
import { ElementType, HtmlProps } from "../../../types/helper";

export type IconButtonProps<C extends ElementType = "button"> = HtmlProps<C>;

export function IconButton(props: IconButtonProps) {
  const propsWithDefault: IconButtonProps<"button"> = mergeProps(props);

  const [local, _, others] = splitProps(
    propsWithDefault,
    ["class", "disabled"],
    ["children"]
  );

  const classes = () => {
    return classNames(styles.IconButton, local.class);
  };

  return (
    <button class={classes()} disabled={local.disabled} {...others}>
      {props.children}
    </button>
  );
}
