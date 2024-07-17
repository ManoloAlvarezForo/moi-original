import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function AuthContainer({children, style}: any) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 20,
    // flex: 1,
    // padding: 16,
    // paddingTop: 120,
    // alignItems: 'center',
    // backgroundColor: '#333333',
  },
});
