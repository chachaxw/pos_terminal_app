/**
 * @format
 * @flow
 */

import React from 'react';
import { ScrollView, SafeAreaView, View, Image, Text,
  StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

type OrderItem = {
  name: string,
  description: string,
  quantity: number,
  price: string,
}

type Props = {
  storename: string,
  date: string,
  time: string,
  orderNo: string,
  subtotal: string,
  total: string,
  tax: string,
  items: Array<OrderItem>,
};

export default function(props: Props) {

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <SafeAreaView style={{margin: 16}}>
        <View style={styles.receipt}>
          <View style={styles.rowItem}></View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  receipt: {
    paddingLeft: 16,
    paddingRight: 16,
    borderTopWidth: 6,
    borderColor: '#00D7C6',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 4 },
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.87)',
  },
  button: {
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
  rowItem: {
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
  },
});