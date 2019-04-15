import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Home from './screens/HomeScreen';
import Profile from './screens/ProfileScreen';
import Login from './screens/LoginScreen';


const Main = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarPosition: 'bottom',
      title:'主页'
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerTitle: '我的',
      tabBarPosition: 'bottom'
    }
  }
}, {
    tabBarPosition: 'bottom',
});

const AppNavigator = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerTitle: '登录'
    }
  },
  Main: {
    screen: Main
  },

});

export default AppNavigator;
