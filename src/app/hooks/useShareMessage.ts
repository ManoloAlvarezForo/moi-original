import {Share} from 'react-native';
import moment from 'moment';
import {useOfflineUser} from './useOfflineUser';
import {useOfflineReport} from './useOfflineReport';
import {ServiceType} from '../types/user';

export function useShareMessage() {
  const {userName, user} = useOfflineUser();
  const {defaultReport} = useOfflineReport();
  const isPublisher = user?.serviceType === ServiceType.PUBLISHER;

  // Manolo Alvarez
  // SI participe en alguna faceta
  // de la predicación durante el mes de Diciembre

  const buildPublisherMessage = () => {
    const nameOfReporter = `*${userName.toUpperCase()}*\n`;
    const {month} = defaultReport;
    const monthFormatted = moment(month, 'M').format('MMMM');
    const upperCaseMonth = monthFormatted.toUpperCase();
    return `${nameOfReporter} *SI* participe en alguna faceta de la predicacion durante el mes de *${upperCaseMonth}*`;
  };

  const buildReportMessageToSend = () => {
    const nameOfReporter = `${userName.toUpperCase()}\n`;
    const {hours, publications, videos, revisits, bibleStudies, month} =
      defaultReport;
    const monthFormatted = moment(month, 'M').format('MMMM');
    const upperCaseMonth = monthFormatted.toUpperCase();
    // const monthCapitalized = monthFormatted.charAt(0).toUpperCase() + monthFormatted.slice(1);
    const monthText = `Informe de: ${upperCaseMonth}\n`;
    const hoursText = hours ? `Horas:  ${hours}.\n` : '\n';
    const publicationsText = publications
      ? `Publicaciones: ${publications}.\n`
      : '\n';
    const videosText = videos ? `Videos: ${videos}.\n` : '';
    const revisitsText = revisits ? `Revisitas: ${revisits}.\n` : '';
    const bibleStudiesText = bibleStudies
      ? `Cursos Biblicos: ${bibleStudies}.`
      : '';

    return `${nameOfReporter}${monthText}${hoursText}${publicationsText}${videosText}${revisitsText}${bibleStudiesText}`;
  };

  const onShareMessage = async (message: string) => {
    try {
      const result = await Share.share({
        message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          // console.log('Active Type: ', result.activityType);
          // TODO: Here the action to notify to defaultReport was sent.
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        // console.log('result.action: ', result.action);
        // dismissed
      }
    } catch (error: any) {
      console.log('Error: ', error.message);
    }
  };

  const shareReport = async () => {
    const reportMessage = isPublisher
      ? buildPublisherMessage()
      : buildReportMessageToSend();
    await onShareMessage(reportMessage);
  };

  return {
    onShareMessage,
    shareReport,
  };
}
