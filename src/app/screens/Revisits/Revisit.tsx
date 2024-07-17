/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Box, IconButton, Menu, Stack, Text, useTheme} from 'native-base';
import {REVISIT_STATUS_TYPE, RevisitType} from '../../types/user';
import EllipsisIconOutline from '../../svg/ellipsis-vertical';
import {REPORT_COLORS} from '../../themes/colors';
import moment from 'moment';
import {capitalizeText, getCountDownTimer} from '../../utils/dates';
import {TouchableOpacity} from 'react-native';

export const ROUNDED_DEFAULT = 'sm';

export const REVISIT_STATUS = {
  pending: {bg: REPORT_COLORS.videos, label: 'Por Realizar'},
  done: {bg: REPORT_COLORS.done, label: 'Realizado'},
  archived: {bg: REPORT_COLORS.archived, label: 'Archivado'},
};

type RevisitProps = {
  revisit: RevisitType;
  onDeleteRevisit: (arg0: any) => void;
  onEditRevisit: (arg0: any) => void;
  onChangeStatus: (arg0: string) => (arg0: string) => void;
};

const Revisit: React.FC<RevisitProps> = ({
  revisit,
  onDeleteRevisit,
  onEditRevisit,
  onChangeStatus,
}: RevisitProps) => {
  const {
    colors: {primary},
  } = useTheme();

  const onDeleteRevisitHandler = () => {
    onDeleteRevisit(revisit);
  };

  const onChangeStatusHandler = (status: any) => {
    onChangeStatus(status)(revisit?.id || '');
  };

  const onEditRevisitHandler = () => {
    onEditRevisit(revisit.id);
  };

  const getCapitalizedDate = () => {
    return capitalizeText(moment(revisit.dateToReturn).format('dddd LL'));
  };

  // async function onDisplayNotification() {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission();

  //   // Create a channel (required for Android)
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //   });

  //   // Display a notification
  //   await notifee.displayNotification({
  //     title: 'Recordatorio',
  //     body: 'Querido hno recuerdo llenar su informe del dia de hoy.',
  //     android: {
  //       channelId,
  //       // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
  //       // pressAction is needed if you want the notification to open the app when pressed
  //       pressAction: {
  //         id: 'default',
  //       },
  //     },
  //   });
  // }

  // async function onCreateTriggerNotification() {
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //   });
  //   // const date = new Date(Date.now());
  //   // date.setHours(11);
  //   // date.setMinutes(10);

  //   // Create a time-based trigger
  //   const trigger: TimestampTrigger = {
  //     type: TriggerType.TIMESTAMP,
  //     timestamp: Date.now() + 5 * 1000, // fire at 11:10am (10 minutes before meeting)
  //   };

  //   // Create a trigger notification
  //   await notifee.createTriggerNotification(
  //     {
  //       title: 'Meeting with Jane',
  //       body: 'Today at 11:20am',
  //       android: {
  //         smallIcon: 'ic_launcher',
  //         channelId,
  //       },
  //     },
  //     trigger,
  //   );
  // }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
      <Box
        marginBottom={1}
        paddingTop={1}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.800',
          backgroundColor: 'gray.800',
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            flexDirection="row">
            <Box
              paddingLeft={1.5}
              marginLeft={2.5}
              paddingTop={1.5}
              paddingBottom={2}
              marginTop={1}
              rounded={ROUNDED_DEFAULT}
              // _dark={{
              //   backgroundColor: 'gray.700',
              // }}
              // _light={{
              //   backgroundColor: 'gray.50',
              // }}
              style={{marginBottom: 3, width: '60%'}}>
              <Text fontSize="md" fontWeight="medium">
                {revisit.name}
              </Text>
            </Box>
            {/* <Box
              rounded={ROUNDED_DEFAULT}
              paddingTop={0.1}
              paddingBottom={0.1}
              paddingLeft={1.5}
              paddingRight={1.5}
              bg={REVISIT_STATUS[revisit.status || 'pending'].bg}>
              <Text
                fontSize="sm"
                fontWeight="medium"
                textAlign="center"
                _dark={{color: 'black'}}
                _light={{color: 'black'}}>
                {REVISIT_STATUS[revisit.status || 'pending'].label}
              </Text>
            </Box> */}
            <Box
              style={{
                display: 'flex',
                marginLeft: 'auto',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Box style={{marginLeft: 20, marginRight: 7}}>
                <Menu
                  trigger={triggerProps => {
                    return (
                      <IconButton
                        marginLeft={-5}
                        rounded="full"
                        {...triggerProps}>
                        <EllipsisIconOutline size={18} color={primary[600]} />
                      </IconButton>
                    );
                  }}>
                  <Menu.Item onPress={onEditRevisitHandler}>Editar</Menu.Item>
                  <Menu.Item onPress={onDeleteRevisitHandler}>
                    Eliminar
                  </Menu.Item>
                  {revisit.status !== REVISIT_STATUS_TYPE.ARCHIVED && (
                    <Menu.Item
                      textValue="archived"
                      onPress={() =>
                        onChangeStatusHandler(REVISIT_STATUS_TYPE.ARCHIVED)
                      }>
                      Archivar
                    </Menu.Item>
                  )}
                  {revisit.status !== REVISIT_STATUS_TYPE.DONE && (
                    <Menu.Item
                      textValue="done"
                      onPress={() =>
                        onChangeStatusHandler(REVISIT_STATUS_TYPE.DONE)
                      }>
                      Marcar como Realizado
                    </Menu.Item>
                  )}
                  {revisit.status !== REVISIT_STATUS_TYPE.PENDING && (
                    <Menu.Item
                      textValue="pending"
                      onPress={() =>
                        onChangeStatusHandler(REVISIT_STATUS_TYPE.PENDING)
                      }>
                      Marcar Por Realizar
                    </Menu.Item>
                  )}
                  {/* <Menu.Item
                    textValue="notification"
                    onPress={() => onCreateTriggerNotification()}>
                    Notificacion
                  </Menu.Item> */}
                </Menu>
              </Box>
            </Box>
          </Box>
          <Box paddingLeft={3} paddingRight={3} paddingTop={2} display={'flex'}>
            <Stack space={1.5} direction={{base: 'row'}} alignItems={'center'}>
              <Box
                rounded={ROUNDED_DEFAULT}
                paddingTop={0.1}
                paddingBottom={0.1}
                paddingLeft={1.5}
                paddingRight={1.5}
                bg={REVISIT_STATUS[revisit.status || 'pending'].bg}>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  textAlign="center"
                  _dark={{color: 'black'}}
                  _light={{color: 'black'}}>
                  {REVISIT_STATUS[revisit.status || 'pending'].label}
                </Text>
              </Box>
              {revisit.status === 'pending' && (
                <Box
                  rounded={ROUNDED_DEFAULT}
                  paddingTop={0.1}
                  paddingBottom={0.1}
                  paddingLeft={1.5}
                  paddingRight={1.5}
                  _dark={{
                    backgroundColor: REPORT_COLORS.hours,
                    color: 'white',
                  }}
                  _light={{
                    backgroundColor: REPORT_COLORS.hours,
                    color: 'black',
                  }}>
                  <Text fontSize="sm" fontWeight="medium" color="black">
                    {getCountDownTimer(
                      revisit.dateToReturn,
                      revisit.timeToReturn,
                    )}
                  </Text>
                </Box>
              )}
            </Stack>
            <Box
              paddingBottom={5}
              style={{
                flexDirection: 'column',
                display: 'flex',
              }}>
              <Box style={{display: 'flex', flexDirection: 'column'}}>
                <Stack
                  space={2}
                  direction={{base: 'row'}}
                  alignItems={'center'}>
                  <Stack direction={{base: 'column'}} alignItems={'flex-start'}>
                    <Box marginTop={2} marginBottom={1}>
                      <Text fontWeight="bold">Fecha</Text>
                    </Box>
                    <Box
                      rounded={ROUNDED_DEFAULT}
                      paddingTop={0.5}
                      paddingBottom={0.5}
                      paddingLeft={2}
                      paddingRight={2}
                      _dark={{
                        backgroundColor: 'gray.700',
                      }}
                      _light={{
                        backgroundColor: 'gray.200',
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      <Text fontWeight="medium">{getCapitalizedDate()}</Text>
                    </Box>
                  </Stack>
                  <Stack direction={{base: 'column'}} alignItems={'flex-start'}>
                    <Box marginTop={2} marginBottom={1}>
                      <Text fontWeight="bold">Hora</Text>
                    </Box>
                    <Box
                      rounded={ROUNDED_DEFAULT}
                      paddingTop={0.5}
                      paddingBottom={0.5}
                      paddingLeft={2}
                      paddingRight={2}
                      _dark={{
                        backgroundColor: REPORT_COLORS.publications,
                      }}
                      _light={{
                        backgroundColor: REPORT_COLORS.publications,
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      <Text color="black" fontWeight="bold">
                        {moment(revisit.timeToReturn).format('hh:mm A')}
                      </Text>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
              {/* {revisit.additionalInfo && (
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <Box marginTop={2} marginBottom={0.5}>
                    <Text style={{fontWeight: '600'}}>
                      Informacion adicional
                    </Text>
                  </Box>
                  <Box
                    rounded="sm"
                    padding={2}
                    _dark={{
                      backgroundColor: 'gray.600',
                    }}
                    _light={{
                      backgroundColor: APP_COLORS.appGrayLow,
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <Text>{revisit.additionalInfo}</Text>
                  </Box>
                </Box>
              )} */}
            </Box>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default Revisit;
