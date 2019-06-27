import React from 'react';
import { createAppContainer,createStackNavigator, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen.js'
import LoginScreen from '../screens/LoginScreen.js'


const AppStack = MainTabNavigator;
const AuthStack = createStackNavigator({ login: LoginScreen });


export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    Main: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Main',
  })
);
