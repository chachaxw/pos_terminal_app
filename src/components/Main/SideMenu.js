/**
 * @format
 * @flow
 */

import React, { useState } from 'react';
import { SafeAreaView, View, Image, Text,
  StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MKColor, MKSwitch } from 'react-native-material-kit';

const closeIcon = require('../../images/close.png');

type Props = {
  name: string,
  avatarUrl: string,
};

export default function(props: Props) {
  const { name, avatarUrl } = props;
  const [printChecked, setPrintChecked] = useState(true);
  const [saveChecked, setSaveChecked] = useState(true);
  const closeDrawer = () => {
    Actions.drawerClose();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonView}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={closeDrawer}
          style={styles.closeButton}
        >
          <Image style={{width: 20, height: 20}} source={closeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
        <Image
          style={styles.avatar}
          source={{uri: avatarUrl || 'http://www.getmdl.io/assets/demos/welcome_card.jpg'}}>
        </Image>
        <View><Text style={styles.username}>{name || 'Chacha'}</Text></View>
        <View style={styles.rowItem}>
          <Text style={styles.rowText}>Print Receipt</Text>
          <MKSwitch
            trackSize={16}
            offColor="#5C5C5C"
            thumbRadius={10}
            trackLength={40}
            checked={printChecked}
            onColor="rgba(0,150,136,.7)"
            thumbOnColor={MKColor.Teal}
            rippleColor="rgba(0,150,136,.2)"
            onCheckedChange={({checked}) => setPrintChecked(checked)}
          />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.rowText}>Save Receipt</Text>
          <MKSwitch
            trackSize={16}
            offColor="#5C5C5C"
            thumbRadius={10}
            trackLength={40}
            checked={saveChecked}
            onColor="rgba(0,150,136,.7)"
            thumbOnColor={MKColor.Teal}
            rippleColor="rgba(0,150,136,.2)"
            onCheckedChange={({checked}) => setSaveChecked(checked)}
          />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.rowText}>Emulator</Text>
          <Text style={styles.rowText}>Broadcast Mode</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.rowText}>Parser</Text>
          <Text style={styles.rowText}>Interpreter Type</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.rowText}>Currency</Text>
          <Text style={styles.rowText}>USD$</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.rowText}>Tax</Text>
          <Text style={styles.rowText}>IVA</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  buttonView: {
    padding: 16,
    flexDirection: 'row',
  },
  closeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(31,31,31,0.7)',
  },
  wrapper: {
    flex: 1,
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignSelf: 'center',
    backgroundColor: 'rgba(31,31,31,0.7)',
  },
  username: {
    fontSize: 18,
    padding: 12,
    color: '#5C5C5C',
    alignSelf: 'center',
  },
  rowItem: {
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowText: {
    fontSize: 16,
    color: '#5C5C5C',
  },
});