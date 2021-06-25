import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { InMemoryRepo } from '@/repository';
import { GetCardByIdUseCase } from './GetCardByIdUseCase';

describe(`GetCardByIdUseCase`, () => {
  const tree = new Tree<StoryCard>();
  const card = new StoryCard();

  tree.insert(card);

  const inMemoryStoryTreeRepo = new InMemoryRepo([tree]);

  const getCardById = new GetCardByIdUseCase(inMemoryStoryTreeRepo);

  it(`resolves with null if the tree with given id does not exist in the repo`, async () => {
    const entry = await getCardById.execute({
      id: card.id,
      treeId: 'invalid-uuid'
    });

    expect(entry).toBeNull();
  });

  it(`resolves with null if the card with given id does not exist in the tree`, async () => {
    const entry = await getCardById.execute({
      id: 'invalid-uuid',
      treeId: tree.id
    });

    expect(entry).toBeNull();
  });

  it(`resolves with card domain model if it exists in the tree`, async () => {
    const entry = await getCardById.execute({
      id: card.id,
      treeId: tree.id
    });

    expect(entry).toEqual(card);
  });
});
