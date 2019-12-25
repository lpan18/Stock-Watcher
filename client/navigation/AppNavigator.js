import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import AuthNavigator from "./AuthNavigator";

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthNavigator,
      Main: MainTabNavigator
    },
    { initialRouteName: "Auth" }
  )
);
