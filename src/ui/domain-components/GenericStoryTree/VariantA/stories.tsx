import React from 'react';
import { GenericStoryTreeProps } from '@/interfaces/props';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { GenericStoryTree_VariantA } from '.';
import { lorem } from 'faker';
import { TagColor } from '@/entities/enums';

export default {
  title: 'Domain Components/GenericStoryTree/VariantA'
}

const Template: Story<GenericStoryTreeProps> = (args) => <GenericStoryTree_VariantA {...args} />;

export const Default = Template.bind({});
Default.args = {
  generateChildrenTreeNodes: action('generateChildrenTreeNodes'),
  insertTreeNode: action('insertTreeNode'),
  removeTreeNode: action('removeTreeNode'),
  root: {
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
            tags: []
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
        ]
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
            tags: []
          },
          {
            body: '',
            children: [],
            header: lorem.sentence(),
            id: '7',
            parentId: '3',
            tags: []
          }
        ],
        header: lorem.sentence(),
        id: '3',
        parentId: '1',
        tags: []
      },
      {
        body: '',
        children: [],
        header: lorem.sentence(),
        id: '4',
        parentId: '1',
        tags: []
      }
    ],
    header: lorem.sentence(),
    id: '1',
    parentId: null,
    tags: []
  },
  updateTreeNode: action('updateTreeNode')
};
