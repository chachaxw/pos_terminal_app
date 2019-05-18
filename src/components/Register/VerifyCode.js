/**
 * @format
 * @flow
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import AwesomeAlert from 'react-native-awesome-alerts';
import { View, Text, Image, StyleSheet } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import { ApiService } from '../../api/ApiService';
import { AUTHORIZE } from '../../actions';

const logo = require('../../images/logo.png');

type Props = {
  body: object,
};

function VerifyCode(props: Props) {
  let { body } = props;
  const codeLength = 4;
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const checkCode = async (value) => {
    console.log('Check Code', value);
    if (value.length === codeLength) {
      body = {
        ...body,
        otp_code: value,
      };
  
      try {
        console.log('Request body', body);
        setLoading(true);
        const res = await new ApiService().postProfile(body);
        setLoading(false);
        console.log('VerifyCode response', res);
  
        if (res) {
          authorize();
        }
      } catch (err) {
        console.log(err.response);
        setLoading(false);
        Toast.show(err.message, {
          duration: Toast.durations.LONG,
          position: 0,
        });
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
	};
}

export default connect(mapDispatchToProps)(VerifyCode);

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