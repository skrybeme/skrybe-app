import React from 'react';
import { Story } from '@storybook/react';
import {
  PickerStorySummarySaveAs_VariantA as PickerStorySummarySaveAs,
  PickerStorySummarySaveAsProps
} from '.';
import * as GS from '@/ui/styles/global';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Domain Components/PickerStorySummarySaveAs/VariantA'
}

const Template: Story<PickerStorySummarySaveAsProps> = (args) => (
  <GS.Center
    bgColor='#e5e5e5'
    horizontal
    vertical
  >
    <PickerStorySummarySaveAs {...args} />
  </GS.Center>
);

export const Default = Template.bind({});
Default.args = {
  onSaveAsStorySummary: action('onSaveAsStorySummary'),
  onSaveAsStorySummaryDraft: action('onSaveAsStorySummaryDraft')
};
