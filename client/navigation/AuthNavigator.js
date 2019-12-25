import { createStackNavigator } from "react-navigation";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

const AuthNavigator = createStackNavigator(
  {
    SignUp: SignUp,
    SignIn: SignIn
  },
  {
    initialRouteName: "SignIn"
  }
);

export default AuthNavigator;
