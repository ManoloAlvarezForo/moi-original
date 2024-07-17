import React from 'react';
import {View} from 'react-native';
import Icon from '../svg/person-add-outline';

interface iconProps {
  size?: number;
  color?: string;
}

export default function ({size = 24, color = '#fff'}: iconProps) {
  return (
    <View style={{width: size, height: size}}>
      <Icon color={color} size={size} />
    </View>
  );
}
