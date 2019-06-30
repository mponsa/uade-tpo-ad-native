import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity,AsyncStorage, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';
import Api from '../api/Api.js';
import axios from 'axios';


class Pedido extends Component {
    constructor(props){
    super(props);
    this.state = {
        numeroPedido: this.props.pedido.numeroPedido,
        cliente: this.props.pedido.cliente,
        fechaPedido: (new Date(this.props.pedido.fechaPedido)).getDate() + '/' +
                     ((new Date(this.props.pedido.fechaPedido)).getMonth() + 1) + '/' +
                     (new Date(this.props.pedido.fechaPedido)).getFullYear(),
        estado: this.props.pedido.estado,
        items: this.props.pedido.items,
        pedido: this.props.pedido,
        sending: false,
      };
    this.eliminarPedido = this.eliminarPedido.bind(this);
    }



    onButtonPress = () => {
        
        if(!this.state.sending){ //Se valida que no estemos llamando a la API.
                alert("Boton apretadoo!")
        }
    };

    eliminarPedido(){
        try{
            this.setState({sending:true})
            axios.post(Api.path + '/eliminarPedido',{
                numeroPedido : this.state.numeroPedido
            }).then(response => {
                if(response.data.errorCode === 0){
                    this.setState({sending:false})
                    alert(response.data.clientMessage);
                    this.props.refresh();
                    this.props.navigation.navigate('PedidosCliente', {cliente: this.state.cliente});
                }
            })
        }
        catch(e){
            alert(e.message);
        }
    }

    
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <TextInput style = {styles.input} 
                            value={'Número de pedido: ' + this.state.numeroPedido}
                            editable={false}
                            />
                <TextInput style = {styles.input} 
                            value={'Cliente: ' + this.state.cliente.nombre}
                            editable={false}
                            />
                <TextInput style = {styles.input} 
                            value={'Fecha: ' + this.state.fechaPedido}
                            editable={false}
                            />
                 <TextInput style = {styles.input} 
                            value={'Estado: ' + this.state.estado}
                            editable={false}
                            /> 
               <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress}>
                    <Text  style={styles.buttonText}>Agregar items..</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.buttonContainerAlert} onPress={this.eliminarPedido}>
                     <Text  style={styles.buttonText}>Eliminar</Text>
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
    inputDisabled:{
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        color: 'black',
        borderRadius: 10
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10
    },
    buttonContainerAlert:{
        backgroundColor: '#de1738',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }, 

   
});
export default Pedido;