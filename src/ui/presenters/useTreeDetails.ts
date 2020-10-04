import { useEffect } from 'react';
import { ILoadable, ITreeUseCases, UIStoryTree } from '@/interfaces';
import { useContainer, useLoadable } from '@/ui/hooks';
import { mapTreeToUIStoryTree } from '@/ui/mappers';
import * as SYMBOL from '@/container/symbols';

export default function useTreeDetails(): { nodes: ILoadable<UIStoryTree> } {
  const [nodes, setNodes] = useLoadable<UIStoryTree>({ isLoading: true });

  const { getTreeById } = useContainer<ITreeUseCases>(SYMBOL.TreeUseCases);

  useEffect(() => {
    getTreeById?.(1)
    .then(result => {
      setNodes({
        data: result ? mapTreeToUIStoryTree(result) : null,
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
