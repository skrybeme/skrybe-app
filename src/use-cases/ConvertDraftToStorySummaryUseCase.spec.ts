import { StorySummary } from '@/entities/StorySummary';
import { StorySummaryDraft } from '@/entities/StorySummaryDraft';
import { InMemoryStorySummaryRepo } from '@/repository/InMemoryStorySummaryRepo';
import { TestDomainStore } from '@/store/TestDomainStore';
import { lorem, datatype } from 'faker';
import { ConvertDraftToStorySummaryUseCase } from './ConvertDraftToStorySummaryUseCase';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';

const Fixture = (() => {
  const tree = new Tree<StoryCard>();

  const cards = [
    new StoryCard({
      body: lorem.sentences(),
      header: lorem.sentence(),
      tags: []
    })
  ];
  
  tree.insert(cards[0]);

  const storySummaryDraft = new StorySummaryDraft({
    cards,
    title: lorem.sentence(),
    tree
  }, datatype.uuid());

  return {
    cards,
    storySummaryDraft,
    storySummary: storySummaryDraft.toStorySummary()
  };
})();

describe("ConvertDraftToStorySummaryUseCase", () => {
  const storySummaryRepo = new InMemoryStorySummaryRepo();
  const storySummaryDraftDomainStore = new TestDomainStore<StorySummaryDraft>();
  const storySummaryDomainStore = new TestDomainStore<StorySummary>();

  const convertDraftToStorySummary = new ConvertDraftToStorySummaryUseCase(
    storySummaryRepo,
    storySummaryDraftDomainStore,
    storySummaryDomainStore
  );
  
  it("saves with error if there is no story summary draft in the domain store", async () => {
    await convertDraftToStorySummary.execute();

    expect(storySummaryDomainStore.data).toBeNull();
    expect(storySummaryDomainStore.isError).toBeTruthy();
  });

  it("persist story summary draft as story summary in the repository", async () => {
    storySummaryDraftDomainStore.set({
      data: Fixture.storySummaryDraft
    });

    await convertDraftToStorySummary.execute();

    const collection = await storySummaryRepo.getCollection();

    expect(collection[0].body).toEqual(Fixture.storySummary.body)
    expect(collection[0].title).toEqual(Fixture.storySummary.title)
  });

  it("saves story summary draft as story summary in dedicated domain store", () => {
    expect(storySummaryDomainStore.data?.body).toEqual(Fixture.storySummary.body);
    expect(storySummaryDomainStore.data?.title).toEqual(Fixture.storySummary.title);
  });
});
