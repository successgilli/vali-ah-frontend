export const comments = [
  {
    id: 'd7332bba-41b4-488c-ad18-191400e52fbb',
    content: 'Great article',
    userId: 'df58a9a7-498e-488a-8da3-2fbab99fd1a0',
    articleId: 'e972e139-404d-4685-8582-4d658e842588',
    repliedToId: null,
    suspended: false,
    createdAt: '2019-09-08T09:16:01.466Z',
    updatedAt: '2019-09-08T09:16:01.466Z',
    commentAuthor: {
      firstName: 'first',
      lastName: 'last',
      avatarUrl: null
    },
    voteCount: 0
  },
  {
    id: '74fe1aec-53cd-49eb-a6cc-11fc71faebf1',
    content: 'Great article',
    userId: 'df58a9a7-498e-488a-8da3-2fbab99fd1a0',
    articleId: 'e972e139-404d-4685-8582-4d658e842588',
    repliedToId: null,
    suspended: false,
    updatedAt: '2019-09-08T09:28:46.104Z',
    createdAt: '2019-09-08T09:28:46.104Z',
    commentAuthor: {
      firstName: 'first',
      lastName: 'last',
      avatarUrl: 'someAvatarUrl'
    },
    voteCount: 0
  }
];

export const articleComments = {
  comments,
  createdComment: {},
  apiCallInProgress: false,
  error: null
};

export const formProps = {
  handleChange: jest.fn(),
  saveComment: jest.fn(),
  saving: true,
  count: 256,
  comment: ''
};

export const noSaving = {
  handleChange: jest.fn(),
  saveComment: jest.fn(),
  comment: ''
};
