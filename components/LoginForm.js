//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity,AsyncStorage, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';
import Api from '../api/Api.js';
import axios from 'axios';



// create a component
class LoginForm extends Component {
    constructor(props){
    super(props);
    this.state = {
        usuario: "",
        password: ""
      };
    }


    onButtonPress = () => {
        try{
            axios.post(Api.path + '/login',{
            'usuario': this.state.usuario,
            'password': this.state.password
          }).then(response => {
             if (response.data.errorCode === 0){
                AsyncStorage.setItem('userToken', this.state.usuario);
                this.props.press();

              }else{
              alert(response.data.clientMessage)
             }  
          })  
        }
        catch(e){
          Alert.alert(e.message)
        }
        
    };

    
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <TextInput style = {styles.input} 
                            autoCapitalize="none" 
                            onSubmitEditing={() => this.passwordInput.focus()} 
                            autoCorrect={false} 
                            keyboardType='email-address'
                            returnKeyType="next" 
                            placeholder='Usuario' 
                            placeholderTextColor='black'
                            value={this.state.usuario}
                            onChangeText={value=> this.setState({ usuario: value })}/>

                <TextInput style = {styles.input}   
                           returnKeyType="go" ref={(input)=> this.passwordInput = input} 
                           placeholder='Password' 
                           placeholderTextColor='black' 
                           secureTextEntry
                           value={this.state.password}
                           onChangeText={value=> this.setState({ password: value })}/>
                 {/*   <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */}
              <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress}>
                    <Text  style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity> 
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
     padding: 20
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(204,204,204,0.9)',
        marginBottom: 10,
        padding: 10,
        color: 'black',
        borderRadius: 10
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15,
        borderRadius: 10
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }, 
    loginButton:{
      backgroundColor:  '#2980b6',
       color: '#fff'
    }
   
});

//make this component available to the app
export default LoginForm;