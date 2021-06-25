import React from 'react';
import { CardDetailsPresenterProps, CardDetailsPresenterResult } from '@/interfaces/presenters'
import { StoryCardViewModel } from '@/interfaces/view-models/StoryCardViewModel';
import { useContainer, useLoadable } from '../hooks';
import { asyncNoop } from '@/utils';
import { IUseCases } from '@/interfaces';
import { StoryCardMap } from '@/mappers';
import * as SYMBOL from '@/container/symbols';

export function useCardDetailsPresenter({
  cardId
}: CardDetailsPresenterProps): CardDetailsPresenterResult {
  const [card, setCard] = useLoadable<StoryCardViewModel>({ isLoading: false });

  const { getCardById, updateTreeNode } = useContainer<IUseCases>(SYMBOL.UseCases);

  const handleUseCase = React.useCallback(async (cb: () => Promise<void>) => {
    setCard((state) => ({
      ...state,
      isLoading: true
    }));
    
    await cb();
    
    try {
      const result = await getCardById.execute({
        id: cardId,
        treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
      });
    
      setCard({
        data: result ? StoryCardMap.toViewModel(result) : null,
        isError: false,
        isLoading: false
      });
    } catch {
      setCard({
        isError: true,
        isLoading: false
      });
    }
  }, [getCardById, setCard]);

  return {
    card,
    updateTreeNode: React.useCallback(async (treeId: string, nodeId: string, { body, header }: { body: string, header: string }) => {
      handleUseCase(async () => {
        await updateTreeNode.execute({
          body,
          header,
          id: nodeId,
          treeId: treeId
        });
      });
    }, [handleUseCase, updateTreeNode]),
    triggerGetCardById: React.useCallback(async (_: string) => {
      handleUseCase(asyncNoop);
    }, [handleUseCase]),
  }
}
