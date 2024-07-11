// currying function 은 변수와 또다른 함수를 전달하는 함수를 이용해 customizing logger구현
export const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type : ", action.type);
  console.log("payload : ", action.payload);
  console.log("current State : ", store.getState());

  next(action);
  console.log("next State : ", store.getState());
};
