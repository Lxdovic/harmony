const localUserReducer = (state = { loggedIn: false }, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...action.payload, loggedIn: true };
    case "DEL_USER":
      return { loggedIn: false };
    default:
      return state;
  }
};

export default localUserReducer;
