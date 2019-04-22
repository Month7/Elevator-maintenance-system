import React, { Component } from 'react';
import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';
import {
  StyleSheet,
  View
} from 'react-native';

import AppNavigator from './AppNavigator';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
