import React from 'react';
import { Story } from '@storybook/react';
import { EditableTagsPickerProps } from '@/interfaces/props';
import { EditableTagsPicker } from '.';
import * as GS from '@/ui/styles/global';

export default {
  title: 'Domain Components/EditableTagsPicker/Default'
}

const Template: Story<EditableTagsPickerProps> = (args) => (
  <GS.Center
    bgColor='#eee'
    horizontal
    vertical
  >
    <div style={{ width: 400 }}>
      <EditableTagsPicker {...args} />
    </div>
  </GS.Center>
);

export const Default = Template.bind({});
Default.args = {};
