import React, {Component} from 'react';
import { StyleSheet,View,} from 'react-native';
import {PulseLoader, TextLoader} from 'react-native-indicator';
import axios from 'axios';
import Api from '../api/Api.js'
import Pedido from '../components/Pedido.js'

class PedidoScreen extends Component{
    constructor(props){
      super(props);
      this.state = {
          error : null,
          isLoaded : false,
          pedido: this.props.navigation.getParam('pedido'),
          cliente: this.props.navigation.getParam('cliente')
      };
    }  

    async actualizarPedido(){
      try{
        await axios.get(Api.path + `/pedido?numero=${this.props.match.params.id}`).then(response =>{
            if(response.data.errorCode === 0){
                this.setState({pedido : response.data.result,
                               isLoaded: true})
            }else{
                alert(response.data.clientMessage)
            }
        })
    }
    catch(e){
        alert(e.message)
    }
    } 


    componentDidMount(){
      if( this.state.producto != null ) { 
        this.setState({isLoaded:true})
      }else{
          this.setState({isLoaded:true})
      }
    }


      render (){
        const styles = StyleSheet.create({
          container: {
            flex: 1,
            paddingTop: 30,
            backgroundColor: '#FFF',
          },loading: {
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
          :
           <View style={styles.container}>
               <Pedido pedido={this.state.pedido} navigation = {this.props.navigation} refresh = {this.props.navigation.getParam('refresh')}/>
           </View>
          )
        }

}
export default PedidoScreen;

PedidoScreen.navigationOptions = {
  title: 'Pedido',
};