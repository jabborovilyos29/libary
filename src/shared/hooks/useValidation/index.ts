import { useEffect, useState } from "react";
import { IsEmptyValue } from "../../models";

const defaultRegEx = /.*/;

interface IValidationTypes {
  isEmpty: boolean;
  minLength: number;
  maxLength: number;
  regex?: RegExp;
}

const isEmptyValue: IsEmptyValue = {
  value: true,
  message: "",
};

const errObj: IsEmptyValue = {
  value: false,
  message: "",
};

export const useValidation = (
  value: string,
  {
    isEmpty: IsEmptyProp,
    minLength,
    maxLength,
    regex = defaultRegEx,
  }: IValidationTypes,
): {
  isEmpty: IsEmptyValue;
  minLengthErr: IsEmptyValue;
  maxLengthErr: IsEmptyValue;
  inputValid: boolean;
  regExErr: IsEmptyValue;
} => {
  const validations = {
    isEmpty: IsEmptyProp,
    minLength: minLength,
    maxLength: maxLength,
    regex: regex,
  };

  const [isEmpty, setIsEmpty] = useState<IsEmptyValue>(isEmptyValue);
  const [minLengthErr, setMinLengthErr] = useState<IsEmptyValue>(errObj);
  const [maxLengthErr, setMaxLengthErr] = useState<IsEmptyValue>(errObj);

  const [regExErr, setRegExErr] = useState<IsEmptyValue>(errObj);

  const [inputValid, setInputValid] = useState<boolean>(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "regex":
          validations[validation].test(value)
            ? setRegExErr(errObj)
            : setRegExErr({ value: true, message: "invalid data" });
          break;

        case "minLength":
          value.length < validations[validation]
            ? setMinLengthErr({
                value: true,
                message: `Minimum length is ${validations[validation]}`,
              })
            : setMinLengthErr(errObj);
          break;

        case "maxLength":
          value.length > validations[validation]
            ? setMaxLengthErr({
                value: true,
                message: `Maximum length is ${validations[validation]}`,
              })
            : setMaxLengthErr(errObj);
          break;

        case "isEmpty":
          value
            ? setIsEmpty(errObj)
            : setIsEmpty({ value: true, message: "The empty input field" });
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (
      isEmpty.value ||
      minLengthErr.value ||
      maxLengthErr.value ||
      regExErr.value
    ) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthErr, maxLengthErr, regExErr]);

  return { isEmpty, minLengthErr, maxLengthErr, inputValid, regExErr };
};
