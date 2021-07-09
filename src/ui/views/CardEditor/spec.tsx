import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import {
  spyOnUseCardDetailsPresenter
} from '@/ui/presenters/useCardDetailsPresenter.mock';
import { container } from '@/container/mock'
import { CardEditor } from '.';
import { lorem } from 'faker';
import { ContainerProvider } from '@/ui/providers';

const Fixture = () => (
  <ContainerProvider container={container}>
    <CardEditor cardId="card-id" />
  </ContainerProvider>
)

describe(`View: CardEditor`, () => {
  const cardBody = lorem.paragraph();
  const cardHeader = lorem.paragraph();

  const { triggerGetCardById } = spyOnUseCardDetailsPresenter({
    card: {
      data: {
        body: cardBody,
        header: cardHeader,
        id: "card-id",
        tags: []
      },
      isError: false,
      isLoading: false,
    }
  });

  it(`calls presenter's card details fetching trigger on mount`, () => {
    render(<Fixture />);

    expect(triggerGetCardById).toBeCalledWith('card-id');
  });

  it(`renders card teaser tree`, () => {
    const { queryAllByText } = render(<Fixture />);

    expect(queryAllByText(cardBody).length).toBeGreaterThan(0);
    expect(queryAllByText(cardHeader).length).toBeGreaterThan(0);
  });
});
