import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
      navigate("/");
    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD: {
          alert("비밀번호가 다릅니다.");
          break;
        }
        case AuthErrorCodes.USER_DELETED: {
          alert("가입하지 않은 이메일입니다.");
          break;
        }
        default: {
          console.log(error);
        }
      }
    }
  };

  return (
    <SignInContainer>
      <h2>이미 회원이신가요?</h2>
      <span>이메일과 비밀번호로 로그인</span>
      <form onSubmit={handleSubmit}>
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

        <ButtonsContainer>
          <Button type="submit">로그인</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google 로그인
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
