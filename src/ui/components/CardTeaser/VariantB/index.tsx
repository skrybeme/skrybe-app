import React from 'react';
import { CardTeaserProps } from '@/interfaces/props';
import * as S from './styles';
import { Editable } from '@/ui/components/Editable';
import { TagLine } from '@/ui/components/TagLine';

export function CardTeaser_VariantB({
  handleClick,
  handleHeaderChange,
  header,
  isDisabled,
  tags
}: CardTeaserProps): React.ReactElement<CardTeaserProps> {
  const onClick = React.useCallback((event) => handleClick?.(event), [handleClick]);

  return (
    <S.CardTeaser_VariantB
      data-testid="card-teaser"
      onClick={onClick}
      title="Edit this card"
    >
      <Editable
        handleBlur={handleHeaderChange}
        isDisabled={isDisabled}
        value={header}
      />
      <TagLine tags={tags || []} />
    </S.CardTeaser_VariantB>
  );
}
