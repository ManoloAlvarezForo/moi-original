import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  Easing,
  TextInput,
  I18nManager,
} from 'react-native';
import moment from 'moment';
import {useCalendar} from './useCalendar';
import {
  getMonthYearText,
  checkYearDisabled,
  getDate,
  validYear,
  checkSelectMonthDisabled,
  getFormated,
  getMonthName,
} from './calendarUtils';

const SelectMonth = () => {
  const {
    state,
    contextValue: {
      options,
      selectorStartingYear,
      selectorEndingYear,
      mode,
      minimumDate,
      maximumDate,
      onMonthYearChange,
    },
  } = useCalendar();
  const [mainState, setMainState] = useState(state);
  const [show, setShow] = useState(false);
  const style = styles(options);
  const [year, setYear] = useState(
    getMonthYearText(mainState.activeDate).split(' ')[1],
  );
  const openAnimation = useRef(new Animated.Value(0)).current;
  const currentMonth = 3;
  const prevDisable = maximumDate && checkYearDisabled(Number(year), true);
  const nextDisable = minimumDate && checkYearDisabled(Number(year), false);

  useEffect(() => {
    mainState.monthOpen && setShow(true);
    Animated.timing(openAnimation, {
      toValue: mainState.monthOpen ? 1 : 0,
      duration: 350,
      useNativeDriver: true,
      easing: Easing.bezier(0.17, 0.67, 0.46, 1),
    }).start(() => {
      !mainState.monthOpen && setShow(false);
    });
  }, [mainState.monthOpen, openAnimation]);

  useEffect(() => {
    show && setYear(getMonthYearText(moment().year()));
  }, [mainState.activeDate, show]);

  const onSelectMonth = (month: any) => {
    if (show) {
      let y = Number(year);
      const date = getDate(validYear(mainState.activeDate, y));
      const activeDate = month !== null ? date.month(month) : date;
      setMainState({
        type: 'set',
        activeDate: getFormated(activeDate),
      });
      if (onMonthYearChange) {
        month !== null &&
          onMonthYearChange(getFormated(activeDate, 'monthYearFormat'));
      }
      month !== null &&
        mode !== 'monthYear' &&
        setMainState({
          type: 'toggleMonth',
        });
    }
  };

  useEffect(() => {
    onSelectMonth(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevDisable, nextDisable]);

  const onChangeYear = (text: any) => {
    if (Number(text)) {
      setYear(text);
    }
  };

  const onSelectYear = (number: any) => {
    let y = Number(year) + number;
    if (selectorEndingYear && y > selectorEndingYear) {
      y = selectorEndingYear;
    } else if (selectorStartingYear && y < selectorStartingYear) {
      y = selectorStartingYear;
    }
    setYear(y);
  };

  const containerStyle = [
    style.container,
    {
      opacity: openAnimation,
      transform: [
        {
          scale: openAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1],
          }),
        },
      ],
    },
  ];

  return show ? (
    <Animated.View style={containerStyle}>
      <View style={[style.header, I18nManager.isRTL && style.reverseHeader]}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={style.arrowWrapper}
          onPress={() => !nextDisable && onSelectYear(-1)}
        />
        <TextInput
          style={style.yearInput}
          maxLength={4}
          value={moment().format('YYYY')}
          onBlur={() => onSelectYear(0)}
          underlineColorAndroid={'rgba(0,0,0,0)'}
          returnKeyType="done"
          autoCorrect={false}
          blurOnSubmit
          selectionColor={options.mainColor}
          onChangeText={onChangeYear}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={style.arrowWrapper}
          onPress={() => !prevDisable && onSelectYear(+1)}
        />
      </View>

      <View style={[style.monthList]}>
        {[...Array(12).keys()].map(item => {
          const disabled = checkSelectMonthDisabled(mainState.activeDate, item);
          return (
            <TouchableOpacity
              key={item}
              activeOpacity={0.8}
              style={[
                style.item,
                currentMonth === item + 1 && style.selectedItem,
              ]}
              onPress={() => !disabled && onSelectMonth(item)}>
              <Text
                style={[
                  style.itemText,
                  currentMonth === item + 1 && style.selectedItemText,
                  disabled && style.disabledItemText,
                ]}>
                {getMonthName(String(item))}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  ) : null;
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      right: 0,
      backgroundColor: theme.backgroundColor,
      borderRadius: 10,
      flexDirection: 'column',
      zIndex: 999,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      alignItems: 'center',
      paddingHorizontal: 15,
      justifyContent: 'space-between',
      width: '80%',
      flexDirection: 'row',
    },
    reverseHeader: {
      flexDirection: 'row-reverse',
    },
    monthList: {
      flexWrap: 'wrap',
      margin: 25,
    },
    item: {
      width: '30%',
      marginHorizontal: '1.5%',
      paddingVertical: 8,
      marginVertical: 7,
      alignItems: 'center',
    },
    selectedItem: {
      backgroundColor: theme.mainColor,
      borderRadius: 12,
    },
    itemText: {
      fontFamily: theme.defaultFont,
      fontSize: theme.textFontSize,
      color: theme.textDefaultColor,
    },
    selectedItemText: {
      color: theme.selectedTextColor,
    },
    disabledItemText: {
      opacity: 0.2,
    },
    arrowWrapper: {
      padding: 13,
      position: 'relative',
      zIndex: 1,
      opacity: 1,
    },
    disableArrow: {
      opacity: 0,
    },
    arrow: {
      width: 18,
      height: 18,
      opacity: 0.9,
      tintColor: theme.mainColor,
      margin: 2,
    },
    leftArrow: {
      transform: [
        {
          rotate: '180deg',
        },
      ],
    },
    arrowDisable: {
      opacity: 0,
    },
    yearInput: {
      fontSize: theme.textHeaderFontSize,
      paddingVertical: 2,
      paddingHorizontal: 4,
      color: theme.textHeaderColor,
      fontFamily: theme.headerFont,
      textAlignVertical: 'center',
      minWidth: 100,
      textAlign: 'center',
    },
  });

export default SelectMonth;
