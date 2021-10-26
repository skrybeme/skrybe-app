import React from 'react';
import { Story } from '@storybook/react';
import { PickerESLProps, PickerESL_VariantA as PickerESL } from '.';
import * as GS from '@/ui/styles/global';

export default {
  title: 'Domain Components/PickerESL/VariantA'
}

const Template: Story<PickerESLProps> = (args) => {
  return (
    <GS.Center
      bgColor='rgb(58, 44, 97)'
      horizontal
      vertical
    >
      <PickerESL {...args} />
    </GS.Center>
  );
};

export const Default = Template.bind({});
Default.args = {
  hasUnreadMessages: true
};
