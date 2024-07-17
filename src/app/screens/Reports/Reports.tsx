/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView} from 'native-base';
import {ReportType} from '../../types/report';
import {useDarkMode} from '../../hooks/useDarkMode';
import EmptyView from '../../components/EmptyView';
import {useOfflineReport} from '../../hooks/useOfflineReport';
import Report from './Report';

const Reports: React.FC = () => {
  const {themePrimary} = useDarkMode();
  const {reports = []}: any = useOfflineReport();

  return (
    <>
      {reports && reports.length > 0 ? (
        <ScrollView bg={themePrimary} style={{padding: 10}}>
          {reports.map((report: ReportType, idx: number) => (
            <Report key={idx} report={report} />
          ))}
        </ScrollView>
      ) : (
        <EmptyView label="No tiene informes creados" />
      )}
    </>
  );
};

export default Reports;
