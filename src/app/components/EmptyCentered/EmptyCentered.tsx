import React from 'react';
import {View, Text} from 'native-base';
import {StyleSheet} from 'react-native';

type EmptyCentered = {
  label: string;
};

const EmptyCentered: React.FC<EmptyCentered> = ({label}: EmptyCentered) => {
  return (
    <View style={style.main}>
      <Text>{label}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  main: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default EmptyCentered;
