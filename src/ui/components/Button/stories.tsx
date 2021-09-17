import React from 'react';
import { Button } from '.';
import { ButtonProps } from '@/interfaces/props';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import * as GS from '@/ui/styles/global';

export default {
  title: 'Common Components/Button'
}

const Template: Story<ButtonProps> = (args) => (
  <GS.Center
    bgColor='#e5e5e5'
    horizontal
    vertical
  >
     <Button {...args} />
  </GS.Center>
);

const buttonLabel = 'Save as...';

export const Default = Template.bind({});
Default.args = {
  children: <>{buttonLabel}</>,
  muted: false,
  onClick: action('onClick'),
  rounded: false,
  upper: true
};
