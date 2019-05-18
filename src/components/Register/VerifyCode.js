/**
 * @format
 * @flow
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Actions, ActionConst } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import { ApiService } from '../../api/ApiService';
import { AUTHORIZE } from '../../actions';

const logo = require('../../images/logo.png');

type Props = {
  body: object,
};

function VerifyCode(props: Props) {
  const { body } = props;
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('参数', body);

  const checkCode = async () => {
    if (!body || code.length != 4) {
      this.pinInput.shake().then(() => setCode(''));
      return;
    }

    try {
      setLoading(true);
      const res = await new ApiService().postProfile(body);
      setLoading(false);
      if (res) {
        authorize();
        Actions.MainScreen({
          type: ActionConst.PUSH,
        });
      }
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <Image style={styles.logo} source={logo}/>
        <Text style={styles.title}>Verify OPT Code</Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 100}}>
        <SmoothPinCodeInput
          value={code}
          cellSpacing={20}
          ref={(ref) => this.pinInput = ref}
          onTextChange={code => setCode(code)}
          onFulfill={checkCode}
          cellStyle={styles.cellStyle}
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