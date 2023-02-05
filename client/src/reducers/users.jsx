const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USERS":
      return action.payload;
    case "ADD_USER": {
      if (state.some((user) => user._id === action.payload._id)) {
        return state.map((user) => {
          if (user._id === action.payload._id) {
            return action.payload;
          }

          return user;
        });
      }

      return [...state, action.payload];
    }
    case "DEL_USERS":
      return [];
    default:
      return state;
  }
};

export default usersReducer;
