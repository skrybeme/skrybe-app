import React, { useCallback } from 'react';
import { CardTeaserProps } from '@/interfaces/props';
import { UITag } from '@/interfaces';
import * as S from './styles';
import { TagViewModel } from '@/interfaces/view-models';

export function CardTeaser({
  handleClick,
  header,
  tags
}: CardTeaserProps): JSX.Element {
  const onClick = useCallback((event) => handleClick?.(event), [handleClick]);

  return (
    <S.CardTeaser
      onClick={onClick}
      title="Edit this card"
    >
      <S.Header>
        {header}
      </S.Header>
      <S.TagLine>
        {tags?.map((tag: TagViewModel) => (
          <S.Tag
            color={tag.color}
            key={tag.id}
          />
        ))}
      </S.TagLine>
    </S.CardTeaser>
  );
}
