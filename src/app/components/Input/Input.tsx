import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const Input = ({style, ...props}) => {
  return <TextInput {...props} style={[styles.input, style]} />;
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#e8e8e8',
    width: '100%',
    borderRadius: 8,
    padding: 13,
    fontSize: 16,
  },
});

export default Input;
