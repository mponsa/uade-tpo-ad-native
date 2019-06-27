import React, {Component} from 'react';
import { ScrollView, StyleSheet , Text } from 'react-native';
import {ListItem, Button, Icon} from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import Api from '../api/Api.js'


class ClientesScreen extends Component{
    constructor(props){
      super(props);
      this.state = {
          error : null,
          isLoaded : false,
          clientes : [], 
      };
    } 

    cargarClientes(){
        fetch(Api.path + '/clientes')
        .then( response => response.json())
        .then(
            // Handle the result
            (result) => {
                this.setState({
                    isLoaded : true,
                    clientes : result.result
                });
            },
    
        )
      }

      componentDidMount(){
        this.cargarClientes();
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
                data={this.state.clientes}
                renderItem={({ item }) => (
                  <ListItem
                    roundAvatar
                    title={item.nombre}
                    subtitle={item.cuil}
                    leftAvatar={{ source: require('../assets/images/avatar.png') }}
                    button onPress={() => this.props.navigation.navigate('PedidosCliente', {idCliente: item.numero})}
                    //button onPress={() => alert(item.numero)}
                  /> 
                )}
                keyExtractor={item => item.cuil}
              /> 
             </ScrollView>
            )
          }

}
export default ClientesScreen;

ClientesScreen.navigationOptions = {
  title: 'Clientes',
};