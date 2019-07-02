import React from 'react';
import {AsyncStorage,View,StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';

class SettingsScreen extends React.Component {
	// TODO: implement your navigationOptions
    constructor(props){
        super(props);
        this.state = {
            data: [{item : 'Cambiar Password',
                    funcion: this.changePassword
                    },
                {item : 'Logout',
                    funcion: this.logout}]
        }
    }

    logout(navigation){
        AsyncStorage.removeItem('userToken');
        navigation.navigate('Auth');
    }

    changePassword(navigation){
        navigation.navigate('ChangePassword')
    }

    static navigationOptions = {
        title: 'Configuración'
    }


	render() {
        const styles = StyleSheet.create({
            container: {
              flex: 1,
              paddingTop: 30,
              backgroundColor: '#FFF',
            },
          });
        
        return (
        <View style={styles.container}>
            <FlatList 
                data={this.state.data}
                renderItem={({ item }) => (
                   <ListItem
                  roundAvatar
                  title={item.item}
                  button onPress={() => item.funcion(this.props.navigation)}
                /> 
                  )}
                keyExtractor={item => item.item}
                /> 
         </View>
		)
	}
}

export default SettingsScreen;