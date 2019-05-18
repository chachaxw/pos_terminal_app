/**
 * @format
 * @flow
 */

import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text,
  StyleSheet, TouchableOpacity } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { ApiService } from '../../api/ApiService';
import { MKTextField } from 'react-native-material-kit';

type Customer = {
  name: string,
}

const customers = [
  {name: 'Chacha Chou'},
  {name: 'Chacha Chou'},
  {name: 'Chacha Chou'},
  {name: 'Chacha Chou'},
  {name: 'Chacha Chou'},
  {name: 'Chacha Chou'},
  {name: 'Chacha Chou'},
  {name: 'Chacha Chou'},
  {name: 'Chacha Chou'},
];

type Props = {
  customers: Array<Customer>,
};

export default function(props: Props) {
  // const { customers } = props;

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const select = async (item) => {
    console.log('Photo Identity', item);
    Actions.PhotoIdentity({type: ActionConst.PUSH, name: 'Chacha Chou'});
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
        <View>
          {customers && customers.length > 0 ?
            customers.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  style={styles.rowItem}
                  onPress={() => select(item)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              );
            }) : null
          }
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