/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import moment from 'moment';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import {ArrowBackIcon, ArrowForwardIcon, Text} from 'native-base';

const DATE_FORMAT = 'DD-MM-YYYY';
const MONTH_YEAR_FORMAT = 'YYYY MM';

const getMonthListFirstDayDate = (date: any) => {
  const monthList = [];
  const year = date.format('YYYY');
  for (let i = 1; i < 13; i += 1) {
    monthList.push(moment(`01-${i}-${year}`, DATE_FORMAT));
  }
  return monthList;
};

const swipeDirections = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
};

type MonthPickerProps = {
  selectedDate?: any;
  currentDate?: any;
  maxDate?: any;
  minDate?: any;
  selectedBackgroundColor?: any;
  selectedMonthStyle?: any;
  seperatorColor?: string;
  seperatorHeight?: number;
  nextIcon?: any;
  prevIcon?: any;
  nextText?: string;
  prevText?: string;
  containerStyle?: any;
  yearTextStyle?: any;
  monthTextStyle?: any;
  currentMonthTextStyle?: any;
  monthFormat?: string;
  initialViewDate?: any;
  selectedMonthTextStyle?: any;
  yearDisabledStyle?: any;
  onMonthChange: (_: any) => void;
  onYearChange?: (_: any) => void;
  monthDisabledStyle?: any;
  swipable?: boolean;
  velocityThreshold?: number;
  directionalOffsetThreshold?: number;
  gestureIsClickThreshold?: number;
};

