const channelsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CHANNELS":
      return action.payload;
    case "ADD_CHANNEL": {
      if (state.some((channel) => channel._id === action.payload._id)) {
        return state.map((channel) => {
          if (channel._id === action.payload._id) {
            return action.payload;
          }

          return channel;
        });
      }

      return [...state, action.payload];
    }
    case "DEL_CHANNELS":
      return [];
    default:
      return state;
  }
};

export default channelsReducer;
