import '@testing-library/jest-dom';
import { EditableProps } from '@/interfaces/props';
import { fireEvent, render } from '@testing-library/react';
import { lorem } from 'faker';
import React from 'react';
import { Editable } from '.';

describe(`Component: Editable`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`renders as editable`, () => {
    const { queryByTestId } = render(<Editable />);

    const element = queryByTestId('editable');

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('contentEditable', 'true');
  });

  it(`renders with initial value if such is provided`, () => {
    const props: EditableProps = {
      value: lorem.sentence()
    };

    const { queryByTestId } = render(<Editable {...props} />);

    expect(queryByTestId('editable')).toHaveTextContent(props.value!);
  });

  it(`updates element's value on value prop update`, () => {
    const props: EditableProps = {
      value: lorem.sentence(5)
    };

    const { rerender, queryByTestId } = render(<Editable {...props} />);

    const updatedValue = lorem.sentence(6);

    rerender(<Editable value={updatedValue} />);

    expect(queryByTestId('editable')).toHaveTextContent(updatedValue);
  });

  it(`renders as not editable if disabled flag is provided`, () => {
    const props: EditableProps = {
      isDisabled: true
    };

    const { queryByTestId } = render(<Editable {...props} />);

    expect(queryByTestId('editable')).not.toHaveAttribute('contentEditable', 'true');
  });

  it(`calls a handler on element's value change`, () => {
    const props: EditableProps = {
      handleChange: jest.fn()
    };

    const { queryByTestId } = render(<Editable {...props} />);

    const element = queryByTestId('editable');

    const typed = lorem.words();

    fireEvent.input(element!, {
      target: {
        innerHTML: typed
      }
    });

    expect(element).toHaveTextContent(typed);
    expect(props.handleChange).toBeCalledWith(typed);
  });

  it(`calls a handler on focus`, () => {
    const props: EditableProps = {
      handleFocus: jest.fn()
    };

    const { queryByTestId } = render(<Editable {...props} />);

    const element = queryByTestId('editable');

    fireEvent.focus(element!);

    expect(props.handleFocus).toBeCalled();
  });

  it(`calls a handler on blur`, () => {
    const props: EditableProps = {
      handleBlur: jest.fn()
    };

    const { queryByTestId } = render(<Editable {...props} />);

    const element = queryByTestId('editable');

    fireEvent.blur(element!);

    expect(props.handleBlur).toBeCalled();
  });

  it(`triggers blur event on enter key hit if proper flag is provided`, () => {
    const props: EditableProps = {
      blurOnEnter: true,
      handleBlur: jest.fn()
    };

    const { queryByTestId } = render(<Editable {...props} />);

    const element = queryByTestId('editable');

    fireEvent.keyDown(element!, { key: 'Enter', code: 'Enter' });

    expect(props.handleBlur).toBeCalled();
  });

  it(`does not call event handlers if element is disabled`, () => {
    const props: EditableProps = {
      handleBlur: jest.fn(),
      handleChange: jest.fn(),
      handleFocus: jest.fn(),
      isDisabled: true
    };

    const { queryByTestId } = render(<Editable {...props} />);

    const element = queryByTestId('editable');

    fireEvent.focus(element!);
    fireEvent.blur(element!);

    const typed = lorem.words();

    fireEvent.input(element!, {
      target: {
        innerHTML: typed
      }
    });

    expect(props.handleBlur).not.toBeCalled();
    expect(props.handleChange).not.toBeCalled();
    expect(props.handleFocus).not.toBeCalled();
  });

  it.todo(`does not change element value on drop event`);

  it.todo(`allows to paste content as element's value`);
});
