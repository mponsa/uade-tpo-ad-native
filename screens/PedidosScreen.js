import React, {Component} from 'react';
import { ScrollView, StyleSheet , Text } from 'react-native';
import {ListItem, Button} from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import Api from '../api/Api.js'
import { tsOptionalType } from '@babel/types';

class PedidosScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
        error : null,
        isLoaded : false,
        pedidos : [], 
    };
  }  

  cargarPedidos(){
    fetch(Api.path + '/pedidos')
    .then( response => response.json())
    .then(
        // Handle the result
        (result) => {
            this.setState({
                isLoaded : true,
                pedidos : result.result
            });
        },

    )
  }

  componentDidMount(){
    this.cargarPedidos();
  }

  render (){
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#FFF',
      },
    });

    return(
    !this.state.isLoaded 
    ?<ScrollView style={styles.container}>
      <Text>Cargando...</Text>
     </ScrollView>
    :<ScrollView style={styles.container}>
            <FlatList 
                data={this.state.pedidos}
                renderItem={({ item }) => (
                   <ListItem
                  roundAvatar
                  title={item.numeroPedido + ' - ' + item.cliente.nombre}
                  subtitle={item.estado}
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


