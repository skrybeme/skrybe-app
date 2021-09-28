import React from 'react';
import { Story } from '@storybook/react';
import { PickerNotifications_VariantA as PickerNotifications, PickerNotificationsProps } from '.';
import * as GS from '@/ui/styles/global';

export default {
  title: 'Domain Components/PickerNotifications/VariantA'
}

const Template: Story<PickerNotificationsProps> = (args) => {
  return (
    <GS.Center
      bgColor='rgb(58, 44, 97)'
      horizontal
      vertical
    >
      <PickerNotifications {...args} />
    </GS.Center>
  );
};

export const Default = Template.bind({});
Default.args = {
  hasUnreadMessages: true
};
