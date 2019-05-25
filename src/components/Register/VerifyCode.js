/**
 * @format
 * @flow
 */

import nacl from 'tweetnacl';
import { Buffer } from 'buffer';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import ab2str from 'arraybuffer-to-string';
import Toast from 'react-native-root-toast';
import AwesomeAlert from 'react-native-awesome-alerts';
import { View, Text, Image, StyleSheet } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import RNSecureKeyStore from "react-native-secure-key-store";

import { publicKey } from '../../api/config';
import { ApiService } from '../../api/ApiService';
import { decode, encode } from '../../utils/utils';
import AxiosInstance from '../../api/AxiosInstance';
import { AUTHORIZE, GENERATE_KEY } from '../../actions';

const logo = require('../../images/logo.png');
const toastOptions = {
  opacity: 1,
  position: 0,
  shadow: false,
  backgroundColor: '#000',
  duration: Toast.durations.SHORT,
};

type Props = {
  body: any,
  authorize: () => void,
  generateKey: (keyPair: any) => void,
};

function VerifyCode(props: Props) {
  let { body, authorize, generateKey } = props;
  const codeLength = 4;
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const checkCode = async (value) => {
    if (value.length === codeLength) {
      const keyPair = nacl.sign.keyPair();
      // const result = await storeKey('secret_key', keyPair.publicKey);
      // AxiosInstance.defaults.headers = {
      //   api_key: keyPair.secretKey,
      //   public_key: keyPair.publicKey,
      // };
      console.log(ab2str(new Buffer.from(keyPair.publicKey)));

      body.append('otp_code', value);

      try {
        console.log('Request body', body);
        setLoading(true);
        const res = await new ApiService().postProfile(body);
        setLoading(false);
        console.log('VerifyCode response', res);
  
        if (res) {
          const uuid = body.get('device_uuid');
          const otpRes = await new ApiService().getOtp(uuid);
          const pinCode = otpRes.data.pin_code;
          const data = nacl.sign.open(pinCode, publicKey);
          const tokenRes = await new ApiService().getToken(body.device_uuid, data);
          console.log('Request body', tokenRes);
          authorize();
        }
      } catch (err) {
        setLoading(false);
        console.log(err.response);
        const res = err.response;
        const message = (res && res.data.message) || err.message;
        Toast.show(message, toastOptions);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <Image style={styles.logo} source={logo}/>
        <Text style={styles.title}>Verify OTP Code</Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 100}}>
        <SmoothPinCodeInput
          value={code}
          cellSpacing={20}
          onFulfill={checkCode}
          codeLength={codeLength}
          cellStyle={styles.cellStyle}
          ref={(ref) => this.pinInput = ref}
          onTextChange={code => setCode(code)}
          cellStyleFocused={styles.cellStyleFocused}
        />
      </View>
      <AwesomeAlert
        show={loading}
        showProgress={true}
        message="Verifying"
        overlayStyle={styles.overlay}
        closeOnTouchOutside={false}
        messageStyle={{color: '#fff'}}
        closeOnHardwareBackPress={false}
        contentContainerStyle={styles.alertStyle}
        onDismiss={() => setLoading(false)}
      />
    </View>
  );
}

function mapDispatchToProps(dispatch) {
	return {
		authorize: () => {
      dispatch({
        type: AUTHORIZE,
        isAuthenticated: true,
      });
    },
    generateKey: (keyPair) => {
      dispatch({
        type: GENERATE_KEY,
        keyPair,
      });
    },
	};
}

async function storeKey(key, value) {
  // For storing key
  try {
    const res = await RNSecureKeyStore.set(key, value);
    console.log('存储成功', res);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export default connect(null, mapDispatchToProps)(VerifyCode);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    marginTop: 100,
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
  cellStyle: {
    borderWidth: 2,
    borderRadius: 2,
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.08,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 1 },
  },
  cellStyleFocused: {
    borderWidth: 2,
    borderColor: '#00D7C6',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  alertStyle: {
    borderRadius: 2,
    backgroundColor: '#000',
  },
});