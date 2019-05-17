/**
 * @format
 * @flow
 */

import React, { useState } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Actions, ActionConst } from 'react-native-router-flux';

type Props = {
  message: string,
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  alertStyle: {
    borderRadius: 2,
    backgroundColor: '#000',
  },
});

export default function(props: Props) {
  const { message } = props;

  return (
    <AwesomeAlert
      show={true}
      showProgress={true}
      message={message}
      overlayStyle={styles.overlay}
      closeOnTouchOutside={false}
      messageStyle={{color: '#fff'}}
      closeOnHardwareBackPress={false}
      contentContainerStyle={styles.alertStyle}
    />
  );
}