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
import BookOutline from '../../svg/book-outline';
import HomeIcon from '../../svg/home-outline';
import CartIcon from '../../svg/jw-cart-outline';
import TrailIcon from '../../svg/trail-sign-outline';
import MailIcon from '../../svg/mail-outline';
import PhoneIcon from '../../svg/call-outline';
import RevisitIcon from '../../svg/people-outline';
import {ACTIVITY_TYPE} from '../../types/activities';
import {useDarkMode} from '../../hooks/useDarkMode';

type Activity = {
  id: number;
  label: string;
  value: string;
  startIcon: JSX.Element;
};

const getActivities = (iconColor: string) => {
  const ACTIVITIES: Activity[] = [
    {
      id: 0,
      label: 'De casa en casa',
      value: ACTIVITY_TYPE.HOUSE_TO_HOUSE,
      startIcon: <HomeIcon size={22} color={iconColor} />,
    },
    {
      id: 1,
      label: 'Carrito',
      value: ACTIVITY_TYPE.CART,
      startIcon: <CartIcon size={22} color={iconColor} />,
    },
    {
      id: 2,
      label: 'Calles',
      value: ACTIVITY_TYPE.STREET,
      startIcon: <TrailIcon size={22} color={iconColor} />,
    },
    {
      id: 3,
      label: 'Cartas',
      value: ACTIVITY_TYPE.LETTER,
      startIcon: <MailIcon size={22} color={iconColor} />,
    },
    {
      id: 4,
      label: 'Telefono',
      value: ACTIVITY_TYPE.PHONE,
      startIcon: <PhoneIcon size={22} color={iconColor} />,
    },
    {
      id: 5,
      label: 'Revisita',
      value: ACTIVITY_TYPE.REVISIT,
      startIcon: <RevisitIcon size={22} color={iconColor} />,
    },
    {
      id: 6,
      label: 'Estudio Biblico',
      value: ACTIVITY_TYPE.BIBLE_STUDY,
      startIcon: <BookOutline size={22} color={iconColor} />,
    },
  ];

  return ACTIVITIES;
};

type SelectActivityProps = {
  label: string;
  onChangeData: (value: any) => void;
  formData: any;
  keyProp: string;
};

const SelectActivity = ({
  label,
  onChangeData,
  formData,
  keyProp,
}: SelectActivityProps) => {
  const {textColor, isDark} = useDarkMode();
  const activities = getActivities(textColor);
  const activity =
    activities.find((a: Activity) => a.value === formData[keyProp]) ||
    activities[0];

  const [show, setShow] = useState(false);

  const onPressSelection = (activityItem: Activity) => {
    onChangeData({
      ...formData,
      [keyProp]: activityItem.value,
    });
    setShow(false);
  };

  return (
    <View>
      <FormControl.Label
        style={{marginBottom: 5}}
        _text={{
          fontSize: 'md',
        }}>
        {label}
      </FormControl.Label>
      <Pressable onPress={() => setShow(true)}>
        <Input
          isReadOnly
          defaultValue={activity.label}
          leftElement={<View ml={2}>{activities[activity.id].startIcon}</View>}
          rightElement={
            <View mr={3}>
              <ChevronDownIcon />
            </View>
          }
          isHovered={false}
          showSoftInputOnFocus={false}
          onPressIn={() => setShow(true)}
          value={activity.label}
          size="lg"
          onChangeText={value => onChangeData({...formData, [keyProp]: value})}
        />
      </Pressable>
      <Actionsheet isOpen={show} onClose={() => setShow(false)} size="full">
        <Actionsheet.Content>
          {activities.map((activityItem: Activity, index: number) => (
            <Actionsheet.Item
              bg={
                activity.id !== index
                  ? '#00000000'
                  : isDark
                  ? 'gray.500'
                  : 'gray.300'
              }
              _pressed={{backgroundColor: isDark ? 'gray.400' : 'gray.400'}}
              onPress={() => onPressSelection(activityItem)}
              key={index}
              startIcon={activityItem.startIcon}>
              {activityItem.label}
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default SelectActivity;
