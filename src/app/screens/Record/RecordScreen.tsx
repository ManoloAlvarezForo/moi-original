import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Record from './Record';
// TODO: ActivitiesCalendar is an alternative UI to show the activities in the calendar.
// import Activities from './ActivitiesCalendar';
// import {APP_COLORS} from '../../themes/colors';
import moment from 'moment';
import {useOfflineReport} from '../../hooks/useOfflineReport';
import HeaderTitle from '../Home/HeaderTitle';
import {useDarkMode} from '../../hooks/useDarkMode';

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => {
  const {themeSecondary} = useDarkMode();
  const {getDefaultReport}: any = useOfflineReport();
  const defaultReport = getDefaultReport();

  let title = '';

  if (defaultReport) {
    const monthParsed = moment(defaultReport?.month, 'M').format('MMMM');
    const capitalizedMonth =
      monthParsed.charAt(0).toUpperCase() + monthParsed.slice(1);
    const yearParsed = moment(defaultReport?.year, 'Y').format('YYYY');
    title = `${capitalizedMonth} ${yearParsed}`;
  }

  const headerTitle = () => (
    <HeaderTitle title={title} showUser={false} subTitle="Registro" />
  );

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={'Record'}
        component={Record}
        options={{
          headerTitle: headerTitle,
          headerTitleAlign: 'left',
          headerStyle: {backgroundColor: themeSecondary},
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
