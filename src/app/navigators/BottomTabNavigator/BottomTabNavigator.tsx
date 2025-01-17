import React, {useMemo} from 'react';
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
import {APP_COLORS} from '../../themes/colors';
import {useDarkMode} from '../../hooks/useDarkMode';
import {useTheme} from 'native-base';

// const DEFAULT_MAIN_COLOR_INACTIVE = APP_COLORS.inactive;
const DEFAULT_TAB_BAR_FONT_SIZE = 12;
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

const getTabs = (active: any, inactive: any) => {
  return [
    {
      name: 'HomeScreen',
      component: HomeScreen,
      options: {
        tabBarButton: (props: any) => (
          <TouchableOpacity activeOpacity={0.5} {...props} />
        ),
        headerShown: false,
        tabBarLabel: 'Inicio',
        tabBarIcon: ({color}: any) => (
          <HomeIcon size={DEFAULT_TAB_BAR_ICON_SIZE} color={color} />
        ),
        tabBarActiveTintColor: active,
        tabBarInactiveTintColor: inactive,
        tabBarLabelStyle: {
          fontSize: DEFAULT_TAB_BAR_FONT_SIZE,
        },
      },
    },
    {
      name: 'RecordScreen',
      component: RecordScreen,
      options: {
        tabBarButton: (props: any) => (
          <TouchableOpacity activeOpacity={0.5} {...props} />
        ),
        headerShown: false,
        tabBarLabel: 'Registro',
        tabBarIcon: ({color}: any) => (
          <RegisterIcon size={DEFAULT_TAB_BAR_ICON_SIZE} color={color} />
        ),
        tabBarActiveTintColor: active,
        tabBarInactiveTintColor: inactive,
        tabBarLabelStyle: {
          fontSize: DEFAULT_TAB_BAR_FONT_SIZE,
        },
      },
    },
    {
      name: 'ReportsScreen',
      component: ReportsScreen,
      options: {
        tabBarButton: (props: any) => (
          <TouchableOpacity activeOpacity={0.5} {...props} />
        ),
        headerShown: false,
        tabBarLabel: 'Informes',
        tabBarIcon: ({color}: any) => (
          <ReaderIcon size={DEFAULT_TAB_BAR_ICON_SIZE} color={color} />
        ),
        tabBarActiveTintColor: active,
        tabBarInactiveTintColor: inactive,
        tabBarLabelStyle: {
          fontSize: DEFAULT_TAB_BAR_FONT_SIZE,
        },
      },
    },
    {
      name: 'SettingsScreen',
      component: SettingsScreen,
      options: {
        tabBarButton: (props: any) => (
          <TouchableOpacity activeOpacity={0.5} {...props} />
        ),
        headerShown: false,
        tabBarLabel: 'Ajustes',
        tabBarIcon: ({color}: any) => (
          <SettingsIcon size={DEFAULT_TAB_BAR_ICON_SIZE} color={color} />
        ),
        tabBarActiveTintColor: active,
        tabBarInactiveTintColor: inactive,
        tabBarLabelStyle: {
          fontSize: DEFAULT_TAB_BAR_FONT_SIZE,
        },
      },
    },
  ];
};

const BottomTabNavigator = () => {
  const {themeSecondary, isDark} = useDarkMode();
  const theme = useTheme();
  const active = theme.colors.primary[600];
  const inactive = isDark ? theme.colors.gray[400] : theme.colors.gray[600];

  const tabs = useMemo(() => {
    return getTabs(active, inactive);
  }, [active, inactive]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: 3,
          paddingBottom: Platform.OS === 'ios' ? 30 : 5,
          backgroundColor: themeSecondary,
          height: heightBar,
          borderTopColor: isDark ? themeSecondary : APP_COLORS.appGray,
        },
      }}>
      {tabs.map((tab, idx) => {
        const {name, component, options} = tab;
        return (
          <Tab.Screen
            key={idx}
            name={name}
            component={component}
            options={options}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
