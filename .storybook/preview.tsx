import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Themes } from '../src/ui/styles/theme';
import * as GS from '../src/ui/styles/global';

const StoryWrapper = ({ children }: React.PropsWithChildren<{}>) => (
  <ThemeProvider theme={Themes.purple}>
    <GS.Center
      bgColor='#5E489D'
      horizontal
      vertical
    >
      {children}
    </GS.Center>
  </ThemeProvider>
)

export const decorators = [
  (Story: React.FC) => (
    <StoryWrapper>
        <Story />
    </StoryWrapper>
  )
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#333333',
      }
    ]
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
