import StoryCard from "@/entities/StoryCard";
import Tag from "@/entities/Tag";
import Tree from "@/entities/Tree";
import { InMemoryRepo } from "@/repository";
import { RemoveTreeNodeUseCase } from "./RemoveTreeNodeUseCase";

describe(`RemoveTreeNodeUseCase`, () => {
  const tree = new Tree<StoryCard>();

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

  const rootLeftGrandChild = new StoryCard({
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
  tree.insert(rootLeftGrandChild, rootLeftChild.id);

  const inMemoryStoryTreeRepo = new InMemoryRepo<Tree<StoryCard>>([tree]);

  const removeTreeNode = new RemoveTreeNodeUseCase(inMemoryStoryTreeRepo);

  it(`removes tree node with all its children from the tree`, async () => {
    await removeTreeNode.execute({
      id: rootLeftChild.id,
      treeId: tree.id
    });

    expect(tree.getChildrenOf(root.id)).toHaveLength(1);
  });

  it(`persist updated tree with repo's save method`, async () => {
    const persistedTree = await inMemoryStoryTreeRepo.getById(tree.id);

    const persistedTreeRoot = persistedTree?.getRoot();

    expect(persistedTree!.getChildrenOf(persistedTreeRoot!.id)).toHaveLength(1);
  });
});