import {gql} from '@apollo/client';

export const DEFAULT_REPORT_GQL = gql`
  query DefaultReport($userId: String) {
    defaultReport(userId: $userId) @persist {
      id
      month
      year
      hours
      videos
      bibleStudies
      revisits
      isDefault
      isCompleted
      publications
      isSent
      activities
      activitiesByDate
    }
  }
`;

export const GET_REPORTS = gql`
  query Reports {
    reports @persist {
      id
      month
      year
      hours
      videos
      bibleStudies
      revisits
      isDefault
      isCompleted
      publications
      isSent
      activities
      activitiesByDate
    }
  }
`;

export const GET_USER_CONFIG = gql`
  query User {
    user @persist {
      config
    }
  }
`;

export const GET_USER = gql`
  query User {
    user @persist {
      id
      name
      email
      token
      bibleStudies
      revisits
      serviceType
      gender
    }
  }
`;

export const GET_BIBLE_STUDIES = gql`
  query BibleStudies {
    bibleStudies @persist {
      id
      fullName
      address
      dayOfTheStudy
      publication
      hourOfTheStudy
      additionalInfo
    }
  }
`;

export const GET_REVISITS = gql`
  query Revisits {
    revisits @persist {
      id
      fullName
      address
    }
  }
`;
