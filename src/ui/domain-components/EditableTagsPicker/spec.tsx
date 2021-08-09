import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { EditableTagsPicker } from '.';
import { EditableTagsPickerProps } from '@/interfaces/props';
import { TagColor } from '@/entities/enums';

const Fixture = (props?: Partial<EditableTagsPickerProps>) => (
  <EditableTagsPicker
    tags={[]}
    {...props}
  />
)

describe(`Domain component: EditableTagsPicker`, () => {
  it(`calls a handler on close with selected tags as an argument`, () => {
    const tags = [
      {
        color: TagColor.BLUE,
        id: 'test-id-1',
        label: 'test-label-1'
      },
      {
        color: TagColor.GREEN,
        id: 'test-id-2',
        label: 'test-label-2'
      },
      {
        color: TagColor.ORANGE,
        id: 'test-id-3',
        label: 'test-label-3'
      },
      {
        color: TagColor.PURPLE,
        id: 'test-id-4',
        label: 'test-label-4'
      }
    ];

    const onCloseHandler = jest.fn();

    const { queryAllByTestId, queryByTestId } = render(
      <Fixture
        initialValue={[]}
        onClose={onCloseHandler}
        tags={tags}
      />
    );

    expect(onCloseHandler).not.toBeCalled();
    
    const triggerElement = queryByTestId('clickable-trigger');

    expect(triggerElement).toBeInTheDocument();

    fireEvent.click(triggerElement!);

    const tagElements = queryAllByTestId('tag-color');

    fireEvent.click(tagElements[0]);
    fireEvent.click(tagElements[2]);

    fireEvent.click(triggerElement!);

    expect(onCloseHandler).toBeCalledWith([
      {
        color: TagColor.BLUE,
        id: 'test-id-1',
        label: 'test-label-1'
      },
      {
        color: TagColor.ORANGE,
        id: 'test-id-3',
        label: 'test-label-3'
      }
    ]);
  });
});
