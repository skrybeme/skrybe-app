import { Maybe, UuidType } from '@/common/types';
import { StorySummary } from './StorySummary';
import StoryCard from './StoryCard';
import Tree from './Tree';

export interface StorySummaryDraftProps {
  cards: StoryCard[];
  title?: string;
  tree?: Tree<StoryCard>;
}

export class StorySummaryDraft {
  constructor(
    private _props?: StorySummaryDraftProps,
    private _id: Maybe<UuidType> = null
  ) {
    if (!_props?.cards?.length) {
      return;
    }

    if (!_props.tree) {
      throw new Error(
        `[StorySummaryDraft] Cannot create story summary draft with cards and without no story tree.`
      );
    }

    const treeNodesMap = _props.tree.getAllNodes();

    _props.cards.forEach((card) => {
      if (!treeNodesMap.has(card.id)) {
        throw new Error(
          `[StorySummaryDraft] Card with id ${card.id} is not a part of tree with id ${_props.tree?.id}.`
        );
      }
    });
  }

  toStorySummary(): StorySummary {
    return new StorySummary({
      body: this.cards.map((card) => card.body).join('. '),
      title: this.title
    });
  }

  get cards(): StoryCard[] {
    return this._props?.cards || [];
  }

  get id() {
    return this._id;
  }

  get title(): UuidType | undefined {
    return this._props?.title;
  }

  get tree(): Tree<StoryCard> | undefined {
    return this._props?.tree;
  }
}
