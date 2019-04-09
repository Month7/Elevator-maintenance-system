import React from 'react';
import axios from 'axios';
import {   
    View,
    StyleSheet,
    TextInput,
    Text,
    Button
} from 'react-native';


export default class LoginScreen extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
       
    }
    // 输入用户名
    changeUsername(name){
        this.setState({
            username: name
        })
    }
    // 输入密码
    changePassword(text){
        this.setState({
            password: text
        })
    }
    login(){
        axios({
            url:`https://cnodejs.org/api/v1/topics`,
            method:'get',
        }).then((response)=>{
            alert('success!');
        }).catch((error)=>{
            console.log(error);
        })
    }
    static navigationOptions = {
        title: '请您登录',
        headerTitleStyle: {
            
        },
    };
    render() {
        return (
            <View style={{flex:1,}}>
                <View style={styles.container}>
                    <View>
                        <Text>用户名:</Text>
                    </View>
                    <View>
                        <View>
                            <TextInput 
                            style={styles.txtInput}
                            onChangeText={(text)=> this.changeUsername(text)}
                            multiline={true}
                            placeholder="请输入用户名"
                            >
                            </TextInput>
                        </View>
                        <View>
                            <TextInput 
                            style={styles.txtInput}
                            onChangeText={(text)=> this.changePassword(text)}
                            multiline={true}
                            placeholder="请输入密码"
                            textContentType="password"
                            >
                            </TextInput>
                        </View>
                    </View>
                   
                    
                </View>
                <Button 
                    onPress={this.login.bind(this)}
                    title="登  录"
                />
            </View>
        );
      }
    }

const styles = StyleSheet.create({
    container:{
        padding: 5,
        display: 'flex',
        borderColor: 'black',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtInput: {
        borderColor: 'black',
        borderBottomWidth: 1,
        // borderTopWidth: 1,
        // borderLeftWidth: 1,
        // borderRightWidth: 1,
        width: 300,
        marginLeft: 20
    },
    border: {
        borderColor: 'black',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        display:'flex'
    },
    borderWidth: {
        borderColor: 'black',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        width:50
    },
})