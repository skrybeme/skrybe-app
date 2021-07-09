import StoryCard from "@/entities/StoryCard";
import Tag from "@/entities/Tag";
import Tree from "@/entities/Tree";
import { InMemoryRepo } from "@/repository";
import { UpdateTreeNodeUseCase } from "./UpdateTreeNodeUseCase";

describe(`UpdateTreeNodeUseCase`, () => {
  const tagCollection = [
    new Tag(),
    new Tag(),
    new Tag()
  ];

  const tree = new Tree<StoryCard>();

  const root = new StoryCard({
    body: '',
    header: 'Header text',
    tags: [tagCollection[0], tagCollection[1]]
  });

  tree.insert(root);

  const inMemoryTagRepo = new InMemoryRepo(tagCollection);
  const inMemoryStoryTreeRepo = new InMemoryRepo([tree]);

  const updateTreeNode
    = new UpdateTreeNodeUseCase(inMemoryTagRepo, inMemoryStoryTreeRepo);

  it(`updates tree node with given props`, async () => {
    await updateTreeNode.execute({
      body: "Updated body text",
      header: "Updated header text",
      id: root.id,
      tags: [tagCollection[1].id, tagCollection[2].id],
      treeId: tree.id
    });

    const treeRoot = tree.getRoot()!;

    expect(treeRoot.body).toEqual("Updated body text");
    expect(treeRoot.header).toEqual("Updated header text");
    expect(treeRoot.tags).toHaveLength(2);
    expect(treeRoot.tags).toEqual([tagCollection[1], tagCollection[2]]);
  });

  it(`updates tree node with partial props`, async () => {
    await updateTreeNode.execute({
      header: "Another updated header text",
      id: root.id,
      treeId: tree.id
    });

    const treeRoot = tree.getRoot()!;

    expect(treeRoot.body).toEqual("Updated body text");
    expect(treeRoot.header).toEqual("Another updated header text");
    expect(treeRoot.tags).toHaveLength(2);
    expect(treeRoot.tags).toEqual([tagCollection[1], tagCollection[2]]);
  });

  it("persists updated tree to repository", async () => {
    const persistedTree = await inMemoryStoryTreeRepo.getById(tree.id);

    const persistedTreeRoot = persistedTree?.getRoot()!;

    expect(persistedTreeRoot.body).toEqual("Updated body text");
    expect(persistedTreeRoot.header).toEqual("Another updated header text");
    expect(persistedTreeRoot.tags).toHaveLength(2);
    expect(persistedTreeRoot.tags).toEqual([tagCollection[1], tagCollection[2]]);
  });
});
