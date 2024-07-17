import React from 'react';
import {View} from 'react-native';
import Icon from '../svg/add-activity';
import {iconPropsType} from './types';

export default function ({size = 22, color = '#fff'}: iconPropsType) {
  return (
    <View>
      <Icon color={color} size={size} />
    </View>
  );
}
