/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  VStack,
  Button,
  FormControl,
  View,
  TextArea,
  IconButton,
  CloseIcon,
  Heading,
  Box,
  Stack,
} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import InputForm from '../CreateActivity/InputForm';
import {
  CustomToastProps,
  MESSAGE_TYPE,
} from '../../components/Toast/CustomAlert';
import useCustomToast from '../../hooks/useCustomToast';
import {useOfflineUser} from '../../hooks/useOfflineUser';
import {RevisitType} from '../../types/user';
import {useDarkMode} from '../../hooks/useDarkMode';
import moment from 'moment';
import DateInputPicker from '../CreateActivity/DateInputPicker';
import TimeInputPicker from '../CreateActivity/TimeInputPicker';

const initialState: RevisitType = {
  name: '',
  dateToReturn: moment().add(7, 'days').format('YYYY-MM-DD'),
  timeToReturn: moment(),
  address: '',
  additionalInfo: '',
  status: 'pending',
};

const RevisitForm = () => {
  const [formData, setData] = useState<RevisitType>(initialState);
  const [errors, setErrors] = useState({});
  const {addRevisit, updateRevisit, getRevisitById} = useOfflineUser();
  const route = useRoute<any>();
  const {goBack} = useNavigation();
  const {showToast} = useCustomToast();
  const {primary600, themeSecondary} = useDarkMode();

  useEffect(() => {
    if (route && route.params && route.params.revisitId) {
      const {revisitId} = route?.params || null;
      if (revisitId) {
        const foundRevisit = getRevisitById(revisitId);
        setData(foundRevisit);
      }
    }
  }, [getRevisitById, route]);

  const isValidForm = (data: RevisitType) => {
    let errorValues = {};
    if (data.name === '') {
      errorValues = {
        ...errorValues,
        name: {message: 'El Nombre es requerido.'},
      };
    }

    if (data.address === '') {
      errorValues = {
        ...errorValues,
        address: {message: 'La Direccion es requerida.'},
      };
    }

    if (errorValues) {
      setErrors(errorValues);
    } else {
      setErrors({});
      errorValues = {};
    }

    return Object.entries(errorValues).length === 0;
  };

  const submit = () => {
    let messageToastProps: CustomToastProps;

    if (!formData.id) {
      addRevisit(formData);
      messageToastProps = {
        description: 'Se agrego una Revisita',
        messageType: MESSAGE_TYPE.SUCCESS,
      };
    } else {
      updateRevisit(formData);
      messageToastProps = {
        description: 'Se actualizo la Revisita',
        messageType: MESSAGE_TYPE.SUCCESS,
      };
    }

    goBack();
    showToast(messageToastProps);
  };

  const onSubmit = () => {
    isValidForm(formData) && submit();
  };

  const headerTitle = !formData.id ? 'Agregar Revisita' : 'Editar Revisita';
  const buttonLabel = !formData.id ? 'AGREGAR' : 'ACTUALIZAR';

  return (
    <>
      <View
        height={50}
        bg={themeSecondary}
        display="flex"
        flexDir="row"
        justifyContent="center"
        alignItems="center"
        marginBottom="2"
        paddingX="3">
        <Heading color="primary.600" size="sm">
          {headerTitle}
        </Heading>
        <View style={{display: 'flex', marginLeft: 'auto'}}>
          <IconButton
            onPress={() => goBack()}
            rounded="full"
            size="sm"
            icon={<CloseIcon color={primary600} />}
          />
        </View>
      </View>
      <VStack space={2} marginBottom="20" paddingX={2}>
        <InputForm
          label="Nombre completo"
          onChangeData={setData}
          formData={formData}
          errors={errors}
          keyProp="name"
          isValidForm={isValidForm}
          placeholder="Ej. Alberto Plaza Rodriguez"
        />
        <InputForm
          label="Direccion"
          onChangeData={setData}
          formData={formData}
          errors={errors}
          isValidForm={isValidForm}
          keyProp="address"
          placeholder="Calle Dorbigni #1234"
        />
        <DateInputPicker
          dateTimeFormat="dddd LL"
          key="dateInputPicker"
          formData={formData}
          onChangeData={setData}
          label="Fecha"
          keyProp="dateToReturn"
          errors={errors}
          mode="date"
        />
        <TimeInputPicker
          title="Hora"
          mode="time"
          dateTimeFormat="hh:mm A"
          key="timeToReturnInputPicker"
          formData={formData}
          onChangeData={setData}
          label="Hora"
          keyProp="timeToReturn"
          errors={errors}
        />
        <View>
          <FormControl.Label
            _text={{
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Comentarios
          </FormControl.Label>
          <TextArea
            style={{marginTop: 10}}
            value={formData.additionalInfo}
            height={20}
            onChangeText={value =>
              setData({...formData, additionalInfo: value})
            }
            size="lg"
            placeholder="Comentarios"
            autoCompleteType={undefined}
          />
        </View>
        <Box
          display="flex"
          flexDirection="row"
          marginLeft="auto"
          marginTop={10}>
          <Stack space={2} direction={{base: 'row'}}>
            <Button onPress={goBack} variant="ghost">
              CANCELAR
            </Button>
            <Button onPress={onSubmit}>{buttonLabel}</Button>
          </Stack>
        </Box>
      </VStack>
    </>
  );
};

export default RevisitForm;
