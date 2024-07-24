// currying function 은 변수와 또다른 함수를 전달하는 함수를 이용해 customizing logger구현
import { Middleware } from "redux";
import { RootState } from "../store";

export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: any) => {
    if (!action.type) {
      return next(action);
    }

    console.log("type : ", action.type);
    console.log("payload : ", action.payload);
    console.log("current State : ", store.getState());

    next(action);
    console.log("next State : ", store.getState());
  };
