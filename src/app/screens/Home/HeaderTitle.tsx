/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Heading, Text, View} from 'native-base';
import {useOfflineUser} from '../../hooks/useOfflineUser';
import PersonIcon from '../../svg/person-outline';
import {useDarkMode} from '../../hooks/useDarkMode';
import {getTranslatedServiceType} from '../../utils/translations';
import {ServiceType} from '../../types/user';
import {Platform} from 'react-native';

type HeaderTitleProps = {
  title: string;
  subTitle?: string;
  showUser: boolean;
};

const HeaderTitle = ({title, subTitle, showUser = true}: HeaderTitleProps) => {
  const {userName, getCurrentUser} = useOfflineUser();
  const user = getCurrentUser();
  const {textColor} = useDarkMode();
  const headerTitle = `${userName} - ${getTranslatedServiceType(
    user?.serviceType || ServiceType.PUBLISHER,
    user?.gender || '',
  )}`;
  // style={{marginBottom: Platform.OS === 'ios' ? 35 : 15}}
  const subtitleView = (
    <Text
      fontSize="sm"
      color={textColor}
      style={{paddingBottom: Platform.OS === 'ios' ? 1 : null}}>
      {subTitle || headerTitle}
    </Text>
  );

  return (
    <>
      <Heading
        color={'primary.600'}
        // marginBottom={Platform.OS === 'ios' ? -3 : null}
        _dark={{color: 'primary.600'}}
        size="sm">
        {title}
      </Heading>
      {showUser && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {!subTitle && (
            <View style={{marginRight: 5}}>
              <PersonIcon size={14} color={textColor} />
            </View>
          )}
          {subtitleView}
        </View>
      )}
      {subTitle && subtitleView}
    </>
  );
};

export default HeaderTitle;
