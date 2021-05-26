import { TreeDetailsPresenterResult } from '@/interfaces/presenters';
import * as TreeDetailsPresenter from './useTreeDetailsPresenter';

const defaultResult: TreeDetailsPresenterResult = {
  generateChildrenTreeNodes: jest.fn(),
  insertTreeNode: jest.fn(),
  removeTreeNode: jest.fn(),
  root: {
    data: null,
    isError: false,
    isLoading: false
  },
  triggerGetTreeById: jest.fn(),
  updateTreeNode: jest.fn()
}

export function spyOnUseTreeDetailsPresenter(
  partialMock?: Partial<TreeDetailsPresenterResult>
): TreeDetailsPresenterResult {
    const mockImplementation = {
      ...defaultResult,
      ...partialMock,
    }

    jest.spyOn(
      TreeDetailsPresenter,
      'useTreeDetailsPresenter'
    ).mockImplementation(() => mockImplementation);

    return mockImplementation;
}
