import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { EditableTags, EditableTagsProps } from '.';
import { generateRandomTags } from '@/helpers';

const editableTagsPropsMock: EditableTagsProps = {
  tags: []
};

const Fixture = (props?: Partial<EditableTagsProps>) => (
  <EditableTags
    {...{
      ...editableTagsPropsMock,
      ...props
    }}
  />
);

describe(`Component: EditableTags`, () => {
  it(`renders with no tags if passed array is empty`, () => {
    const { queryAllByTestId } = render(<Fixture tags={[]} />);

    expect(queryAllByTestId('tag-color')).toHaveLength(0);
  });

  it(`renders with tags passed as prop with proper background colors`, () => {
    const tags = generateRandomTags(5);

    const { queryAllByTestId } = render(<Fixture tags={tags} />);

    const tagColorElements = queryAllByTestId('tag-color');

    expect(tagColorElements).toHaveLength(5);

    expect(tagColorElements[0]).toHaveStyle({ 'background-color': tags[0].color });
  });

  it(`renders tags with proper class names according to passed value object`, () => {
    const tags = generateRandomTags(5);

    const { queryAllByTestId } = render(
      <Fixture
        tags={tags}
        values={[
          tags[1].id,
          tags[2].id,
          tags[4].id
        ]}
      />
    );

    const tagColorElements = queryAllByTestId('tag-color');

    expect(tagColorElements).toHaveLength(5);

    expect(tagColorElements[0]).not.toHaveClass('is-active');
    expect(tagColorElements[1]).toHaveClass('is-active');
    expect(tagColorElements[2]).toHaveClass('is-active');
    expect(tagColorElements[3]).not.toHaveClass('is-active');
    expect(tagColorElements[4]).toHaveClass('is-active');
  });

  it(`updates tag class names on passed value object change`, () => {
    const tags = generateRandomTags(5);

    const { queryAllByTestId, rerender } = render(
      <Fixture
        tags={tags}
        values={[
          tags[1].id,
          tags[2].id,
          tags[4].id
        ]}
      />
    );

    rerender(
      <Fixture
        tags={tags}
        values={[
          tags[1].id,
          tags[3].id,
        ]}
      />
    );

    const tagColorElements = queryAllByTestId('tag-color');

    expect(tagColorElements).toHaveLength(5);

    expect(tagColorElements[0]).not.toHaveClass('is-active');
    expect(tagColorElements[1]).toHaveClass('is-active');
    expect(tagColorElements[2]).not.toHaveClass('is-active');
    expect(tagColorElements[3]).toHaveClass('is-active');
    expect(tagColorElements[4]).not.toHaveClass('is-active');
  });

  it(`calls a handler on tag click`, () => {
    const onClickHandler = jest.fn();

    const tags = generateRandomTags(5);

    const { container } = render(
      <Fixture
        onClick={onClickHandler}
        tags={tags}
      />);

    const tagButtonElements = container.querySelectorAll('button');

    fireEvent.click(tagButtonElements[1]);

    expect(onClickHandler).toBeCalledWith(tags[1]);
  });
});
