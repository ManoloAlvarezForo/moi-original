/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {Box, Heading, HStack, Stack, Text} from 'native-base';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
// import moment from 'moment';
// import Error from '../../components/Error';
// import Loader from '../../components/Loader';
// import {ActivityPropsType} from '../../types/activities';
import {DEFAULT_REPORT_GQL} from '../Reports/gqlQueries';
import {
  Agenda,
  AgendaEntry,
  AgendaSchedule,
  // Calendar,
  // CalendarList,
  DateData,
  LocaleConfig,
} from 'react-native-calendars';
import testIDs from './testIDs';
import {useOfflineUser} from '../../hooks/useOfflineUser';
import {useOfflineReport} from '../../hooks/useOfflineReport';
import moment from 'moment';

LocaleConfig.locales.en = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar.',
    'Abr.',
    'May.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dic.',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'en';

const ActivitiesCalendar: React.FC = () => {
  const [items, setItems] = useState<AgendaSchedule>({});

  const {userId} = useOfflineUser();
  const {getDefaultReport} = useOfflineReport();
  const defaultReport = getDefaultReport();

  const {loading, error, data} = useQuery(DEFAULT_REPORT_GQL, {
    fetchPolicy: 'cache-only',
    variables: {userId},
    notifyOnNetworkStatusChange: true,
  });

  const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const loadItems = (day: DateData) => {
    const tempItems: {[k in string]: any} = items || {};

    // setTimeout(() => {
    //   for (let i = -15; i < 20; i++) {
    //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //     const strTime = timeToString(time);

    //     if (!tempItems[strTime]) {
    //       tempItems[strTime] = [];

    //       const numItems = Math.floor(Math.random() * 3 + 1);
    //       for (let j = 0; j < numItems; j++) {
    //         tempItems[strTime].push({
    //           name: 'Item for ' + strTime + ' #' + j,
    //           height: Math.max(50, Math.floor(Math.random() * 150)),
    //           day: strTime,
    //         });
    //       }
    //     }
    //   }

    //   const loadedItems: AgendaSchedule = {
    //     '2024-02-13': [
    //       {name: 'Actividad 1', height: 50, day: '2024-02-13'},
    //       {name: 'Actividad 2', height: 60, day: '2024-02-13'},
    //     ],
    //     '2024-02-14': [
    //       {name: 'Actividad 3', height: 70, day: '2024-02-14'},
    //       {name: 'Actividad 4', height: 80, day: '2024-02-14'},
    //     ],
    //     // Agrega más elementos para otras fechas si es necesario
    //   };

    //   const newItems: AgendaSchedule = {};
    //   // Object.keys(tempItems).forEach(key => {
    //   //   newItems[key] = tempItems[key];
    //   // });
    //   console.log('newItems  ===>  ', newItems);
    //   setItems(activities);
    // }, 1000);
    const activitiesData: AgendaSchedule = {
      '2022-05-01': [
        {day: '2022-05-01', height: 65, name: 'Item for 2022-05-01 #0'},
        {day: '2022-05-01', height: 143, name: 'Item for 2022-05-01 #1'},
      ],
      '2022-05-02': [
        {day: '2022-05-02', height: 124, name: 'Item for 2022-05-02 #0'},
        {day: '2022-05-02', height: 53, name: 'Item for 2022-05-02 #1'},
      ],
      '2022-05-03': [
        {day: '2022-05-03', height: 67, name: 'Item for 2022-05-03 #0'},
        {day: '2022-05-03', height: 57, name: 'Item for 2022-05-03 #1'},
      ],
      '2022-05-04': [
        {day: '2022-05-04', height: 108, name: 'Item for 2022-05-04 #0'},
        {day: '2022-05-04', height: 62, name: 'Item for 2022-05-04 #1'},
      ],
      '2022-05-05': [
        {day: '2022-05-05', height: 50, name: 'Item for 2022-05-05 #0'},
      ],
      '2022-05-06': [
        {day: '2022-05-06', height: 83, name: 'Item for 2022-05-06 #0'},
      ],
      '2022-05-07': [
        {day: '2022-05-07', height: 50, name: 'Item for 2022-05-07 #0'},
      ],
    };

    const activities = defaultReport.activitiesByDate;
    console.log('activities  .... ', activities);

    const newItems: AgendaSchedule = {};
    // Object.keys(tempItems).forEach(key => {
    //   newItems[key] = tempItems[key];
    // });
    console.log('newItems  ===>  ', newItems);
    setItems(activities);
  };

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: reservation.height}]}
        onPress={() => console.log(reservation.name)}>
        <Text style={{fontSize, color}}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  const theme = {
    agendaDayNumColor: 'green',
    agendaKnobColor: 'blue',
    agendaDayTextColor: 'blue',
    agendaTodayColor: 'green',
    selectedDayBackgroundColor: 'lightblue',
    selectedDayTextColor: 'white',
    dayTextColor: 'black',
    textDisabledColor: 'gray',
    dotColor: 'red',
    selectedDotColor: 'orange',
    arrowColor: 'brown',
    monthTextColor: 'purple',
    textDayFontFamily: 'Arial',
    textMonthFontFamily: 'Arial',
    textDayHeaderFontFamily: 'Arial',
    agendaDayTextFontFamily: 'Arial',
  };

  const today = moment().format('YYYY-MM-DD');

  return (
    <Agenda
      testID={testIDs.agenda.CONTAINER}
      items={items}
      loadItemsForMonth={loadItems}
      selected={today}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      showClosingKnob={true}
      theme={theme}
      // markingType={'period'}
      // markedDates={{
      //   '2017-05-08': {textColor: '#43515c'},
      //   '2017-05-09': {textColor: '#43515c'},
      //   '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
      //   '2017-05-21': {startingDay: true, color: 'blue'},
      //   '2017-05-22': {endingDay: true, color: 'gray'},
      //   '2017-05-24': {startingDay: true, color: 'gray'},
      //   '2017-05-25': {color: 'gray'},
      //   '2017-05-26': {endingDay: true, color: 'gray'},
      // }}
      // monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      // renderDay={(day, item) => <Text>{day ? day.day : 'item'}</Text>}
      // hideExtraDays={false}
      // showOnlySelectedDayItems
      // reservationsKeyExtractor={this.reservationsKeyExtractor}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default ActivitiesCalendar;
