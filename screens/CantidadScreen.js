import React from 'react';
import {View,Text,KeyboardAvoidingView,TextInput, TouchableOpacity,StyleSheet,StatusBar,AsyncStorage} from 'react-native';
import axios from 'axios';
import Api from '../api/Api.js';




class CantidadScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pedido: this.props.navigation.getParam("pedido"),
            producto: this.props.navigation.getParam("producto"),
            cantidad: 0,
            refreshPedido: this.props.navigation.getParam("refreshPedido")
        };
        
        }
    
    static navigationOptions = {
        title: "Ingrese la cantidad deseada"
    }
    
        onButtonPress = () => {
        if(this.state.cantidad > 0){
            try{
                axios.post(Api.path + '/agregarProductos',{
                  'id' : this.state.pedido.numeroPedido,
                  'productoId' : this.state.producto.identificador,
                  'cantidad' : this.state.cantidad
                }).then(response => {
                    if(response.data.errorCode === 0){
                      this.state.refreshPedido();
                      this.props.navigation.navigate('Pedido',{ pedido: this.state.pedido });
                    }else{
                      alert(response.data.clientMessage)
                    }
                })
    
              }catch(e){
                alert(e.message)
              }
            }else{
                alert("La cantidad debe ser mayor a  0.")
            }
        };
    
    render() {
      return (
        
       <KeyboardAvoidingView behavior="padding" style={styles.container}>
       
       <View style={styles.formContainer}>

                        <StatusBar barStyle="light-content"/>

                        <Text style={styles.labelText}> Cantidad </Text>
                        <TextInput style = {styles.input} 
                            keyboardType='numeric'
                            placeholder='Cantidad' 
                            placeholderTextColor='black'
                            onChangeText={value=> this.setState({ cantidad: value })}/>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress}>
                            <Text  style={styles.buttonText}>Agregar item</Text>
                    </TouchableOpacity> 
        
       </View>
       </KeyboardAvoidingView>
        
      );
    }

}
export default CantidadScreen;

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