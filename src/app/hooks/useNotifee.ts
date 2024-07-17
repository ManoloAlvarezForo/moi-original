import {
  AndroidStyle,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import notifee from '@notifee/react-native';
import {capitalizeText} from '../utils/dates';
import moment from 'moment';

export enum EVENT_REMINDER_TYPE {
  ONE_DAY_BEFORE,
  ONE_HOUR_BEFORE,
  FIFTEEN_MINUTES_BEFORE,
}

type TriggerProps = {
  title: string;
  body: string;
  channelId: string;
  eventDate: any;
  eventReminders: EVENT_REMINDER_TYPE[];
};

export default function useNotifee() {
  function buildRevisitNotificationMessage(revisit: any, eventReminders: any) {
    const channelId = String(revisit.id);
    const title =
      '<p style="color: #FF6D40;"><b>Recordatorio de Revisita</b></p>';
    const formattedDate = capitalizeText(
      moment(revisit.dateToReturn).format('dddd LL'),
    );

    const targetTime = new Date(revisit.timeToReturn);
    const targetTimestamp = targetTime.getTime();
    const targetDateTime = moment(targetTimestamp).format('h:mm A');
    const body = `<b>${revisit.name}</b> para el <b>${formattedDate}</b> a horas: <b>${targetDateTime}</b>`;
    // const body = `<p><b>Persona: </b>${revisit.name}</p></br><p><b>Fecha: </b>${formattedDate}<b></p></br><p></p>Hora: </b>${targetDateTime}</p>`;
    return {
      title,
      body,
      channelId,
      eventReminders,
      eventDate: targetTimestamp,
    };
  }

  async function onCreateTriggerNotification({
    title,
    body,
    channelId,
    eventDate,
    eventReminders,
  }: TriggerProps) {
    eventReminders.forEach(async (reminder: any) => {
      console.log('eventDate.getTime  ', eventDate);
      let triggerTime: number;

      switch (reminder) {
        case EVENT_REMINDER_TYPE.ONE_DAY_BEFORE:
          triggerTime = eventDate - 24 * 60 * 60 * 1000;
          break;
        case EVENT_REMINDER_TYPE.ONE_HOUR_BEFORE:
          triggerTime = eventDate - 60 * 60 * 1000;
          break;
        case EVENT_REMINDER_TYPE.FIFTEEN_MINUTES_BEFORE:
          triggerTime = eventDate - 1 * 60 * 1000;
          break;
        default:
          console.error('Invalid reminder type');
          return;
      }

      console.log('triggerTime ===>>> ', triggerTime);

      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: triggerTime,
      };

      const channelIdToNotifee = await notifee.createChannel({
        id: channelId,
        name: 'moi_channel',
        sound: 'bell',
      });

      await notifee.createTriggerNotification(
        {
          title,
          body,
          android: {
            style: {
              type: AndroidStyle.BIGTEXT,
              text: body,
            },
            sound: 'bell',
            channelId: channelIdToNotifee,
            smallIcon: 'ic_launcher',
            largeIcon: require('../assets/images/moi_icon.png'),
          },
        },
        trigger,
      );
    });
  }

  return {
    onCreateTriggerNotification,
    buildRevisitNotificationMessage,
  };
}
