import { InMemoryStoryTreeRepo } from '@/repository';
import { StorySummaryDraftPreviewStore } from '@/store/StorySummaryDraftPreviewStore';
import { PreviewStorySummaryDraftUseCase } from './PreviewStorySummaryDraftUseCase';
import { lorem } from 'faker';
import { StoryTreeMap } from '@/mappers';
import StoryCard from '@/entities/StoryCard';
import Tag from '@/entities/Tag';
import Tree from '@/entities/Tree';
import StoryTreeInfo from '@/entities/StoryTreeInfo';
import { when } from 'mobx';

//      A
//     /\ \
//    B  C D
//   /\  |
//   E F G
const Fixture = (() => {
  const tags = [
    new Tag(),
    new Tag(),
    new Tag()
  ];

  return {
    cards: {
      A: new StoryCard({ header: 'A', tags: [tags[0], tags[1], tags[2]] }),
      B: new StoryCard({ header: 'B', tags: [tags[1]] }),
      C: new StoryCard({ header: 'C' }),
      D: new StoryCard({ header: 'D', tags: [tags[1]] }),
      E: new StoryCard({ header: 'E', tags: [tags[1]] }),
      F: new StoryCard({ header: 'F' }),
      G: new StoryCard({ header: 'G' })
    },
    tags,
    tree: new Tree<StoryCard>({
      info: new StoryTreeInfo({ title: lorem. sentence() })
    })
  };
})();

Fixture.tree.insert(Fixture.cards.A);
Fixture.tree.insert(Fixture.cards.B);
Fixture.tree.insert(Fixture.cards.C);
Fixture.tree.insert(Fixture.cards.D);
Fixture.tree.insert(Fixture.cards.E, Fixture.cards.B.id);
Fixture.tree.insert(Fixture.cards.F, Fixture.cards.B.id);
Fixture.tree.insert(Fixture.cards.G, Fixture.cards.C.id);

describe("PreviewStorySummaryDraftUseCase", () => {
  const storyTreeRootRepo = new InMemoryStoryTreeRepo([Fixture.tree]);

  const storySummaryDraftPreviewStore = new StorySummaryDraftPreviewStore();

  const previewStorySummaryDraft = new PreviewStorySummaryDraftUseCase(
    storyTreeRootRepo,
    storySummaryDraftPreviewStore
  );

  it("saves error to the store if given story tree does not exist in the repo", async () => {
    await previewStorySummaryDraft.execute({
      storyTreeNodeIds: [
        Fixture.cards.G.id,
        Fixture.cards.D.id,
        Fixture.cards.E.id,
        Fixture.cards.B.id
      ],
      treeId: 'invalid-tree-id',
    });

    await when(() => !storySummaryDraftPreviewStore.isLoading);

    expect(storySummaryDraftPreviewStore.data).toBeNull();
    expect(storySummaryDraftPreviewStore.isError).toBeTruthy();
  });

  it("saves error to the store if even one of the card ids is not part of the tree", async () => {
    await previewStorySummaryDraft.execute({
      storyTreeNodeIds: [
        'invalid-card-id',
        Fixture.cards.D.id,
        Fixture.cards.E.id,
        Fixture.cards.B.id
      ],
      treeId: Fixture.tree.id,
    });

    await when(() => !storySummaryDraftPreviewStore.isLoading);

    expect(storySummaryDraftPreviewStore.data).toBeNull();
    expect(storySummaryDraftPreviewStore.isError).toBeTruthy();
  });
  
  it("saves StorySummaryDraft in the store built with given card ids array", async () => {
    await previewStorySummaryDraft.execute({
      storyTreeNodeIds: [
        Fixture.cards.G.id,
        Fixture.cards.D.id,
        Fixture.cards.E.id,
        Fixture.cards.B.id
      ],
      treeId: Fixture.tree.id,
    });

    expect(storySummaryDraftPreviewStore.data).toEqual({
      cards: [
        {
          body: Fixture.cards.G.body,
          header: Fixture.cards.G.header,
          id: Fixture.cards.G.id,
          tags: []
        },
        {
          body: Fixture.cards.D.body,
          header: Fixture.cards.D.header,
          id: Fixture.cards.D.id,
          tags: [
            {
              color: Fixture.cards.D.tags[0].color,
              id: Fixture.cards.D.tags[0].id,
              label: Fixture.cards.D.tags[0].label
            }
          ]
        },
        {
          body: Fixture.cards.E.body,
          header: Fixture.cards.E.header,
          id: Fixture.cards.E.id,
          tags: [
            {
              color: Fixture.cards.E.tags[0].color,
              id: Fixture.cards.E.tags[0].id,
              label: Fixture.cards.E.tags[0].label
            }
          ]
        },
        {
          body: Fixture.cards.B.body,
          header: Fixture.cards.B.header,
          id: Fixture.cards.B.id,
          tags: [
            {
              color: Fixture.cards.B.tags[0].color,
              id: Fixture.cards.B.tags[0].id,
              label: Fixture.cards.B.tags[0].label
            }
          ]
        }
      ],
      title: Fixture.tree.info!.title,
      tree: StoryTreeMap.toViewModel(Fixture.tree)
    });
  });
});
