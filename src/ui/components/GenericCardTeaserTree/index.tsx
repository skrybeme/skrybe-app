import React from 'react';
import { CardTeaser } from '../CardTeaser';
import { GenericCardTeaserTreeProps } from '@/interfaces/props';
import { UIStoryTree } from '@/interfaces';
import * as S from './styles';

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
        {nodes?.children.map((child: UIStoryTree) => (
          <GenericCardTeaserTree_VariantA
            key={child.id}
            nodes={child}
          />
        ))}
      </S.LevelContext>
    </S.GenericCardTeaserTree_VariantA>
  );
}
