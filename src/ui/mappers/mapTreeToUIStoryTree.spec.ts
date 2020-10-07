import mapTreeToUIStoryTree from './mapTreeToUIStoryTree';
import StoryCard from '../../entities/StoryCard';
import StoryTree from '../../entities/StoryTree';
import Tag from '../../entities/Tag';

describe(`mapTreeToUIStoryTree`, () => {
  it(`maps StoryTree object to the model consumed by UI layer`, () => {
    const tree = new StoryTree();
    const root = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));
    const rootLeftChild = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));
    const rootRightChild = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));
    const rootGrandLeftChild = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));
    const rootGrandRightChild = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));
    const rootGrandGrandRightChild = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));

    tree.insert(root);
    tree.insert(rootLeftChild);
    tree.insert(rootRightChild);
    tree.insert(rootGrandLeftChild, rootLeftChild);
    tree.insert(rootGrandRightChild, rootRightChild);
    tree.insert(rootGrandGrandRightChild, rootGrandRightChild);

    const result = mapTreeToUIStoryTree(tree);

    expect(result).toEqual({
      id: root.id,
      header: root.getStoryCard().header,
      body: root.getStoryCard().body,
      tags: root.getStoryCard().tags.map(tag => ({
        id: tag.id,
        color: tag.color,
        label: tag.label
      })),
      children: [
        {
          id: rootLeftChild.id,
          header: rootLeftChild.getStoryCard().header,
          body: rootLeftChild.getStoryCard().body,
          tags: rootLeftChild.getStoryCard().tags.map(tag => ({
            id: tag.id,
            color: tag.color,
            label: tag.label
          })),
          children: [
            {
              id: rootGrandLeftChild.id,
              header: rootGrandLeftChild.getStoryCard().header,
              body: rootGrandLeftChild.getStoryCard().body,
              tags: rootGrandLeftChild.getStoryCard().tags.map(tag => ({
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
          header: rootRightChild.getStoryCard().header,
          body: rootRightChild.getStoryCard().body,
          tags: rootRightChild.getStoryCard().tags.map(tag => ({
            id: tag.id,
            color: tag.color,
            label: tag.label
          })),
          children: [
            {
              id: rootGrandRightChild.id,
              header: rootGrandRightChild.getStoryCard().header,
              body: rootGrandRightChild.getStoryCard().body,
              tags: rootGrandRightChild.getStoryCard().tags.map(tag => ({
                id: tag.id,
                color: tag.color,
                label: tag.label
              })),
              children: [
                {
                  id: rootGrandGrandRightChild.id,
                  header: rootGrandGrandRightChild.getStoryCard().header,
                  body: rootGrandGrandRightChild.getStoryCard().body,
                  tags: rootGrandGrandRightChild.getStoryCard().tags.map(tag => ({
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
    const result = mapTreeToUIStoryTree(new StoryTree());

    expect(result).toBeNull();
  });
});
