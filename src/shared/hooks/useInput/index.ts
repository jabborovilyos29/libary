import { ChangeEvent, useState } from "react";
import { IUseInput } from "../../models";
import { useValidation } from "../index";

interface IValidationTypes {
  isEmpty: boolean;
  minLength: number;
  maxLength: number;
  regex?: RegExp;
}

export const useInput = (
  initialValue: string,
  validations: IValidationTypes,
): IUseInput => {
  const [value, setValue] = useState<string>(initialValue);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const valid = useValidation(value, validations);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const onBlur = () => {
    setIsDirty(true);
  };

  const onFocus = () => {
    setIsDirty(false);
  };

  return { value, onChange, onBlur, onFocus, isDirty, ...valid };
};
