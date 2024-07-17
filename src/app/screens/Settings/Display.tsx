/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Switch, Text, useColorMode, View, Pressable} from 'native-base';
import {useDarkMode} from '../../hooks/useDarkMode';
import {Platform} from 'react-native';

const Display = () => {
  const {isDark} = useDarkMode();
  const [pressed, setPressed] = useState(isDark);
  const {toggleColorMode} = useColorMode();

  const onPress = () => {
    setPressed(!pressed);
    toggleColorMode();
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 5,
        paddingBottom: 5,
      }}>
      <View
        style={{
          paddingLeft: 15,
        }}>
        <Text fontWeight="medium">PANTALLA</Text>
      </View>
      <Pressable
        onPress={onPress}
        delayLongPress={1000000}
        _pressed={{backgroundColor: isDark ? 'gray.500' : 'dark.700'}}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          paddingVertical: 15,
          paddingLeft: 15,
        }}>
        <View style={{display: 'flex', width: '80%'}}>
          <Text fontSize={15}>Modo Oscuro</Text>
        </View>
        <View style={{display: 'flex', width: '20%', paddingRight: 10}}>
          <Switch
            isChecked={pressed}
            onToggle={onPress}
            size={Platform.OS === 'ios' ? 'sm' : 'md'}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default Display;
