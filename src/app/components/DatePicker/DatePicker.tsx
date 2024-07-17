/* eslint-disable no-fallthrough */
import React, {useState} from 'react';
import {View} from 'native-base';
import {StyleSheet} from 'react-native';
// import Calendar from './Calendar';
import SelectMonth from './SelectMonth';
// import SelectTime from './useCalendarSelectedTime';
import {DatePickerProvider} from './DatePickerContext';

const defaultOptions = {
  backgroundColor: '#fff',
  textHeaderColor: '#212c35',
  textDefaultColor: '#2d4150',
  selectedTextColor: '#fff',
  mainColor: '#61dafb',
  textSecondaryColor: '#7a92a5',
  borderColor: 'rgba(122, 146, 165, 0.1)',
  defaultFont: 'System',
  headerFont: 'System',
  textFontSize: 15,
  textHeaderFontSize: 17,
  headerAnimationDistance: 100,
  daysAnimationDistance: 200,
};

export interface DatePickerProps {
  onSelectedChange?: (value: any) => void;
  onMonthYearChange?: (value: any) => void;
  onTimeChange?: (value: any) => void;
  onDateChange?: (value: any) => void;
  current?: string;
  selected?: string;
  minimumDate?: string;
  maximumDate?: string;
  selectorStartingYear?: number;
  selectorEndingYear?: number;
  disableDateChange?: boolean;
  isGregorian?: boolean;
  config?: any;
  options?: any;
  mode?: string;
  minuteInterval?: number;
  style?: any;
  utils?: any;
}

const DatePicker: React.FC<DatePickerProps> = (props: DatePickerProps) => {
  const {mode, options = defaultOptions} = props;

  const [minHeight, setMinHeight] = useState(300);
  const style = styles(options);

  // const renderBody = () => {
  //   switch (mode) {
  //     default:
  //     // case 'datepicker':
  //     //   return <Calendar />;
  //     // case 'calendar':
  //     //   return (
  //     //     <>
  //     //       <Calendar />
  //     //       <SelectMonth />
  //     //     </>
  //     //   );
  //     case 'monthYear':
  //       return <SelectMonth />;
  //     // case 'time':
  //     //   return <SelectTime />;
  //   }
  // };

  return (
    <DatePickerProvider options={options} timeOpen={mode === 'time'}>
      <View
        style={[style.container, {minHeight}, props.style]}
        onLayout={({nativeEvent}) =>
          setMinHeight(nativeEvent.layout.width * 0.9 + 55)
        }>
        <SelectMonth />
      </View>
    </DatePickerProvider>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
    },
  });

export default DatePicker;
