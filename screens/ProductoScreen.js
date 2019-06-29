import React, {Component} from 'react';
import { View, ScrollView, StyleSheet,TouchableOpacity, Text} from 'react-native';
import axios from 'axios';
import {PulseLoader, TextLoader} from 'react-native-indicator';
import Api from '../api/Api.js'
import NuevoProductoForm from '../components/NuevoProducto.js';
import { thisExpression } from '@babel/types';





class ProductoScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
        error : null,
        isLoaded : false,
        rubro : this.props.navigation.getParam('rubro','no hay'),
        subRubro : this.props.navigation.getParam('subRubro','no hay'),
        producto: this.props.navigation.getParam('producto', null )
    };
  }  

  async actualizarProducto(){
    try{
        await axios.post(Api.path + '/productosSubRubro',{
            codigo: this.props.navigation.getParam('subRubroId',null)
        }).then(response => {
            if (response.data.errorCode === 0){
                this.setState({productos : response.data.result,
                               isLoaded: true})
            }else{
                alert(response.data.clientMessage)
            }
        })
    }catch(e){
        alert(e.message)
    }

  }

  async productoCreado(){
    this.props.navigation.navigate('Productos')
  }


  componentDidMount(){
    if( this.state.producto != null ) { 
        this.setState({isLoaded:true})
    }else{
        this.setState({isLoaded:true})
    }
  }

  render (){
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#FFF',
      },
      loading: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center', 
        },
    });

    return(
    !this.state.isLoaded 
    ?<View style={styles.loading}>
      <PulseLoader /> 
      <TextLoader text="Loading" />
     </View>
    :
     this.state.producto
     ?<View style={styles.container}>
         <Text> Producto {this.state.producto.nombre} cargado ! </Text>
     </View>
     :<View style={styles.container}>
         <NuevoProductoForm rubro = {this.state.rubro} subRubro = {this.state.subRubro} navigation = {this.props.navigation} refresh = {this.props.navigation.getParam('refresh')}/>
     </View>

    
    )
  }

}
export default ProductoScreen;

ProductoScreen.navigationOptions = {
  title: "Producto",
};


