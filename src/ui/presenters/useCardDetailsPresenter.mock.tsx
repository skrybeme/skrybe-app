import { CardDetailsPresenterResult } from '@/interfaces/presenters';
import * as CardDetailsPresenter from './useCardDetailsPresenter';

const defaultResult: CardDetailsPresenterResult = {
  card: {
    data: null,
    isError: false,
    isLoading: false
  },
  triggerGetCardById: jest.fn(),
  updateTreeNode: jest.fn()
}

export function spyOnUseCardDetailsPresenter(
  partialMock?: Partial<CardDetailsPresenterResult>
): CardDetailsPresenterResult {
    const mockImplementation = {
      ...defaultResult,
      ...partialMock,
    }

    jest.spyOn(
      CardDetailsPresenter,
      'useCardDetailsPresenter'
    ).mockImplementation(() => mockImplementation);

    return mockImplementation;
}
