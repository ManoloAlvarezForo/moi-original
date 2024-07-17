/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {FormControl, Input, Pressable, View} from 'native-base';
import moment from 'moment';
import {CalendarWrapper} from './CalendarWrapper';
import ModalPopup from '../../components/CustomModal/ModalPopup';
import {capitalizeText} from '../../utils/dates';

type DateTimeInputPickerProps = {
  label: string;
  onChangeData: (arg0: any) => void;
  formData: any;
  errors: any;
  keyProp: string;
  dateTimeFormat?: string;
  mode?: 'datetime' | 'date' | 'time';
};

const DateInputPicker: React.FC<DateTimeInputPickerProps> = ({
  label,
  formData,
  onChangeData,
  errors,
  keyProp,
  mode = 'date',
  dateTimeFormat = mode !== 'time' ? 'hh:mm A' : 'LL',
}: DateTimeInputPickerProps) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formData[keyProp]);

  const onOkPressHandle = () => {
    onChangeData({...formData, [keyProp]: selectedDate});
    setShow(false);
  };

  const capitalizedFormattedDate = capitalizeText(
    moment(formData[keyProp]).format(dateTimeFormat),
  );

  const onDayPressHandler = (value: any) => {
    setSelectedDate(value[keyProp]);
  };

  return (
    <View style={{marginVertical: 3}}>
      <FormControl.Label
        style={{marginBottom: 5}}
        _text={{
          fontSize: 'md',
        }}>
        {label}
      </FormControl.Label>
      <Pressable onPress={() => setShow(true)}>
        <Input
          isHovered={false}
          onPressIn={() => setShow(true)}
          isReadOnly
          showSoftInputOnFocus={false}
          value={capitalizedFormattedDate}
          size="lg"
          onChangeText={value => onChangeData({...formData, [keyProp]: value})}
        />
      </Pressable>
      {label in errors && (
        <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
      )}
      <ModalPopup
        visible={show}
        size="full"
        okLabel="Seleccionar"
        onCloseModal={() => setShow(false)}
        onOkPress={onOkPressHandle}
        onCancelPress={() => setShow(false)}
        bodyStyle={{padding: 0}}
        content={
          <CalendarWrapper
            selectedDateProp={selectedDate}
            formData={formData}
            keyProp={keyProp}
            onDayPressHandler={value => onDayPressHandler(value)}
          />
        }
      />
    </View>
  );
};

export default DateInputPicker;
