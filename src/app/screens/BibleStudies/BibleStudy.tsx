/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Box, IconButton, Menu, Text, useTheme, View} from 'native-base';
import {BibleStudyType} from '../../types/user';
import EllipsisIconOutline from '../../svg/ellipsis-vertical';
// import BookIcon from '../../svg/book-outline';
import {APP_COLORS, REPORT_COLORS} from '../../themes/colors';

const BIBLE_STUDY_STATUS = {
  active: {bg: REPORT_COLORS.bibleStudies, label: 'Activo'},
  archived: {bg: REPORT_COLORS.revisits, label: 'Archivado'},
};

type BibleStudyProps = {
  bibleStudy: BibleStudyType;
};

const BibleStudy: React.FC<BibleStudyProps> = ({
  bibleStudy,
}: BibleStudyProps) => {
  const {
    colors: {primary},
  } = useTheme();

  return (
    <Box
      marginBottom={1}
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <View
          paddingLeft={2}
          paddingTop={1}
          paddingBottom={1}
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <View
            paddingTop={2}
            paddingBottom={2}
            marginLeft={1}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <View style={{marginBottom: 5}}>
              <Text fontSize={20}>{bibleStudy.name}</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'baseline',
                }}>
                <View
                  rounded="sm"
                  bg={BIBLE_STUDY_STATUS[bibleStudy.status || 'active'].bg}>
                  <Text
                    fontSize={11}
                    paddingLeft={1.5}
                    paddingRight={1.5}
                    paddingBottom={0.5}
                    _dark={{color: 'black'}}
                    _light={{color: 'white'}}
                    style={{fontWeight: '500'}}>
                    {BIBLE_STUDY_STATUS[bibleStudy.status || 'active'].label}
                  </Text>
                </View>
              </View>
              {/* <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  marginLeft: 3,
                }}>
                <View rounded="sm" bg="gray.500">
                  <Text
                    fontSize={11}
                    paddingLeft={1.5}
                    paddingRight={1.5}
                    paddingBottom={0.5}
                    _dark={{color: 'black'}}
                    _light={{color: 'white'}}
                    style={{fontWeight: '500'}}>
                    6 mins atras
                  </Text>
                </View>
              </View> */}
            </View>
          </View>
          <View style={{display: 'flex', marginLeft: 'auto'}}>
            <Menu
              trigger={triggerProps => {
                return (
                  <IconButton marginLeft={-5} rounded="full" {...triggerProps}>
                    <EllipsisIconOutline size={18} color={primary[600]} />
                  </IconButton>
                );
              }}>
              <Menu.Item onPress={() => {}}>Editar</Menu.Item>
              <Menu.Item onPress={() => {}}>Eliminar</Menu.Item>
              <Menu.Item onPress={() => {}}>Archivar</Menu.Item>
            </Menu>
          </View>
        </View>
        <View
          paddingBottom={5}
          paddingLeft={3}
          paddingRight={3}
          style={{
            flexDirection: 'column',
            display: 'flex',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <View marginTop={2} marginBottom={0.5}>
              <Text>Direccion</Text>
            </View>
            <View
              rounded="sm"
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={2}
              paddingRight={2}
              _dark={{
                backgroundColor: 'gray.600',
              }}
              _light={{
                backgroundColor: APP_COLORS.appGrayLow,
              }}>
              <Text>{bibleStudy.address}</Text>
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <View marginTop={2} marginBottom={0.5}>
              <Text>Dia y Hora</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <View
                rounded="sm"
                marginRight={1}
                paddingTop={1}
                paddingBottom={1}
                paddingLeft={2}
                paddingRight={2}
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
                <Text>{bibleStudy.studyDay}</Text>
              </View>
              <View
                rounded="sm"
                paddingTop={1}
                paddingBottom={1}
                paddingLeft={2}
                paddingRight={2}
                marginRight={1}
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
                <Text>{bibleStudy.studyTime}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <View marginTop={2} marginBottom={0.5}>
              <Text>Publicacion</Text>
            </View>
            <View
              rounded="sm"
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={2}
              paddingRight={2}
              _dark={{
                backgroundColor: 'gray.600',
              }}
              _light={{
                backgroundColor: APP_COLORS.appGrayLow,
              }}>
              <Text>{bibleStudy.publication}</Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <View marginTop={2} marginBottom={0.5}>
              <Text>Informacion adicional</Text>
            </View>
            <View
              rounded="sm"
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={2}
              paddingRight={2}
              _dark={{
                backgroundColor: 'gray.600',
              }}
              _light={{
                backgroundColor: APP_COLORS.appGrayLow,
              }}>
              <Text>{bibleStudy.additionalInfo}</Text>
            </View>
          </View>
        </View>
      </View>
    </Box>
  );
};

export default BibleStudy;
