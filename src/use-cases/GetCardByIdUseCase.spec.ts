import { StoryCardMap } from '@/mappers';
import { CardDetailsStore } from '@/store';
import { InMemoryStoryTreeRepo } from '@/repository';
import { GetCardByIdUseCase } from './GetCardByIdUseCase';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';

describe(`GetCardByIdUseCase`, () => {
  const tree = new Tree<StoryCard>();
  const card = new StoryCard();

  tree.insert(card);

  const inMemoryStoryTreeRepo = new InMemoryStoryTreeRepo([tree]);
  const cardDetailsStore = new CardDetailsStore();

  const getCardById = new GetCardByIdUseCase(inMemoryStoryTreeRepo, cardDetailsStore);

  it(
    `saves null to the store if the tree with given id does not exist in the repo`,
    async () => {
      await getCardById.execute({
        id: card.id,
        treeId: 'invalid-uuid'
      });

      expect(cardDetailsStore.data).toBeNull();
    }
  );

  it(`saves null to the store if the card with given id does not exist in the tree`, async () => {
    await getCardById.execute({
      id: 'invalid-uuid',
      treeId: tree.id
    });

    expect(cardDetailsStore.data).toBeNull();
  });

  it(`saves card model to the store if it exists in the tree`, async () => {
    await getCardById.execute({
      id: card.id,
      treeId: tree.id
    });

    const expectedData = StoryCardMap.toViewModel(card);

    expect(cardDetailsStore.data).toEqual(expectedData);
  });
});
