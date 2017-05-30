import moment from 'moment';
import { openForRegistrationFilter } from '../SideBarFilters/SideBarFilter';

export default [
  {
    name: 'All Challenges',
    allIncluded: true,
    sortingOptions: ['Most recent'],
  },
  {
    name: 'My challenges',
    check(item) {
      return item.myChallenge;
    },
    sortingOptions: [
      'Most recent',
      'Time to submit',
      '# of registrants',
      '# of submissions',
      'Prize high to low',
      'Title A-Z',
    ],
    getApiUrl: (pageIndex, pageSize = 50) => (
      `${process.env.API_URL_V2}/user/challenges?&pageIndex=${pageIndex}&pageSize=${pageSize}`
    ),
  },
  {
    name: 'Open for registration',
    check: openForRegistrationFilter,
    sortingOptions: [
      'Most recent',
      'Time to register',
      'Phase end time',
      '# of registrants',
      '# of submissions',
      'Prize high to low',
      'Title A-Z',
    ],
    info: {
      phaseName: 'registration',
    },
    // v3 end point need to be updated once it is created for open for registration challenges
    getApiUrl: (pageIndex, pageSize = 50) => (
      `${process.env.API_URL}/challenges/?filter=status%3DActive&offset=${pageIndex * pageSize}&limit=${pageSize}`
    ),
  },
  {
    name: 'Ongoing challenges',
    check(item) {
      return !openForRegistrationFilter(item) && item.status === 'ACTIVE';
    },
    sortingOptions: [
      'Most recent',
      'Current phase',
      'Title A-Z',
      'Prize high to low',
    ],
    // v3 end point need to be updated once it is created for open for ongoing challenges
    getApiUrl: (pageIndex, pageSize = 50) => (
      `${process.env.API_URL}/challenges/?filter=status%3DActive&offset=${pageIndex * pageSize}&limit=${pageSize}`
    ),
  },
  {
    name: 'Past challenges',
    check(item) {
      return item.status === 'COMPLETED';
    },
    sortingOptions: [
      'Most recent',
      'Title A-Z',
      'Prize high to low',
    ],
    // v3 end point need to be updated once it is created for past challenges
    getApiUrl: (pageIndex, pageSize = 50) => (
      `${process.env.API_URL}/challenges/?filter=status%3DCompleted&offset=${pageIndex * pageSize}&limit=${pageSize}`
    ),
  },
  /**
  // Removed: sidebar link points to another page
  {
    name: 'Open for review',
    check(item) {
      return item.currentPhaseName === 'Review';
    },
    sortingOptions: [
      'Most recent',
      '# of registrants',
      '# of submissions',
      'Prize high to low',
      'Title A-Z',
    ],
    // No api endpoint available currently
    // the commented out api endpoint is most likely wrong
    // kept for reference
    // getApiUrl: (pageIndex, pageSize = 50) => {
    //   const yesterday = new Date();
    //   yesterday.setDate(yesterday.getDate() - 1);
    //   const yesterdayFormatted = yesterday.toJSON().slice(0, 10);
    //
    //   return `http://api.topcoder.com/v2/challenges/open?pageIndex=${pageIndex}&pageSize=${pageSize}&submissionEndTo=${yesterdayFormatted}`;
    // },
  },
  */
  {
    name: 'Upcoming challenges',
    check(item) {
      return moment(item.registrationStartDate) > moment();
    },
    sortingOptions: [
      'Most recent',
      'Title A-Z',
      'Prize high to low',
    ],
    getApiUrl: (pageIndex, pageSize = 50) => (
      `${process.env.API_URL_V2}/challenges/upcoming?pageIndex=${pageIndex}&pageSize=${pageSize}`
    ),
  },
];
