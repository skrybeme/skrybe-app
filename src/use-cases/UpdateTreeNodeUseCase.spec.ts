import StoryCard from "@/entities/StoryCard";
import Tag from "@/entities/Tag";
import Tree from "@/entities/Tree";
import { InMemoryRepo } from "@/repository";
import { UpdateTreeNodeUseCase } from "./UpdateTreeNodeUseCase";

describe(`UpdateTreeNodeUseCase`, () => {
  const tree = Tree.create<StoryCard>();

  const root = StoryCard.create({
    body: '',
    header: 'Header text',
    tags: [
      Tag.create(),
      Tag.create()
    ]
  });

  tree.insert(root);

  const inMemoryStoryTreeRepo = new InMemoryRepo([tree]);

  const updateTreeNode = new UpdateTreeNodeUseCase(inMemoryStoryTreeRepo);

  it(`updates tree node with given props`, async () => {
    await updateTreeNode.execute({
      header: "Updated header text",
      id: root.id,
      treeId: tree.id
    });

    expect(tree.getRoot()!.header).toEqual("Updated header text");
  });

  it("persists updated tree to repository", async () => {
    const persistedTree = await inMemoryStoryTreeRepo.getById(tree.id);

    expect(persistedTree!.getRoot()!.header).toEqual("Updated header text");
  });
});
