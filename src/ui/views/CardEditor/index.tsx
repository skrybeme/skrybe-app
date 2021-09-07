import React from 'react';
import { observer } from 'mobx-react-lite';
import { CardEditor_VariantA } from '@/ui/domain-components/CardEditor';
import { useCardEditorPresenter } from './presenter';

export type CardEditorProps = React.PropsWithChildren<{ cardId?: string }>;

export const CardEditor = observer<CardEditorProps>(({ cardId }): React.ReactElement => {
  const {
    card,
    getCardById,
    getTagsByTree,
    handleChange,
    tags
  } = useCardEditorPresenter({ cardId });

  React.useEffect(() => {
    getTagsByTree.execute({ treeId: 'ba5ff9b6-c93c-4af9-b6d2-8e73168db61c' });
    getCardById.execute({ id: cardId!, treeId: 'ba5ff9b6-c93c-4af9-b6d2-8e73168db61c' });
  }, [cardId, getCardById]);

  return (
    <div data-testid="card-editor">
      <CardEditor_VariantA
        availableTags={tags || []}
        body={card?.body}
        header={card?.header}
        onChange={handleChange}
        tags={card?.tags || []}
      />
    </div>
  );
});
