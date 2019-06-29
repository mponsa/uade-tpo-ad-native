import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator, 
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PedidosScreen from '../screens/PedidosScreen';
import ClientesScreen from '../screens/ClientesScreen';
import RubrosScreen from '../screens/RubrosScreen';
import SubRubrosScreen from '../screens/SubRubrosScreen';
import ProductosScreen from '../screens/ProductosScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const PedidosStack = createStackNavigator({
  Pedidos: PedidosScreen,
});

PedidosStack.navigationOptions = {
  tabBarLabel: 'Pedidos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-document' : 'md-document'}
    />
  ),
};


const ProductosStack = createStackNavigator({
  Rubro: RubrosScreen,
  SRubro: SubRubrosScreen,
  Productos: ProductosScreen,
});

ProductosStack.navigationOptions = {
  tabBarLabel: 'Productos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box'}
    />
  ),
};

const ClientesStack = createStackNavigator({
  Clientes: ClientesScreen,
  PedidosCliente: PedidosScreen,
});

ClientesStack.navigationOptions = {
  tabBarLabel: 'Clientes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'md-people' : 'md-people'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  PedidosStack,
  ClientesStack,
  ProductosStack,
  
});
