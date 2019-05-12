/**
 * @format
 * @flow
 */

import React from 'react';
import { ScrollView, SafeAreaView, View, Image, Text,
  StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MKTextField, MKColor } from 'react-native-material-kit';

const logo = require('../../images/logo.png');

type Props = {};

export default function(props: Props) {

  const submit = () => {
    console.log('Submit');
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <SafeAreaView style={{margin: 16}}>
        <View style={styles.logoView}>
          <Image style={styles.logo} source={logo}/>
          <Text style={styles.title}>Register Account</Text>
        </View>
        <View>
          <TextField />
          <TouchableOpacity
            onPress={submit}
            activeOpacity={0.8}
            style={styles.submitButton}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
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
    flex: 1,
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
    marginTop: 16,
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
  textField: {
    height: 48,  // have to do it on iOS
    marginTop: 16,
  },
});

const TextField = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Company Name')
  .withStyle(styles.textField)
  .withTextInputStyle({flex: 1})
  .withHighlightColor(MKColor.Teal)
  .withFloatingLabelFont({ fontSize: 14 })
  .build();