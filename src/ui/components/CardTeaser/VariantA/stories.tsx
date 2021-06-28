import React from 'react';
import { CardTeaser } from '.';
import { CardTeaserProps } from '@/interfaces/props';
import { Story } from '@storybook/react';
import * as GS from '@/ui/styles/global';

export default {
  title: 'Common Components/CardTeaser/VariantA'
}

const Template: Story<CardTeaserProps> = (args) => (
  <GS.Center
    bgColor='#5E489D'
    horizontal
    vertical
  >
     <CardTeaser {...args} />
  </GS.Center>
);

const cardHeader =
  `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
  has been the industry's standard dummy text ever since the 1500s, when an unknown
  printer took a galley of type and scrambled it to make a type specimen book.`;

export const Default = Template.bind({});
Default.args = {
  header: cardHeader
};
