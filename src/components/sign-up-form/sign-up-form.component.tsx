import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { signUpStart } from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";

import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // password check
    if (password !== confirmPassword) {
      alert("비밀번호가 맞지 않습니다.");
      return;
    }
    try {
      // authentication
      dispatch(signUpStart(email, password, displayName));

      resetFormFields();
      navigate("/");
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("회원가입 실패 : 이미 회원가입된 이메일");
      } else {
        console.log("회원가입 실패: ", error);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2>아직 회원이 아니신가요?</h2>
      <span>회원가입</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="이름"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          required
        />

        <FormInput
          label="이메일"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label="비밀번호"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />

        <FormInput
          label="비밀번호확인"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        <Button type="submit">가입하기</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
