import React from 'react';
import { Story } from '@storybook/react'
import { Toolbar } from '.';

export default {
  title: 'Views/Toolbar'
}

const Template: Story<never> = () => <Toolbar />;

export const Default = Template.bind({});
