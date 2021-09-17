import React from 'react';
import { Button_VariantB as Button } from '.';
import { ButtonProps } from '@/interfaces/props';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import * as GS from '@/ui/styles/global';

export default {
  title: 'Common Components/Button/VariantB'
}

const Template: Story<ButtonProps> = (args) => (
  <GS.Center
    bgColor='#c7c7c7'
    horizontal
    vertical
  >
     <Button {...args} />
  </GS.Center>
);

const buttonLabel = 'Save as...';

const defaultArgs: ButtonProps = {
  children: <>{buttonLabel}</>,
  muted: false,
  onClick: action('onClick'),
  rounded: false,
  upper: true
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const Primary = Template.bind({});
Primary.args = {
  ...defaultArgs,
  variant: 'primary'
};
