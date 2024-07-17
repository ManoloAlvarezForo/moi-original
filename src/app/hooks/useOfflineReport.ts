import {useCallback, useEffect, useMemo, useState} from 'react';
import {useApolloClient, useQuery} from '@apollo/client';
import {DEFAULT_REPORT_GQL, GET_REPORTS} from '../screens/Reports/gqlQueries';
import {useOfflineUser} from './useOfflineUser';
import moment from 'moment';
import {ReportType} from '../types/report';

export function useOfflineReport() {
  const [defaultReport, setDefaultReport] = useState<any>();
  // const [hasActivities, setHasActivities] = useState(false);
  const [reports, setReports] = useState<[ReportType]>();

  const {cache} = useApolloClient();
  const {userId} = useOfflineUser();

  const {
    loading: reportsLoading,
    error: reportsError,
    data: dataReports,
  } = useQuery(GET_REPORTS, {
    fetchPolicy: 'cache-only',
  });

  useEffect(() => {
    if (dataReports && !reportsLoading && !reportsError) {
      const newDefaultReport = dataReports?.reports?.find(
        (r: any) => r.isDefault === true,
      );
      setReports(dataReports?.reports);
      setDefaultReport(newDefaultReport || undefined);
    }
  }, [dataReports, reportsError, reportsLoading]);

  const getDefaultReport = useCallback(() => {
    const response: any = cache.readQuery({
      query: DEFAULT_REPORT_GQL,
      variables: {userId},
    });
    return response?.defaultReport;
  }, [cache, userId]);

  const addReport = useCallback(
    (monthParam: string, yearParam: string) => {
      const newDefaultReport: ReportType = {
        id: `report-${monthParam}-${yearParam}`,
        userId,
        month: monthParam,
        year: yearParam,
        isDefault: true,
        hours: 0,
        videos: 0,
        bibleStudies: 0,
        revisits: 0,
        isCompleted: false,
        publications: 0,
        isSent: false,
        activities: [],
        activitiesByDate: {},
        __typename: 'Report',
      };

      const data: any = cache.readQuery({query: GET_REPORTS});

      cache.writeQuery({
        query: GET_REPORTS,
        data: {
          reports: [...(data?.reports || []), newDefaultReport],
        },
      });

      cache.writeQuery({
        query: DEFAULT_REPORT_GQL,
        variables: {userId},
        data: {
          defaultReport: newDefaultReport,
        },
      });
    },
    [cache, userId],
  );

  const deleteReport = useCallback(
    async (id: string) => {
      cache.modify({
        fields: {
          reports(reportsRef, {readField}) {
            const filteredReports = reportsRef.filter(
              (reportRef: any) => id !== readField('id', reportRef),
            );

            return filteredReports.length === 0 ? [] : filteredReports;
          },
        },
      });
    },
    [cache],
  );

  const defaultReportParsedMonth = useMemo(async () => {
    const {month}: any = (await defaultReport) || '';
    return moment(month, 'M').format('MMMM');
  }, [defaultReport]);

  // TODO: Should I move this method to utils?
  const getParsedMonth = (monthParam: string) => {
    return moment(monthParam, 'M').format('MMMM');
  };

  const defaultReportParsedYear = useMemo(async () => {
    const {year}: any = (await defaultReport) || '';
    return moment(year, 'Y').format('YYYY');
  }, [defaultReport]);

  const hasActivities = useMemo(() => {
    return defaultReport?.activities.length > 0;
  }, [defaultReport?.activities.length]);

  // const hasDefaultReportActivities = useCallback(() => {
  //   const defaultReportFound = getDefaultReport();
  //   return !!defaultReportFound?.activities.length;
  // }, [getDefaultReport]);

  const defaultReportParsedMonthAndYear = useMemo(() => {
    return `${defaultReportParsedMonth} ${defaultReportParsedYear}`;
  }, [defaultReportParsedMonth, defaultReportParsedYear]);

  return {
    addReport,
    defaultReportParsedMonth,
    defaultReportParsedYear,
    defaultReportParsedMonthAndYear,
    defaultReport,
    hasActivities,
    setDefaultReport,
    getDefaultReport,
    getParsedMonth,
    deleteReport,
    reports,
  };
}
