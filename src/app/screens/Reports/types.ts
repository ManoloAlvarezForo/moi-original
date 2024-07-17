export type ReportType = {
  id?: string;
  month?: string;
  year?: string;
  hours: number;
  videos: number;
  publications: number;
  bibleStudies: number;
  revisits: number;
  isDefault?: boolean;
  isCompleted?: boolean;
  isSent?: boolean;
};

// export type DefaultReportType = {
//   defaultReport: ReportType;
// };

export type PillDataType = {
  id: string;
  title: string;
};
