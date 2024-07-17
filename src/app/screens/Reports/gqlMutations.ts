import {gql} from '@apollo/client';

export const ADD_REPORT = gql`
  mutation AddReport($report: ReportInput) {
    addReport(report: $report) @persist {
      id
      month
      year
      hours
      videos
      bibleStudies
      revisits
      isDefault
      isCompleted
      isSent
    }
  }
`;

// export const ADD_USER = gql`
//   mutation AddUser($user: UserInput) {
//     addUser(user: $user) @persist {
//       id
//       name
//       email
//       token
//     }
//   }
// `;
