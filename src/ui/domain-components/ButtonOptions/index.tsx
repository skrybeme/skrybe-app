import { Button } from '@/ui/components/Button';
import React from 'react';

export function ButtonOptions_VariantA(): JSX.Element {
  return (
    <Button muted rounded>
      <i className="fa fa-ellipsis-v" />
    </Button>
  );
}
