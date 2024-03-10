import styles from "./button.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  style?: "negative" | "grey" | "large" | "option";
  type?: "button" | "submit" | "reset";
  icon?: IconDefinition;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={
        props.style == "negative"
          ? styles.negative
          : props.style == "grey"
            ? styles.grey
            : props.style == "large"
              ? styles.large
              : props.style == "option"
                ? styles.option
                : styles.button
      }
      onClick={props.onClick}
      type={props.type ?? "button"}
    >
      {props.icon ? (
        <FontAwesomeIcon className={styles.icon} icon={props.icon} />
      ) : null}
      {props.title}
    </button>
  );
}
