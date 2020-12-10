import { useEffect } from 'react';
import { ILoadable, IStoryTreeUseCases } from '@/interfaces';
import { StoryTreeViewModel } from '@/interfaces/view-models';
import { useContainer, useLoadable } from '@/ui/hooks';
import * as SYMBOL from '@/container/symbols';
import { StoryTreeMap } from '@/mappers';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';

export default function useTreeDetails(): { nodes: ILoadable<StoryTreeViewModel> } {
  const [nodes, setNodes] = useLoadable<StoryTreeViewModel>({ isLoading: true });

  const { getTreeById } = useContainer<IStoryTreeUseCases<Tree<StoryCard>, StoryCard>>(
    SYMBOL.TreeUseCases
  );

  useEffect(() => {
    getTreeById?.({ id: "c0773e64-3a3a-11eb-adc1-0242ac120002" })
    .then(result => {
      setNodes({
        data: result ? StoryTreeMap.toViewModel(result) : null,
        isLoading: false
      })
    })
    .catch(() => {
      setNodes({
        isError: true,
        isLoading: false
      })
    });
  }, []);

  return { nodes };
}
