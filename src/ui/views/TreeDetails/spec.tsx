import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { TreeDetails } from '.';
import {
  spyOnUseTreeDetailsPresenter
} from '@/ui/presenters/useTreeDetailsPresenter.mock';

describe(`View: TreeDetails`, () => {
  const { triggerGetTreeById } = spyOnUseTreeDetailsPresenter();

  it(`calls presenter's tree details fetching trigger on mount`, () => {
    render(<TreeDetails />);

    expect(triggerGetTreeById).toBeCalledWith('c0773e64-3a3a-11eb-adc1-0242ac120002');
  });

  it(`renders card teaser tree`, () => {
    const { queryByTestId } = render(<TreeDetails />);

    expect(queryByTestId('generic-card-teaser-tree')).toBeInTheDocument();
  });
});
