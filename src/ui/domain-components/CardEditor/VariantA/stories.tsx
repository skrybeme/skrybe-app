import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { CardEditorProps } from '@/interfaces/props';
import { CardEditor_VariantA } from '.';
import { lorem } from 'faker';

export default {
  title: 'Domain Components/CardEditor/VariantA'
}

const Template: Story<CardEditorProps> = (args) => <CardEditor_VariantA {...args} />;

export const Default = Template.bind({});
Default.args = {
  body: lorem.paragraphs(10),
  header: lorem.sentence(),
  onChange: action('onChange')
};
