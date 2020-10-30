import { ButtonOptionsProps } from '@/interfaces/props';
import { Button } from '@/ui/components/Button';
import React from 'react';

export function ButtonOptions_VariantA({ onClick }: ButtonOptionsProps): JSX.Element {
  return (
    <Button
      muted
      onClick={onClick}
      rounded
    >
      <i className="fa fa-ellipsis-v" />
    </Button>
  );
}
