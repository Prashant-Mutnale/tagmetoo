import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import promise from "redux-promise";

import reducer from "../reducers";

const configureStore = () => {
  const preloadedState = window.PRELOADED_STATE;
  const middlewares = [thunk, promise, logger];
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancer(applyMiddleware(...middlewares))
  );

  return store;
};

export default configureStore;
