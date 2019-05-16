/**
 * @format
 * @flow
 */

import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Image, Text,
  StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ApiService } from '../../api/ApiService';
import { MKTextField } from 'react-native-material-kit';

type Customer = {
  name: string,
}

type Props = {
  customers: Array<Customer>,
};

export default function(props: Props) {
  // const { customers } = props;

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const printReceipt = async () => {
    console.log('Print Receipt');
  }

  return (
    <ScrollView style={{backgroundColor: '#fafafa'}}>
      <SafeAreaView style={{margin: 16}}>
        <Text style={styles.title}>Enter customer's initials</Text>
        <View style={{marginBottom: 16, flexDirection: 'row', justifyContent: 'center'}}>
          <TextField
            text={firstName}
            placeholder="F"
            onTextChange={(value) => setFirstName(value)}
          />
          <TextField
            text={lastName}
            placeholder="L"
            onTextChange={(value) => setLastName(value)}
          />
        </View>
        <View style={styles.rowItem}>
          <Text>Chacha Chou</Text>
        </View>
        <View style={styles.rowItem}>
          <Text>Chacha Chou</Text>
        </View>
        <View style={styles.rowItem}>
          <Text>Chacha Chou</Text>
        </View>
        <View style={styles.rowItem}>
          <Text>Chacha Chou</Text>
        </View>
        <View style={styles.rowItem}>
          <Text>Chacha Chou</Text>
        </View>
        <View style={styles.rowItem}>
          <Text>Chacha Chou</Text>
        </View>
        <View style={styles.rowItem}>
          <Text>Chacha Chou</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.87)',
  },
  rowItem: {
    height: 50,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    backgroundColor: '#fff',
  },
  textField: {
    width: 120,
    height: 48,
    marginTop: 16,
    marginLeft: 6,
    marginRight: 6,
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    backgroundColor: '#fff',
  },
});

const TextField = MKTextField.textfield()
  .withStyle(styles.textField)
  .withTextInputStyle({flex: 1, textAlign: 'center'})
  .withHighlightColor('#00D7C6')
  .build();