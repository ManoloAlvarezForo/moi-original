import React, {useState, Fragment} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import testIDs from './testIDs';

const INITIAL_DATE = '2020-02-02';

const Calendars = () => {
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [showMarkedDatesExamples, setShowMarkedDatesExamples] = useState(false);

  const toggleSwitch = () => {
    setShowMarkedDatesExamples(!showMarkedDatesExamples);
  };

  const onDayPress = (day: any) => {
    setSelected(day.dateString);
  };

  const renderCalendarWithSelectableDate = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with selectable date</Text>
        <Calendar
          testID={testIDs.calendars.FIRST}
          enableSwipeMonths
          current={INITIAL_DATE}
          style={styles.calendar}
          onDayPress={onDayPress}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: 'orange',
              selectedTextColor: 'red',
            },
          }}
        />
      </Fragment>
    );
  };

  const renderCalendarWithWeekNumbers = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with week numbers</Text>
        <Calendar style={styles.calendar} hideExtraDays showWeekNumbers />
      </Fragment>
    );
  };

  const renderCalendarWithMinAndMaxDates = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with min and max dates</Text>
        <Calendar
          style={styles.calendar}
          hideExtraDays
          current={'2012-05-16'}
        />
      </Fragment>
    );
  };

  const renderCalendarWithMarkedDatesAndHiddenArrows = () => {
    return (
      <Fragment>
        <Text style={styles.text}>
          Calendar with marked dates and hidden arrows
        </Text>
        <Calendar
          style={styles.calendar}
          current={'2012-05-16'}
          hideExtraDays
          disableAllTouchEventsForDisabledDays
          firstDay={1}
          hideArrows={true}
          // disabledByDefault={true}
        />
      </Fragment>
    );
  };

  const renderCalendarWithMultiDotMarking = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with multi-dot marking</Text>
        <Calendar
          style={styles.calendar}
          current={'2012-05-16'}
          markingType={'multi-dot'}
          markedDates={{
            '2012-05-08': {
              selected: true,
              dots: [
                {key: 'vacation', color: 'blue', selectedDotColor: 'red'},
                {key: 'massage', color: 'red', selectedDotColor: 'white'},
              ],
            },
            '2012-05-09': {
              disabled: true,
              dots: [
                {key: 'vacation', color: 'green', selectedDotColor: 'red'},
                {key: 'massage', color: 'red', selectedDotColor: 'green'},
              ],
            },
          }}
        />
      </Fragment>
    );
  };

  const renderCalendarWithMultiPeriodMarking = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with multi-period marking</Text>
        <Calendar
          style={styles.calendar}
          current={'2012-05-16'}
          markingType={'multi-period'}
          markedDates={{
            '2012-05-16': {
              periods: [
                {startingDay: true, endingDay: false, color: 'green'},
                {startingDay: true, endingDay: false, color: 'orange'},
              ],
            },
            '2012-05-17': {
              periods: [
                {startingDay: false, endingDay: true, color: 'green'},
                {startingDay: false, endingDay: true, color: 'orange'},
                {startingDay: true, endingDay: false, color: 'pink'},
              ],
            },
            '2012-05-18': {
              periods: [
                {startingDay: true, endingDay: true, color: 'orange'},
                {color: 'transparent'},
                {startingDay: false, endingDay: false, color: 'pink'},
              ],
            },
          }}
        />
      </Fragment>
    );
  };

  const renderCalendarWithCustomMarkingType = () => {
    return (
      <Fragment>
        <Text style={styles.text}>
          Custom calendar with custom marking type
        </Text>
        <Calendar
          style={styles.calendar}
          hideExtraDays
          current={'2018-03-01'}
          markingType={'custom'}
          markedDates={{
            '2018-03-01': {
              customStyles: {
                container: {
                  backgroundColor: 'white',
                  elevation: 2,
                },
                text: {
                  color: 'red',
                },
              },
            },
            '2018-03-08': {
              selected: true,
            },
            '2018-03-09': {
              customStyles: {
                container: {
                  backgroundColor: 'red',
                  elevation: 4,
                },
                text: {
                  color: 'white',
                },
              },
            },
            '2018-03-14': {
              customStyles: {
                container: {
                  backgroundColor: 'green',
                },
                text: {
                  color: 'white',
                },
              },
            },
            '2018-03-15': {
              customStyles: {
                container: {
                  backgroundColor: 'black',
                  elevation: 2,
                },
                text: {
                  color: 'yellow',
                },
              },
            },
            '2018-03-21': {
              disabled: true,
            },
            '2018-03-28': {
              customStyles: {
                text: {
                  color: 'black',
                  fontWeight: 'bold',
                },
              },
            },
            '2018-03-30': {
              customStyles: {
                container: {
                  backgroundColor: 'pink',
                  elevation: 4,
                  borderColor: 'purple',
                  borderWidth: 5,
                },
                text: {
                  marginTop: 3,
                  fontSize: 11,
                  color: 'black',
                },
              },
            },
            '2018-03-31': {
              customStyles: {
                container: {
                  backgroundColor: 'orange',
                  borderRadius: 0,
                },
              },
            },
          }}
        />
      </Fragment>
    );
  };

  const renderCalendarWithCustomDay = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with custom day component</Text>
        <Calendar
          style={[styles.calendar, styles.customCalendar]}
          dayComponent={({date, state}: any) => {
            return (
              <View>
                <Text
                  style={[
                    styles.customDay,
                    state === 'disabled'
                      ? styles.disabledText
                      : styles.defaultText,
                  ]}>
                  {date.day}
                </Text>
              </View>
            );
          }}
        />
      </Fragment>
    );
  };

  const renderCalendarWithCustomHeader = () => {
    const CustomHeader = React.forwardRef((props, ref) => {
      return (
        <View ref={ref} {...props} style={styles.customHeader}>
          <Text>This is a custom header!</Text>
          <TouchableOpacity onPress={() => console.warn('Tapped!')}>
            <Text>Tap Me</Text>
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <Fragment>
        <Text style={styles.text}>Calendar with custom header component</Text>
        <Calendar
          testID={testIDs.calendars.LAST}
          style={[styles.calendar, styles.customCalendar]}
          customHeader={CustomHeader}
        />
      </Fragment>
    );
  };

  const renderCalendarWithInactiveDays = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with inactive days</Text>
        <Calendar
          style={styles.calendar}
          disableAllTouchEventsForInactiveDays
          current={INITIAL_DATE}
          markedDates={{
            '2020-02-10': {
              inactive: true,
            },
            '2020-02-11': {
              inactive: true,
            },
          }}
        />
      </Fragment>
    );
  };

  const renderMarkedDatesExamples = () => {
    return (
      <Fragment>
        {renderCalendarWithMarkedDatesAndHiddenArrows()}
        {renderCalendarWithMultiDotMarking()}
        {renderCalendarWithMultiPeriodMarking()}
        {renderCalendarWithCustomMarkingType()}
      </Fragment>
    );
  };

  const renderExamples = () => {
    return (
      <Fragment>
        {renderCalendarWithSelectableDate()}
        {renderCalendarWithWeekNumbers()}
        {renderCalendarWithMinAndMaxDates()}
        {renderCalendarWithCustomDay()}
        {renderCalendarWithCustomHeader()}
        {renderCalendarWithInactiveDays()}
      </Fragment>
    );
  };

  const renderSwitch = () => {
    // Workaround for Detox 18 migration bug
    return (
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{false: '#d9e1e8', true: '#00BBF2'}}
          onValueChange={toggleSwitch}
          value={showMarkedDatesExamples}
        />
        <Text style={styles.switchText}>Show markings examples</Text>
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      testID={testIDs.calendars.CONTAINER}>
      {renderSwitch()}
      {showMarkedDatesExamples && renderMarkedDatesExamples()}
      {!showMarkedDatesExamples && renderExamples()}
    </ScrollView>
  );
};

export default Calendars;

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  switchText: {
    margin: 10,
    fontSize: 16,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
  disabledText: {
    color: 'grey',
  },
  defaultText: {
    color: 'purple',
  },
  customCalendar: {
    height: 250,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  customDay: {
    textAlign: 'center',
  },
  customHeader: {
    backgroundColor: '#FCC',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: -4,
    padding: 8,
  },
});
