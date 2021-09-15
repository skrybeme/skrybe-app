import StoryCard from '@/entities/StoryCard';
import { StorySummaryDraft } from '@/entities/StorySummaryDraft';
import Tree from '@/entities/Tree';
import { StorySummaryDraftMap } from '@/mappers/StorySummaryDraftMap';
import { InMemoryStorySummaryDraftRepo } from '@/repository/InMemoryStorySummaryDraftRepo';
import { StorySummaryDraftPreviewStore } from '@/store/StorySummaryDraftPreviewStore';
import { StorySummaryDraftStore } from '@/store/StorySummaryDraftStore';
import { datatype, lorem } from 'faker';
import { SaveStorySummaryDraftUseCase } from './SaveStorySummaryDraftUseCase';

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
    storySummaryDraft
  };
})();

describe("SaveStorySummaryDraftUseCase", () => {
  const storySummaryDraftRepo = new InMemoryStorySummaryDraftRepo();
  const storySummaryDraftPreviewStore = new StorySummaryDraftPreviewStore();
  const storySummaryDraftStore = new StorySummaryDraftStore();

  const saveStorySummaryDraftUseCase = new SaveStorySummaryDraftUseCase(
    storySummaryDraftRepo,
    storySummaryDraftPreviewStore,
    storySummaryDraftStore
  );

  it("saves error in the store if there is no draft preview stored", async () => {
    await saveStorySummaryDraftUseCase.execute();

    expect(storySummaryDraftStore.data).toBeNull();
    expect(storySummaryDraftStore.isError).toBeTruthy();
  });

  it("persists StorySummaryDraft saved in store to the repository", async () => {
    storySummaryDraftPreviewStore.set({
      data: Fixture.storySummaryDraft
    });

    await saveStorySummaryDraftUseCase.execute();

    const record = await storySummaryDraftRepo.getById(Fixture.storySummaryDraft.id);

    expect(record?.cards.length).toEqual(1);
    expect(record?.cards[0].body).toEqual(Fixture.cards[0].body);
    expect(record?.cards[0].header).toEqual(Fixture.cards[0].header);
    expect(record?.cards[0].id).toEqual(Fixture.cards[0].id);
    expect(record?.id).toEqual(Fixture.storySummaryDraft.id);
    expect(record?.title).toEqual(Fixture.storySummaryDraft.title);
  });

  it("saves persisted record in the store", () => {
    expect(storySummaryDraftStore.data)
      .toEqual(StorySummaryDraftMap.toViewModel(Fixture.storySummaryDraft));
  });
});
