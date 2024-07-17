/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'native-base';
import {useDarkMode} from '../../hooks/useDarkMode';

const EmptyView = ({label}: any) => {
  const {themePrimary} = useDarkMode();
  return (
    <View
      bg={themePrimary}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{label}</Text>
    </View>
  );
};

export default EmptyView;
