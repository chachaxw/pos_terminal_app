/**
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

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
      message={message}
      showProgress={true}
      overlayStyle={styles.overlay}
      closeOnTouchOutside={false}
      messageStyle={{color: '#fff'}}
      closeOnHardwareBackPress={false}
      contentContainerStyle={styles.alertStyle}
    />
  );
}