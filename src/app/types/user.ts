export const REVISIT_STATUS_TYPE = {
  DONE: 'done',
  PENDING: 'pending',
  ARCHIVED: 'archived',
};

export const BIBLE_STUDY_STATUS_TYPE = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
};

export type UserConfiguration = {
  language?: string;
  colorMode?: string;
};

export type BibleStudyType = {
  id?: string;
  name: string;
  gender?: 'M' | 'F';
  studyDay?: string;
  studyTime?: string;
  phone?: string;
  address?: string;
  publication?: string;
  startedDate?: string;
  events?: [];
  additionalInfo?: string;
  status?: 'active' | 'archived';
  __typename?: string;
};

export type RevisitType = {
  id?: string;
  name: string;
  dateToReturn?: any;
  timeToReturn?: any;
  address?: string;
  additionalInfo?: string;
  status?: 'done' | 'pending' | 'archived';
  __typename?: string;
};

export enum ServiceType {
  PUBLISHER = 'publisher',
  PIONEER = 'pioneer',
}

export type UserType = {
  name: string;
  email: string;
  gender: string;
  id: string;
  token: string;
  bibleStudies?: BibleStudyType[];
  revisits?: any[];
  configuration?: UserConfiguration;
  serviceType: ServiceType | '';
  __typename?: string;
};
