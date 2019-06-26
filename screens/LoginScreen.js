import React from 'react';
import {
  AsyncStorage,
  Button,
  View,
} from 'react-native';
import Login from '../components/Login.js'



class LoginScreen extends React.Component {
    static navigationOptions = {
      title: 'Please sign in',
    };
  
    render() {
      return (
        
          <Login press={this._signInAsync}/>
        
      );
    }
  
    _signInAsync = async () => {
      //await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('Main');
    };
}
export default LoginScreen;