import React from 'react';
import { Story } from '@storybook/react';
import { EditableTags, EditableTagsProps } from '.';
import { generateRandomTags } from '@/helpers';
import * as GS from '@/ui/styles/global';

export default {
  title: 'Common Components/EditableTags/Default'
}

const exampleTags = generateRandomTags(4);

const Template: Story<EditableTagsProps> = ({ tags = exampleTags, ...args }) => (
  <GS.Center
    bgColor='#fff'
    horizontal
    vertical
  >
    <EditableTags
      {...args}
      tags={tags}
    />
  </GS.Center>
);

export const Default = Template.bind({});
Default.args = {
  values: [exampleTags[1].id, exampleTags[2].id]
};
