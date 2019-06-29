import React, {Component} from 'react';
import { View, ScrollView, StyleSheet,TouchableOpacity, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import {PulseLoader, TextLoader} from 'react-native-indicator';
import Api from '../api/Api.js'


class ProductosScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
        error : null,
        isLoaded : false,
        productos: []

    };
  }  

  async cargarProductos(){
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


  componentDidMount(){
    this.cargarProductos();
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
    :
    <View style={styles.container}>
        <FlatList 
                data={this.state.productos}
                renderItem={({ item }) => (
                   <ListItem
                  roundAvatar
                  title={item.nombre}
                  subtitle={item.marca}
                  //button onPress={() => this.props.navigation.navigate('Pedido', {idPedido: item.numeroPedido})}
                  badge={{ value: '$' + item.precio.toString(), textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
                /> 
                  )}
                keyExtractor={item => item.codigoBarras.toString()}
                />
         <TouchableOpacity onPress={() => alert('FAB clicked')} style={styles.fab}>
             <Text style={styles.fabIcon}>+</Text>
         </TouchableOpacity> 
     </View>

    )
  }

}
export default ProductosScreen;

ProductosScreen.navigationOptions = {
  title: 'Productos',
};


