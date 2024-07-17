/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Actionsheet,
  ChevronDownIcon,
  FormControl,
  Input,
  View,
  Pressable,
} from 'native-base';
import {useDarkMode} from '../../hooks/useDarkMode';

export type ItemSelection = {
  id: number;
  label: string;
  value: string;
  startIcon?: JSX.Element;
};

type SelectItemsProps = {
  placeHolder: string;
  label: string;
  items: ItemSelection[];
  onChangeData: (value: any) => void;
  formData: any;
  keyProp: string;
  noDefaultItem: boolean;
};

const SelectItems = ({
  label,
  onChangeData,
  formData,
  keyProp,
  items,
  placeHolder,
  noDefaultItem = false,
}: SelectItemsProps) => {
  const {isDark} = useDarkMode();
  const item =
    items.find((a: any) => a.value === formData[keyProp]) || noDefaultItem
      ? null
      : items[0];
  const [show, setShow] = useState(false);

  const onPressSelection = (activityItem: any) => {
    onChangeData({
      ...formData,
      [keyProp]: activityItem.value,
    });
    setShow(false);
  };

  return (
    <>
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
          isReadOnly
          placeholder={placeHolder || ''}
          defaultValue={item?.label || ''}
          leftElement={
            item ? (
              <View ml={2}>{items[item?.id || -1].startIcon}</View>
            ) : undefined
          }
          rightElement={
            <View mr={3}>
              <ChevronDownIcon />
            </View>
          }
          isHovered={false}
          showSoftInputOnFocus={false}
          onPressIn={() => setShow(true)}
          value={noDefaultItem ? formData[keyProp] : item?.label}
          size="lg"
          onChangeText={value => onChangeData({...formData, [keyProp]: value})}
        />
      </Pressable>
      <Actionsheet isOpen={show} onClose={() => setShow(false)} size="full">
        <Actionsheet.Content>
          {items.map((activityItem: any, index: number) => (
            <Actionsheet.Item
              bg={
                item?.id !== index
                  ? '#00000000'
                  : isDark
                  ? 'gray.500'
                  : 'gray.300'
              }
              _pressed={{backgroundColor: isDark ? 'gray.400' : 'gray.400'}}
              onPress={() => onPressSelection(activityItem)}
              key={index}
              startIcon={activityItem.startIcon || null}>
              {activityItem.label}
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default SelectItems;
