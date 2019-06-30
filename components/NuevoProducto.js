import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity,AsyncStorage, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';
import Api from '../api/Api.js';
import axios from 'axios';


class NuevoProductoForm extends Component {
    constructor(props){
    super(props);
    this.state = {
        nombre: this.props.producto ? this.props.producto.nombre : "",
        marca: this.props.producto ? this.props.producto.marca : "",
        rubro: this.props.producto ? this.props.producto.rubro : this.props.rubro,
        subRubro: this.props.producto ? this.props.producto.subRubro : this.props.subRubro,
        codigoBarras: this.props.producto ? this.props.producto.codigoBarras : "",
        identificador: this.props.producto ? this.props.producto.identificador : "",
        precio: this.props.producto ? this.props.producto.precio : 0,
        producto: this.props.producto ? true : false,
        sending: false,
      };
    this.eliminarProducto = this.eliminarProducto.bind(this);
    }



    onButtonPress = () => {
        
        if(!this.state.sending){ //Se valida que no estemos llamando a la API.
            if(this.validarForm()){ //Se valida que estén correctos los campos.
                    try{
                        this.setState({sending:true})
                        if(!this.props.producto){
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
                    }else{
                        axios.post(Api.path + '/modificarProducto',{
                            'identificador' : this.state.identificador,
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
                    }
                    catch(e){
                    Alert.alert(e.message)
                    }
            } 
            else{
                if(!this.state.producto){
                    alert("El precio debe ser mayor a 0 y el codigo de barras tener una longitud de 13 caracteres.")
                }else{
                    alert("El precio debe ser mayor a 0")
                }
            }
        }
    };

    validarForm(){
        return this.state.precio > 0 && this.state.codigoBarras.length == 13
    }

    eliminarProducto(){
        try{
            this.setState({sending:true})
            axios.post(Api.path + '/bajaProducto',{
                identificador : this.state.identificador
            }).then(response => {
                if(response.data.errorCode === 0){
                    this.setState({sending:false})
                    alert(response.data.clientMessage);
                    this.props.refresh();
                    this.props.navigation.navigate('Productos');
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
                            autoCapitalize="none" 
                            editable = {this.state.producto ? true : false}
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
                            editable = {this.state.producto ? true : false}
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
                            onChangeText={value=> this.setState({ precio:  value ? Number.parseInt(value) : 0})}/>
                <TextInput  style = {styles.input} 
                            autoCapitalize="none"
                            editable = {this.state.producto ? true : false} 
                            ref={(input)=>this.codigoBarrasInput = input}
                            autoCorrect={false} 
                            keyboardType='default'
                            returnKeyType="next" 
                            placeholder='Código de barras' 
                            placeholderTextColor='black'
                            value={this.state.codigoBarras}
                            onChangeText={value=> this.setState({ codigoBarras: value })}/>
             
               <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress}>
                    <Text  style={styles.buttonText}>Guardar</Text>
               </TouchableOpacity>
               <EliminarButton parent={this}/>
            </View>
        );
    }
}

class EliminarButton extends Component{
    render(){
        return(
            this.props.parent.state.producto
            ? <TouchableOpacity style={styles.buttonContainerAlert} onPress={this.props.parent.eliminarProducto}>
                     <Text  style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            :
             <View>

             </View>
        )
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
export default NuevoProductoForm;