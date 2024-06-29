import React from "react";
import "./form-input.styles.scss";

// 정확히 어떤 prop 이 올지 모를때 퉁쳐서 ...otherProps 사용
const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shirink" : null
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
