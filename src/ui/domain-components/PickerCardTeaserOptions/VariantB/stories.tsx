import React from 'react';
import { Story } from '@storybook/react';
import { PickerCardTeaserOptionsProps } from '@/interfaces/props';
import { PickerCardTeaserOptions_VariantB } from '.';

export default {
  title: 'Domain Components/PickerCardTeaserOptions/VariantB'
}

const Template: Story<PickerCardTeaserOptionsProps> = (args) => <PickerCardTeaserOptions_VariantB {...args} />;

export const Default = Template.bind({});
Default.args = {};
