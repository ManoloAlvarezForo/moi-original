/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  Button,
  FormControl,
  Input,
  View,
  Text,
  Heading,
  StatusBar,
  Center,
  Box,
  VStack,
  HStack,
  ScrollView,
  Radio,
  Stack,
} from 'native-base';
import MoiLogo from './svg/moi-logo-3';
import {useOfflineUser} from './hooks/useOfflineUser';
import MoiSelect from './components/Select/MoiSelect';
import {ServiceType} from './types/user';
import {getItemSelectionByGender} from './utils/translations';

export const PANEL_BACKGROUND_COLOR = '#fff';

type PersonalData = {
  name: string;
  service?: ServiceType | '';
  gender?: string;
};

const initialData: PersonalData = {
  name: '',
  service: ServiceType.PUBLISHER,
  gender: 'male',
};

const WelcomePage = () => {
  const {addUser} = useOfflineUser();
  const [formData, setData] = useState<PersonalData>(initialData);
  const [errors, setErrors] = useState({});

  const windowHeight = Dimensions.get('window').height;

  const validateData = (data: PersonalData) => {
    if (data.name === '') {
      setErrors({...errors, name: 'Name is required'});
      return false;
    }

    setErrors({});
    return true;
  };

  const submitUser = () => {
    const {name, service, gender = ''} = formData;
    addUser(name, service || '', gender);
  };

  const onSubmit = () => {
    validateData(formData) && submitUser();
  };

  const onChangeTextHandler = (value: any) => {
    const newData = {...formData, name: value};
    validateData(newData);
    setData(prevState => {
      return {
        ...prevState,
        name: value,
      };
    });
  };

  const onChangeGender = (value: any) => {
    setData(prevState => {
      return {
        ...prevState,
        gender: value,
      };
    });
  };

  const services = getItemSelectionByGender(formData?.gender || '');

  const partOfSong =
    '"Que Jehová te bendiga por tu fe; que recompense tu fidelidad; que con sus alas te guarde él. Jamás te abandona; es el Dios leal."';

  return (
    <ScrollView>
      <StatusBar
        backgroundColor={PANEL_BACKGROUND_COLOR}
        barStyle={'light-content'}
      />
      <Center w="100%" bg={PANEL_BACKGROUND_COLOR} paddingTop={5}>
        <Box p="2" w="90%" h={windowHeight} maxW="300">
          <View style={styles.logo}>
            <MoiLogo height={120} width={120} />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Heading size="lg" marginTop={2} fontWeight="semibold">
              Bienvenido a
            </Heading>
            <Text fontSize="xs">Mi Organizador de Informes</Text>
          </View>
          <VStack space={3} mt="5">
            <FormControl isInvalid={'name' in errors}>
              <FormControl.Label
                style={{marginBottom: 5}}
                _text={{
                  fontSize: 'md',
                }}>
                Nombre completo
              </FormControl.Label>
              <Input
                value={formData.name}
                placeholder="Eje. Matias Alvarez Arispe"
                size="xl"
                width="100%"
                onChangeText={onChangeTextHandler}
              />
              {'name' in errors ? (
                <FormControl.ErrorMessage>
                  Debe ingresar un Nombre
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  * Puede ingresar su Nombre y Apellidos.
                </FormControl.HelperText>
              )}
              <FormControl.Label
                marginTop={3}
                fontWeight="bold"
                _text={{
                  fontSize: 'md',
                }}>
                Seleccione su genero
              </FormControl.Label>
              <Radio.Group
                onChange={onChangeGender}
                value={formData.gender}
                name="genderRadio">
                <Stack
                  direction={{
                    base: 'row',
                  }}
                  alignItems={{
                    base: 'flex-start',
                    md: 'center',
                  }}
                  space={4}
                  w="75%"
                  maxW="300px">
                  <Radio value="male" size="md" my={1}>
                    Hombre
                  </Radio>
                  <Radio value="famele" size="md" my={1}>
                    Mujer
                  </Radio>
                </Stack>
              </Radio.Group>
              <FormControl.Label
                marginTop={3}
                fontWeight="bold"
                _text={{
                  fontSize: 'md',
                }}>
                Seleccione su tipo de servicio
              </FormControl.Label>
              <MoiSelect
                isDisabled={formData.gender === ''}
                items={services || []}
                placeHolder="Seleccione un tipo"
                formData={formData}
                keyProp="service"
                onChangeData={setData}
                hasDefaultItem
              />
            </FormControl>
            <Button
              style={{display: 'flex', justifyContent: 'center'}}
              onPress={onSubmit}
              mt="2">
              INGRESAR
            </Button>
            <HStack mt="2" justifyContent="center">
              <Text
                fontSize="xs"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                {partOfSong}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginRight: 15,
    marginLeft: 15,
    backgroundColor: PANEL_BACKGROUND_COLOR,
  },
  logo: {
    height: '20%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  inputContainer: {
    height: '50%',
    width: '100%',
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  mainPanel: {
    height: 800,
    width: '100%',
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#fafafa',
  },
});

export default WelcomePage;
