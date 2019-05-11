import React, { Component } from 'react';
import { Text } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            hideNavBar
            initial={true}
            key="mainScreen"
            animation='fade'
            component={() => <Text>Hello World</Text>}
          />
        </Scene>
      </Router>
    );
  }
}