import React, { useCallback, useState } from 'react';
import { CardTeaser } from '@/ui/components/CardTeaser';
import { ButtonAddCard_VariantA } from '../ButtonAddCard';
import {
  PickerCardTeaserOptions_VariantA
} from '@/ui/domain-components/PickerCardTeaserOptions';
import { GenericCardTeaserTreeProps } from '@/interfaces/props';
import { StoryTreeViewModel } from '@/interfaces/view-models';
import * as S from './styles';

export function GenericCardTeaserTree_VariantA({
  generateChildrenTreeNodes,
  insertTreeNode,
  removeTreeNode,
  root,
  updateTreeNode
}: GenericCardTeaserTreeProps): JSX.Element {
  const generateSubcards = useCallback((nodeId: string) => {
    return (): void => {
      generateChildrenTreeNodes(nodeId);
    }
  }, []);

  const insertCard = useCallback((parentNodeId?: string, placeBeforeNodeId?: string) => {
    return (): void => {
      insertTreeNode(parentNodeId, placeBeforeNodeId)
    }
  }, [insertTreeNode]);

  const removeCard = useCallback((nodeId: string) => {
    return (): void => {
      removeTreeNode(nodeId);
    }
  }, []);

  const updateCard = useCallback((nodeId: string) => {
    return (header: string): void => {
      updateTreeNode(nodeId, { header });
    }
  }, []);

  const [isOptionsPickerOpen, setIsOptionsPickerOpen] = useState(false);

  const onOptionsPickerToggle = useCallback((isOpen: boolean) => {
    setIsOptionsPickerOpen(isOpen);
  }, []);

  return (
    <S.GenericCardTeaserTree_VariantA
      data-testid="generic-card-teaser-tree"
      hoisted={isOptionsPickerOpen}
    >
      {root && (
        <React.Fragment>
          <S.CardTeaserContext>
            <CardTeaser
              handleHeaderChange={updateCard(root.id)}
              header={root?.header || ''}
              tags={root?.tags || []}
            />
            <S.CardOptions>
              <PickerCardTeaserOptions_VariantA
                onGenerateChildren={generateSubcards(root.id)}
                onRemoveNode={removeCard(root.id)}
                onToggle={onOptionsPickerToggle}
              />
            </S.CardOptions>
          </S.CardTeaserContext>
          <S.LevelContext>
            {root.children.map((child: StoryTreeViewModel) => (
              <React.Fragment key={child.id}>
                <S.ClickableArea>
                  <ButtonAddCard_VariantA onClick={insertCard(root.id, child.id)} />
                </S.ClickableArea>
                <GenericCardTeaserTree_VariantA
                  generateChildrenTreeNodes={generateChildrenTreeNodes}
                  insertTreeNode={insertTreeNode}
                  removeTreeNode={removeTreeNode}
                  root={child}
                  updateTreeNode={updateTreeNode}
                />
              </React.Fragment>
            ))}
            <S.ClickableArea isOnly={!root.children?.length}>
              <ButtonAddCard_VariantA onClick={insertCard(root.id)} />
            </S.ClickableArea>
          </S.LevelContext>
        </React.Fragment>
      )}
      {!root && (
        <S.ClickableArea isOnly>
          <ButtonAddCard_VariantA onClick={insertCard()} />
        </S.ClickableArea>
      )}
    </S.GenericCardTeaserTree_VariantA>
  );
}
