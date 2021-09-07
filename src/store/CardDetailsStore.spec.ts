import { TagColor } from '@/entities/enums';
import { lorem } from 'faker';
import { CardDetailsStore } from './CardDetailsStore';
import { describeCommonStoreSpec } from './common-store-spec';
import { reaction } from 'mobx';
import { StoryCardMap } from '@/mappers';
import StoryCard from '@/entities/StoryCard';
import Tag from '@/entities/Tag';

describe(`Store: CardDetailsStore`, () => {
  describeCommonStoreSpec(CardDetailsStore);

  it(`returns domain model transformed to view model`, () => {
    const store = new CardDetailsStore();

    const card = new StoryCard({
      body: '',
      header: ''
    });

    card.addTag(new Tag({
      color: TagColor.BLUE,
      label: lorem.word()
    }));

    card.addTag(new Tag({
      color: TagColor.ORANGE,
      label: lorem.word()
    }));

    card.addTag(new Tag({
      color: TagColor.RED,
      label: lorem.word()
    }));

    reaction(
      () => store.data !== null,
      () => {
        expect(store.data).toEqual(StoryCardMap.toViewModel(card));
      }
    );

    store.set({ data: card });
  });
});
