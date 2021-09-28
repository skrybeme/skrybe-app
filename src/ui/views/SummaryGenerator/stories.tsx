import React from 'react';
import { Story } from '@storybook/react';
import { SummaryGenerator, SummaryGeneratorProps } from './';
import * as GS from '@/ui/styles/global';

export default {
  title: 'Views/SummaryGenerator/Default'
}

const Template: Story<SummaryGeneratorProps> = (args) => (
  <GS.Center
    bgColor='#5E489D'
    horizontal
    vertical
  >
    <SummaryGenerator {...args} />
  </GS.Center>
);

export const Default = Template.bind({});
Default.args = {};
