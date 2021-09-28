import React from 'react';
import * as GS from '@/ui/styles/global';
import { Story } from '@storybook/react';
import { SimpleTabs_VariantA as SimpleTabs, SimpleTabsProps } from '.';
import { datatype, lorem } from 'faker';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Common components/SimpleTabs/VariantA'
}

const Template: Story<SimpleTabsProps> = (args) => (
  <GS.Center
    bgColor='#fff'
    horizontal
    vertical
  >
     <SimpleTabs {...args} />
  </GS.Center>
);

const activeTabId = datatype.uuid();

const defaultArgs: SimpleTabsProps = {
  onChange: action('onChange'),
  tabs: [
    {
      id: activeTabId,
      label: lorem.word()
    },
    {
      id: datatype.uuid(),
      label: lorem.word()
    },
    {
      id: datatype.uuid(),
      label: lorem.word()
    }
  ],
  value: activeTabId
};

export const Default = Template.bind({});
Default.args = defaultArgs;
