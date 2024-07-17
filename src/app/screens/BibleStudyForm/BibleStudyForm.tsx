/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  VStack,
  Button,
  FormControl,
  View,
  TextArea,
  Text,
  IconButton,
  CloseIcon,
} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';

import InputForm from '../CreateActivity/InputForm';
import {
  CustomToastProps,
  MESSAGE_TYPE,
} from '../../components/Toast/CustomAlert';
import {useOfflineUser} from '../../hooks/useOfflineUser';
import {BibleStudyType} from '../../types/user';
import useCustomToast from '../../hooks/useCustomToast';
import {useDarkMode} from '../../hooks/useDarkMode';

// name: string;
// gender: 'M' | 'F';
// studyDate: string;
// studyTime: string;
// phone?: string;
// address?: string;
// publication?: string;
// startedDate?: string;
// events?: [];

const bibleStudyInitialState: BibleStudyType = {
  name: '',
  address: '',
  studyDay: '',
  studyTime: '',
  publication: '',
  additionalInfo: '',
  __typename: 'BibleStudy',
};

const BibleStudyForm: React.FC = () => {
  const [formData, setData] = useState<BibleStudyType>(bibleStudyInitialState);
  const [errors] = React.useState({});
  const {addBibleStudy, getBibleStudyById} = useOfflineUser();
  const {themeSecondary, textColor} = useDarkMode();
  const route = useRoute<any>();

  const {goBack} = useNavigation();
  const {showToast} = useCustomToast();

  useEffect(() => {
    if (route && route.params && route.params.revisitId) {
      const {bibleStudyId} = route?.params || null;
      if (bibleStudyId) {
        const foundBibleStudy = getBibleStudyById(bibleStudyId);
        setData(foundBibleStudy);
      }
    }
  }, [getBibleStudyById, route]);

  // const toast = useToast();

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
    addBibleStudy(formData);
    goBack();
    const successToastProps: CustomToastProps = {
      description: 'Se agrego un Estudio Biblico.',
      messageType: MESSAGE_TYPE.SUCCESS,
    };
    showToast(successToastProps);
  };

  const headerTitle = !formData.id
    ? 'Agregar Estudio Biblico'
    : 'Editar Estudio Biblico';
  const buttonLabel = !formData.id ? 'AGREGAR' : 'ACTUALIZAR';

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
        <View>
          <Text fontSize={18} style={{fontWeight: '700'}}>
            {headerTitle}
          </Text>
        </View>
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
          <InputForm
            label="Nombre completo"
            onChangeData={setData}
            formData={formData}
            errors={errors}
            keyProp="name"
            placeholder="Ej. Alberto Plaza Rodriguez"
          />
          <InputForm
            label="Direccion"
            onChangeData={setData}
            formData={formData}
            errors={errors}
            keyProp="address"
            placeholder="Calle Dorbigni #1234"
          />
          <InputForm
            label="Dia de Estudio"
            onChangeData={setData}
            formData={formData}
            errors={errors}
            keyProp="studyDay"
            placeholder="Lunes"
          />
          <InputForm
            label="Hora de Estudio"
            onChangeData={setData}
            formData={formData}
            errors={errors}
            keyProp="studyTime"
            placeholder="Eje. 07:00 pm"
          />
          <InputForm
            label="Publicacion de Estudio"
            onChangeData={setData}
            formData={formData}
            errors={errors}
            keyProp="publication"
            placeholder="El Gran Maestro"
          />
          <View>
            <FormControl.Label
              _text={{
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Informacion adicional
            </FormControl.Label>
            <TextArea
              style={{marginTop: 10}}
              value={formData.additionalInfo}
              h={20}
              onChangeText={value =>
                setData({...formData, additionalInfo: value})
              }
              size="lg"
              placeholder="Informacion"
              autoCompleteType={undefined}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 'auto',
            }}>
            <Button onPress={goBack} variant="ghost" mt="5">
              CANCELAR
            </Button>
            <Button
              // bg="primary.900"
              style={{display: 'flex', marginLeft: 5}}
              onPress={onSubmit}
              mt="5">
              {buttonLabel}
            </Button>
          </View>
        </FormControl>
      </VStack>
    </>
  );
};

export default BibleStudyForm;
