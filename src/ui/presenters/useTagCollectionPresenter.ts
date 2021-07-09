import React from 'react';
import { TagViewModel } from '@/interfaces/view-models';
import { useContainer, useLoadable } from '../hooks';
import { ILoadable, IUseCases } from '@/interfaces';
import { asyncNoop } from '@/utils';
import { TagMap } from '@/mappers';
import * as SYMBOL from '@/container/symbols';

export interface TagCollectionPresenterResult {
  tags: ILoadable<Array<TagViewModel>>;
  triggerGetTagsByTree: (treeId: string) => void;
}

export function useTagCollectionPresenter(): TagCollectionPresenterResult {
  const [tags, setTags] = useLoadable<TagViewModel[]>({ isLoading: false });

  const { getTagsByTree } = useContainer<IUseCases>(SYMBOL.UseCases);

  const handleUseCase = React.useCallback(async (cb: () => Promise<void>) => {
    setTags((state) => ({
      ...state,
      isLoading: true
    }));
    
    await cb();
    
    try {
      const result = await getTagsByTree.execute({
        treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
      });
    
      setTags({
        data: result !== null && result !== undefined ? result.map(TagMap.toViewModel) : null,
        isError: false,
        isLoading: false
      });
    } catch (e) {
      setTags({
        isError: true,
        isLoading: false
      });
    }
  }, []);

  return {
    tags,
    triggerGetTagsByTree: React.useCallback(async (_: string) => {
      handleUseCase(asyncNoop);
    }, [handleUseCase])
  }
}
