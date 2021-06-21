import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Modal } from '.';
import { ThemeProvider } from 'styled-components';
import { Themes } from '@/ui/styles/theme';
import { ModalProps } from '@/interfaces/props';

const Fixture = (props: ModalProps) => (
  <ThemeProvider theme={Themes.purple}>
    <Modal {...props} />
  </ThemeProvider>
)
describe(`Common Component: Modal`, () => {
  describe(`rendering`, () => {
    it(`does not render by default`, () => {
      const { container } = render(
        <Fixture>
          <p>
            Modal content that won't render.
          </p>
        </Fixture>
      );
  
      expect(container.childElementCount).toEqual(0);
    });
  
    it(`renders if proper flag is passed`, () => {
      const { container } = render(
        <Fixture isVisible={true}>
          <p>
            Modal content that won't render.
          </p>
        </Fixture>
      );
  
      expect(container.childElementCount).toBeGreaterThanOrEqual(1);
    });
  
    it(`renders with children`, () => {
      const { queryByText } = render(
        <Fixture isVisible={true}>
          <p>
            Modal content that won't render.
          </p>
        </Fixture>
      );
  
      expect(queryByText('Modal content that won\'t render.')).toBeInTheDocument();
    });
  });

  it(`calls a handler on outside the modal's window click`, () => {
    const handleClickOutside = jest.fn();

    const { container } = render(
      <Fixture
        isVisible={true}
        onClickOutside={handleClickOutside}
      >
        <p>
          Modal content that won't render.
        </p>
      </Fixture>
    );

    const modal = container.firstChild!;
    const modalWindow = modal.firstChild!;

    fireEvent.click(modalWindow);

    expect(handleClickOutside).not.toBeCalled();

    fireEvent.click(modal);

    expect(handleClickOutside).toBeCalled();
  });
});
