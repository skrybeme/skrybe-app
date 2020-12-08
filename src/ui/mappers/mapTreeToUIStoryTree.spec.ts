import mapTreeToUIStoryTree from './mapTreeToUIStoryTree';
import StoryCard from '../../entities/StoryCard';
import Tag from '../../entities/Tag';
import Tree from '../../entities/Tree';

describe(`mapTreeToUIStoryTree`, () => {
  it(`maps StoryTree object to the model consumed by UI layer`, () => {
    const tree = Tree.create<StoryCard>();
    const root = StoryCard.create({ tags: [Tag.create(), Tag.create()] });
    const rootLeftChild = StoryCard.create({ tags: [Tag.create(), Tag.create()] });
    const rootRightChild = StoryCard.create({ tags: [Tag.create(), Tag.create()] });
    const rootGrandLeftChild = StoryCard.create({ tags: [Tag.create(), Tag.create()] });
    const rootGrandRightChild = StoryCard.create({ tags: [Tag.create(), Tag.create()] });
    const rootGrandGrandRightChild = StoryCard.create({ tags: [Tag.create(), Tag.create()] });

    tree.insert(root);
    tree.insert(rootLeftChild);
    tree.insert(rootRightChild);
    tree.insert(rootGrandLeftChild, rootLeftChild.id);
    tree.insert(rootGrandRightChild, rootRightChild.id);
    tree.insert(rootGrandGrandRightChild, rootGrandRightChild.id);

    const result = mapTreeToUIStoryTree(tree);

    expect(result).toEqual({
      id: root.id,
      header: root.header,
      body: root.body,
      tags: root.tags.map(tag => ({
        id: tag.id,
        color: tag.color,
        label: tag.label
      })),
      children: [
        {
          id: rootLeftChild.id,
          header: rootLeftChild.header,
          body: rootLeftChild.body,
          tags: rootLeftChild.tags.map(tag => ({
            id: tag.id,
            color: tag.color,
            label: tag.label
          })),
          children: [
            {
              id: rootGrandLeftChild.id,
              header: rootGrandLeftChild.header,
              body: rootGrandLeftChild.body,
              tags: rootGrandLeftChild.tags.map(tag => ({
                id: tag.id,
                color: tag.color,
                label: tag.label
              })),
              children: []
            }
          ]
        },
        {
          id: rootRightChild.id,
          header: rootRightChild.header,
          body: rootRightChild.body,
          tags: rootRightChild.tags.map(tag => ({
            id: tag.id,
            color: tag.color,
            label: tag.label
          })),
          children: [
            {
              id: rootGrandRightChild.id,
              header: rootGrandRightChild.header,
              body: rootGrandRightChild.body,
              tags: rootGrandRightChild.tags.map(tag => ({
                id: tag.id,
                color: tag.color,
                label: tag.label
              })),
              children: [
                {
                  id: rootGrandGrandRightChild.id,
                  header: rootGrandGrandRightChild.header,
                  body: rootGrandGrandRightChild.body,
                  tags: rootGrandGrandRightChild.tags.map(tag => ({
                    id: tag.id,
                    color: tag.color,
                    label: tag.label
                  })),
                  children: []
                }
              ]
            }
          ]
        }
      ]
    })
  });

  it(`returns null if given tree has no root`, () => {
    const result = mapTreeToUIStoryTree(Tree.create<StoryCard>());

    expect(result).toBeNull();
  });
});
