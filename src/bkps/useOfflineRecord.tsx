import {useCallback} from 'react';
import {useApolloClient} from '@apollo/client';
import {DEFAULT_REPORT_GQL} from '../screens/Reports/gqlQueries';
import {ActivityPropsType} from '../types/activities';
import moment from 'moment';
import {useOfflineReport} from './useOfflineReport';
import useCustomToast from './useCustomToast';
import {CustomToastProps, MESSAGE_TYPE} from '../components/Toast/CustomAlert';

export function useOfflineRecord() {
  const {cache} = useApolloClient();
  const {defaultReport, getDefaultReport} = useOfflineReport();
  const {showToast} = useCustomToast();

  const updateDefaultReport = useCallback(
    (
      defaultReportToUpdate: any,
      successCallback: any = null,
      errorCallback: any = null,
    ) => {
      try {
        cache.updateQuery(
          {
            query: DEFAULT_REPORT_GQL,
            variables: {...defaultReport, ...defaultReportToUpdate},
          },
          () => ({
            defaultReport: {...defaultReport, ...defaultReportToUpdate},
          }),
        );
        successCallback && successCallback();
      } catch (error: any) {
        console.log('Error: ', error.message);
        errorCallback && errorCallback();
      }
    },
    [cache, defaultReport],
  );

  const buildActivitiesByDate = (newActivities: any) => {
    const activitiesByDate = newActivities.reduce(
      (group: any, newActivity: any) => {
        const formattedDate = moment(newActivity.date).format('YYYY-MM-DD');

        group[formattedDate] = group[formattedDate] ?? [];
        group[formattedDate].push(newActivity);
        return group;
      },
      {},
    );

    return activitiesByDate;
  };

  const addRevisit = useCallback(() => {
    const newDefaultReport = {
      bibleStudies: defaultReport.revisits + 1,
    };

    updateDefaultReport(newDefaultReport);
  }, [defaultReport?.revisits, updateDefaultReport]);

  const addBibleStudy = useCallback(() => {
    const newDefaultReport = {
      bibleStudies: defaultReport.bibleStudies + 1,
    };

    updateDefaultReport(newDefaultReport);
  }, [defaultReport?.bibleStudies, updateDefaultReport]);

  const updateActivity = useCallback(
    (activityToAdd: ActivityPropsType) => {
      const foundActivity = defaultReport.activities.find(
        (a: any) => a.id === activityToAdd.id,
      );

      const filteredActivities = defaultReport.activities.filter(
        (a: any) => a.id !== foundActivity.id,
      );

      const newActivity = {...foundActivity, ...activityToAdd};
      const newActivities = [...filteredActivities, newActivity];

      const activitiesByDate = buildActivitiesByDate(newActivities);

      const tempHours =
        foundActivity.hours > activityToAdd.hours
          ? foundActivity.hours - activityToAdd.hours
          : activityToAdd.hours - foundActivity.hours;

      const tempRevisits =
        foundActivity.revisits > activityToAdd.revisits
          ? foundActivity.revisits - activityToAdd.revisits
          : activityToAdd.revisits - foundActivity.revisits;

      const tempVideos =
        foundActivity.videos > activityToAdd.videos
          ? foundActivity.videos - activityToAdd.videos
          : activityToAdd.videos - foundActivity.videos;

      const tempPublications =
        foundActivity.publications > activityToAdd.publications
          ? foundActivity.publications - activityToAdd.publications
          : activityToAdd.publications - foundActivity.publications;

      const newHours =
        foundActivity.hours > activityToAdd.hours
          ? defaultReport.hours - tempHours
          : defaultReport.hours + tempHours;

      const newPublications =
        activityToAdd.publications === 0
          ? activityToAdd.publications
          : foundActivity.publications > activityToAdd.publications
          ? defaultReport.publications - tempPublications
          : defaultReport.publications + tempPublications;

      const newRevisits =
        activityToAdd.revisits === 0
          ? activityToAdd.revisits
          : foundActivity.revisits > activityToAdd.revisits
          ? defaultReport.revisits - tempRevisits
          : defaultReport.revisits + tempRevisits;

      const newVideos =
        activityToAdd.videos === 0
          ? activityToAdd.videos
          : foundActivity.videos > activityToAdd.videos
          ? defaultReport.videos - tempVideos
          : defaultReport.videos + tempVideos;

      const newDefaultReport = {
        hours: newHours,
        publications: newPublications,
        revisits: newRevisits,
        videos: newVideos,
        activities: newActivities,
        activitiesByDate: activitiesByDate,
      };

      updateDefaultReport(newDefaultReport);
    },
    [
      defaultReport?.activities,
      defaultReport?.publications,
      defaultReport?.hours,
      defaultReport?.revisits,
      defaultReport?.videos,
      updateDefaultReport,
    ],
  );

  const addActivity = useCallback(
    (activityToAdd: ActivityPropsType) => {
      const newActivity = {id: Date.now(), ...activityToAdd};
      const newActivities = [...defaultReport.activities, newActivity];

      const activitiesByDate = buildActivitiesByDate(newActivities);

      const newDefaultReport = {
        hours: defaultReport.hours + activityToAdd.hours,
        publications: defaultReport.publications + activityToAdd.publications,
        revisits: defaultReport.revisits + activityToAdd.revisits,
        videos: defaultReport.videos + activityToAdd.videos,
        // TODO: Refactor add activity in the array to merged t
        activities: newActivities,
        activitiesByDate: activitiesByDate,
        // __typename: 'Report',
        // id: foundDefaultReport.id,
        // userId: foundDefaultReport.userId,
        // month: foundDefaultReport.month,
        // year: foundDefaultReport.year,
        // isDefault: foundDefaultReport.isDefault,
        // bibleStudies: foundDefaultReport.bibleStudies,
        // isCompleted: foundDefaultReport.isCompleted,
        // isSent: foundDefaultReport.isSent,
      };

      updateDefaultReport(newDefaultReport);
    },
    [defaultReport, updateDefaultReport],
  );

  const deleteActivitySuccessCallback = useCallback(() => {
    const successRevisit: CustomToastProps = {
      description: 'Actividad eliminada correctamente',
      messageType: MESSAGE_TYPE.SUCCESS,
    };

    showToast(successRevisit);
  }, [showToast]);

  const deleteActivityErrorCallback = useCallback(() => {
    const errorRevisit: CustomToastProps = {
      description: 'Hubo un error al tratar de eliminar la actividad',
      messageType: MESSAGE_TYPE.ERROR,
    };

    showToast(errorRevisit);
  }, [showToast]);

  // TODO: Refactor 'activityToBeRemoved' param for the properly type.
  const deleteActivity = useCallback(
    (activityToBeRemoved: any) => {
      const filteredActivities = defaultReport.activities.filter(
        (a: any) => a.id !== activityToBeRemoved.id,
      );
      const activitiesByDate = buildActivitiesByDate(filteredActivities);

      const newDefaultReport = {
        hours: defaultReport.hours - activityToBeRemoved.hours,
        publications:
          defaultReport.publications - activityToBeRemoved.publications,
        revisits: defaultReport.revisits - activityToBeRemoved.revisits,
        videos: defaultReport.videos - activityToBeRemoved.videos,
        activities: filteredActivities,
        activitiesByDate: activitiesByDate,
      };

      updateDefaultReport(
        newDefaultReport,
        deleteActivitySuccessCallback,
        deleteActivityErrorCallback,
      );
    },
    [
      deleteActivitySuccessCallback,
      defaultReport?.activities,
      defaultReport?.hours,
      defaultReport?.publications,
      defaultReport?.revisits,
      defaultReport?.videos,
      deleteActivityErrorCallback,
      updateDefaultReport,
    ],
  );

  const getActivityById = useCallback(
    (id: string) => {
      const currentDefaultReport = getDefaultReport();
      const foundActivity = currentDefaultReport.activities.find(
        (a: any) => a.id === id,
      );

      return foundActivity;
    },
    [getDefaultReport],
  );

  return {
    addRevisit,
    addBibleStudy,
    addActivity,
    updateActivity,
    deleteActivity,
    getActivityById,
  };
}
