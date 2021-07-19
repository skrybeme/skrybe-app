import StoryTreeInfo from '@/entities/StoryTreeInfo';
import { InMemoryRepo } from '@/repository';
import { GetStoryTreeInfoCollectionUseCase } from './GetStoryTreeInfoCollectionUseCase';
import { lorem } from 'faker';

describe(`GetStoryTreeInfoCollectionUseCase`, () => {
  const storyTreeInfoCollection = [
    new StoryTreeInfo({ title: lorem.sentence() }),
    new StoryTreeInfo({ title: lorem.sentence() }),
    new StoryTreeInfo({ title: lorem.sentence() }),
    new StoryTreeInfo({ title: lorem.sentence() })
  ];

  const inMemoryStoryTreeInfoRepo = new InMemoryRepo(storyTreeInfoCollection);

  const getStoryTreeInfoCollection
    = new GetStoryTreeInfoCollectionUseCase(inMemoryStoryTreeInfoRepo);

  it(`resolves with tags domain model collection if it exists in the repo`, async () => {
    const entries = await getStoryTreeInfoCollection.execute();

    expect(entries).toEqual(storyTreeInfoCollection);
  });
});
