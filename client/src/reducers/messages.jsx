const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MESSAGES":
      return action.payload;
    case "ADD_MESSAGE": {
      if (state.some((message) => message._id === action.payload._id)) {
        return state.map((message) => {
          if (message._id === action.payload._id) {
            return action.payload;
          }

          return message;
        });
      }

      return [...state, action.payload];
    }
    case "DEL_MESSAGES":
      return [];
    default:
      return state;
  }
};

export default messagesReducer;
