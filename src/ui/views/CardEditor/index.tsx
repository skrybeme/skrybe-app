import React, { useEffect } from 'react';
import { CardEditor_VariantA } from '@/ui/domain-components/CardEditor';
import { useCardDetailsPresenter } from '@/ui/presenters';

export function CardEditor({ cardId }): React.ReactElement {
 const { card, triggerGetCardById, updateTreeNode } = useCardDetailsPresenter({ cardId });

 useEffect(() => {
  triggerGetCardById(cardId);
 }, []);

 const handleChange = React.useCallback((args: { body: string, header: string }) => {
  updateTreeNode('c0773e64-3a3a-11eb-adc1-0242ac120002', cardId, args);
 }, [updateTreeNode]);

  return (
    <CardEditor_VariantA
      body={card.data?.body}
      header={card.data?.header}
      onChange={handleChange}
    />
  );
}