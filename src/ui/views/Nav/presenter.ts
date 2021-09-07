import React from 'react';
import { StoryTreeInfoCollectionStore } from '@/store/StoryTreeInfoCollectionStore';
import { ILoadable, IUseCases } from '@/interfaces';
import { StoryTreeInfoViewModel } from '@/interfaces/view-models';
import { useContainer } from '@/ui/hooks';
import * as SYMBOL from '@/container/symbols';

export interface NavPresenterResult {
  collection: ILoadable<StoryTreeInfoViewModel[]>;
  executeGetStoryTreeInfoCollection: () => void;
}

export function useNavPresenter(): NavPresenterResult {
  const { getStoryTreeInfoCollection } = useContainer<IUseCases>(SYMBOL.UseCases);

  const storyTreeInfoCollectionStore
    = useContainer<StoryTreeInfoCollectionStore>(SYMBOL.store.StoryTreeInfoCollectionStore);

  return {
    collection: storyTreeInfoCollectionStore,
    executeGetStoryTreeInfoCollection: React.useCallback(() => {
      getStoryTreeInfoCollection.execute();
    }, [getStoryTreeInfoCollection])
  }
}
