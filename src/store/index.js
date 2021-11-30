import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { reducer } from "./reducer";

const composedEnhancer = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, composedEnhancer);
export { store };
