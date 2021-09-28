import React from 'react';
import { CheckboxProps, Checkbox_VariantA as Checkbox } from '.';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { datatype } from 'faker';
import * as GS from '@/ui/styles/global';

export default {
  title: 'Common Components/Checkbox/VariantA'
}

const Template: Story<CheckboxProps> = (args) => (
  <GS.Center
    bgColor='#fff'
    horizontal
    vertical
  >
     <Checkbox {...args} />
  </GS.Center>
);

const checkboxLabel = 'Leaves only';

const defaultArgs: CheckboxProps = {
  children: <>{checkboxLabel}</>,
  id: datatype.uuid(),
  onChange: action('onChange'),
  value: true
};

export const Default = Template.bind({});
Default.args = defaultArgs;
