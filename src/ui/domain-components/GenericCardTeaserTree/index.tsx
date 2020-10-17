import React from 'react';
import { CardTeaser } from '@/ui/components/CardTeaser';
import { GenericCardTeaserTreeProps } from '@/interfaces/props';
import { StoryTreeViewModel } from '@/interfaces/view-models';
import * as S from './styles';
import { ButtonAddCard_VariantA } from '../ButtonAddCard';

export function GenericCardTeaserTree_VariantA({
  nodes
}: GenericCardTeaserTreeProps): JSX.Element {
  return (
    <S.GenericCardTeaserTree_VariantA>
      <CardTeaser
        header={nodes?.header || ''}
        tags={nodes?.tags || []}
      />
      <S.LevelContext>
        {nodes?.children.map((child: StoryTreeViewModel) => (
          <>
            <S.ClickableArea key={`area-${child.id}`}>
              <ButtonAddCard_VariantA />
            </S.ClickableArea>
            <GenericCardTeaserTree_VariantA
              key={child.id}
              nodes={child}
            />
          </>
        ))}
        <S.ClickableArea isOnly={!nodes?.children?.length}>
          <ButtonAddCard_VariantA />
        </S.ClickableArea>
      </S.LevelContext>
    </S.GenericCardTeaserTree_VariantA>
  );
}
