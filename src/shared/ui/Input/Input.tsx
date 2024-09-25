import { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Input.module.css";
import removeObjectKeys from "./utils/createObject";

interface CustomInputHTMLAttributes<T> extends InputHTMLAttributes<T> {
  type?: "text";
  label?: string;
  isError?: boolean;
  errorText?: string;
  endContent?: string | ReactNode;
}

export default function Input(
  attributes: CustomInputHTMLAttributes<HTMLInputElement>,
) {
  const inputAttributes: Omit<
    CustomInputHTMLAttributes<HTMLInputElement>,
    "isError" | "errorText"
  > = removeObjectKeys({
    obj: attributes,
    keys: ["isError", "errorText", "label", "endContent"],
  });

  return (
    <label
      className={`${styles.label} ${attributes.className}`}
      htmlFor={attributes?.name}
    >
      {attributes?.label}
      <div className={styles.input_contailer}>
        <input className={styles.input} {...inputAttributes} />
        {attributes?.endContent ? (
          <div className={styles.end_content}>{attributes.endContent}</div>
        ) : null}
      </div>
      {attributes?.isError && (
        <span className={styles.span}>{attributes?.errorText}</span>
      )}
    </label>
  );
}
