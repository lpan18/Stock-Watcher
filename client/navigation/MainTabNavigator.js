import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import StockDetails from '../components/home_screen/StockDetails'
import NewsScreen from '../screens/NewsScreen'
import ForexScreen from '../screens/ForexScreen'
import AccountScreen from '../screens/AccountScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    StockDetails: StockDetails
  },
  {
    initialRouteName: 'StockDetails',
  }
  //   defaultNavigationOptions: {
  //     headerStyle: {
  //       backgroundColor: '#f4511e',
  //     },
  //     headerTintColor: '#fff',
  //     headerTitleStyle: {
  //       fontWeight: 'bold',
  //     },
  //     headerMode: 'screen'
  //   },
  // }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const NewsStack = createStackNavigator(
  {
    News: NewsScreen,
  },
  config
);

NewsStack.navigationOptions = {
  tabBarLabel: 'News',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} />
  ),
};

NewsStack.path = '';

const ForexStack = createStackNavigator(
  {
    Forex: ForexScreen,
  },
  config
);

ForexStack.navigationOptions = {
  tabBarLabel: 'Forex',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

ForexStack.path = '';

const AccountStack = createStackNavigator(
  {
    Account: AccountScreen,
  },
  config
);

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
  ),
};

AccountStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack: HomeStack,
  NewsStack:NewsStack,
  ForexStack: ForexStack,
  AccountStack:AccountStack,
});

tabNavigator.path = '';

export default tabNavigator;
