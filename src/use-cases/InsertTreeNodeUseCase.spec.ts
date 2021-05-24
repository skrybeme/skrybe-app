import StoryCard from "@/entities/StoryCard";
import Tag from "@/entities/Tag";
import Tree from "@/entities/Tree";
import { InMemoryRepo } from "@/repository";
import { InsertTreeNodeUseCase } from "./InsertTreeNodeUseCase";

describe(`InsertTreeNodeUseCase`, () => {
  const tree = new Tree<StoryCard>();

  const inMemoryStoryTreeRepo = new InMemoryRepo([tree]);

  const insertTreeNode = new InsertTreeNodeUseCase(inMemoryStoryTreeRepo);

  const root = new StoryCard({
    body: '',
    header: '',
    tags: [
      new Tag(),
      new Tag()
    ]
  });

  const rootLeftChild = new StoryCard({
    body: '',
    header: '',
    tags: [
      new Tag(),
      new Tag()
    ]
  });

  const rootRightChild = new StoryCard({
    body: '',
    header: '',
    tags: [
      new Tag(),
      new Tag()
    ]
  });

  tree.insert(root);
  tree.insert(rootLeftChild);
  tree.insert(rootRightChild);

  it(`returns tree with inserted node`, async () => {
    await inMemoryStoryTreeRepo.save(tree);

    await insertTreeNode.execute({
      body: '',
      header: '',
      parentNodeId: root.id,
      tags: [],
      treeId: tree.id
    });

    expect(tree.getChildrenOf(root.id)).toHaveLength(3);
  });

  it(`persist updated tree in repository`, async () => {
    const persistedTree = await inMemoryStoryTreeRepo.getById(tree.id);

    expect(persistedTree!.getChildrenOf(root.id)).toHaveLength(3);
  });
});
