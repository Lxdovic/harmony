import { combineReducers } from "redux";
import usersReducer from "./users";
import serversReducer from "./servers";
import localUserReducer from "./localUser";

const rootReducer = combineReducers({
  users: usersReducer,
  localUser: localUserReducer,
  servers: serversReducer,
});

export default rootReducer;
