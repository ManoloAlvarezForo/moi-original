/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Box, Button, FormControl, Input} from 'native-base';
import RemoveOutline from '../../svg/remove-outline';
import AddOutline from '../../svg/add-outline';
import {APP_COLORS} from '../../themes/colors';

type CounterFormInputType = {
  label: string;
  onChangeData: (arg0: any) => void;
  formData: any;
  type: string;
};

const CounterFormInput: React.FC<CounterFormInputType> = ({
  label,
  onChangeData,
  formData,
  type,
}: CounterFormInputType) => {
  const TIME_TO_ADD = 0.5;
  const AMOUNT_TO_ADD = 1;

  const onChangeSum = () => {
    const value = formData[type];
    const newValue =
      type === 'hours' ? value + TIME_TO_ADD : value + AMOUNT_TO_ADD;
    onChangeData({...formData, [type]: newValue});
  };

  const onChangeSub = () => {
    const value = formData[type];
    const newValue =
      type === 'hours' ? value - TIME_TO_ADD : value - AMOUNT_TO_ADD;
    onChangeData({...formData, [type]: newValue});
  };

  const inputValue = String(formData[type]);

  const renderCounter = (
    <Box
      display="flex"
      marginLeft="auto"
      flexDirection="row"
      marginTop={1}
      marginBottom={1}
      paddingRight={2}
      paddingLeft={2}
      alignItems="center">
      <Button
        style={{width: 48, height: 48}}
        disabled={
          type === 'hours'
            ? formData[type] < TIME_TO_ADD
            : formData[type] < AMOUNT_TO_ADD
        }
        onPress={onChangeSub}
        shadow={3}
        colorScheme="light"
        variant="subtle"
        rounded="full">
        <RemoveOutline size={24} color={APP_COLORS.darkSecond} />
      </Button>
      <Box marginLeft={6} marginRight={6}>
        <Input value={inputValue} size="lg" width={70} textAlign="center" />
      </Box>
      <Button
        style={{width: 48, height: 48}}
        onPress={onChangeSum}
        shadow={3}
        variant="solid"
        rounded="full">
        <AddOutline size={24} color="white" />
      </Button>
    </Box>
  );

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 5,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <FormControl.Label
          _text={{
            fontSize: 'md',
          }}>
          {label}
        </FormControl.Label>
      </View>
      {renderCounter}
    </View>
  );
};

export default CounterFormInput;
