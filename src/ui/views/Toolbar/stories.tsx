import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Story } from '@storybook/react'
import theme from '@/ui/styles/theme';
import { Toolbar } from '.';

export default {
  title: 'Views/Toolbar'
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

const Template: Story<never> = (args) => (
  <StoryWrapper>
    <Toolbar />
  </StoryWrapper>
);

export const Default = Template.bind({});
