import tree from "@/data-sources/localstorage/data/defaultStoryTree";
import StoryCard from "@/entities/StoryCard";
import Tree from "@/entities/Tree";
import { InMemoryRepo } from "@/repository";
import { GetTreeByIdUseCase } from "./GetTreeByIdUseCase";

describe(`GetTreeByIdUseCase`, () => {
  const tree = new Tree<StoryCard>();

  const inMemoryStoryTreeRepo = new InMemoryRepo([tree]);

  const getTreeById = new GetTreeByIdUseCase(inMemoryStoryTreeRepo);

  it(`resolves with null if the tree with given id does not exist in the repo`, async () => {
    const entry = await getTreeById.execute({ id: 'invalid-uuid' });

    expect(entry).toBeNull();
  });

  it(`resolves with story tree domain model if it exists in the repo`, async () => {
    const entry = await getTreeById.execute({ id: tree.id });

    expect(entry).toEqual(tree);
  });
});
