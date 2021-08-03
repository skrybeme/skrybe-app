import React from 'react';
import { observer } from 'mobx-react-lite';
import { CardEditor_VariantA } from '@/ui/domain-components/CardEditor';
import { useCardEditorPresenter } from './presenter';
import { defaultStoryTreeRootCollection } from '@/data-sources/localstorage/data';

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
    getTagsByTree.execute({ treeId: defaultStoryTreeRootCollection[0].id });
    getCardById.execute({ id: cardId!, treeId: defaultStoryTreeRootCollection[0].id });
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
