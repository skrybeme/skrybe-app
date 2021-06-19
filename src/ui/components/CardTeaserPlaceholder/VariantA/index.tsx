import { CardTeaserPlaceholderProps } from '@/interfaces/props';
import React from 'react';
import * as S from './styles';

export function CardTeaserPlaceholder_VariantA({
  label,
  onClick
}: CardTeaserPlaceholderProps): React.ReactElement<CardTeaserPlaceholderProps> {
  return (
    <S.CardTeaserPlaceholder_VariantA>
      <S.Button onClick={onClick}>
        <span>{label}</span>
      </S.Button>
    </S.CardTeaserPlaceholder_VariantA>
  )
}
