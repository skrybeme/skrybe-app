import React, { useCallback } from 'react';
import { CardTeaser } from '@/ui/components/CardTeaser';
import { GenericCardTeaserTreeProps } from '@/interfaces/props';
import { StoryTreeViewModel } from '@/interfaces/view-models';
import * as S from './styles';
import { ButtonAddCard_VariantA } from '../ButtonAddCard';

export function GenericCardTeaserTree_VariantA({
  insertTreeNode,
  nodes
}: GenericCardTeaserTreeProps): JSX.Element {
  const insertCard = useCallback((parentNode, placeBefore?) => {
    return (e: MouseEvent): void => {
      insertTreeNode(parentNode, placeBefore);
    }
  }, [insertTreeNode]);

  return (
    <S.GenericCardTeaserTree_VariantA>
      <CardTeaser
        header={nodes?.header || ''}
        tags={nodes?.tags || []}
      />
      <S.LevelContext>
        {nodes?.children.map((child: StoryTreeViewModel) => (
          <React.Fragment key={child.id}>
            <S.ClickableArea>
              <ButtonAddCard_VariantA onClick={insertCard(nodes, child)} />
            </S.ClickableArea>
            <GenericCardTeaserTree_VariantA
              insertTreeNode={insertTreeNode}
              nodes={child}
            />
          </React.Fragment>
        ))}
        <S.ClickableArea isOnly={!nodes?.children?.length}>
          <ButtonAddCard_VariantA onClick={insertCard(nodes)} />
        </S.ClickableArea>
      </S.LevelContext>
    </S.GenericCardTeaserTree_VariantA>
  );
}
