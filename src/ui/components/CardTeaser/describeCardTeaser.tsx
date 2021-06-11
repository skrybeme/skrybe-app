import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { lorem } from 'faker';
import { TagViewModel } from '@/interfaces/view-models';
import { TagColor } from '@/entities/enums';
import { generateUuid } from '@/utils';
import { CardTeaserProps } from '@/interfaces/props';
import { Themes } from '@/ui/styles/theme';
import { ThemeProvider } from 'styled-components';

export function describeCardTeaser(CardTeaser: React.FC<CardTeaserProps>) {
  const Fixture = (props: CardTeaserProps) => (
    <ThemeProvider theme={Themes.purple}>
      <CardTeaser {...props} />
    </ThemeProvider>
  )

  it(`renders correctly`, () => {
    const { container } = render(<Fixture header="" />);

    expect(container.childElementCount).toBeGreaterThanOrEqual(1);
  });

  it(`renders with header`, () => {
    const header = lorem.sentences();

    const { queryByText } = render(<Fixture header={header} />);

    expect(queryByText(header)).toBeInTheDocument();
  });

  it(`renders with tags`, () => {
    const tagsViewModelCollection: TagViewModel[] = [
      {
        color: TagColor.BLUE,
        id: generateUuid(),
        label: ''
      },
      {
        color: TagColor.GREEN,
        id: generateUuid(),
        label: ''
      }
    ];

    const { queryAllByTestId } = render(
      <Fixture
        header=""
        tags={tagsViewModelCollection}
      />
    );

    const tagElements = queryAllByTestId('tag');

    expect(tagElements).toHaveLength(2);
  });

  it(`calls a handler on click if card is NOT disabled`, () => {
    const mockedOnClickHandler = jest.fn();

    const { container } = render(
      <Fixture
        header=""
        handleClick={mockedOnClickHandler}
      />
    );

    fireEvent.click(container.childNodes[0]);

    expect(mockedOnClickHandler).toBeCalled();
  });

  it(`calls a handler on click if card is disabled`, () => {
    const mockedOnClickHandler = jest.fn();

    const { container } = render(
      <Fixture
        header=""
        handleClick={mockedOnClickHandler}
        isDisabled={true}
      />
    );

    fireEvent.click(container.childNodes[0]);

    expect(mockedOnClickHandler).toBeCalled();
  });

  it(`calls a handler on editable field blur if card is NOT disabled`, () => {
    const mockedOnHeaderChangeHandler = jest.fn();

    const header = lorem.sentences();

    const { queryByTestId } = render(
      <Fixture
        header={header}
        handleHeaderChange={mockedOnHeaderChangeHandler}
      />
    );

    const editable = queryByTestId('editable')!;

    fireEvent.blur(editable);

    expect(mockedOnHeaderChangeHandler).toBeCalledWith(header);
  });

  it(`calls a handler on editable field blur with changed value if card is NOT disabled`, () => {
    const mockedOnHeaderChangeHandler = jest.fn();

    const header = lorem.sentences();
    const updatedHeader = lorem.sentences();

    const { queryByTestId } = render(
      <Fixture
        header={header}
        handleHeaderChange={mockedOnHeaderChangeHandler}
      />
    );

    const editable = queryByTestId('editable')!;

    fireEvent.input(editable, {
      target: {
        innerHTML: updatedHeader
      }
    });

    fireEvent.blur(editable);

    expect(mockedOnHeaderChangeHandler).toBeCalledWith(updatedHeader);
  });

  it(`does NOT call a handler on blur if card is disabled`, () => {
    const mockedOnHeaderChangeHandler = jest.fn();

    const header = lorem.sentences();

    const { queryByTestId } = render(
      <Fixture
        header={header}
        handleHeaderChange={mockedOnHeaderChangeHandler}
        isDisabled={true}
      />
    );

    const editable = queryByTestId('editable')!;

    fireEvent.blur(editable);

    expect(mockedOnHeaderChangeHandler).not.toBeCalled();
  });
}
