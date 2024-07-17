/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  VStack,
  Button,
  FormControl,
  View,
  TextArea,
  CloseIcon,
  IconButton,
  Stack,
  Box,
  Heading,
} from 'native-base';
import moment from 'moment';
import CounterFormInput from './CounterFormInput';
import {useNavigation, useRoute} from '@react-navigation/native';
import DateInputPicker from './DateInputPicker';
import {ActivityPropsType, ACTIVITY_TYPE} from '../../types/activities';
import {useOfflineRecord} from '../../hooks/useOfflineRecord';
import {
  CustomToastProps,
  MESSAGE_TYPE,
} from '../../components/Toast/CustomAlert';
import useCustomToast from '../../hooks/useCustomToast';
import SelectActivity from './SelectActivity';
import {useDarkMode} from '../../hooks/useDarkMode';
import {useOfflineUser} from '../../hooks/useOfflineUser';
import SelectItems from './SelectItems';

const initialState: ActivityPropsType = {
  date: moment().format('YYYY-MM-DD'),
  activity: ACTIVITY_TYPE.HOUSE_TO_HOUSE,
  hours: 0,
  videos: 0,
  publications: 0,
  revisits: 0,
  additionalInfo: '',
  revisitPerson: '',
};

const counterData = [
  {key: 'hours-form-data', label: 'Horas', type: 'hours'},
  {key: 'publications-form-data', label: 'Publicaciones', type: 'publications'},
  {key: 'videos-form-data', label: 'Videos', type: 'videos'},
];

const FormNewActivity = () => {
  const {addActivity, getActivityById, updateActivity} = useOfflineRecord();
  const {getAvailableUserRevisits} = useOfflineUser();
  // const [revisit, setRevisit] = useState<any>();
  const [formData, setData] = useState<ActivityPropsType>(initialState);
  const route = useRoute<any>();
  const [errors] = useState({});
  const {goBack} = useNavigation();
  const {showToast} = useCustomToast();
  const {textColor, themeSecondary} = useDarkMode();

  useEffect(() => {
    if (route && route.params && route.params.activityId) {
      const {activityId} = route?.params || null;
      if (activityId) {
        const foundActivity = getActivityById(activityId);
        setData(foundActivity);
      }
    }
  }, [getActivityById, route]);

  // TODO: don't forget add validation before save the activity.
  //   const validate = () => {
  //     if (formData.date === undefined) {
  //       setErrors({...errors, name: 'Date is required'});
  //       return false;
  //     } else if (formData.activity.length < 3) {
  //       setErrors({...errors, name: 'Hour is too short'});
  //       return false;
  //     }

  //     return true;
  //   };

  const onSubmit = () => {
    let successActivityToastProps: CustomToastProps;
    if (formData.hours === 0) {
      const errorActivityToastProps: CustomToastProps = {
        description: 'Debe ingresar un numero de Horas.',
        messageType: MESSAGE_TYPE.ERROR,
      };

      showToast(errorActivityToastProps);
      return;
    }
    let lastFormData = formData;
    if (formData.activity === 'revisit') {
      lastFormData.revisits = 1;
    }

    if (!formData.id) {
      addActivity(formData);
      successActivityToastProps = {
        description: 'Se agrego una nueva Actividad',
        messageType: MESSAGE_TYPE.SUCCESS,
      };
    } else {
      updateActivity(formData);
      successActivityToastProps = {
        description: 'Se actualizo la Actividad',
        messageType: MESSAGE_TYPE.SUCCESS,
      };
    }

    goBack();
    showToast(successActivityToastProps);
  };

  const renderCounters = counterData.map(input => (
    <CounterFormInput
      key={input.key}
      onChangeData={setData}
      label={input.label}
      formData={formData}
      type={input.type}
    />
  ));

  const headerTitle = !formData.id ? 'Nueva Actividad' : 'Editar Actividad';

  const buildRevisitsSelection = () => {
    const userRevisits = getAvailableUserRevisits();
    const itemsForSelect = userRevisits.map((r: any, idx: number) => {
      return {id: idx, label: r.name, value: r.name};
    });

    return (
      <SelectItems
        items={itemsForSelect}
        label="Seleccione una Revisita"
        placeHolder="Seleccione una Revisita"
        formData={formData}
        keyProp="revisitPerson"
        noDefaultItem
        onChangeData={setData}
      />
    );
  };

  return (
    <>
      <View
        height={50}
        bg={themeSecondary}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <Heading size="sm" color="primary.600">
          {headerTitle}
        </Heading>
        <View style={{display: 'flex', marginLeft: 'auto'}}>
          <IconButton
            onPress={() => goBack()}
            rounded="full"
            size="sm"
            icon={<CloseIcon color={textColor} />}
          />
        </View>
      </View>
      <VStack style={{marginBottom: 30}} paddingX={2}>
        <FormControl isInvalid={'date' in errors}>
          <SelectActivity
            key="selectActivity"
            formData={formData}
            onChangeData={setData}
            label="Actividad"
            keyProp="activity"
          />
          <DateInputPicker
            dateTimeFormat="dddd LL"
            key="dateInputPicker"
            formData={formData}
            onChangeData={setData}
            label="Fecha"
            keyProp="date"
            errors={errors}
            mode="date"
          />
          <Box paddingBottom={2} paddingTop={2}>
            {renderCounters}
          </Box>
          {formData.activity === ACTIVITY_TYPE.REVISIT &&
            buildRevisitsSelection()}
          <View>
            <FormControl.Label
              _text={{
                fontSize: 'md',
              }}>
              Comentarios:
            </FormControl.Label>
            <TextArea
              style={{marginTop: 10}}
              value={formData.additionalInfo}
              onChangeText={(value: string) =>
                setData({...formData, additionalInfo: value})
              }
              h={20}
              size="lg"
              placeholder="Descripcion"
              autoCompleteType={undefined}
            />
          </View>
          <Stack space={1.5} marginLeft="auto" direction={{base: 'row'}}>
            <Button onPress={goBack} variant="ghost" mt="5">
              CANCELAR
            </Button>
            <Button onPress={onSubmit} mt="5">
              AGREGAR
            </Button>
          </Stack>
        </FormControl>
      </VStack>
    </>
  );
};

export default FormNewActivity;
