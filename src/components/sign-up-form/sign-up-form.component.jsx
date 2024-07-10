import React, { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

import "./sign-up-form.styles.scss";
import Button from "../button/button.component";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

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

  const setCurrentUser = useSelector(selectCurrentUser);

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // password check
    if (password !== confirmPassword) {
      alert("비밀번호가 맞지 않습니다.");
      return;
    }
    try {
      // authentication
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password,
        displayName
      );
      // context 에 등록
      dispatch(setCurrentUser(user));
      // db에 등록
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("회원가입 실패 : 이미 회원가입된 이메일");
      } else {
        console.log("회원가입 실패: ", error.message);
      }
    }
  };

  return (
    <div className="sign-up-container">
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
    </div>
  );
};

export default SignUpForm;
