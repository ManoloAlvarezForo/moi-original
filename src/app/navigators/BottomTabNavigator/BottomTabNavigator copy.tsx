/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RecordScreen from '../../screens/Record';
import SettingsScreen from '../../screens/Settings';
import HomeScreen from '../../screens/Home';
import ReportsScreen from '../../screens/Reports';
import SettingsIcon from '../../svg/settings-outline';
import RegisterIcon from '../../svg/create-outline';
import HomeIcon from '../../svg/home-outline';
import ReaderIcon from '../../svg/reader-outline';
import {APP_COLORS, REPORT_COLORS} from '../../themes/colors';
import {useDarkMode} from '../../hooks/useDarkMode';

const DEFAULT_MAIN_COLOR = APP_COLORS.main;
const DEFAULT_MAIN_COLOR_INACTIVE = APP_COLORS.inactive;
const DEFAULT_TAB_BAR_FONT_SIZE = 13;
// const DEFAULT_FONT_WEIGHT = '500';
// TODO: add a font family for the app.
// const DEFAULT_FONT_FAMILY = '';
const DEFAULT_ANDROID_TAB_BAR_HEIGHT = 56;
const DEFAULT_IOS_TAB_BAR_HEIGHT = 80;
const DEFAULT_TAB_BAR_ICON_SIZE = 28;

const Tab = createBottomTabNavigator();
const heightBar =
  Platform.OS === 'android'
    ? DEFAULT_ANDROID_TAB_BAR_HEIGHT
    : DEFAULT_IOS_TAB_BAR_HEIGHT;

const BottomTabNavigator = () => {
  const {themeSecondary, isDark} = useDarkMode();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: themeSecondary,
          height: heightBar,
          borderTopColor: isDark ? themeSecondary : APP_COLORS.appGray,
          // borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarButton: (props: any) => (
            <TouchableOpacity activeOpacity={0.5} {...props} />
          ),
          headerShown: false,
          tabBarLabel: 'Inicio',
          tabBarIcon: ({color}) => (
            <HomeIcon size={DEFAULT_TAB_BAR_ICON_SIZE} color={color} />
          ),
          tabBarActiveTintColor: !isDark
            ? DEFAULT_MAIN_COLOR
            : REPORT_COLORS.bibleStudies,
          tabBarInactiveTintColor: DEFAULT_MAIN_COLOR_INACTIVE,
          tabBarLabelStyle: {
            fontSize: DEFAULT_TAB_BAR_FONT_SIZE,
            // fontWeight: DEFAULT_FONT_WEIGHT,
          },
        }}
      />
      <Tab.Screen
        name="RecordScreen"
        component={RecordScreen}
        options={{
          tabBarButton: (props: any) => (
            <TouchableOpacity activeOpacity={0.5} {...props} />
          ),
          headerShown: false,
          tabBarLabel: 'Registro',
          tabBarIcon: ({color}) => (
            <RegisterIcon size={DEFAULT_TAB_BAR_ICON_SIZE} color={color} />
          ),
          tabBarActiveTintColor: !isDark
            ? DEFAULT_MAIN_COLOR
            : REPORT_COLORS.bibleStudies,
          tabBarInactiveTintColor: DEFAULT_MAIN_COLOR_INACTIVE,
          tabBarLabelStyle: {
            fontSize: DEFAULT_TAB_BAR_FONT_SIZE,
            // fontWeight: DEFAULT_FONT_WEIGHT,
          },
        }}
      />
      <Tab.Screen
        name="ReportsScreen"
        component={ReportsScreen}
        options={{
          tabBarButton: (props: any) => (
            <TouchableOpacity activeOpacity={0.5} {...props} />
          ),
          headerShown: false,
          tabBarLabel: 'Informes',
          tabBarIcon: ({color}) => (
            <ReaderIcon size={DEFAULT_TAB_BAR_ICON_SIZE} color={color} />
          ),
          tabBarActiveTintColor: !isDark
            ? DEFAULT_MAIN_COLOR
            : REPORT_COLORS.bibleStudies,
          tabBarInactiveTintColor: DEFAULT_MAIN_COLOR_INACTIVE,
          tabBarLabelStyle: {
            fontSize: DEFAULT_TAB_BAR_FONT_SIZE,
            // fontWeight: DEFAULT_FONT_WEIGHT,
          },
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarButton: (props: any) => (
            <TouchableOpacity activeOpacity={0.5} {...props} />
          ),
          headerShown: false,
          tabBarLabel: 'Ajustes',
          tabBarIcon: ({color}) => (
            <SettingsIcon size={DEFAULT_TAB_BAR_ICON_SIZE} color={color} />
          ),
          tabBarActiveTintColor: !isDark
            ? DEFAULT_MAIN_COLOR
            : REPORT_COLORS.bibleStudies,
          tabBarInactiveTintColor: DEFAULT_MAIN_COLOR_INACTIVE,
          tabBarLabelStyle: {
            fontSize: DEFAULT_TAB_BAR_FONT_SIZE,
            // fontWeight: DEFAULT_FONT_WEIGHT,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
