import React from 'react';
import { useContainer, useLoadable } from '../hooks';
import { ILoadable, IUseCases } from '@/interfaces';
import { asyncNoop } from '@/utils';
import * as SYMBOL from '@/container/symbols';
import StoryTreeInfo from '@/entities/StoryTreeInfo';

export interface StoryTreeInfoViewModel {
  id: string;
  title: string;
}

export interface StoryTreeInfoCollectionPresenterResult {
  collection: ILoadable<StoryTreeInfoViewModel[]>;
  executeGetStoryTreeInfoCollection: () => void;
}

class StoryTreeInfoMap {
  static toViewModel(domainModel: StoryTreeInfo): StoryTreeInfoViewModel {
    return {
      id: domainModel.id,
      title: domainModel.title
    };
  }
}

export function useStoryTreeInfoCollectionPresenter(): StoryTreeInfoCollectionPresenterResult {
  const [collection, setCollection] = useLoadable<StoryTreeInfoViewModel[]>({ isLoading: false });

  const { getStoryTreeInfoCollection } = useContainer<IUseCases>(SYMBOL.UseCases);

  const handleUseCase = React.useCallback(async (cb: () => Promise<void>) => {
    setCollection((state) => ({
      ...state,
      isLoading: true
    }));
    
    await cb();
    
    try {
      const result = await getStoryTreeInfoCollection.execute();
    
      setCollection({
        data: result.map(StoryTreeInfoMap.toViewModel),
        isError: false,
        isLoading: false
      });
    } catch (e) {
      console.log(e)
      setCollection({
        isError: true,
        isLoading: false
      });
    }
  }, []);

  return {
    collection,
    executeGetStoryTreeInfoCollection: React.useCallback(async () => {
      handleUseCase(asyncNoop);
    }, [handleUseCase])
  }
}
