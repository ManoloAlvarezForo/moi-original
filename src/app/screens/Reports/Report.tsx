/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import moment from 'moment';
import {Box, View, Text} from 'native-base';
import {ReportType} from '../../types/report';
import {capitalizeText} from '../../utils/dates';

type ReportProps = {
  report: ReportType;
};

const Report = ({report}: ReportProps) => {
  const {month} = report;
  const tmpMonth = moment(month, 'M').format('MMMM');
  const formattedMonth = capitalizeText(tmpMonth);

  return (
    <Box
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
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Text fontSize={25} paddingLeft={3}>
            {formattedMonth}
          </Text>
          {report.isDefault && (
            <View
              bg="#b3ff62"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
                marginLeft: 'auto',
                paddingHorizontal: 10,
              }}>
              <Text color="dark.50" fontSize={11}>
                ACTIVO
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-around',
            paddingTop: 20,
            paddingBottom: 20,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text>Horas</Text>
            <Text>{report.hours}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text>Pub.</Text>
            <Text>{report.publications}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text>Videos</Text>
            <Text>{report.videos}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text>Revisitas</Text>
            <Text>{report.revisits}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text>Cursos</Text>
            <Text>{report.bibleStudies}</Text>
          </View>
        </View>
      </View>
    </Box>
  );
};

export default Report;
