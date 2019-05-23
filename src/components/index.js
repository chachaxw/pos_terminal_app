/**
 * @format
 * @flow
 */

import React from 'react';
import { connect } from 'react-redux';
import { Scene, Router, Drawer, Modal } from 'react-native-router-flux';

import MainScreen from './Main';
import SideMenu from './Main/SideMenu';
import Register from './Register';
import Receipt from './Receipt';
import Charge from './Charge';
import PhotoIdentity from './Charge/PhotoIdentity';
import VerifyCode from './Register/VerifyCode';
import LoadingModal from './common/LoadingModal';

type Props = {
  isAuthenticated: bool,
};

function Main(props: Props) {
  const { isAuthenticated } = props;

  if (!isAuthenticated) {
    return (
      <Router>
        <Modal hideNavBar>
          <Scene key="root">
            <Scene
              initial
              key="Register"
              hideNavBar
              component={Register}
            />
            <Scene
              key="VerifyCode"
              hideNavBar
              component={VerifyCode}
            />
          </Scene>
          <Scene
            key="LoadingModal"
            component={LoadingModal}
          />
        </Modal>
      </Router>
    );
  }

  return (
    <Router>
      <Modal hideNavBar>
        <Scene key="root">
          <Drawer
            initial
            hideNavBar
            key="SideMenu"
            drawerWidth={240}
            drawerPosition="right"
            contentComponent={SideMenu}
          >
            <Scene key="MainScreen" hideNavBar component={MainScreen}/>
          </Drawer>
          <Scene
            back
            key="Receipt"
            title="Receipt"
            component={Receipt}
          />
          <Scene
            back
            key="Charge"
            title="Charge"
            component={Charge}
          />
        </Scene>
        <Scene
          key="LoadingModal"
          component={LoadingModal}
        />
        <Scene
          key='PhotoIdentity'
          component={PhotoIdentity}
        />
      </Modal>
    </Router>
  );
}

function mapStateToProps(state) {
  console.log(state);
	return {
		isAuthenticated: state.global.isAuthenticated,
	};
}

export default connect(mapStateToProps)(Main);