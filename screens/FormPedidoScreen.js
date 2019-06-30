import React, { Component } from "react";
import { View, ScrollView, StyleSheet,TouchableOpacity, Text} from 'react-native';
import axios from 'axios';
import {PulseLoader, TextLoader} from 'react-native-indicator';
import Api from '../api/Api.js'


class FormPedidoSceen extends Component{
    constructor(props){
        super(props);

        this.state = {
            show : '',
            cliente :'',
            pedido : '',
            isLoaded: false
        }
    }

    handleCrearPedido = e => {

        try {
                axios.post(api.path + '/crearPedido',{
                  'cliente': this.props.cliente
            }).then(response => {
                if(response.data.errorCode === 0){
                    this.setState({ 'cliente': this.props.cliente,
                                    'pedido': response.data.result,
                                    'isLoaded':true})
                }else{
                    alert(response.data.clientMessage)
                }
            })
        }catch(e){
            alert(e.message)
        }
    }


    render(){
        if (this.state.isLoaded){
        return(

          )
        }
    }
}
export default FormPedidoSceen;

FormPedidoSceen.navigationOptions = {
  title: "FormPedidoSceen",
};
