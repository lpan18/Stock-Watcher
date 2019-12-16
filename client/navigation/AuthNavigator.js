import { createStackNavigator } from 'react-navigation';

import SignIn from "../components/Auth/SignIn"
import SignUp from "../components/Auth/SignUp"

const AuthNavigator = createStackNavigator(
  {
    SignUp: SignUp,
    SignIn: SignIn
  },
  {
    initialRouteName: "SignIn",
  }
);

export default AuthNavigator;

