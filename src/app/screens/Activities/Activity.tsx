/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {Box, IconButton, Menu, Stack, Text, useTheme, View} from 'native-base';
import React from 'react';
import {APP_COLORS, REPORT_COLORS} from '../../themes/colors';
// import HomeIcon from '../../svg/home-outline';
// import CartIcon from '../../svg/jw-cart-outline';
// import TrailIcon from '../../svg/trail-sign-outline';
// import MailIcon from '../../svg/mail-outline';
// import PhoneIcon from '../../svg/call-outline';
// import RevisitIcon from '../../svg/people-outline';
// import BookOutline from '../../svg/book-outline';
import {
  ACTIVITY_LABEL_TYPE,
  ACTIVITY_TYPE,
  ActivityPropsType,
} from '../../types/activities';
import {useDarkMode} from '../../hooks/useDarkMode';
import EllipsisIconOutline from '../../svg/ellipsis-vertical';
// TODO: Move ROUNDED_DEFAULT for utils or constants file.
import {REVISIT_STATUS, ROUNDED_DEFAULT} from '../Revisits/Revisit';

// TODO: This refactor was to remove the icons and improve the font size for the title.

// const DEFAULT_SIZE_ACTIVITY_ICON = 24;
// const DEFAULT_ACTIVITY_HEADER_COLOR = APP_COLORS.dark;

// const ACTIVITY_ICONS = {
//   revisit: (
//     <RevisitIcon
//       size={DEFAULT_SIZE_ACTIVITY_ICON}
//       color={DEFAULT_ACTIVITY_HEADER_COLOR}
//     />
//   ),
//   street: (
//     <TrailIcon
//       size={DEFAULT_SIZE_ACTIVITY_ICON}
//       color={DEFAULT_ACTIVITY_HEADER_COLOR}
//     />
//   ),
//   houseToHouse: (
//     <HomeIcon
//       size={DEFAULT_SIZE_ACTIVITY_ICON}
//       color={DEFAULT_ACTIVITY_HEADER_COLOR}
//     />
//   ),
//   letter: (
//     <MailIcon
//       size={DEFAULT_SIZE_ACTIVITY_ICON}
//       color={DEFAULT_ACTIVITY_HEADER_COLOR}
//     />
//   ),
//   bibleStudy: (
//     <BookOutline
//       size={DEFAULT_SIZE_ACTIVITY_ICON}
//       color={DEFAULT_ACTIVITY_HEADER_COLOR}
//     />
//   ),
//   phone: (
//     <PhoneIcon
//       size={DEFAULT_SIZE_ACTIVITY_ICON}
//       color={DEFAULT_ACTIVITY_HEADER_COLOR}
//     />
//   ),
//   cart: (
//     <CartIcon
//       size={DEFAULT_SIZE_ACTIVITY_ICON}
//       color={DEFAULT_ACTIVITY_HEADER_COLOR}
//     />
//   ),
// };

const REPORT_PROPS_LABELS = {
  hours: 'Horas',
  publications: 'Pub.',
  videos: 'Videos',
  revisits: 'Revisitas',
  bibleStudies: 'Cursos Biblicos',
};

const REPORT_PROPS = [
  'hours',
  'publications',
  'videos',
  'revisits',
  'bibleStudies',
];

type ActivityProps = {
  activity: ActivityPropsType;
  onDeleteActivity: (arg0: ActivityPropsType) => void;
  onEditActivity: () => void;
};

