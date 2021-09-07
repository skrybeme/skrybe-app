import React from 'react';
import { observer } from 'mobx-react-lite';
import { CardEditor_VariantA } from '@/ui/domain-components/CardEditor';
import { useCardEditorPresenter } from './presenter';

export type CardEditorProps = React.PropsWithChildren<{
  cardId?: string,
  treeId: string
}>;

export const CardEditor = observer<CardEditorProps>(({
  cardId,
  treeId
}): React.ReactElement => {
  const {
    card,
    getCardById,
    getTagsByTree,
    handleChange,
    tags
  } = useCardEditorPresenter({ cardId, treeId });

  React.useEffect(() => {
    getTagsByTree.execute({ treeId });
    getCardById.execute({ id: cardId!, treeId });
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
