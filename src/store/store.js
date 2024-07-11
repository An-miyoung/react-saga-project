import {
  compose,
  legacy_createStore as creteStore,
  applyMiddleware,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";

// currying function 은 변수와 또다른 함수를 전달하는 함수를 이용해 customizing logger구현
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type : ", action.type);
  console.log("payload : ", action.payload);
  console.log("current State : ", store.getState());

  next(action);
  console.log("next State : ", store.getState());
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [loggerMiddleware];

const composedEnhancer = compose(applyMiddleware(...middlewares));

export const store = creteStore(persistedReducer, undefined, composedEnhancer);

export const persisto = persistStore(store);
