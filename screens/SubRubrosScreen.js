import React, {Component} from 'react';
import { ScrollView, StyleSheet , View } from 'react-native';
import {ListItem} from 'react-native-elements';
import {PulseLoader, TextLoader} from 'react-native-indicator';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import Api from '../api/Api.js'


class SubRubrosScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      subrubros: [],
      addItem : this.props.navigation.getParam('addItem'),
      pedido: this.props.navigation.getParam('pedido'),
      refreshPedido: this.props.navigation.getParam('refreshPedido')
    };
  }


   cargarSubRubros(){

    // try{
    //   await axios.get(Api.path + '/subrubros')
    //   .then(response => response.json()).then((response) => {
    //     if (response.data.errorCode  === 0){
    //         var filter = this.props.navigation.getParam('descRubro',null);
    //         var filteredsubrubros = result.result.filter(function(subrubro){
    //           return !subrubro.rubro.descripcion.indexOf(filter)
    //         });
    //         this.setState({
    //             isLoaded : true,
    //             subrubros : filteredsubrubros
    //         });
    //     }
    //     else{
    //       alert(response.data.clientMessage)
    //     }
    //   })
    // }catch(e){
    //   alert(e.clientMessage)
    // }



    fetch(Api.path + '/subrubros')
    .then( response => response.json())
    .then(
        // Handle the result
        (result) => {
            var filter = this.props.navigation.getParam('rubro',null).descripcion;
            var filteredsubrubros = result.result.filter(function(subrubro){
              return !subrubro.rubro.descripcion.indexOf(filter)
            });
            this.setState({
                isLoaded : true,
                subrubros : filteredsubrubros
            });
        },

    )
  }

  componentDidMount = () => {
    this.cargarSubRubros();
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
            :<ScrollView style={styles.container}>
              <FlatList
                data={this.state.subrubros}
                renderItem={({ item }) => (
                  <ListItem
                    roundAvatar
                    title={item.codigo + ' - ' + item.descripcion}
                    button onPress={() => this.props.navigation.navigate('Productos', {subRubro: item, rubro: item.rubro, addItem: this.state.addItem, pedido: this.state.pedido, refreshPedido: this.state.refreshPedido})}
                  />
                )}
                keyExtractor={item => item.codigo.toString()}
              />
             </ScrollView>
    )
  }

}
export default SubRubrosScreen;

SubRubrosScreen.navigationOptions = {
  title: 'Seleccione un sub-rubro..',
};
