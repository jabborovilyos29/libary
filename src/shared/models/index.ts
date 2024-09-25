import { ChangeEvent, ReactNode } from "react";

export interface IsEmptyValue {
  value: boolean;
  message: string;
}

export type ContainerProps = {
  children: ReactNode;
};

export type ITheme = "light" | "dark";

export type ContextType = {
  theme: ITheme;
  setTheme: (theme: ITheme) => void;
};

export interface IUseInput {
  isEmpty: IsEmptyValue;
  minLengthErr: IsEmptyValue;
  maxLengthErr: IsEmptyValue;
  value: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onFocus: () => void;
  isDirty: boolean;
  inputValid: boolean;
  regExErr?: IsEmptyValue;
}
