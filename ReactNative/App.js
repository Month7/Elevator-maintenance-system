/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './AppNavigator';
import  WebView  from 'react-native-webview-plugin'
import navigationUtil from './utils/navigation'

export default class App extends Component {
  onMessage = (event) => {
    //webview中的html页面传过来的的数据在event.nativeEvent.data上
    // alert(event.nativeEvent.data);
    // alert(event.nativeEvent.data);
    var username = event.nativeEvent.data.split(',')[0];
    var storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: 1000 * 3600 * 24,
      enableCache: true,
    })
    storage.save({
      key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
      data: {
          token: username
      }
  });
    // alert(event.nativeEvent.data.username);
    navigationUtil.reset(this.props.navigation, 'Main');
  }
  fuck(){
    alert('????');
  }
  failed(){
    alert('加载失败了!');
  }
  successd(){
    alert('加载成功了!');
  }
  render() {
    return (
      <WebView
      source={{uri:'https://2922931642.github.io/#/'}}
      style={{width:'100%',height:'100%'}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      >
      </WebView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    display: 'flex'
  },
  content: {
    width:'100%',
    height: '100%',
    flex:1,
  }
});
