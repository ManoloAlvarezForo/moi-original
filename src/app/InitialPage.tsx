import {View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import MoiLogo from '../app/svg/moi-logo-3';
import {PANEL_BACKGROUND_COLOR} from './WelcomePage';
import {StatusBar} from 'react-native';
import {useDarkMode} from './hooks/useDarkMode';

const InitialPage = () => {
  const {isDark} = useDarkMode();
  return (
    <>
      <StatusBar backgroundColor={isDark ? PANEL_BACKGROUND_COLOR : '#ffff'} />
      <View
        _dark={{backgroundColor: PANEL_BACKGROUND_COLOR}}
        _light={{backgroundColor: '#ffff'}}
        style={styles.container}>
        <MoiLogo height={200} width={200} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default InitialPage;
