import React, { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    // 구글로 로그인
    const { user } = await signInWithGooglePopup();
    // db 에 등록
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password": {
          alert("비밀번호가 다릅니다.");
          break;
        }
        case "auth/user-not-found": {
          alert("가입하지 않은 이메일입니다.");
          break;
        }
        default: {
          console.log(error.message);
        }
      }
    }
  };

  return (
    <div className="sign-in-container">
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

        <div className="buttons-container">
          <Button type="submit">로그인</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google 로그인
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
