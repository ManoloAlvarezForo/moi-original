/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {ApolloProvider} from '@apollo/client';
import {
  ColorMode,
  extendTheme,
  NativeBaseProvider,
  StorageManager,
} from 'native-base';
import {useApolloClient} from './hooks';
import Main from './screens/Main/Main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PANEL_BACKGROUND_COLOR} from './WelcomePage';
import notifee, {EventType} from '@notifee/react-native';

type NativeBaseProps = {
  children: any;
  config?: any;
};

const theme = extendTheme({
  colors: {
    // ["FF7A52","FE8864","FD9677","FDA489","FCB29C","FBC0AE","FACEC1","FADCD3","F9EAE6","F8F8F8"]
    /* Array */
    // ["FF7A52","FE9373","FCAC94","FBC6B6","F9DFD7","F8F8F8"]
    // ["BB6B53","CC6F53","DD7353","EE7652","FF7A52"]

    //["FF6D00","FF7E1E","FF903C","FFA15B","FFB279","FFC497","FFD5B5"]
    //["D34318","E2552B","F0683F","FF7A52"]
    // Orange Main
    // primary: {
    //   50: '#FFDBD0',
    //   100: '#FFCBBB',
    //   200: '#FFBBA6',
    //   300: '#FFAB91',
    //   400: '#FF9A7C',
    //   500: '#FF8A67',
    //   600: '#FF7A52', //this is used
    //   700: '#F0683F',
    //   800: '#E2552B',
    //   900: '#D34318',
    // },
    // ["FF6D40","FF7E57","FF906D","FFA184","FFB29B","FFC4B1","FFD5C8"]

    primary: {
      50: '#FFD5C8',
      100: '#FFC4B1',
      200: '#FFB29B',
      300: '#FFA184',
      400: '#FF906D',
      500: '#FF7E57',
      600: '#FF6D40', //this is used
      700: '#F0683F',
      800: '#E2552B',
      900: '#D34318',
    },
    // Orange Strong ["A54902","C35501","E16101","FF6D00"]
    // primary: {
    //   50: '#FFD5B5',
    //   100: '#FFC497',
    //   200: '#FFB279',
    //   300: '#FFA15B',
    //   400: '#FF903C',
    //   500: '#FF7E1E',
    //   600: '#FF6D00', //this is used
    //   700: '#E16101',
    //   800: '#C35501',
    //   900: '#A54902',
    // },
    // Second Orange ["FF6B35","FF7847","FF8559","FF936B","FFA07D","FFAD8F","FFBAA1"]
    // ["DC3B01","E84B12","F35B24","FF6B35"]
    // primary: {
    //   50: '#FFBAA1',
    //   100: '#FFAD8F',
    //   200: '#FFA07D',
    //   300: '#FF936B',
    //   400: '#FF8559',
    //   500: '#FF7847',
    //   600: '#FF6B35', //this is used
    //   700: '#F35B24',
    //   800: '#E84B12',
    //   900: '#DC3B01',
    // },
    // Green light
    // primary: {
    //   50: '#ECFDDA',
    //   100: '#E3FDC6',
    //   200: '#D9FEB2',
    //   300: '#D0FE9E',
    //   400: '#C6FE8A',
    //   500: '#BDFF76',
    //   600: '#B3FF62', //this is used
    //   700: '#9FE357',
    //   800: '#8CC74D',
    //   900: '#78AB42',
    // },
    // Orange
    // primary: {
    //   50: '#F8F8F8',
    //   100: '#F9DFD7',
    //   200: '#FBC6B6',
    //   300: '#FCAC94',
    //   400: '#FE9373',
    //   500: '#FF7A52',
    //   600: '#EE7652', //this is used
    //   700: '#DD7353',
    //   800: '#CC6F53',
    //   900: '#BB6B53',
    // },
    // primary: {
    //   50: '#F8F8F8',
    //   100: '#F9EAE6',
    //   200: '#FADCD3',
    //   300: '#FACEC1',
    //   400: '#FBC0AE',
    //   500: '#FCB29C',
    //   600: '#FDA489',
    //   700: '#FD9677',
    //   800: '#FE8864',
    //   900: '#FF7A52',
    // },
    // primary: { // Violet
    //   50: '#f5f3ff',
    //   100: '#ede9fe',
    //   200: '#ddd6fe',
    //   300: '#c4b5fd',
    //   400: '#a78bfa',
    //   500: '#8b5cf6',
    //   600: '#7c3aed',
    //   700: '#6d28d9',
    //   800: '#5b21b6',
    //   900: '#4c1d95',
    // },
    // primary: {
    //   50: '#F8F9FA',
    //   100: '#DCF2F5',
    //   200: '#C1EAF0',
    //   300: '#A5E3EB',
    //   400: '#8ADCE6',
    //   500: '#6ED4E1',
    //   600: '#53CDDC',
    //   700: '#37C6D7',
    //   800: '#1CBED2',
    //   900: '#00B7CD',
    // },
    // primary: {
    //   50: '#F8F9FA',
    //   100: '#DCF4F4',
    //   200: '#C1EFEE',
    //   300: '#A5E9E9',
    //   400: '#8AE4E3',
    //   500: '#6EDFDD',
    //   600: '#53DAD7',
    //   700: '#37D4D2',
    //   800: '#1CCFCC',
    //   900: '#00CAC6',
    // },
    // primary: {
    //   50: '#F8F9FA',
    //   100: '#DCEFF6',
    //   200: '#C1E6F2',
    //   300: '#A5DCEE',
    //   400: '#8AD3EA',
    //   500: '#6EC9E7',
    //   600: '#53C0E3',
    //   700: '#37B6DF',
    //   800: '#1CADDB',
    //   900: '#00A3D7',
    // },
    // primary: {
    //   50: '#F8F9FA',
    //   100: '#E5E1EF',
    //   200: '#D2C8E4',
    //   300: '#BFB0D8',
    //   400: '#AC97CD',
    //   500: '#987FC2',
    //   600: '#8566B7',
    //   700: '#724EAB',
    //   800: '#5F35A0',
    //   900: '#4C1D95',
    // },
    // Redefining only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
  },
  config: {
    // baseFontSize: 16,
    // Changing initialColorMode to 'dark'
    useSystemColorMode: true,
    // initialColorMode: 'light',
  },
  // fontConfig: {
  //   Roboto: {
  //     100: {
  //       normal: 'Roboto-Light',
  //       italic: 'Roboto-LightItalic',
  //     },
  //     200: {
  //       normal: 'Roboto-Light',
  //       italic: 'Roboto-LightItalic',
  //     },
  //     300: {
  //       normal: 'Roboto-Light',
  //       italic: 'Roboto-LightItalic',
  //     },
  //     400: {
  //       normal: 'Roboto-Regular',
  //       italic: 'Roboto-Italic',
  //     },
  //     500: {
  //       normal: 'Roboto-Medium',
  //     },
  //     600: {
  //       normal: 'Roboto-Medium',
  //       italic: 'Roboto-MediumItalic',
  //     },
  //     700: {
  //       normal: 'Roboto-Bold',
  //     },
  //     800: {
  //       normal: 'Roboto-Bold',
  //       italic: 'Roboto-BoldItalic',
  //     },
  //     900: {
  //       normal: 'Roboto-Bold',
  //       italic: 'Roboto-BoldItalic',
  //     },
  //     bold: {
  //       normal: 'Roboto-Bold',
  //     },
  //   },
  // },
  // // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
    mono: 'Roboto',
  },
});

