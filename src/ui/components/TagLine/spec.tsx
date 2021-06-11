import React from 'react';
import { render } from '@testing-library/react';
import { TagLine } from '.';
import { TagViewModel } from '@/interfaces/view-models';
import { TagColor } from '@/entities/enums';
import { generateUuid } from '@/utils';

describe(`Component: TagLine`, () => {
  it(`renders correctly`, () => {
    const { container } = render(<TagLine tags={[]} />);

    expect(container.childElementCount).toBeGreaterThanOrEqual(1);
  });

  it(`renders with tags`, () => {
    const tagViewModelCollection: TagViewModel[] = [
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

    const { queryAllByTestId } = render(<TagLine tags={tagViewModelCollection} />);

    expect(queryAllByTestId('tag')).toHaveLength(2);
  });
});
