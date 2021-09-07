import React from 'react';
import { IUseCases } from '@/interfaces';
import { TagViewModel } from '@/interfaces/view-models';
import { CardDetailsStore } from '@/store';
import { ITagCollectionStore, TagCollectionStore } from '@/store/TagCollectionStore';
import { useContainer } from '@/ui/hooks';
import * as SYMBOL from '@/container/symbols';

export interface CardEditorPresenterProps {
  cardId?: string;
  treeId: string
}

export type CardEditorPresenterResult = Pick<IUseCases, 'getCardById' | 'getTagsByTree'> & {
  card: CardDetailsStore['data'];
  handleChange: (args: {
    body: string,
    header: string,
    tags: TagViewModel[]
  }) => void;
  tags: TagCollectionStore['data'];
};

export function useCardEditorPresenter({
  cardId,
  treeId
}: CardEditorPresenterProps): CardEditorPresenterResult {
  const {
    getCardById,
    getTagsByTree,
    updateCardDetails
  } = useContainer<IUseCases>(SYMBOL.UseCases);

  const cardDetailsStore = useContainer<CardDetailsStore>(SYMBOL.store.CardDetailsStore);
  const tagCollectionStore = useContainer<ITagCollectionStore>(SYMBOL.store.TagCollectionStore);

  const card = cardDetailsStore.data;
  const tags = tagCollectionStore.data;

  const handleChange = React.useCallback(
    (args: { body: string, header: string, tags: TagViewModel[] }) => {
      updateCardDetails.execute({
        body: args.body,
        header: args.header,
        id: cardId!,
        tags: args.tags.map(({ id }) => id),
        treeId
      });
    },
    [updateCardDetails]
  );

  return {
    card,
    getCardById,
    getTagsByTree,
    handleChange,
    tags: tags || []
  };
}
