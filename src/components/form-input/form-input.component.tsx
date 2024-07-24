import React, { FC, InputHTMLAttributes } from "react";
import { FormInputLabel, Group, Input } from "./form-input.styles";

type FormInputProp = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

// 정확히 어떤 prop 이 올지 모를때 퉁쳐서 ...otherProps 사용
const FormInput: FC<FormInputProp> = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel
          shrink={Boolean(
            otherProps.value &&
              typeof otherProps.value === "string" &&
              otherProps.value.length
          )}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
