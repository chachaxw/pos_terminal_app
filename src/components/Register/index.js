/**
 * @format
 * @flow
 */

import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Image, Text,
  StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MKTextField } from 'react-native-material-kit';
import PhoneInput from 'react-native-phone-input'
import { ApiService } from '../../api/ApiService';
import { apiKey } from '../../api/config';

const logo = require('../../images/logo.png');

type Props = {};

export default function(props: Props) {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);

  const submit = async () => {
    console.log('Submit', this.phone);
    const code = this.phone.state.formattedNumber;
    const data = {
      api_key: apiKey,
      phone_number: value,
      phone_country: code,
    };
    try {
      console.log(data);
      const res = await new ApiService().postVerification(data);
      console.log(res);
    } catch (error) {
      
    }
  };

  const selectCountry = (country) => {
    // const code = this.phone.selectCountry(country);
    const code = this.phone.state.formattedNumber;
    setCountryCode(code);
    console.log(this.phone);
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <SafeAreaView style={{margin: 16}}>
        <View style={styles.logoView}>
          <Image style={styles.logo} source={logo}/>
          <Text style={styles.title}>Register Account</Text>
        </View>
        <View>
          <TextField
            text={name}
            placeholder="Company Name"
            onTextChange={(value) => setName(value)}
          />
          <TextField
            text={email}
            placeholder="Email"
            onTextChange={(value) => setEmail(value)}
          />
          <PhoneInput
            initialCountry="cn"
            ref={(ref) => this.phone = ref}
            style={styles.phoneInput}
          />
          <TextField
            text={address}
            placeholder="Address"
            onTextChange={(value) => setAddress(value)}
          />
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
  textField: {
    height: 48,  // have to do it on iOS
    marginTop: 16,
  },
  phoneInput: {
    height: 48,
    marginTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderColor: '#E0E0E0',
  }
});

const TextField = MKTextField.textfieldWithFloatingLabel()
  .withStyle(styles.textField)
  .withTextInputStyle({flex: 1})
  .withHighlightColor('#00D7C6')
  .withFloatingLabelFont({ fontSize: 14 })
  .build();