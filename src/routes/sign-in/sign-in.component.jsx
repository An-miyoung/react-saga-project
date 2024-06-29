import React from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    // 구글로 로그인
    const { user } = await signInWithGooglePopup();
    // db 에 등록
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>로그인</h1>
      <Button buttonType="google" onClick={logGoogleUser}>
        Google 로그인
      </Button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
