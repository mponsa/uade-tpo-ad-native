import React, {Component} from 'react';
import { ScrollView, StyleSheet , Text } from 'react-native';
import {ListItem, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';

import Api from '../api/Api.js'

class PedidosScreen extends Component{
    constructor(props){
      super(props);
      this.state = {
          error : null,
          isLoaded : false,
          pedidos : [],
          filtered : '',
          idPedido: this.props.navigation.getParam('idPedido', null) 
      };
    }  

    cargarPedido(){
        this.state.idPedido
        ? axios.post(Api.path + '/pedido',{'numero': this.state.idPedido})
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
        this.setState({idPedido: this.props.navigation.getParam('idPedido', null)})
        this.cargarPedido();
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
                        data={this.state.pedido}
                        renderItem={({ item }) => (
                           <ListItem
                          roundAvatar
                          title={item.numeroPedido + ' - ' + item.cliente.nombre}
                          subtitle={item.estado}
                          //button onPress={() => this.props.navigation.navigate('Pedido', {idPedido: item.numeroPedido})}
                          //badge={{ value: '$' + item.items.reduce((acc,item) => acc + item.cantidad * item.producto.precio,0).toString(), textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
                        /> 
                          )}
                        keyExtractor={item => item.numeroPedido.toString()}
                        /> 
             </ScrollView>
            )
          }

}
export default PedidoScreen;

PedidosScreen.navigationOptions = {
  title: 'Pedido',
};