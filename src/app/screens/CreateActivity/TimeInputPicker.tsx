/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import {FormControl, Input, Pressable} from 'native-base';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

type TimeInputPickerProps = {
  title: string;
  label: string;
  onChangeData: (arg0: any) => void;
  formData: any;
  errors: any;
  keyProp: string;
  dateTimeFormat?: string;
  mode?: 'datetime' | 'date' | 'time';
};

const TimeInputPicker: React.FC<TimeInputPickerProps> = ({
  title,
  label,
  formData,
  onChangeData,
  errors,
  keyProp,
  mode = 'date',
  dateTimeFormat = mode !== 'time' ? 'hh:mm A' : 'LL',
}: TimeInputPickerProps) => {
  const [show, setShow] = useState(false);
  const [date] = useState(new Date());

  return (
    <View style={{marginVertical: 3}}>
      <FormControl.Label
        style={{marginBottom: 5}}
        _text={{
          bold: true,
          fontSize: 15,
        }}>
        {label}
      </FormControl.Label>
      <Pressable onPress={() => setShow(true)}>
        <Input
          isHovered={false}
          onPressIn={() => setShow(true)}
          isReadOnly
          showSoftInputOnFocus={false}
          value={moment(formData[keyProp]).format(dateTimeFormat)}
          size="lg"
          onChangeText={value => onChangeData({...formData, [keyProp]: value})}
        />
      </Pressable>
      {label in errors && (
        <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
      )}
      {show && (
        <DatePicker
          title={title}
          locale="es"
          mode={mode}
          androidVariant="iosClone"
          modal
          open={show}
          date={date}
          cancelText="Cancelar"
          confirmText="Seleccionar"
          onConfirm={(dateParam: any) => {
            setShow(false);
            onChangeData({
              ...formData,
              [keyProp]: moment(dateParam as Date).format(),
            });
          }}
          onCancel={() => {
            setShow(false);
          }}
        />
      )}
    </View>
  );
};

export default TimeInputPicker;
