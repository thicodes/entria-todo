/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'
import Splash from './components/Splash'
import TodoAdd from './components/TodoAdd'
import TodoList from './components/TodoList'

const App = StackNavigator(
  {
    Splash: { screen: Splash },
    TodoList: { screen: TodoList },
    TodoAdd: { screen: TodoAdd },
  },
  {
    initialRouteName: 'Splash',
    mode: 'modal'
  }
)

export default () => <App/>