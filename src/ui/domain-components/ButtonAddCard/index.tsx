import { ButtonAddCardProps } from '@/interfaces/props';
import { Button } from '@/ui/components/Button';
import React from 'react';

export function ButtonAddCard_VariantA({ onClick }: ButtonAddCardProps): JSX.Element {
  return (
    <Button
      muted
      onClick={onClick}
      rounded
    >
      <i className="fa fa-plus" />
    </Button>
  );
}
