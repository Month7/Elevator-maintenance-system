import React from 'react';
import { StackNavigator } from 'react-navigation';


import Login from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';




const AppNavigator = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerTitle: '登录'
    }
  },
  Main: {
    screen: MainScreen
  },

});

export default AppNavigator;
