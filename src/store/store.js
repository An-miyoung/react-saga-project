import {
  compose,
  legacy_createStore as creteStore,
  applyMiddleware,
} from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const middlewares = [logger];

const composedEnhancer = compose(applyMiddleware(...middlewares));

export const store = creteStore(rootReducer, undefined, composedEnhancer);
