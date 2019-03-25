import { combineReducers } from "redux";
import SignUpReducer from "./signUpReducer";

const reducer = combineReducers({
  signUpdata: SignUpReducer
});

export default reducer;
