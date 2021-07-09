import React, { useEffect } from 'react';
import { CardEditor_VariantA } from '@/ui/domain-components/CardEditor';
import { useCardDetailsPresenter, useTagCollectionPresenter } from '@/ui/presenters';
import { TagViewModel } from '@/interfaces/view-models';

export function CardEditor({ cardId }): React.ReactElement {
  const { card, triggerGetCardById, updateTreeNode } = useCardDetailsPresenter({ cardId });

  const { tags, triggerGetTagsByTree } = useTagCollectionPresenter();

  useEffect(() => {
    triggerGetTagsByTree('example-tree');
    triggerGetCardById(cardId);
  }, []);

  const handleChange = React.useCallback((args: { body: string, header: string, tags: TagViewModel[] }) => {
    updateTreeNode('c0773e64-3a3a-11eb-adc1-0242ac120002', cardId, {
      body: args.body,
      header: args.header,
      tags: args.tags.map(({ id }) => id)
    });
  }, [updateTreeNode]);

  return (
    <CardEditor_VariantA
      availableTags={tags.data || []}
      body={card.data?.body}
      header={card.data?.header}
      onChange={handleChange}
      tags={card.data?.tags || []}
    />
  );
}