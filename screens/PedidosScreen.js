import React, {Component} from 'react';
import { View, ScrollView, StyleSheet,TouchableOpacity,Text} from 'react-native';
import {ListItem} from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import {PulseLoader, TextLoader} from 'react-native-indicator';
import Api from '../api/Api.js'


class PedidosScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
        error : null,
        isLoaded : false,
        pedidos : [],
        cliente: this.props.navigation.getParam('cliente', null),
        sending: false 
    };
    this.refreshFunction = this.refreshFunction.bind(this);
    this.crearPedido = this.crearPedido.bind(this);
  } 
  
  cargarPedidos(){
    axios.post(Api.path + '/pedidos/cliente',{'numero': this.state.cliente.numero})
        .then(response => {
          if(response.data.errorCode === 0){
            this.setState({
              isLoaded : true,
              pedidos : response.data.result
          }); 
          }else{
                  this.setState({isLoaded: true})
                  alert(response.data.clientMessage)
          }
      })
  }

  crearPedido(){
      try{
          this.setState({sending:true})
          axios.post(Api.path + '/crearPedido',{
                'cliente': this.state.cliente
          }).then(response => {
              if(response.data.errorCode === 0){
                this.props.navigation.navigate('Pedido', {pedido: response.data.result , refresh: this.refreshFunction})
                this.cargarPedidos()
              }else{
                  alert(response.data.clientMessage)
              }
          })
      }catch(e){
        alert(e.message)
      }
  }

  componentDidMount(){
    this.cargarPedidos();
  }

  refreshFunction(){
    this.setState({isLoaded:false});
    this.cargarPedidos();
}


verPedido(item){
  if(item.estado == 'facturado'){
    alert("El pedido no puede modificarse");
  }else{
    this.props.navigation.navigate('Pedido',{pedido: item, refresh: this.refreshFunction});
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
        fab: { 
          position: 'absolute', 
          width: 56, 
          height: 56, 
          alignItems: 'center', 
          justifyContent: 'center', 
          right: 20, 
          bottom: 20, 
          backgroundColor: '#03A9F4', 
          borderRadius: 30, 
          elevation: 8 
          }, 
    fabIcon: { 
            fontSize: 40, 
            color: 'white' 
          },
      

    });

    return(
    !this.state.isLoaded 
    ?<View style={styles.loading}>
      <PulseLoader /> 
      <TextLoader text="Loading" />
     </View>
    :<View style={styles.container}>
            <FlatList 
                data={this.state.pedidos}
                renderItem={({ item }) => (
                   <ListItem
                  roundAvatar
                  title={item.numeroPedido + ' - ' + item.cliente.nombre}
                  subtitle={item.estado}
                  button onPress={() => this.verPedido(item)}
                  badge={{ value: '$' + item.items.reduce((acc,item) => acc + item.cantidad * item.producto.precio,0).toString(), textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
                /> 
                  )}
                keyExtractor={item => item.numeroPedido.toString()}
                /> 
      <TouchableOpacity onPress={this.crearPedido}
       style={styles.fab}>
      <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
     </View>
 
    )
  }

}
export default PedidosScreen;

PedidosScreen.navigationOptions = {
  title: 'Pedidos',
};


