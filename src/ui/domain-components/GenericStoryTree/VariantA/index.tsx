import React from 'react';
import { GenericStoryTreeProps } from '@/interfaces/props';
import { CardTeaser_VariantB as CardTeaser } from '@/ui/components/CardTeaser';
import { useGenericStoryTree } from '../hook';
import {
  PickerCardTeaserOptions_VariantB as PickerCardTeaserOptions
} from '../../PickerCardTeaserOptions/VariantB';
import { useToggle } from '@/ui/hooks';
import {
  CardTeaserPlaceholder_VariantA as CardTeaserPlaceholder
} from '@/ui/components/CardTeaserPlaceholder/VariantA';
import * as S from './styles';

export function GenericStoryTree_VariantA({
  generateChildrenTreeNodes,
  insertTreeNode,
  removeTreeNode,
  root,
  style,
  updateTreeNode
}: GenericStoryTreeProps): React.ReactElement<GenericStoryTreeProps> {
  const {
    generateSubcards,
    insertCard,
    openCard,
    removeCard,
    updateCard
  } = useGenericStoryTree({
    generateChildrenTreeNodes,
    insertTreeNode,
    removeTreeNode,
    updateTreeNode
  });

  const { isOpen, set } = useToggle(false);

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const editable = ref.current?.querySelector<HTMLDivElement>('[contenteditable]');

    if (editable && editable.innerHTML.length === 0) {
      editable.focus()
    }
  }, [ref])

  return (
    <S.GenericStoryTree_VariantA
      data-testid="generic-story-tree"
      optionsOpen={isOpen}
      ref={ref}
      style={style}
    >
      {root && (
        <React.Fragment>
          <S.CardTeaserContext
            childless={!root.children.length}
            data-testid="card-context"
            hidePlaceholders={isOpen}
            oneChild={root.children.length === 1}
            optionsOpen={isOpen}
          >
            {root.parentId !== null && (
              <>
                <S.CardTeaserPlaceholderContext>
                  <CardTeaserPlaceholder
                    label="+ Add card above"
                    onClick={insertCard(root.parentId, {
                      afterOrBefore: 'before',
                      nodeId: root.id
                    })}
                  />
                </S.CardTeaserPlaceholderContext>
                <S.VEdge />
              </>
            )}
            <CardTeaser
              header={root.header || ''}
              onBlur={updateCard(root.id)}
              tags={root.tags || []}
            />
            <PickerCardTeaserOptions
              onCardOpen={openCard(root.id)}
              onGenerateChildren={generateSubcards(root.id)}
              onRemoveNode={removeCard(root.id)}
              onToggle={set}
            />
            {root.parentId !== null && (
              <S.CardTeaserPlaceholderContext>
                <CardTeaserPlaceholder
                  label="+ Add card below"
                  onClick={insertCard(root.parentId, {
                    afterOrBefore: 'after',
                    nodeId: root.id
                  })}
                />
              </S.CardTeaserPlaceholderContext>
            )}
            {!root.children.length && (
              <S.CardTeaserPlaceholderContext move>
                <CardTeaserPlaceholder
                  label="+ Add subcard"
                  onClick={insertCard(root.id)}
                />
              </S.CardTeaserPlaceholderContext>
            )}
          </S.CardTeaserContext>
          <S.LevelContext>
            {root.children.map((child, index) => (
              <React.Fragment key={child.id}>
                <GenericStoryTree_VariantA
                  generateChildrenTreeNodes={generateChildrenTreeNodes}
                  insertTreeNode={insertTreeNode}
                  removeTreeNode={removeTreeNode}
                  root={child}
                  style={{ zIndex: root.children.length - index }}
                  updateTreeNode={updateTreeNode}
                />
              </React.Fragment>
            ))}
          </S.LevelContext>
        </React.Fragment>
      )}
    </S.GenericStoryTree_VariantA>
  );
}
