export const userReducer = (state = null, action) => {
  //the state can visible in redux chrome
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload;
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};
