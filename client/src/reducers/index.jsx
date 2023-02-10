import { combineReducers } from "redux";
import usersReducer from "./users";
import serversReducer from "./servers";
import channelsReducer from "./channels";
import messagesReducer from "./messages";
import localUserReducer from "./localUser";

const rootReducer = combineReducers({
  users: usersReducer,
  localUser: localUserReducer,
  servers: serversReducer,
  channels: channelsReducer,
  messages: messagesReducer,
});

export default rootReducer;
