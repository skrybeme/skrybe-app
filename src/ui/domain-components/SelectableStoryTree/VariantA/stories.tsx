import React from 'react';
import { Story } from '@storybook/react';
import {
  SelectableStoryTreeProps,
  SelectableStoryTree_VariantA as SelectableStoryTree
} from '.';
import * as GS from '@/ui/styles/global';
import { storyTreeRootViewModelFixture } from '../fixtures';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Domain Components/SelectableStoryTree/Default'
}

const Template: Story<SelectableStoryTreeProps> = (args) => (
  <GS.Center
    bgColor='#fff'
    horizontal
    vertical
  >
    <div style={{ width: 496 }}>
      <SelectableStoryTree {...args} />
    </div>
  </GS.Center>
);

export const Default = Template.bind({});
Default.args = {
  onChange: action('onChange'),
  root: storyTreeRootViewModelFixture
};