const MonthPicker: React.FC<MonthPickerProps> = ({
  selectedDate = moment(),
  currentDate,
  maxDate,
  minDate,
  selectedBackgroundColor = '#4c1d95',
  selectedMonthTextStyle = {color: '#fff'},
  seperatorHeight = 1,
  seperatorColor = '#b6c3cb',
  nextIcon = <ArrowForwardIcon />,
  prevIcon = <ArrowBackIcon />,
  nextText = 'Sig',
  prevText = 'Ant',
  containerStyle,
  yearTextStyle = {fontWeight: '700', fontSize: 18},
  monthFormat = 'MMM',
  currentMonthTextStyle = {color: '#4c1d95'},
  monthTextStyle = {color: '#000', fontWeight: '500', fontSize: 14},
  initialViewDate,
  onMonthChange,
  onYearChange,
  monthDisabledStyle = {color: '#00000050'},
  yearDisabledStyle = {color: '#00000050'},
  swipable = false,
  velocityThreshold,
  directionalOffsetThreshold = 80,
  gestureIsClickThreshold = 5,
}: MonthPickerProps) => {
  const [initialView, setInitialView] = useState(initialViewDate);

  // useEffect(() => {
  //   moment.locale(localeLanguage, {
  //     months:
  //       'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
  //         '_',
  //       ),
  //     monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
  //     weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split(
  //       '_',
  //     ),
  //     weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
  //     weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
  //   });
  // }, [localeLanguage, localeSettings]);

  const getSelectedBackgroundColor = (month: any) => {
    if (
      selectedBackgroundColor &&
      moment(month).format(MONTH_YEAR_FORMAT) ===
        moment(selectedDate).format(MONTH_YEAR_FORMAT)
    ) {
      return {backgroundColor: selectedBackgroundColor};
    }
    return {};
  };

  const getSelectedForeGround = (month: any) => {
    if (
      selectedMonthTextStyle &&
      moment(month).format(MONTH_YEAR_FORMAT) ===
        moment(selectedDate).format(MONTH_YEAR_FORMAT)
    ) {
      return selectedMonthTextStyle;
    }
    if (
      moment(month).format(MONTH_YEAR_FORMAT) ===
      moment(currentDate).format(MONTH_YEAR_FORMAT)
    ) {
      return currentMonthTextStyle;
    }
    return {};
  };

  const getMonthActualComponent = (month: any, isDisabled = false) => {
    return (
      <View
        style={[
          isDisabled === true && {flex: 1, alignItems: 'center'},
          styles.monthStyle,
          getSelectedBackgroundColor(month),
        ]}>
        <Text
          style={[
            monthTextStyle,
            getSelectedForeGround(month),
            isDisabled === true && monthDisabledStyle,
          ]}>
          {moment(month).format(monthFormat).toUpperCase()}
        </Text>
      </View>
    );
  };

  const getMonthComponent = (month: any) => {
    if (isMonthEnabled(month)) {
      return (
        <TouchableOpacity
          onPress={() => handleMonthTaps(month)}
          style={{flex: 1, alignItems: 'center'}}>
          {getMonthActualComponent(month)}
        </TouchableOpacity>
      );
    }
    return getMonthActualComponent(month, true);
  };

  const isMonthEnabled = (month: any) => {
    const minDateYear = moment(minDate).format(MONTH_YEAR_FORMAT);
    const maxDateYear = moment(maxDate).format(MONTH_YEAR_FORMAT);
    const currentYear = moment(month).format(MONTH_YEAR_FORMAT);
    if (currentYear <= maxDateYear && currentYear >= minDateYear) {
      return true;
    }
    return false;
  };

  const isYearEnabled = (isNext: any) => {
    const minYear = moment(minDate).format('YYYY');
    const maxYear = moment(maxDate).format('YYYY');
    const currentYear = moment(initialView).format('YYYY');
    if (
      (isNext && currentYear < maxYear) ||
      (!isNext && currentYear > minYear)
    ) {
      return true;
    }
    return false;
  };

  const handleMonthTaps = (month: any) => {
    onMonthChange(month);
  };

  const handNextPrevTaps = (isNext: any) => {
    if (isYearEnabled(isNext)) {
      const currentInitialView = initialView.clone();
      setInitialView(currentInitialView.add(isNext ? 1 : -1, 'y'));
      onYearChange !== undefined && onYearChange(currentInitialView);
    }
  };

  const renderQ = (months: any, qNo: any) => {
    const startMonth = qNo * 3;
    return (
      <View style={[styles.horizontalFlexViewStyle]}>
        {getMonthComponent(months[startMonth])}
        {getMonthComponent(months[startMonth + 1])}
        {getMonthComponent(months[startMonth + 2])}
      </View>
    );
  };

  const renderHeader = () => {
    const selectedYear = moment(initialView).format('YYYY');
    const maxYear = moment(maxDate).format('YYYY');
    const minYear = moment(minDate).format('YYYY');

    return (
      <View
        style={[
          styles.horizontalFlexViewStyle,
          {
            borderBottomColor: seperatorColor,
            borderBottomWidth: seperatorHeight,
            alignSelf: 'center',
            height: 64,
          },
        ]}>
        <TouchableOpacity onPress={() => handNextPrevTaps(false)}>
          {prevIcon ? (
            prevIcon
          ) : (
            <Text style={selectedYear <= minYear && yearDisabledStyle}>
              {prevText}
            </Text>
          )}
        </TouchableOpacity>
        <View style={styles.yearViewStyle}>
          <Text style={yearTextStyle}>{selectedYear}</Text>
        </View>
        <TouchableOpacity onPress={() => handNextPrevTaps(true)}>
          {nextIcon ? (
            nextIcon
          ) : (
            <Text style={selectedYear >= maxYear && yearDisabledStyle}>
              {nextText}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const handleSwipe = (gestureName: any) => {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        handNextPrevTaps(true);
        break;
      case SWIPE_RIGHT:
        handNextPrevTaps(false);
        break;
      default:
        break;
    }
  };

  const months = getMonthListFirstDayDate(initialView);
  const SWIPE_CONFIG = {
    velocityThreshold,
    directionalOffsetThreshold,
    gestureIsClickThreshold,
  };

  return (
    <GestureRecognizer
      onSwipe={(direction: any) => (swipable ? handleSwipe(direction) : null)}
      config={SWIPE_CONFIG}
      style={[styles.container, containerStyle]}>
      {renderHeader()}
      {renderQ(months, 0)}
      {renderQ(months, 1)}
      {renderQ(months, 2)}
      {renderQ(months, 3)}
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  monthStyle: {
    height: 40,
    width: 40,
    fontWeight: 'bold',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerStyle: {
    height: 64,
    flex: 1,
    justifyContent: 'space-between',
  },
  horizontalFlexViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  yearViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
});

export default MonthPicker;
