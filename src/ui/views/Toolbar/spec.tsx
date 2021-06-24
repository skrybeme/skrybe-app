import '@testing-library/jest-dom';
import React from 'react';
import { Themes } from '@/ui/styles/theme';
import { ThemeProvider } from 'styled-components';
import { Toolbar } from '.';
import { render } from '@testing-library/react';

const Fixture = () => (
  <ThemeProvider theme={Themes.purple}>
    <Toolbar />
  </ThemeProvider>
)

describe(`View: Toolbar`, () => {
  it(`renders with hamburger button`, () => {
    const { container } = render(<Fixture />);

    expect(container.querySelector('#hamburger')).toBeInTheDocument();
  });

  it(`renders with logo`, () => {
    const { container } = render(<Fixture />);

    expect(container.querySelector('#logo')).toBeInTheDocument();
  });

  it(`renders with default user profile picture`, () => {
    const { container } = render(<Fixture />);

    const element = container.querySelector('#profile-picture');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('TJ');
  });
});
