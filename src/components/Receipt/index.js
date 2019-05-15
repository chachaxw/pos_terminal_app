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
  storeName: string,
  date: string,
  time: string,
  orderNo: string,
  subtotal: string,
  total: string,
  tax: string,
  items: Array<OrderItem>,
};

const mockItems = [
  {
    name: 'Product 1',
    quantity: 1,
    price: '$3.00',
  },
  {
    name: 'Product 2',
    quantity: 1,
    price: '$4.50',
  },
  {
    name: 'Product 3',
    quantity: 1,
    price: '$3.50',
  },
  {
    name: 'Product 4',
    quantity: 1,
    price: '$5.50',
  },
];

export default function(props: Props) {
  const { storeName, date, time, orderNo, subtotal, total, tax, items } = props;

  const printReceipt = async () => {
    console.log('Print Receipt');
  }

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <SafeAreaView style={{margin: 16}}>
        <View style={styles.receipt}>
          <View style={Object.assign({}, styles.rowItem, {alignItems: 'baseline'})}>
            <Text style={styles.storeName}>{storeName || 'Test Store'}</Text>
            <Text>{date || '15 May 2019  11:00pm'}</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Order #</Text>
            <Text>{orderNo || '01234567890'}</Text>
          </View>
          <View style={{marginBottom: 16}}>
            {mockItems && mockItems.length > 0 ?
              mockItems.map((item: OrderItem) => {
                return (
                  <View style={styles.rowItem}>
                    <View style={{alignItems: 'flex-start'}}>
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      <Text style={styles.label}>{item.name}</Text>
                    </View>
                    <Text style={styles.price}>{item.price}</Text>
                  </View>
                );
              }) : null
            }
          </View>
          <View style={styles.receiptItem}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.price}>{subtotal || '$15.0'}</Text>
          </View>
          <View style={styles.receiptItem}>
            <Text style={styles.label}>Tax</Text>
            <Text style={styles.price}>{tax || '$1.50'}</Text>
          </View>
          <View style={styles.receiptItem}>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.price}>{total || '$16.50'}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={printReceipt}
          activeOpacity={0.8}
          style={Object.assign({}, styles.button, {backgroundColor: 'black'})}
        >
          <Text style={styles.buttonText}>Print Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={printReceipt}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Charge Customer</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  receipt: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 50,
    borderTopWidth: 6,
    marginBottom: 32,
    borderColor: '#00D7C6',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.08,
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
    marginBottom: 16,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00D7C6',
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 1 },
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  rowItem: {
    marginTop: 8,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.87)',
  },
  label: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.54)',
  },
  quantity: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.87)',
  },
  price: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.87)',
  },
  receiptItem: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});