import StoryCard from '@/entities/StoryCard';
import Tag from '@/entities/Tag';
import Tree from '@/entities/Tree';
import { StoryTreeMap } from '@/mappers';
import { InMemoryRepo } from '@/repository';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';
import { InsertTreeNodeUseCase } from './InsertTreeNodeUseCase';

describe(`InsertTreeNodeUseCase`, () => {
  const tree = new Tree<StoryCard>();

  const inMemoryStoryTreeRepo = new InMemoryRepo([tree]);
  const storyTreeRootDetailsStore = new StoryTreeRootDetailsStore();

  const insertTreeNode = new InsertTreeNodeUseCase(
    inMemoryStoryTreeRepo,
    storyTreeRootDetailsStore
  );

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

  it(`inserts tree node in the tree`, async () => {
    await inMemoryStoryTreeRepo.save(tree);

    const firstAddedCard = await insertTreeNode.execute({
      body: '',
      header: '',
      parentNodeId: root.id,
      tags: [],
      treeId: tree.id
    });

    const secondAddedCard = await insertTreeNode.execute({
      body: '',
      header: '',
      parentNodeId: root.id,
      place: {
        afterOrBefore: 'before',
        nodeId: rootRightChild.id
      },
      tags: [],
      treeId: tree.id
    });

    const thirdAddedCard = await insertTreeNode.execute({
      body: '',
      header: '',
      parentNodeId: root.id,
      place: {
        afterOrBefore: 'after',
        nodeId: rootLeftChild.id
      },
      tags: [],
      treeId: tree.id
    });

    const children = tree.getChildrenOf(root.id);

    expect(children).toHaveLength(5);
    expect(children?.map(({ id }) => id)).toEqual([
      rootLeftChild.id,
      thirdAddedCard!.id,
      secondAddedCard!.id,
      rootRightChild.id,
      firstAddedCard!.id
    ])
  });

  it(`persists updated tree in repository`, async () => {
    const persistedTree = await inMemoryStoryTreeRepo.getById(tree.id);

    expect(persistedTree!.getChildrenOf(root.id)).toHaveLength(5);
  });

  it(`saves updated tree in the store`, async () => {
    const persistedTree = await inMemoryStoryTreeRepo.getById(tree.id);

    const expectedValue = StoryTreeMap.toViewModel(persistedTree!);

    expect(storyTreeRootDetailsStore.data).toEqual(expectedValue);
  });
});
