export default (state = {'name':'default'}, action) => {
    switch (action.type) {
      case "SIGNED_IN":
        return action.user;
      case "SIGNED_OUT":
        return action.user;
      default: 
        return state;
    }
};