import { TagMap } from '@/mappers';
import { InMemoryRepo } from '@/repository';
import { TagCollectionStore } from '@/store/TagCollectionStore';
import { GetTagsByTreeUseCase } from './GetTagsByTreeUseCase';
import Tag from '@/entities/Tag';

describe(`GetTagsByTreeUseCase`, () => {
  const tagCollection = [
    new Tag(),
    new Tag(),
    new Tag(),
    new Tag(),
    new Tag()
  ];

  const inMemoryTagRepo = new InMemoryRepo(tagCollection);
  const tagCollectionStore = new TagCollectionStore();

  const getTagsByTree = new GetTagsByTreeUseCase(inMemoryTagRepo, tagCollectionStore);

  // @TODO Implement actual tags repository.
  xit(`resolves with null if the tree with given id does not exist in the repo`, async () => {
    const entry = await getTagsByTree.execute({ treeId: 'invalid-uuid' });

    expect(entry).toBeNull();
  });

  it(`saves tags collection to the store if it exists in the repo`, async () => {
    await getTagsByTree.execute({ treeId: 'example-tree' });

    const expectedData = tagCollection.map(TagMap.toViewModel);

    expect(tagCollectionStore.data).toEqual(expectedData);
  });
});
