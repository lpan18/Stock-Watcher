export const signedIn = currentUser => {
  return {
    type: "SIGNED_IN",
    user: currentUser
  };
};

export const signedOut = () => {
  return {
    type: "SIGNED_OUT",
    user: {}
  };
};
