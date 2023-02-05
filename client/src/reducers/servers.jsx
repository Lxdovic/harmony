const serversReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SERVERS":
      return action.payload;
    case "ADD_SERVER": {
      if (state.some((server) => server._id === action.payload._id)) {
        return state.map((server) => {
          if (server._id === action.payload._id) {
            return action.payload;
          }

          return server;
        });
      }

      return [...state, action.payload];
    }
    case "DEL_SERVERS":
      return [];
    default:
      return state;
  }
};

export default serversReducer;
