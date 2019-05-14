/**
 * @format
 * @flow
 */

import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, Image,
  StyleSheet, TouchableOpacity } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Actions, ActionConst } from 'react-native-router-flux';
import { ApiService } from '../../api/ApiService';

const logo = require('../../images/logo.png');

type Props = {
  body: object,
};

export default function(props: Props) {
  const { body } = props;
  console.log('参数', body);
  const submit = () => {

  }

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <SafeAreaView style={{margin: 16}}>
        <View style={styles.logoView}>
          <Image style={styles.logo} source={logo}/>
          <Text style={styles.title}>Verify OPT Code</Text>
        </View>
        <TouchableOpacity
          onPress={submit}
          activeOpacity={0.8}
          style={styles.submitButton}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 67,
    marginTop: 16,
  },
  logoView: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    marginTop: 16,
    color: 'rgba(0,0,0,0.87)',
  },
  submitButton: {
    height: 44,
    marginTop: 32,
    marginBottom: 16,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00D7C6',
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});