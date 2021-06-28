import React from 'react';
import { Story } from '@storybook/react'
import { Toolbar } from '.';
import * as GS from '@/ui/styles/global';

export default {
  title: 'Views/Toolbar'
}

const Template: Story<never> = () => (
  <GS.Center
    bgColor='#5E489D'
    horizontal
    vertical
  >
     <Toolbar />
  </GS.Center>
);

export const Default = Template.bind({});
