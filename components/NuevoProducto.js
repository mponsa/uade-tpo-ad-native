import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity,AsyncStorage, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';
import Api from '../api/Api.js';
import axios from 'axios';


class NuevoProductoForm extends Component {
    constructor(props){
    super(props);
    this.state = {
        nombre: "",
        marca: "",
        rubro: this.props.rubro,
        subRubro: this.props.subRubro,
        codigoBarras: "",
        precio: 0,
        sending: false,
      };
    }



    onButtonPress = () => {
        if(!this.state.sending){ //Se valida que no estemos llamando a la API.
            if(this.validarForm()){ //Se valida que estén correctos los campos.
                    try{
                        this.setState({sending:true})
                        axios.post(Api.path + '/altaProducto',{
                        'subRubro': this.state.subRubro,
                        'rubro': this.state.rubro,
                        'nombre': this.state.nombre,
                        'marca': this.state.marca,
                        'codigoBarras': this.state.codigoBarras,
                        'precio': this.state.precio
                    }).then(response => {
                        this.setState({sending:false});
                        alert(response.data.clientMessage);
                        this.props.refresh();
                        this.props.navigation.navigate('Productos');
                    })  
                    }
                    catch(e){
                    Alert.alert(e.message)
                    }
            } 
            else{
                alert("El precio debe ser mayor a 0 y el codigo de barras tener una longitud de 13 caracteres.")
            }
        }
    };

    validarForm(){
        return this.state.precio > 0 && this.state.codigoBarras.length == 13
    }

    
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <TextInput style = {styles.input} 
                            autoCapitalize="none" 
                            onSubmitEditing={() => this.marcaInput.focus()} 
                            autoCorrect={false} 
                            keyboardType='default'
                            returnKeyType="next" 
                            placeholder='Nombre' 
                            placeholderTextColor='black'
                            value={this.state.nombre}
                            onChangeText={value=> this.setState({ nombre: value })}/>
                <TextInput style = {styles.input} 
                            autoCapitalize="none" 
                            ref={(input)=>this.marcaInput = input}
                            onSubmitEditing={() => this.precioInput.focus()} 
                            autoCorrect={false} 
                            keyboardType='default'
                            returnKeyType="next" 
                            placeholder='Marca' 
                            placeholderTextColor='black'
                            value={this.state.marca}
                            onChangeText={value=> this.setState({ marca: value })}/>
                <TextInput style = {styles.inputDisabled} 
                            value={'Rubro :' + this.state.rubro.descripcion}
                            editable={false}
                            />
                <TextInput style = {styles.inputDisabled} 
                            value={'SubRubro: ' + this.state.subRubro.descripcion}
                            editable={false}
                            />
                <TextInput  style = {styles.input} 
                            autoCapitalize="none" 
                            ref={(input)=>this.precioInput = input}
                            onSubmitEditing={() => this.codigoBarrasInput.focus()} 
                            autoCorrect={false} 
                            keyboardType='numeric'
                            returnKeyType="next" 
                            placeholder='Precio' 
                            placeholderTextColor='black'
                            value={this.state.precio.toString()}
                            onChangeText={value=> this.setState({ precio:  Number.parseInt(value)})}/>
                <TextInput  style = {styles.input} 
                            autoCapitalize="none" 
                            ref={(input)=>this.codigoBarrasInput = input}
                            autoCorrect={false} 
                            keyboardType='default'
                            returnKeyType="next" 
                            placeholder='Código de barras' 
                            placeholderTextColor='black'
                            value={this.state.codigoBarras}
                            onChangeText={value=> this.setState({ codigoBarras: value })}/>
                
                
              <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress} activeOpacity={this.validarForm() ? 1 : 0.5}>
                    <Text  style={styles.buttonText}>Guardar</Text>
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
        paddingVertical: 15,
        borderRadius: 10
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }, 

   
});
export default NuevoProductoForm;