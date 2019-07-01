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
import ProductoScreen from '../screens/ProductoScreen';
import PedidoScreen from '../screens/PedidoScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

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

const ProductosStack = createStackNavigator({
  Rubro: RubrosScreen,
  SRubro: SubRubrosScreen,
  Productos: ProductosScreen,
  Producto: ProductoScreen,
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
  Pedido: PedidoScreen,
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

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  ChangePassword: ChangePasswordScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Configuración',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'md-settings' : 'md-settings'}
    />
  ),
};



export default createBottomTabNavigator({
  HomeStack,
  ClientesStack,
  ProductosStack,
  SettingsStack,
});
