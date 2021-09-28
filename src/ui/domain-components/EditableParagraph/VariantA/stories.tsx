import React from 'react';
import { Story } from '@storybook/react';
import {
  EditableParagraph_VariantA as EditableParagraph,
  EditableParagraphProps
} from '.';
import * as GS from '@/ui/styles/global';
import { lorem } from 'faker';

export default {
  title: 'Domain Components/EditableParagraph/VariantA'
}

const Template: Story<EditableParagraphProps> = (args) => (
  <GS.Center
    bgColor='#f6f6f6'
    horizontal
    vertical
  >
    <GS.Width width={768}>
      <EditableParagraph {...args} />
      <EditableParagraph {...args} />
      <EditableParagraph {...args} />
    </GS.Width>
  </GS.Center>
);

const paragraphs = [lorem.paragraph(), lorem.paragraph()];

export const Default = Template.bind({});
Default.args = {
  initialEditMode: true,
  initialValue: paragraphs.map((p) => `<p>${p}</p>`).join(''),
  title: lorem.sentence()
};
