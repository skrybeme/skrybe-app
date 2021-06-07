import React, { useCallback } from 'react';
import { CardTeaserProps } from '@/interfaces/props';
import * as S from './styles';
import { TagViewModel } from '@/interfaces/view-models';
import { Editable } from '../Editable';

export function CardTeaser({
  handleClick,
  handleHeaderChange,
  header,
  tags
}: CardTeaserProps): JSX.Element {
  const onClick = useCallback((event) => handleClick?.(event), [handleClick]);

  return (
    <S.CardTeaser
      data-testid="card-teaser"
      onClick={onClick}
      title="Edit this card"
    >
      <S.Header>
        <Editable
          blurOnEnter
          handleBlur={handleHeaderChange}
          value={header}
        />
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
