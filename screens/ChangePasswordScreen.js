import React from 'react';
import {View,Text,KeyboardAvoidingView,TextInput, TouchableOpacity,StyleSheet,StatusBar,AsyncStorage} from 'react-native';
import axios from 'axios';
import Api from '../api/Api.js';



class ChangePasswordScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            usuario: "",
            password: ""
          };
        }
    
    static navigationOptions = {
        title: "Cambio de password"
    }
    
        onButtonPress = () => {
            try{
                axios.post(Api.path + '/cambioPassword',{
                'usuario': this.state.usuario,
                'password': this.state.password
              }).then(response => {
                 if (response.data.errorCode === 0){
                    alert(response.data.clientMessage);
                    this.props.navigation.navigate("Settings")
    
                  }else{
                  alert(response.data.clientMessage)
                 }  
              })  
            }
            catch(e){
              alert(e.message)
            }
            
        };
    
    render() {
      return (
        
       <KeyboardAvoidingView behavior="padding" style={styles.container}>
       
       <View style={styles.formContainer}>

                        <StatusBar barStyle="light-content"/>

                        <Text style={styles.labelText}> Ingrese su usuario: </Text>
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
                        <Text style={styles.labelText}> Ingrese su password: </Text>
                        <TextInput style = {styles.input}   
                                returnKeyType="go" ref={(input)=> this.passwordInput = input} 
                                placeholder='Password' 
                                placeholderTextColor='black' 
                                secureTextEntry
                                value={this.state.password}
                                onChangeText={value=> this.setState({ password: value })}/>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress}>
                            <Text  style={styles.buttonText}>Cambiar password</Text>
                    </TouchableOpacity> 
        
       </View>
       </KeyboardAvoidingView>
        
      );
    }

}
export default ChangePasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    formContainer: {
        margin: 10,
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    title:{
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9,

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
    },
    labelText:{
        textAlign: 'left',
        marginBottom: 10,
        padding:10,
        fontWeight: '700'
    }
});