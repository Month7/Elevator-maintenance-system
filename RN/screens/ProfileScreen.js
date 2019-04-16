import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';
import { WebBrowser } from 'expo';
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  onMessage = (event) => {
    //webview中的html页面传过来的的数据在event.nativeEvent.data上
    alert(event.nativeEvent.data);
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
  banner: {

  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
