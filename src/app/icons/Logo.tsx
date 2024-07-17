import React from 'react';
import {View} from 'react-native';
import Logo from '../svg/moi_logo';

export default function (size: number) {
  return (
    <View>
      <Logo size={size} />
    </View>
  );
}
