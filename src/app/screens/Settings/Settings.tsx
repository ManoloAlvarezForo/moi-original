/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Divider, ScrollView} from 'native-base';
import {useDarkMode} from '../../hooks/useDarkMode';
import Display from './Display';
import Name from './Name';

const Settings: React.FC = () => {
  const {themePrimary} = useDarkMode();
  return (
    <ScrollView bg={themePrimary}>
      <Display />
      <Divider
        my="2"
        _light={{
          bg: 'dark.600',
        }}
        _dark={{
          bg: 'gray.600',
        }}
      />
      <Name />
      <Divider
        my="2"
        _light={{
          bg: 'dark.600',
        }}
        _dark={{
          bg: 'gray.600',
        }}
      />
    </ScrollView>
  );
};

export default Settings;
