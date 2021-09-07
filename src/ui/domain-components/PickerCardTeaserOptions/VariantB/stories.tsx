import React from 'react';
import { Story } from '@storybook/react';
import { PickerCardTeaserOptionsProps } from '@/interfaces/props';
import { PickerCardTeaserOptions_VariantB as PickerCardTeaserOptions } from '.';
import * as GS from '@/ui/styles/global';

export default {
  title: 'Domain Components/PickerCardTeaserOptions/VariantB'
}

const Template: Story<PickerCardTeaserOptionsProps> = (args) => (
  <GS.Center
    bgColor='#5E489D'
    horizontal
    vertical
  >
     <PickerCardTeaserOptions {...args} />
  </GS.Center>
);

export const Default = Template.bind({});
Default.args = {};
