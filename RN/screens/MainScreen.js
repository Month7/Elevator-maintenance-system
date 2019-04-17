import React from 'react';
import {
  StyleSheet,
  View,
  WebView
} from 'react-native';
import { WebBrowser } from 'expo';
import navigationUtil from '../utils/navigation'
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  onMessage = (event) => {
    //webview中的html页面传过来的的数据在event.nativeEvent.data上
    console.log(event.nativeEvent.data);
    if(event.nativeEvent.data == 'exit'){
      navigationUtil.reset(this.props.navigation, 'Login');
    }
    // avigationActions.reset();
    // navigation.dispatch(resetAction)
  }
  
  render() {
    return (
      <View style={styles.container}>
        <WebView
        ref={webview => this.webview = webview}
        onMessage={this.onMessage}
        source={{uri:'https://2922931642.github.io/#personal'}}
        onLoadStart={() => {
          this.webview.postMessage('Month7');
        }}
        style={{width:'100%',height:'100%'}}
        >
        </WebView>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
