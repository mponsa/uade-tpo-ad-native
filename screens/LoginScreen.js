import React from 'react';
import {
  AsyncStorage,
  Button,
  View,
} from 'react-native';
import Api from '../api/Api.js'
import Login from '../components/Login.js'

class LoginScreen extends React.Component {
    static navigationOptions = {
      title: 'Please sign in',
    };
  
    render() {
      return (
        <View>
          
          <Button title="Sign in!" onPress={this._signInAsync} />
        </View>
      );
    }
  
    _signInAsync = async () => {
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('Main');
    };
}
export default LoginScreen;