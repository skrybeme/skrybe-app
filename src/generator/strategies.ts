import INestedStoryCard from '@/interfaces/INestedStoryCard';
import IStoryCard from '@/interfaces/IStoryCard';
import ITag from '@/interfaces/ITag';

export function crawl(nestedCard: INestedStoryCard, cb: Function): void {
  cb(nestedCard);

  if (!nestedCard.subcards) {
    return;
  }

  nestedCard.subcards.forEach(card => crawl(card, cb));
}

export function edgeNodesStrategy(rootNestedCard: Array<INestedStoryCard>): Array<IStoryCard> {
  let out: IStoryCard[] = [];

  crawl(rootNestedCard[0], (card: INestedStoryCard) => {
    if (!card) {
      return;
    }

    if (!card.subcards || !card.subcards.length) {
      out.push(card);
    }
  });

  return out;
}

export function specifiedNodesStrategy(ids: Array<number>, rootNestedCard: Array<INestedStoryCard>): Array<IStoryCard> {
  let out: IStoryCard[] = [];

  crawl(rootNestedCard[0], (card: INestedStoryCard) => {
    if (!card) {
      return;
    }

    if (ids.indexOf(card.id) > -1) {
      out.push(card);
    }
  });

  return out;
}

export function byTagsStrategy(tagIds: Array<number>, rootNestedCard: Array<INestedStoryCard>): Array<IStoryCard> {
  let out: IStoryCard[] = [];

  crawl(rootNestedCard[0], (card: INestedStoryCard) => {
    if (!card) {
      return;
    }

    if (!card.tags.length) {
      return;
    }

    if (
      card.tags.filter((tag: ITag) => tag.id && tagIds.indexOf(tag.id) > -1).length > 0
    ) {
      out.push(card);
    }
  });

  return out;
}
