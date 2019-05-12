/**
 * @format
 * @flow
 */

import React from 'react';
import { Scene, Router, Drawer } from 'react-native-router-flux';

import MainScreen from './Main';
import SideMenu from './Main/SideMenu';

type Props = {};

export default function(props: Props) {
  return (
    <Router>
      <Scene key="root">
        <Drawer
          hideNavBar
          key="SideMenu"
          drawerWidth={240}
          drawerPosition="right"
          contentComponent={SideMenu}
        >
          <Scene key="MainScreen" hideNavBar component={MainScreen}/>
        </Drawer>
      </Scene>
    </Router>
  );
}