import { useTreeDetails } from '@/ui/presenters';
import React from 'react';

export default function TreeDetails(): JSX.Element {
  const { nodes } = useTreeDetails();

  console.log(nodes);

  return (
    <div />
  );
}
