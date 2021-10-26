import React from 'react';
import { Story } from '@storybook/react';
import { FormSignToESL, FormSignToESLProps } from '.';
import * as GS from '@/ui/styles/global';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Domain Components/FormSignToESL'
}

const Template: Story<FormSignToESLProps> = (args) => {
  return (
    <GS.Center
      bgColor='#222'
      horizontal
      vertical
    >
      <GS.Width width={460}>
        <FormSignToESL {...args} />
      </GS.Width>
    </GS.Center>
  );
};

export const Default = Template.bind({});
Default.args = {
    onCancel: action('onCancel'),
    onSubmit: action('onSubmit')
};
