/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Button} from 'native-base';
import {useOfflineUser} from '../../hooks/useOfflineUser';

const Name = () => {
  const {userName} = useOfflineUser();
  const onPress = () => {
    return;
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 5,
        justifyContent: 'center',
      }}>
      <View
        style={{
          paddingLeft: 15,
        }}>
        <Text fontWeight="medium">NOMBRE DEL PUBLICADOR</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingVertical: 10,
          paddingLeft: 15,
          alignItems: 'center',
        }}>
        <View style={{display: 'flex', width: '80%'}}>
          <Text fontSize={15}>{userName}</Text>
        </View>
        <View style={{display: 'flex'}}>
          <Button variant="ghost" onPress={onPress}>
            Editar
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Name;
