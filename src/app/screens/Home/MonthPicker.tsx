/* eslint-disable react-native/no-inline-styles */
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Box, Pressable, Text, View, useTheme} from 'native-base';
import moment from 'moment';
import {PANEL_MIDDLE_DARK, useDarkMode} from '../../hooks/useDarkMode';

const MONTHS = [
  'ENE',
  'FEB',
  'MAR',
  'ABR',
  'MAY',
  'JUN',
  'JUL',
  'AGO',
  'SEP',
  'OCT',
  'NOV',
  'DIC',
];

const MonthPicker = (_: any, ref: any) => {
  const [date, setDate] = useState(moment());
  const {isDark, textColor} = useDarkMode();
  const {colors} = useTheme();
  const gray50 = colors.coolGray[50];
  const currentMonth = date.month();

  const onChangeMonth = (idx: string) => {
    setDate(moment().month(idx));
  };

  useImperativeHandle(ref, () => ({
    getSelectedDate: () => date,
  }));

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 15,
        }}>
        <Text fontSize="lg" fontWeight="bold">
          {date.year()}
        </Text>
      </View>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-around">
        {MONTHS.map((item: any, idx: any) => (
          <Pressable
            onPress={() => onChangeMonth(idx)}
            bg={
              idx === currentMonth
                ? 'primary.600'
                : isDark
                ? PANEL_MIDDLE_DARK
                : gray50
            }
            _pressed={{opacity: 0.2}}
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginHorizontal: 3,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
              marginBottom: 6,
              minWidth: 10,
              minHeight: 50,
            }}
            rounded="lg"
            width={'25%'}
            height={30}
            key={idx}>
            <Text
              style={{color: idx === currentMonth ? 'white' : textColor}}
              fontSize="sm"
              fontWeight="500">
              {item}
            </Text>
          </Pressable>
        ))}
      </Box>
    </>
  );
};

export default forwardRef(MonthPicker);
