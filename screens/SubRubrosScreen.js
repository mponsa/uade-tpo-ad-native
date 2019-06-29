import React, {Component} from 'react';
import { ScrollView, StyleSheet , Text } from 'react-native';
import {ListItem, Button} from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import Api from '../api/Api.js'


class SubRubrosScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      subrubros: []
    };
  }  


  cargarSubRubros = () => {
    fetch(Api.path + '/subrubros')
    .then( response => response.json())
    .then(
        // Handle the result
        (result) => {
            var filter = this.props.navigation.getParam('descRubro',null);
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
    });

    return(
            !this.state.isLoaded 
            ?<ScrollView style={styles.container}>
              <Text>Cargando...</Text>
             </ScrollView>
            :<ScrollView style={styles.container}>
              <FlatList 
                data={this.state.subrubros}
                renderItem={({ item }) => (
                  <ListItem
                    roundAvatar
                    title={item.codigo + ' - ' + item.descripcion}
                    button onPress={() => this.props.navigation.navigate('Productos', {subRubroId: item.codigo})}
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


