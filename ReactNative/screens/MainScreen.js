import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { WebView } from "react-native-webview";
import navigationUtil from '../utils/navigation'
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  onMessage = (event) => {
    //webview中的html页面传过来的的数据在event.nativeEvent.data上
    // alert(event.nativeEvent.data);
    // alert(event.nativeEvent.data.username);
    if(event.nativeEvent.data == 'exit'){
      navigationUtil.reset(this.props.navigation, 'Login');
    }
    // avigationActions.reset();
    // navigation.dispatch(resetAction)
  }
  
  render() {
    return (
        <WebView
        ref={webview => this.webview = webview}
        onMessage={this.onMessage}
        source={{uri:'http://120.77.181.223/#/personal'}}
        onLoadStart={() => {
          this.webview.postMessage('Month7');
        }}
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
    backgroundColor: '#fff',
  },
});
