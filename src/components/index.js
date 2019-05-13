/**
 * @format
 * @flow
 */

import React from 'react';
import { Scene, Router, Drawer } from 'react-native-router-flux';

import MainScreen from './Main';
import SideMenu from './Main/SideMenu';
import Register from './Register';
import Receipt from './Receipt';

type Props = {};

export default function(props: Props) {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="Register"
          initial
          hideNavBar
          component={Register}
        />
        {/* <Drawer
          hideNavBar
          key="SideMenu"
          drawerWidth={240}
          drawerPosition="right"
          contentComponent={SideMenu}
        >
          <Scene key="MainScreen" hideNavBar component={MainScreen}/>
        </Drawer> */}
        {/* <Scene
          key="Receipt"
          initial
          component={Receipt}
          title="Receipt"
        /> */}
      </Scene>
    </Router>
  );
}