// Define the colorModeManager,
// here we are using react-native-async-storage (https://react-native-async-storage.github.io/async-storage/)
const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@color-mode', value || 'light');
    } catch (e) {
      console.log(e);
    }
  },
};

const NativeBaseWrapper = ({children, config}: NativeBaseProps) => (
  <NativeBaseProvider colorModeManager={colorModeManager} config={config}>
    {children}
  </NativeBaseProvider>
);

const App = () => {
  const {client} = useApolloClient();
  const config = {
    theme,
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          // console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          // console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  if (!client) {
    return null;
  }

  // useEffect(() => {
  //   requestNotificationPermission();
  //   if (Platform.OS === 'android') {
  //     notificationAndroid();
  //   }
  //   checkToken();
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     onDisplayNotification(remoteMessage);
  //     console.log('Foreground Message:', remoteMessage);
  //   });
  //   return unsubscribe;
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().setBackgroundMessageHandler(
  //     async remoteMessage => {
  //       onDisplayNotification(remoteMessage);
  //       console.log('Background Message:', remoteMessage);
  //     },
  //   );
  //   return unsubscribe;
  // }, []);

  return (
    <SafeAreaProvider style={{backgroundColor: PANEL_BACKGROUND_COLOR}}>
      <NativeBaseWrapper
        config={config}
        children={
          <ApolloProvider client={client}>
            <Main />
          </ApolloProvider>
        }
      />
    </SafeAreaProvider>
  );
};

export default App;
