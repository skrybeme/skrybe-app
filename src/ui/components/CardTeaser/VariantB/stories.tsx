import React from 'react';
import { CardTeaserProps } from '@/interfaces/props';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { CardTeaser_VariantB as CardTeaser } from '.';
import { generateRandomTags } from '@/helpers';
import * as GS from '@/ui/styles/global';

export default {
  title: 'Common Components/CardTeaser/VariantB'
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
  printer took a galley of type and scrambled it to make a type specimen book. It has
  survived not only five centuries, but also the leap into electronic typesetting,
  remaining essentially unchanged. It was popularised in the 1960s with the release of
  Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
  publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

export const Default = Template.bind({});
Default.args = {
  header: cardHeader,
  handleClick: action('handleClick'),
  onBlur: action('onBlur')
};

export const Tags = Template.bind({});
Tags.args = {
  header: cardHeader,
  handleClick: action('handleClick'),
  onBlur: action('onBlur'),
  tags: generateRandomTags(3)
};
Tags.storyName = 'Tagged Card';

export const DisabledCard = Template.bind({});
DisabledCard.args = {
  header: cardHeader,
  handleClick: action('handleClick'),
  onBlur: action('onBlur'),
  isDisabled: true
};

export const DisabledTaggedCard = Template.bind({});
DisabledTaggedCard.args = {
  header: cardHeader,
  handleClick: action('handleClick'),
  onBlur: action('onBlur'),
  isDisabled: true,
  tags: generateRandomTags(3)
};
DisabledTaggedCard.storyName = 'Disabled tagged Card';

export const EmptyCard = Template.bind({});
EmptyCard.args = {
  header: '',
  handleClick: action('handleClick'),
  onBlur: action('onBlur')
};

// 0px 0px 0px 4px #d1cae67d
