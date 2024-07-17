import React from 'react';
import Pill from '../Pill';
import TimeIcon from '../../../../svg/time-outline';
import PubIcon from '../../../../svg/newspaper-outline';
import VideoIcon from '../../../../svg/play-circle-outline';
import PeopleIcon from '../../../../svg/people-outline';
import BookIcon from '../../../../svg/book-outline';
import {REPORT_COLORS} from '../../../../themes/colors';
import 'moment/locale/es';
import {useOfflineUser} from '../../../../hooks/useOfflineUser';
import {ServiceType} from '../../../../types/user';
// import {useColorMode} from 'native-base';
import {useOfflineReport} from '../../../../hooks/useOfflineReport';
import {Dimensions, StyleSheet} from 'react-native';
import {View} from 'react-native';
import {PILL_TEXT_AND_ICON_COLOR} from '../Pill/Pill';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 40) / 2;

export type ReportDetailProps = {
  hours: number;
  videos: number;
  publications: number;
  userBibleStudies: number;
  revisits: number;
  onlyRevisitsAndBibleCourses: boolean;
};

const ReportDetail: React.FC<ReportDetailProps> = ({
  hours = 0,
  videos = 0,
  publications = 0,
  userBibleStudies = 0,
  revisits = 0,
  onlyRevisitsAndBibleCourses = false,
}: ReportDetailProps) => {
  const {user} = useOfflineUser();
  const {getDefaultReport} = useOfflineReport();
  const defaultReport = getDefaultReport();
  // const {colorMode} = useColorMode();
  // const isDarkMode = colorMode === 'dark';
  // const DEFAULT_ICON_COLOR = isDarkMode ? 'white' : 'black';
  const DEFAULT_ICON_SIZE = 24;
  const DEFAULT_ICON_COLOR = PILL_TEXT_AND_ICON_COLOR;

  const bibleCoursesOnly = [
    {
      id: 'Cursos Biblicos',
      title: userBibleStudies,
      icon: <BookIcon size={DEFAULT_ICON_SIZE} color={DEFAULT_ICON_COLOR} />,
      bc: REPORT_COLORS.bibleStudies,
      isDisabled: false,
    },
  ];

  const pillData = [
    {
      id: 'Horas',
      title: hours,
      icon: <TimeIcon size={DEFAULT_ICON_SIZE} color={DEFAULT_ICON_COLOR} />,
      bc: REPORT_COLORS.hours,
      isDisabled: user?.serviceType === ServiceType.PUBLISHER,
    },
    {
      id: 'Publicaciones',
      title: publications,
      icon: <PubIcon size={DEFAULT_ICON_SIZE} color={DEFAULT_ICON_COLOR} />,
      bc: REPORT_COLORS.publications,
      isDisabled: user?.serviceType === ServiceType.PUBLISHER,
    },
    {
      id: 'Videos',
      title: videos,
      icon: <VideoIcon size={DEFAULT_ICON_SIZE} color={DEFAULT_ICON_COLOR} />,
      bc: REPORT_COLORS.videos,
      isDisabled: user?.serviceType === ServiceType.PUBLISHER,
    },
    {
      id: 'Revisitas',
      title: revisits,
      icon: <PeopleIcon size={DEFAULT_ICON_SIZE} color={DEFAULT_ICON_COLOR} />,
      bc: REPORT_COLORS.revisits,
      isDisabled: !defaultReport,
    },
    ...bibleCoursesOnly,
  ];

  const allPillData = (
    <View style={styles.container}>
      {pillData.map((item, index) => {
        return <Pill key={index} {...item} size={cardWidth} />;
      })}
    </View>
  );

  const BibleCoursesMap = (
    <>
      {bibleCoursesOnly.map((item, index) => {
        return <Pill key={index} {...item} size={cardWidth} />;
      })}
    </>
  );

  return <>{onlyRevisitsAndBibleCourses ? BibleCoursesMap : allPillData}</>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default ReportDetail;
