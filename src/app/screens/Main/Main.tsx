import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStackNavigator from '../../navigators/Authentication';
// import {useAuth} from '../../hooks/useAuth';
import Main from '../../navigators/BottomTabNavigator';
// import {AuthContext} from '../../contexts/AuthContext';
import {APP_COLORS} from '../../themes/colors';
import PickerScreen from '../../screens/Picker';
// import CreateActivity from '../CreateActivity';
import RevisitScreenModal from '../RevisitForm/RevisitScreenModal';
import InitialPage from '../../InitialPage';
import {useQuery} from '@apollo/client';
import {GET_USER} from '../Reports/gqlQueries';
import {useDarkMode} from '../../hooks/useDarkMode';
import CreateActivityScreenModal from '../CreateActivity/CreateActivityScreenModal';
import {PANEL_BACKGROUND_COLOR} from '../../WelcomePage';
import BibleStudyScreenModal from '../BibleStudyForm/BibleStudyScreenModal';

const INITIAL_PAGE_TIME_DELAY = 500;

export type RootStackParamList = {
  Home: undefined;
  Picker: undefined;
  InitialPage: undefined;
  RootStack: undefined;
  CreateBibleStudy: undefined;
  CreateRevisit: undefined;
  AuthStack: undefined;
  NewActivity: {
    activityId: string;
  };
  CreateActivity: {
    activityId: string;
  };
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function () {
  const [delay, setDelay] = useState(true);
  const {data} = useQuery(GET_USER, {
    fetchPolicy: 'cache-only',
    notifyOnNetworkStatusChange: true,
  });

  const {themeSecondary, isDark} = useDarkMode();

  setTimeout(() => {
    setDelay(false);
  }, INITIAL_PAGE_TIME_DELAY);

  function renderScreens() {
    // if (delay) {
    //   return <RootStack.Screen name={'InitialPage'} component={InitialPage} />;
    // }
    // TODO: If we want, we can add more screens to show them out the BottomTabNavigation
    return data?.user ? (
      <>
        <RootStack.Group>
          <RootStack.Screen name={'RootStack'} component={Main} />
        </RootStack.Group>
        <RootStack.Group screenOptions={{presentation: 'modal'}}>
          <RootStack.Screen
            name="CreateActivity"
            component={CreateActivityScreenModal}
          />
          <RootStack.Screen
            name="Picker"
            component={PickerScreen}
            options={{
              headerShown: false,
              headerTitleStyle: {color: APP_COLORS.lightText},
              headerStyle: {backgroundColor: APP_COLORS.dark},
            }}
          />
          <RootStack.Screen
            name="CreateBibleStudy"
            component={BibleStudyScreenModal}
          />
          <RootStack.Screen
            name="CreateRevisit"
            component={RevisitScreenModal}
          />
        </RootStack.Group>
      </>
    ) : (
      <RootStack.Group>
        <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
      </RootStack.Group>
    );
  }

  const renderMain = () => {
    return (
      <>
        <StatusBar
          backgroundColor={themeSecondary}
          barStyle={isDark ? 'light-content' : 'dark-content'}
        />
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {renderScreens()}
        </RootStack.Navigator>
      </>
    );
  };

  const renderDelay = () => {
    return (
      <>
        <StatusBar
          backgroundColor={PANEL_BACKGROUND_COLOR}
          barStyle="light-content"
        />
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <RootStack.Screen name={'InitialPage'} component={InitialPage} />
        </RootStack.Navigator>
      </>
    );
  };

  return (
    <NavigationContainer>
      {delay ? renderDelay() : renderMain()}
    </NavigationContainer>
  );
}
