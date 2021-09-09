import { TagColor } from '@/entities/enums';
import { StoryTreeViewModel } from '@/interfaces/view-models';
import { lorem } from 'faker';

export const storyTreeRootViewModelFixture: StoryTreeViewModel = {
  body: '',
  children: [
    {
      body: '',
      children: [
        {
          body: '',
          children: [],
          header: lorem.sentence(),
          id: '5',
          parentId: '2',
          tags: [],
          treeRootId: ''
        }
      ],
      header: lorem.sentence(),
      id: '2',
      parentId: '1',
      tags: [
        {
          color: TagColor.BLUE,
          label: '',
          id: ''
        },
        {
          color: TagColor.RED,
          label: '',
          id: ''
        }
      ],
      treeRootId: ''
    },
    {
      body: '',
      children: [
        {
          body: '',
          children: [],
          header: lorem.sentence(),
          id: '6',
          parentId: '3',
          tags: [],
          treeRootId: ''
        },
        {
          body: '',
          children: [],
          header: lorem.sentence(),
          id: '7',
          parentId: '3',
          tags: [],
          treeRootId: ''
        }
      ],
      header: lorem.sentence(),
      id: '3',
      parentId: '1',
      tags: [],
      treeRootId: ''
    },
    {
      body: '',
      children: [],
      header: lorem.sentence(),
      id: '4',
      parentId: '1',
      tags: [],
      treeRootId: ''
    }
  ],
  header: lorem.sentence(),
  id: '1',
  parentId: null,
  tags: [],
  treeRootId: ''
}
