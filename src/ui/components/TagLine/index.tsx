import { TagLineProps } from '@/interfaces/props';
import React from 'react';
import * as S from './styles';

export function TagLine({ tags }: TagLineProps): React.ReactElement<TagLineProps> {
  return (
    <S.TagLine>
      {tags.map((tag) => (
        <S.Tag
          color={tag.color}
          data-testid="tag"
          key={tag.id}
        />
      ))}
    </S.TagLine>
  );
}
