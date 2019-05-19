/**
 * @format
 * @flow
 */

import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Image, Text,
  StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Toast from 'react-native-root-toast';
import DeviceInfo from 'react-native-device-info';
import { Actions, ActionConst } from 'react-native-router-flux';
import { MKTextField } from 'react-native-material-kit';
import PhoneInput from 'react-native-phone-input'
import { ApiService } from '../../api/ApiService';
import { apiKey } from '../../api/config';
import { emailValidation } from '../../utils/utils';

const logo = require('../../images/logo.png');
const { height } = Dimensions.get('window');
const uuid = DeviceInfo.getUniqueID();
const toastOptions = {
  opacity: 1,
  position: 0,
  shadow: false,
  backgroundColor: '#000',
  duration: Toast.durations.SHORT,
};

type Props = {};

export default function(props: Props) {
  const [name, setName] = useState('Chacha Chou');
  const [email, setEmail] = useState('867571123@qq.com');
  const [country, setCountry] = useState('China');
  const [city, setCity] = useState('ShenZhen');
  const [stateName, setStateName] = useState('FuTian');
  const [postCode, setPostCode] = useState('518000');
  const [address, setAddress] = useState('JianYe');
  const [showAlert, setShowAlert] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  const submit = async () => {
    const value = this.phone.getValue().replace(`+${code}`, '');
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
      Toast.show('Please input company name!', toastOptions);
      return;
    }

    if (!email || !emailValidation(email)) {
      Toast.show('Please input email!', toastOptions);
      return;
    }

    if (!country || (country && country.trim() === '')) {
      Toast.show('Please input country!', toastOptions);
      return;
    }

    if (!city || (city && city.trim() === '')) {
      Toast.show('Please input city!', toastOptions);
      return;
    }

    if (!stateName || (stateName && stateName.trim() === '')) {
      Toast.show('Please input state!', toastOptions);
      return;
    }

    if (!postCode || (postCode && postCode.trim() === '')) {
      Toast.show('Please input postCode!', toastOptions);
      return;
    }

    if (!address || (address && address.trim() === '')) {
      Toast.show('Please input address!', toastOptions);
      return;
    }

    if (!this.phone.isValidNumber()) {
      Toast.show('Please input right phone number!', toastOptions);
      return;
    }

    try {
      setErrMsg('Registering...');
      setShowAlert(true);
      const res = await new ApiService().postVerification(data, params);
      setShowAlert(false);

      if (res) {
        Actions.VerifyCode({
          type: ActionConst.PUSH,
          body: {
            display_name: name,
            country_code: code,
            phone_number: value,
            device_uuid: uuid,
            data: {
              name,
              email,
              address,
              phone: value,
            },
          },
        });
      }
    } catch (err) {
      setShowAlert(false);
      const res = err.response;
      const message = res.data.message || err.message;
      Toast.show(message, toastOptions);
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
            value={name}
            placeholder="Company Name"
            onTextChange={(value) => setName(value)}
          />
          <TextField
            value={email}
            placeholder="Email"
            onTextChange={(value) => setEmail(value)}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextField
              value={country}
              placeholder="Country"
              style={styles.textFieldHalf}
              onTextChange={(value) => setCountry(value)}
            />
            <TextField
              value={city}
              placeholder="City"
              style={styles.textFieldHalf}
              onTextChange={(value) => setCity(value)}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextField
              value={stateName}
              placeholder="State"
              style={styles.textFieldHalf}
              onTextChange={(value) => setStateName(value)}
            />
            <TextField
              value={postCode}
              placeholder="Post Code"
              style={styles.textFieldHalf}
              onTextChange={(value) => setPostCode(value)}
            />
          </View>
          <TextField
            value={address}
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
        showProgress={true}
        overlayStyle={styles.overlay}
        messageStyle={{color: '#fff'}}
        closeOnTouchOutside={false}
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
  textFieldHalf: {
    flex: 1,
    height: 48,
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