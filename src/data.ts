import INestedStoryCard from '@/interfaces/INestedStoryCard';

export const defaultNestedCardTree: Array<INestedStoryCard> = [
  {
    id: 1,
    header: 'Michael was not even Bay that day.',
    body: '',
    tags: [
      {
        id: null,
        color: 'lightgray',
        label: 'lightgray'
      },
      {
        id: 2,
        color: 'green',
        label: 'green'
      },
      {
        id: null,
        color: 'magenta',
        label: 'magenta'
      }
    ],
    subcards: [
      {
        id: 2,
        header: 'Some people said he was the greatest cheater of all time.',
        body: '',
        tags: [
          {
            id: 4,
            color: 'red',
            label: 'red'
          },
          {
            id: null,
            color: 'orange',
            label: 'orange'
          }
        ],
        subcards: [
          {
            id: 6,
            header: 'Some people said he was the greatest cheater of all time.',
            body: '',
            tags: [
              {
                id: 4,
                color: 'red',
                label: 'red'
              },
              {
                id: null,
                color: 'orange',
                label: 'orange'
              }
            ],
            subcards: []
          },
          {
            id: 7,
            header: 'The others claim that Michael`s behaviour always has been bad.',
            body: '',
            tags: [
              {
                id: 4,
                color: 'red',
                label: 'red'
              },
              {
                id: null,
                color: 'magenta',
                label: 'magenta'
              }
            ],
            subcards: [
              {
                id: 11,
                header: 'Some people said he was the greatest cheater of all time.',
                body: '',
                tags: [
                  {
                    id: 4,
                    color: 'red',
                    label: 'red'
                  },
                  {
                    id: null,
                    color: 'orange',
                    label: 'orange'
                  }
                ],
                subcards: []
              },
              {
                id: 12,
                header: 'The others claim that Michael`s behaviour always has been bad.',
                body: '',
                tags: [
                  {
                    id: 4,
                    color: 'red',
                    label: 'red'
                  },
                  {
                    id: null,
                    color: 'magenta',
                    label: 'magenta'
                  }
                ],
                subcards: []
              }
            ]
          }
        ]
      },
      {
        id: 3,
        header: 'The others claim that Michael`s behaviour always has been bad.',
        body: '',
        tags: [
          {
            id: 4,
            color: 'red',
            label: 'red'
          },
          {
            id: null,
            color: 'orange',
            label: 'orange'
          }
        ],
        subcards: [
          {
            id: 8,
            header: 'And Michael had that one problem: he could not give a fuck.',
            body: '',
            tags: [
              {
                id: null,
                color: 'lightblue',
                label: 'lightblue'
              },
              {
                id: null,
                color: 'brown',
                label: 'brown'
              }
            ],
            subcards: []
          },
          {
            id: 9,
            header: 'And Michael had that one problem: he could not give a fuck.',
            body: '',
            tags: [
              {
                id: null,
                color: 'lightblue',
                label: 'lightblue'
              },
              {
                id: null,
                color: 'brown',
                label: 'brown'
              }
            ],
            subcards: []
          }
        ]
      },
      {
        id: 4,
        header: 'And Michael had that one problem: he could not give a fuck.',
        body: '',
        tags: [
          {
            id: null,
            color: 'lightblue',
            label: 'lightblue'
          },
          {
            id: null,
            color: 'brown',
            label: 'brown'
          }
        ],
        subcards: []
      },
      {
        id: 5,
        header: 'And Michael had that one problem: he could not give a fuck.',
        body: '',
        tags: [
          {
            id: null,
            color: 'lightblue',
            label: 'lightblue'
          },
          {
            id: null,
            color: 'brown',
            label: 'brown'
          }
        ],
        subcards: [
          {
            id: 10,
            header: 'And Michael had that one problem: he could not give a fuck.',
            body: '',
            tags: [
              {
                id: null,
                color: 'lightblue',
                label: 'lightblue'
              },
              {
                id: null,
                color: 'brown',
                label: 'brown'
              }
            ],
            subcards: []
          }
        ]
      }
    ]
  }
];
