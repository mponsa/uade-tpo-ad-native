import React, {Component} from 'react';
import { ScrollView, StyleSheet , Text } from 'react-native';
import {ListItem, Button} from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import Api from '../api/Api.js'


class RubrosScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoaded:false,
      rubros: []
    };
  }  


  cargarRubros = () => {
    try{
      axios.get(Api.path + '/rubros').then(response => {
          if(response.data.errorCode === 0){
              this.setState({rubros : response.data.result,
                             isLoaded : true})
          }else{
              alert(response.data.clientMessage)
          }
      })
  }catch(e){
      alert(e.message)
  }
  }

  componentDidMount = () => {
    this.cargarRubros();
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
                data={this.state.rubros}
                renderItem={({ item }) => (
                  <ListItem
                    roundAvatar
                    title={item.codigo + ' - ' + item.descripcion}
                    button onPress={() => this.props.navigation.navigate('SRubro', {idRubro: item.codigo})}
                    //button onPress={() => alert(item.numero)}
                  /> 
                )}
                keyExtractor={item => item.codigo.toString()}
              /> 
             </ScrollView>
    )
  }

}
export default RubrosScreen;

RubrosScreen.navigationOptions = {
  title: 'Seleccione un rubro..',
};


