import React, { useCallback } from 'react';
import { CardTeaser } from '@/ui/components/CardTeaser';
import { ButtonAddCard_VariantA } from '../ButtonAddCard';
import {
  PickerCardTeaserOptions_VariantA
} from '@/ui/domain-components/PickerCardTeaserOptions';
import { GenericCardTeaserTreeProps } from '@/interfaces/props';
import { StoryTreeViewModel } from '@/interfaces/view-models';
import * as S from './styles';

export function GenericCardTeaserTree_VariantA({
  insertTreeNode,
  nodes
}: GenericCardTeaserTreeProps): JSX.Element {
  const insertCard = useCallback((parentNodeId: string, placeBeforeNodeId?: string) => {
    return (): void => {
      insertTreeNode(parentNodeId, placeBeforeNodeId);
    }
  }, [insertTreeNode]);

  return (
    <S.GenericCardTeaserTree_VariantA>
      <S.CardTeaserContext>
        <CardTeaser
          header={nodes?.header || ''}
          tags={nodes?.tags || []}
        />
        <S.CardOptions>
          <PickerCardTeaserOptions_VariantA />
        </S.CardOptions>
      </S.CardTeaserContext>
      {nodes && (
        <S.LevelContext>
          {nodes.children.map((child: StoryTreeViewModel) => (
            <React.Fragment key={child.id}>
              <S.ClickableArea>
                <ButtonAddCard_VariantA onClick={insertCard(nodes.id, child.id)} />
              </S.ClickableArea>
              <GenericCardTeaserTree_VariantA
                insertTreeNode={insertTreeNode}
                nodes={child}
              />
            </React.Fragment>
          ))}
          <S.ClickableArea isOnly={!nodes?.children?.length}>
            <ButtonAddCard_VariantA onClick={insertCard(nodes.id)} />
          </S.ClickableArea>
        </S.LevelContext>
      )}
    </S.GenericCardTeaserTree_VariantA>
  );
}
