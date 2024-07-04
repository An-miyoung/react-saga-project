import React from "react";
import { FormInputLabel, Group, Input } from "./form-input.styles";

// 정확히 어떤 prop 이 올지 모를때 퉁쳐서 ...otherProps 사용
const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
