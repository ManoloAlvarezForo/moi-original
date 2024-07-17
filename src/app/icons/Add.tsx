import React from 'react';
import {View} from 'react-native';
import AddIcon from '../svg/plus_icon';

interface iconProps {
  size?: number;
  color?: string;
}

export default function ({size = 22, color = '#fff'}: iconProps) {
  return (
    <View>
      <AddIcon color={color} size={size} />
    </View>
  );
}
