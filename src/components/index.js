/**
 * @format
 * @flow
 */

import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import MainScreen from './Main';

type Props = {};

export default function(props: Props) {
  return (
    <Router>
      <Scene key="root">
        <Scene
          hideNavBar
          initial={true}
          key="mainScreen"
          animation='fade'
          component={MainScreen}
        />
      </Scene>
    </Router>
  );
}