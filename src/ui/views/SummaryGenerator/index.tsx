import React from 'react';
import {
  PickerStorySummarySaveAs_VariantA as PickerStorySummarySaveAs
} from '@/ui/domain-components/PickerStorySummarySaveAs';
import {
  SelectableStoryTree_VariantA as SelectableStoryTree
} from '@/ui/domain-components/SelectableStoryTree/VariantA';
import {
  storyTreeRootViewModelFixture
} from '@/ui/domain-components/SelectableStoryTree/fixtures';
import { TagColor } from '@/entities/enums';
import { EditableTags } from '@/ui/components/EditableTags';
import { Checkbox_VariantA as Checkbox } from '@/ui/components/Checkbox';
import { IdentifiableLabel, SimpleTabs_VariantA as SimpleTabs } from '@/ui/components/SimpleTabs';
import { StoryTreeViewModel } from '@/interfaces/view-models';
import { CrawlDirection } from '@/use-cases/FilterStoryTreeNodesUseCase';
import { Maybe } from '@/common/types';
import * as S from './styles';
import * as GS from '@/ui/styles/global';

export interface SelectableStoryTreeRootViewModel extends StoryTreeViewModel {
  children: Array<SelectableStoryTreeRootViewModel>;
  isSelected: boolean;
}

export interface DomainStore {
  /**
   * false - nic nie rób
   * true - zaznacz wszystkie liście
   */
  applyLeavesOnly: (leavesOnly: boolean) => void;
  applyNodes: (nodeIds: string[]) => void;
  /**
   * Nie zmieniaj wybranych node'ów, zmień tylko kolejność.
   */
  applyOrder: (order: CrawlDirection) => void;
  applyTags: (tagIds: Maybe<string>[]) => void;
  /**
   * We keep the data about selected items as part of the item schema, for better ui
   * performance.
   */
  data: SelectableStoryTreeRootViewModel;
}

export interface SummaryGeneratorProps {
  store: DomainStore;
}

export function SummaryGenerator({
  store
}: SummaryGeneratorProps): React.ReactElement<SummaryGeneratorProps> {
  const handleOrderChange = React.useCallback((tab: IdentifiableLabel) => {
    store.applyOrder(tab.id as unknown as CrawlDirection);
  }, [store.applyOrder]);

  return (
    <S.SummaryGenerator>
      <S.Topbar>
        <S.Headline>
          Story summary draft
        </S.Headline>
        <PickerStorySummarySaveAs />
      </S.Topbar>
      <GS.SimpleLabel>
        Tags
      </GS.SimpleLabel>
      <EditableTags
        tags={
          [
            {
              color: TagColor.EMPTY,
              id: '0',
            },
            {
              color: TagColor.RED,
              id: '1',
            },
            {
              color: TagColor.GREEN,
              id: '2',
            },
            {
              color: TagColor.YELLOW,
              id: '3',
            },
            {
              color: TagColor.BLUE,
              id: '4',
            },
            {
              color: TagColor.ORANGE,
              id: '5',
            },
            {
              color: TagColor.PURPLE,
              id: '6',
            },
            {
              color: TagColor.VIOLET,
              id: '7',
            }
          ]
        }
        values={['0', '1', '2', '3', '4', '5', '6', '7']}
      />
      <GS.SimpleLabel>
        Order
      </GS.SimpleLabel>
      <SimpleTabs
        onChange={handleOrderChange}
        tabs={[
          {
            id: '1',
            label: 'Subcards first'
          },
          {
            id: '2',
            label: 'Siblings first'
          }
        ]}
        value="1"
      />
      <GS.SimpleLabel>
        Leaves - cards without subcards
      </GS.SimpleLabel>
      <Checkbox
        id="summary-generator-leaves-only"
        value={false}
      >
        Include leaves only
      </Checkbox>
      <GS.SimpleLabel>
        Cards
      </GS.SimpleLabel>
      <SelectableStoryTree root={storyTreeRootViewModelFixture} />
    </S.SummaryGenerator>
  );
}
