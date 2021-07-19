import React from 'react';
import { Story } from '@storybook/react';
import { Nav, NavProps } from '.';
import * as GS from '@/ui/styles/global';

export default {
  title: 'Common Components/Nav/Default'
}

const Template: Story<NavProps> = (args) => (
  <GS.Center bgColor='#5E489D'>
    <Nav {...args} />
  </GS.Center>
);

export const Default = Template.bind({});
Default.args = {
  isOpen: true
};
