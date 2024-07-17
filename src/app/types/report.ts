import {ActivityByDate, ActivityPropsType} from './activities';

export type ReportType = {
  id?: string;
  userId?: string;
  month?: string;
  year?: string;
  hours: number;
  videos: number;
  bibleStudies: number;
  revisits: number;
  publications: number;
  isCompleted?: boolean;
  isDefault?: boolean;
  isSent?: boolean;
  activities?: ActivityPropsType[];
  activitiesByDate?: ActivityByDate;
  __typename?: 'Report';
};

// export type ReportType = {
//   id?: string;
//   month?: string;
//   year?: string;
//   hours: number;
//   videos: number;
//   publications: number;
//   bibleStudies: number;
//   revisits: number;
//   isDefault?: boolean;
//   isCompleted?: boolean;
//   isSent?: boolean;
// };
