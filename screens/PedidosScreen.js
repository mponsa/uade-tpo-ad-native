import React, {Component} from 'react';
import { ScrollView, StyleSheet , Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Api from '../api/Api.js'

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
                pedidos : result
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
                renderItem={({ pedido }) => (
                  <Text>{pedido.cliente}</Text>,
                  <Text>{pedido.estado}</Text>)
                }
                keyExtractor={pedido => pedido.numero}
                />
          <Text>{this.state.pedidos.length}</Text>
     </ScrollView>
    )
  }

}
export default PedidosScreen;

PedidosScreen.navigationOptions = {
  title: 'Pedidos',
};


