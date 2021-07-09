import Tag from '@/entities/Tag';
import { InMemoryRepo } from '@/repository';
import { GetTagsByTreeUseCase } from './GetTagsByTreeUseCase';

describe(`GetTagsByTreeUseCase`, () => {
  const tagCollection = [
    new Tag(),
    new Tag(),
    new Tag(),
    new Tag(),
    new Tag()
  ];

  const inMemoryTagRepo = new InMemoryRepo(tagCollection);

  const getTagsByTree = new GetTagsByTreeUseCase(inMemoryTagRepo);

  // @TODO Implement actual tags repository.
  xit(`resolves with null if the tree with given id does not exist in the repo`, async () => {
    const entry = await getTagsByTree.execute({ treeId: 'invalid-uuid' });

    expect(entry).toBeNull();
  });

  it(`resolves with tags domain model collection if it exists in the repo`, async () => {
    const entry = await getTagsByTree.execute({ treeId: 'example-tree' });

    expect(entry).toEqual(tagCollection);
  });
});
