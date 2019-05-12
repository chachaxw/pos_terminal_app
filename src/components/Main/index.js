/**
 * @format
 * @flow
 */

import React from 'react';
import { ScrollView, SafeAreaView, View, Image,
  StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const logo = require('../../images/logo.png');
const menuIcon = require('../../images/menu.png');

type Props = {};

export default function(props: Props) {

  const openDrawer = () => {
    Actions.drawerOpen();
  }

  return (
    <ScrollView style={{backgroundColor: '#000'}}>
      <SafeAreaView>
        <View style={styles.wrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.menuButton}
            onPress={openDrawer}
          >
            <Image style={{width: 24, height: 17}} source={menuIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.logoView}>
          <Image style={styles.logo} source={logo}/>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 113,
    height: 127,
  },
  logoView: {
    flex: 1,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  menuButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(31,31,31,0.7)',
  },
});