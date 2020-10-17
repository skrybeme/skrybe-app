import { Button } from '@/ui/components/Button';
import React from 'react';

export function ButtonAddCard_VariantA(): JSX.Element {
  return (
    <Button muted rounded>
      <i className="fa fa-plus" />
    </Button>
  );
}
