import '@testing-library/jest-dom';
import React from 'react';
import { SidebarContext } from './context';
import { ISidebarContext } from '@/interfaces';
import { container } from '@/container/mock';
import { ContainerProvider } from '@/ui/providers';
import { fireEvent, render } from '@testing-library/react';
import { Sidebar } from '.';
import * as CardEditorView from '@/ui/views/CardEditor';

jest.spyOn(CardEditorView, 'CardEditor')
  .mockReturnValue(<div data-testid="mocked-card-editor"></div>);

const sidebarContextMock: ISidebarContext = {
  close: jest.fn(),
  isOpen: false,
  open: jest.fn(),
  setCardId: jest.fn(),
  unsetComponent: jest.fn(),
  cardId: 'test-card-id'
};

const Fixture = ({
  contextValue
}: React.PropsWithChildren<{ contextValue?: Partial<ISidebarContext> }>) => (
  <ContainerProvider container={container}>
    <SidebarContext.Provider
      value={{
        ...sidebarContextMock,
        ...contextValue
      }}
    >
      <Sidebar />
    </SidebarContext.Provider>
  </ContainerProvider>
);

describe(`Common Component: Sidebar`, () => {
  it(`does not render if context flag is falsy`, () => {
    const { container } = render(<Fixture contextValue={{ isOpen: false }} />);

    expect(container.childElementCount).toEqual(0);
  });

  it(`does render if context flag is truthy`, () => {
    const { container } = render(<Fixture contextValue={{ isOpen: true }} />);

    expect(container.childElementCount).toBeGreaterThanOrEqual(1);
  });

  it(`renders card editor if context flag is truthy`, () => {
    const { queryByTestId } = render(<Fixture contextValue={{ isOpen: true }} />);

    expect(queryByTestId('mocked-card-editor')).toBeInTheDocument();
  });

  it(`calls context's method on 'close' button click`, () => {
    const { queryByTestId } = render(<Fixture contextValue={{ isOpen: true }} />);

    expect(sidebarContextMock.close).not.toBeCalled();

    fireEvent.click(queryByTestId('sidebar-button-close')!);

    expect(sidebarContextMock.close).toBeCalled();
  });
});
