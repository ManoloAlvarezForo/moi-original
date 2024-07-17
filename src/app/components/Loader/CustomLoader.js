import {HStack, Spinner} from 'native-base';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoaderComponent = () => {
  return (
    <HStack space={8} justifyContent="center" alignItems="center">
      <Spinner size="lg" />
    </HStack>
  );
};

const Loader = () => (
  <View style={[styles.container, styles.horizontal]}>
    <LoaderComponent />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Loader;
