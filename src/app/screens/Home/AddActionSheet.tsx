import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Actionsheet, Box, Text} from 'native-base';
import PersonAddIcon from '../../svg/person-add-outline';
import TimeIcon from '../../svg/time-outline';
import RevisitIcon from '../../svg/people-outline';
import {useDarkMode} from '../../hooks/useDarkMode';

type AddActionSheetProps = {
  isOpen: boolean;
  onClose: (arg0?: boolean) => void;
};

const AddActionSheet: React.FC<AddActionSheetProps> = ({
  isOpen,
  onClose,
}: AddActionSheetProps) => {
  const {navigate} = useNavigation<any>();
  const {textColor, isDark} = useDarkMode();
  const onCreateActivityHandler = () => {
    navigate('CreateActivity');
    onClose(true);
  };

  const onCreateBibleStudyHandler = () => {
    navigate('CreateBibleStudy');
    onClose(true);
  };

  const onCreateRevisitHandler = () => {
    navigate('CreateRevisit');
    onClose(true);
  };

  const bgColor = {backgroundColor: isDark ? 'gray.500' : 'dark.700'};

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
      <Actionsheet.Content>
        <Box w="100%" h={60} px={4} justifyContent="center">
          <Text
            fontSize="16"
            color="gray.500"
            _dark={{
              color: 'gray.300',
            }}>
            Agregar
          </Text>
        </Box>
        <Actionsheet.Item
          _pressed={bgColor}
          onPress={onCreateActivityHandler}
          startIcon={<TimeIcon size={24} color={textColor} />}>
          Actividad
        </Actionsheet.Item>
        <Actionsheet.Item
          _pressed={bgColor}
          onPress={onCreateRevisitHandler}
          startIcon={<RevisitIcon size={24} color={textColor} />}>
          Revisita
        </Actionsheet.Item>
        <Actionsheet.Item
          _pressed={bgColor}
          onPress={onCreateBibleStudyHandler}
          startIcon={<PersonAddIcon size={24} color={textColor} />}>
          Estudio Biblico
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default AddActionSheet;