const Activity: React.FC<ActivityProps> = ({
  activity,
  onDeleteActivity,
  onEditActivity,
}: ActivityProps) => {
  const {textColor} = useDarkMode();
  const {
    colors: {primary},
  } = useTheme();

  const onDeleteActivityHandler = (activityToBeRemoved: any) => {
    onDeleteActivity(activityToBeRemoved);
  };

  return (
    <Box
      paddingBottom={1}
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1.5"
      _dark={{
        borderColor: 'coolGray.800',
        backgroundColor: 'gray.800',
      }}
      _light={{
        backgroundColor: 'coolGray.50',
      }}>
      <Stack>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              paddingLeft: 10,
              paddingTop: 10,
            }}>
            <View
              style={{
                // paddingTop: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                // marginBottom: 10,
                // paddingBottom: 10,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 2,
                }}>
                <Text fontSize="md" color={textColor}>
                  {
                    (ACTIVITY_LABEL_TYPE as {[k in string]: string})[
                      activity.activity
                    ]
                  }
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginLeft: 'auto',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    marginTop: -9,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Menu
                    trigger={triggerProps => {
                      return (
                        <IconButton rounded="full" {...triggerProps}>
                          <EllipsisIconOutline size={18} color={primary[600]} />
                        </IconButton>
                      );
                    }}>
                    <Menu.Item onPress={onEditActivity}>Editar</Menu.Item>
                    <Menu.Item onPress={onDeleteActivityHandler}>
                      Eliminar
                    </Menu.Item>
                  </Menu>
                </View>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingBottom: 12,
              }}>
              {REPORT_PROPS.map((prop: string, idx: number) =>
                (activity as {[k in any]: any})[prop] ? (
                  <Box
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    _dark={{
                      backgroundColor: 'gray.600',
                    }}
                    _light={{
                      backgroundColor: 'gray.200',
                    }}
                    marginLeft={0.5}
                    marginRight={0.5}
                    marginTop={1}
                    marginBottom={0.2}
                    rounded={ROUNDED_DEFAULT}
                    paddingLeft={2}
                    paddingRight={0.1}
                    paddingTop={0.5}
                    paddingBottom={0.5}>
                    <Text color={textColor} fontWeight="medium" fontSize={13}>
                      {(REPORT_PROPS_LABELS as {[k in string]: string})[prop]}
                    </Text>
                    <Box
                      marginLeft={3}
                      marginRight={1}
                      rounded={ROUNDED_DEFAULT}
                      paddingRight={1.5}
                      paddingLeft={1.5}
                      // bg="gray.300">
                      bg={(REPORT_COLORS as {[k in any]: any})[prop]}>
                      <Text
                        fontWeight="bold"
                        rounded={ROUNDED_DEFAULT}
                        color="black"
                        fontSize={13}>
                        {(activity as {[k in any]: any})[prop]}
                      </Text>
                    </Box>
                  </Box>
                ) : null,
              )}
            </View>
            <View
              style={{
                marginLeft: 5,
                marginRight: 10,
                display: 'flex',
                flexDirection: 'column',
              }}>
              {activity.activity === ACTIVITY_TYPE.REVISIT && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: 10,
                  }}>
                  <View marginTop={2} marginBottom={0.5}>
                    <Text style={{fontWeight: '600'}}>Persona</Text>
                  </View>
                  {activity.revisitPerson && (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'baseline',
                      }}>
                      <View
                        rounded={ROUNDED_DEFAULT}
                        bg={REVISIT_STATUS.pending.bg}>
                        <Text
                          fontSize={13}
                          paddingLeft={2}
                          paddingRight={2}
                          fontWeight="bold"
                          paddingBottom={0.5}
                          _dark={{color: 'black'}}
                          _light={{color: 'white'}}>
                          {activity.revisitPerson}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              )}
              {activity.additionalInfo && (
                <View>
                  <Text color={textColor} style={{fontWeight: '600'}}>
                    Informacion adicional
                  </Text>
                  <View
                    marginTop={1}
                    borderRadius={5}
                    padding={1.5}
                    _dark={{
                      backgroundColor: 'gray.600',
                    }}
                    _light={{
                      backgroundColor: APP_COLORS.appGrayLow,
                    }}>
                    <Text color={textColor} style={{fontSize: 13}}>
                      {activity.additionalInfo}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </Stack>
    </Box>
  );
};

export default Activity;
