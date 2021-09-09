import React from 'react';
import { StoryTreeViewModel } from '@/interfaces/view-models';
import { useEffectAfterMount } from '@/ui/hooks';
import { stub } from '@/utils';
import * as S from './styles';

interface ISelectableStoryTreeContext {
  addNodeId: (id: string) => void;
  removeNodeId: (id: string) => void;
  selectedNodeIds: string[];
}

const SelectableStoryTreeContext = React.createContext<ISelectableStoryTreeContext>({
  addNodeId: stub,
  removeNodeId: stub,
  selectedNodeIds: []
});

export interface SelectableStoryTreeProps {
  onChange?: (ids: string[]) => void;
  root: StoryTreeViewModel;
}

export function RecursiveComponent({
  root
}: Pick<SelectableStoryTreeProps, 'root'>): React.ReactElement<SelectableStoryTreeProps> {
  const {
    addNodeId,
    removeNodeId,
    selectedNodeIds
  } = React.useContext(SelectableStoryTreeContext);

  const isSelected = React.useMemo(
    () => selectedNodeIds.includes(root.id),
    [selectedNodeIds]
  );

  const onCardLabelClick = React.useCallback(() => {
    if (isSelected) {
      removeNodeId(root.id);
    } else {
      addNodeId(root.id);
    }
  }, [isSelected, root.id]);

  return (
    <S.SelectableStoryTree>
      <S.CardContext>
        <S.CardLabel
          isSelected={isSelected}
          onClick={onCardLabelClick}
        >
          {root.header}
        </S.CardLabel>
        {root.children.map((child) => (
          <RecursiveComponent
            key={child.id}
            root={child}
          />
        ))}
      </S.CardContext>
    </S.SelectableStoryTree>
  );
}

export function SelectableStoryTree_VariantA({
  onChange,
  root
}: SelectableStoryTreeProps): React.ReactElement<SelectableStoryTreeProps> {
  const [selectedNodeIds, setSelectedNodeIds] = React.useState<string[]>([]);

  const addNodeId = React.useCallback<ISelectableStoryTreeContext['addNodeId']>(
    (id: string) => {
      setSelectedNodeIds((state) => [
        ...state,
        id
      ]);
    },
    []
  );

  const removeNodeId = React.useCallback<ISelectableStoryTreeContext['removeNodeId']>(
    (id: string) => {
      setSelectedNodeIds((state) => state.filter((item) => item !== id));
    },
    []
  );

  useEffectAfterMount(() => {
    onChange?.(selectedNodeIds);
  }, [onChange, selectedNodeIds]);

  return (
    <SelectableStoryTreeContext.Provider
      value={{ addNodeId, removeNodeId, selectedNodeIds }}
    >
      <RecursiveComponent root={root} />
    </SelectableStoryTreeContext.Provider>
  );
}
