import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebView } from "react-native-webview";
import navigationUtil from '../utils/navigation'
import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  onMessage = (event) => {
    //webview中的html页面传过来的的数据在event.nativeEvent.data上
    // alert(event.nativeEvent.data);
    // alert(event.nativeEvent.data);
  //   var username = event.nativeEvent.data.split(',')[0];
  //   var storage = new Storage({
  //     size: 1000,
  //     storageBackend: AsyncStorage,
  //     defaultExpires: 1000 * 3600 * 24,
  //     enableCache: true,
  //   })
  //   storage.save({
  //     key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
  //     data: {
  //         token: username
  //     }
  // });
    console.log(event.nativeEvent.data.username);
    navigationUtil.reset(this.props.navigation, 'Main');
  }
  render() {
    const { navigation } = this.props;
    return (
        <WebView
        onMessage={this.onMessage}
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
    backgroundColor: 'green',
  },
})