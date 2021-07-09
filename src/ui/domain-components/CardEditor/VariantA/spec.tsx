import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { CardEditor_VariantA } from '.';
import { lorem } from 'faker';
import { CardEditorProps } from '@/interfaces/props';

const Fixture = (
  props?: Partial<CardEditorProps>,
): React.ReactElement<CardEditorProps> => (
  <CardEditor_VariantA
    availableTags={[]}
    tags={[]}
    {...props}
  />
);

describe(`Domain Components: CardEditor_VariantA`, () => {
  xit(`renders with header placeholder by default`, () => {
    const { queryByText } = render(<Fixture />);

    expect(queryByText('Untitled card')).toBeInTheDocument();
  });

  xit(`renders with body placeholder by default`, () => {
    const { queryByText } = render(<Fixture />);

    expect(queryByText('Type here')).toBeInTheDocument();
  });

  it(`updates main header on editable field blur if clipped header value changes`, () => {
    const { queryByTestId } = render(<Fixture />);

    const clippedHeader = queryByTestId('clipped-editable-header');
    const mainHeader = queryByTestId('main-editable-header');
    const editable = clippedHeader?.querySelector('[contenteditable]')!;

    const typed = lorem.words();

    fireEvent.input(editable, {
      target: {
        innerHTML: typed
      }
    });

    fireEvent.blur(editable);

    expect(mainHeader).toHaveTextContent(typed);
  });

  it(`updates clipped header on editable field blur if main header value changes`, () => {
    const { queryByTestId } = render(<Fixture />);

    const clippedHeader = queryByTestId('clipped-editable-header');
    const mainHeader = queryByTestId('main-editable-header');
    const editable = mainHeader?.querySelector('[contenteditable]')!;

    const typed = lorem.words();

    fireEvent.input(editable, {
      target: {
        innerHTML: typed
      }
    });

    fireEvent.blur(editable);

    expect(clippedHeader).toHaveTextContent(typed);
  });

  it(`calls a handler on editable field blur if header or body value changed`, () => {
    const onChangeMock = jest.fn();

    const { queryByTestId } = render(<Fixture onChange={onChangeMock} />);

    const editableHeader
      = queryByTestId('main-editable-header')?.querySelector('[contenteditable]')!;
    const editableBody
      = queryByTestId('editable-body')?.querySelector('[contenteditable]')!;

    const typedHeader = lorem.words();
    const typedBody = lorem.words();

    fireEvent.input(editableHeader, {
      target: {
        innerHTML: typedHeader
      }
    });

    fireEvent.input(editableBody, {
      target: {
        innerHTML: typedBody
      }
    });

    fireEvent.blur(editableHeader);
    fireEvent.blur(editableBody);

    expect(onChangeMock).toBeCalledWith({
      body: typedBody,
      header: typedHeader,
      tags: []
    });
  });
});
