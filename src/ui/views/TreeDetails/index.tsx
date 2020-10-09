import {
  GenericCardTeaserTree_VariantA
} from '@/ui/components/GenericCardTeaserTree';
import { useDraggable } from '@/ui/hooks';
import { useTreeDetails } from '@/ui/presenters';
import React from 'react';

export default function TreeDetails(): JSX.Element {
  const { nodes } = useTreeDetails();
  const dragHandleRef = useDraggable();

  return (
    <div ref={dragHandleRef}>
      <GenericCardTeaserTree_VariantA nodes={nodes.data} />
    </div>
  );
}
