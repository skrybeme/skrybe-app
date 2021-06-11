import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GenericCardTeaserTree_VariantA } from '.';
import { GenericCardTeaserTreeProps } from '@/interfaces/props';
import { Story } from '@storybook/react'
import theme from '@/ui/styles/theme';

export default {
  title: 'Domain Components/GenericCardTeaserTree'
}

const Center = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

const StoryWrapper = ({ children }: React.PropsWithChildren<{}>) => (
  <ThemeProvider theme={theme.purple}>
    <Center>
      {children}
    </Center>
  </ThemeProvider>
)

const Template: Story<GenericCardTeaserTreeProps> = (args) => (
  <StoryWrapper>
    <GenericCardTeaserTree_VariantA {...args} />
  </StoryWrapper>
);

export const Default = Template.bind({});
Default.args = {};
