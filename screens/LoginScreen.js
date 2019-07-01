import React from 'react';
import Login from '../components/Login.js';



class LoginScreen extends React.Component {
    static navigationOptions = {
      title: 'Ingreso',
    };
  
    render() {
      return (
        
          <Login press={this._signInAsync}/>
        
      );
    }
  


    _signInAsync = async () => {
      this.props.navigation.navigate('Main');
    };
}
export default LoginScreen;