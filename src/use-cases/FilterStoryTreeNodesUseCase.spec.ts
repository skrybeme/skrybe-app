import { FilteredStoryTreeNodesStore } from '@/store/FilteredStoryTreeNodesStore';
import { CrawlDirection, FilterStoryTreeNodesUseCase } from './FilterStoryTreeNodesUseCase';
import { InMemoryStoryTreeRepo } from '@/repository';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import Tag from '@/entities/Tag';

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
    tree: new Tree<StoryCard>()
  };
})();

Fixture.tree.insert(Fixture.cards.A);
Fixture.tree.insert(Fixture.cards.B);
Fixture.tree.insert(Fixture.cards.C);
Fixture.tree.insert(Fixture.cards.D);
Fixture.tree.insert(Fixture.cards.E, Fixture.cards.B.id);
Fixture.tree.insert(Fixture.cards.F, Fixture.cards.B.id);
Fixture.tree.insert(Fixture.cards.G, Fixture.cards.C.id);

describe(`FilterStoryTreeNodesUseCase`, () => {
  const storyTreeRootRepo = new InMemoryStoryTreeRepo([Fixture.tree]);

  const filteredStoryTreeNodesStore = new FilteredStoryTreeNodesStore();

  const filterStoryTreeNodes
    = new FilterStoryTreeNodesUseCase(storyTreeRootRepo, filteredStoryTreeNodesStore);

  it(
    `saves error to the store if tree with given id does not exist in the repo`,
    async () => {
      await filterStoryTreeNodes.execute({
        direction: CrawlDirection.BREATH,
        treeId: 'non-existing-id'
      });

      expect(filteredStoryTreeNodesStore.data).toBeNull();
      expect(filteredStoryTreeNodesStore.isError).toBeTruthy();
    }
  );

  it.each([CrawlDirection.BREATH, CrawlDirection.DEEP])(
    `fitlers nodes by those having at least one of given tags in %p direction`,
    async () => {
      await filterStoryTreeNodes.execute({
        direction: CrawlDirection.BREATH,
        tagIds: [Fixture.tags[0].id],
        treeId: Fixture.tree.id
      });

      expect(filteredStoryTreeNodesStore.data).toEqual([Fixture.cards.A.id]);

      await filterStoryTreeNodes.execute({
        direction: CrawlDirection.DEEP,
        tagIds: [Fixture.tags[0].id],
        treeId: Fixture.tree.id
      });

      expect(filteredStoryTreeNodesStore.data).toEqual([Fixture.cards.A.id]);

      await filterStoryTreeNodes.execute({
        direction: CrawlDirection.BREATH,
        tagIds: [Fixture.tags[1].id, Fixture.tags[2].id],
        treeId: Fixture.tree.id
      });

      expect(filteredStoryTreeNodesStore.data).toEqual([
        Fixture.cards.A.id,
        Fixture.cards.B.id,
        Fixture.cards.D.id,
        Fixture.cards.E.id
      ]);

      await filterStoryTreeNodes.execute({
        direction: CrawlDirection.DEEP,
        tagIds: [Fixture.tags[1].id, Fixture.tags[2].id],
        treeId: Fixture.tree.id
      });

      expect(filteredStoryTreeNodesStore.data).toEqual([
        Fixture.cards.A.id,
        Fixture.cards.B.id,
        Fixture.cards.E.id,
        Fixture.cards.D.id
      ]);
    }
  );

  it(`filters nodes by those without tags`, async () => {
    await filterStoryTreeNodes.execute({
      direction: CrawlDirection.BREATH,
      tagIds: [''],
      treeId: Fixture.tree.id
    });

    expect(filteredStoryTreeNodesStore.data).toEqual([
      Fixture.cards.C.id,
      Fixture.cards.F.id,
      Fixture.cards.G.id
    ]);

    await filterStoryTreeNodes.execute({
      direction: CrawlDirection.DEEP,
      tagIds: ['', ''],
      treeId: Fixture.tree.id
    });

    expect(filteredStoryTreeNodesStore.data).toEqual([
      Fixture.cards.F.id,
      Fixture.cards.C.id,
      Fixture.cards.G.id
    ]);
  });

  it(`filters nodes by combined tags`, async () => {
    await filterStoryTreeNodes.execute({
      direction: CrawlDirection.BREATH,
      tagIds: ['', Fixture.tags[2].id],
      treeId: Fixture.tree.id
    });

    expect(filteredStoryTreeNodesStore.data).toEqual([
      Fixture.cards.A.id,
      Fixture.cards.C.id,
      Fixture.cards.F.id,
      Fixture.cards.G.id
    ]);

    await filterStoryTreeNodes.execute({
      direction: CrawlDirection.DEEP,
      tagIds: ['', Fixture.tags[2].id],
      treeId: Fixture.tree.id
    });

    expect(filteredStoryTreeNodesStore.data).toEqual([
      Fixture.cards.A.id,
      Fixture.cards.F.id,
      Fixture.cards.C.id,
      Fixture.cards.G.id
    ]);
  });

  it(`filters nodes regardless attached tags`, async () => {
    await filterStoryTreeNodes.execute({
      direction: CrawlDirection.BREATH,
      treeId: Fixture.tree.id
    });

    expect(filteredStoryTreeNodesStore.data).toEqual([
      Fixture.cards.A.id,
      Fixture.cards.B.id,
      Fixture.cards.C.id,
      Fixture.cards.D.id,
      Fixture.cards.E.id,
      Fixture.cards.F.id,
      Fixture.cards.G.id,
    ]);

    await filterStoryTreeNodes.execute({
      direction: CrawlDirection.DEEP,
      treeId: Fixture.tree.id
    });

    expect(filteredStoryTreeNodesStore.data).toEqual([
      Fixture.cards.A.id,
      Fixture.cards.B.id,
      Fixture.cards.E.id,
      Fixture.cards.F.id,
      Fixture.cards.C.id,
      Fixture.cards.G.id,
      Fixture.cards.D.id,
    ]);
  });

  it(`filters nodes by leafs`, async () => {
    await filterStoryTreeNodes.execute({
      direction: CrawlDirection.BREATH,
      leafsOnly: true,
      treeId: Fixture.tree.id
    });

    expect(filteredStoryTreeNodesStore.data).toEqual([
      Fixture.cards.D.id,
      Fixture.cards.E.id,
      Fixture.cards.F.id,
      Fixture.cards.G.id,
    ]);

    await filterStoryTreeNodes.execute({
      direction: CrawlDirection.DEEP,
      leafsOnly: true,
      treeId: Fixture.tree.id
    });

    expect(filteredStoryTreeNodesStore.data).toEqual([
      Fixture.cards.E.id,
      Fixture.cards.F.id,
      Fixture.cards.G.id,
      Fixture.cards.D.id,
    ]);
  });

  it(`filters nodes by combined constraints`, async () => {
    await filterStoryTreeNodes.execute({
      direction: CrawlDirection.BREATH,
      leafsOnly: true,
      tagIds: [Fixture.tags[0].id],
      treeId: Fixture.tree.id
    });

    expect(filteredStoryTreeNodesStore.data).toEqual([]);

    await filterStoryTreeNodes.execute({
      direction: CrawlDirection.BREATH,
      leafsOnly: true,
      tagIds: ['', Fixture.tags[2].id],
      treeId: Fixture.tree.id
    });

    expect(filteredStoryTreeNodesStore.data).toEqual([
      Fixture.cards.F.id,
      Fixture.cards.G.id
    ]);

    await filterStoryTreeNodes.execute({
      direction: CrawlDirection.DEEP,
      leafsOnly: true,
      tagIds: ['', Fixture.tags[2].id],
      treeId: Fixture.tree.id
    });

    expect(filteredStoryTreeNodesStore.data).toEqual([
      Fixture.cards.F.id,
      Fixture.cards.G.id
    ]);
  });
});
