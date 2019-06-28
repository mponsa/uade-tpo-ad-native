import React, {Component} from 'react';
import { View, ScrollView, StyleSheet} from 'react-native';
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
        filtered : '',
        idCliente: this.props.navigation.getParam('idCliente', null) 
    };
  }  

  cargarPedidos(){
    this.state.idCliente
    ? axios.post(Api.path + '/pedidos/cliente',{'numero': this.state.idCliente})
        .then(response => {
          if(response.data.errorCode === 0){
            this.setState({
              isLoaded : true,
              pedidos : response.data.result
          }); 
          }else{
                  alert(response.data.clientMessage)
          }
      })
    : axios.get(Api.path + '/pedidos')
    .then(response => {
      if(response.data.errorCode === 0){
        this.setState({
          isLoaded : true,
          pedidos : response.data.result
      });
      }else{
              Alert.alert(response.data.clientMessage)
      }
  })
} 

  componentDidMount(){
    this.setState({idCliente: this.props.navigation.getParam('idCliente', null)})
    this.cargarPedidos();
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
        }
    });

    return(
    !this.state.isLoaded 
    ?<View style={styles.loading}>
      <PulseLoader /> 
      <TextLoader text="Loading" />
     </View>
    :<ScrollView style={styles.container}>
            <FlatList 
                data={this.state.pedidos}
                renderItem={({ item }) => (
                   <ListItem
                  roundAvatar
                  title={item.numeroPedido + ' - ' + item.cliente.nombre}
                  subtitle={item.estado}
                  button onPress={() => this.props.navigation.navigate('Pedido', {idPedido: item.numeroPedido})}
                  badge={{ value: '$' + item.items.reduce((acc,item) => acc + item.cantidad * item.producto.precio,0).toString(), textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
                /> 
                  )}
                keyExtractor={item => item.numeroPedido.toString()}
                /> 
     </ScrollView>
    )
  }

}
export default PedidosScreen;

PedidosScreen.navigationOptions = {
  title: 'Pedidos',
};


