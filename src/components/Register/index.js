/**
 * @format
 * @flow
 */

import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Image, Text,
  StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Actions, ActionConst } from 'react-native-router-flux';
import { MKTextField } from 'react-native-material-kit';
import PhoneInput from 'react-native-phone-input'
import { ApiService } from '../../api/ApiService';
import { apiKey } from '../../api/config';
import { emailValidation } from '../../utils/utils';

const logo = require('../../images/logo.png');
const { height } = Dimensions.get('window');

type Props = {};

export default function(props: Props) {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [postCode, setPostCode] = useState(null);
  const [address, setAddress] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const value = this.phone.getValue();
    const code = this.phone.getCountryCode();
    const data = {
      api_key: apiKey,
      phone_number: value,
      phone_country: code,
    };
    const params = {
      country_code: code,
      phone_number: value,
      via: 'sms',
    }

    if (!name || (name && name.trim() === '')) {
      setShowAlert(true);
      setErrMsg('Please input company name!');
      return;
    }

    if (!email || !emailValidation(email)) {
      setShowAlert(true);
      setErrMsg('Please input right email!');
      return;
    }

    if (!country || (country && country.trim() === '')) {
      setShowAlert(true);
      setErrMsg('Please input country!');
      return;
    }

    if (!city || (city && city.trim() === '')) {
      setShowAlert(true);
      setErrMsg('Please input city!');
      return;
    }

    if (!stateName || (stateName && stateName.trim() === '')) {
      setShowAlert(true);
      setErrMsg('Please input state!');
      return;
    }

    if (!postCode || (postCode && postCode.trim() === '')) {
      setShowAlert(true);
      setErrMsg('Please input postCode!');
      return;
    }

    if (!address || (address && address.trim() === '')) {
      setShowAlert(true);
      setErrMsg('Please input address!');
      return;
    }

    if (!this.phone.isValidNumber()) {
      setShowAlert(true);
      setErrMsg('Please input right phone number!');
      return;
    }

    try {
      setErrMsg('Loading...');
      setLoading(true);
      setShowAlert(true);
      const res = await new ApiService().postVerification(data, params);
      setLoading(false);
      setShowAlert(false);

      if (res) {
        const { body } = res;
        Actions.VerifyCode({
          type: ActionConst.PUSH,
          body: {
            display_name: name,
            country_code: code,
            phone_number: value,
            otp_code: body.otp_code,
            data: {
              name,
              email,
              address,
              phone: value,
            },
          },
        });
      }
      console.log('返回数据', res);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowAlert(false);
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <SafeAreaView style={styles.container}>
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
          <View style={{flexDirection: 'row'}}>
            <TextField
              text={country}
              placeholder="Country"
              onTextChange={(value) => setCountry(value)}
            />
            <TextField
              text={city}
              placeholder="City"
              onTextChange={(value) => setCity(value)}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextField
              text={stateName}
              placeholder="State"
              onTextChange={(value) => setStateName(value)}
            />
            <TextField
              text={postCode}
              placeholder="Post Code"
              onTextChange={(value) => setPostCode(value)}
            />
          </View>
          <TextField
            text={address}
            placeholder="Address"
            onTextChange={(value) => setAddress(value)}
          />
          <PhoneInput
            initialCountry="cn"
            ref={(ref) => this.phone = ref}
            style={styles.phoneInput}
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
      <AwesomeAlert
        show={showAlert}
        message={errMsg}
        showProgress={loading}
        overlayStyle={styles.overlay}
        messageStyle={{color: '#fff'}}
        closeOnTouchOutside={!loading}
        closeOnHardwareBackPress={false}
        contentContainerStyle={styles.alertStyle}
        onDismiss={() => setShowAlert(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    margin: 16,
  },
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
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  alertStyle: {
    borderRadius: 2,
    backgroundColor: '#000',
  },
});

const TextField = MKTextField.textfieldWithFloatingLabel()
  .withStyle(styles.textField)
  .withTextInputStyle({flex: 1})
  .withHighlightColor('#00D7C6')
  .withFloatingLabelFont({ fontSize: 14 })
  .build();