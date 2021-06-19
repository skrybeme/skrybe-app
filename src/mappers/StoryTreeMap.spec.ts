import StoryCard from '../entities/StoryCard';
import Tag from '../entities/Tag';
import Tree from '../entities/Tree';
import StoryTreeMap from './StoryTreeMap';

describe(`StoryTreeMap`, () => {
  describe(`toViewModel`, () => {
    it(`maps story tree domain object to the view model`, () => {
      const tree = new Tree<StoryCard>();
      const root = new StoryCard({ tags: [new Tag(), new Tag()] });
      const rootLeftChild = new StoryCard({ tags: [new Tag(), new Tag()] });
      const rootRightChild = new StoryCard({ tags: [new Tag(), new Tag()] });
      const rootGrandLeftChild = new StoryCard({ tags: [new Tag(), new Tag()] });
      const rootGrandRightChild = new StoryCard({ tags: [new Tag(), new Tag()] });
      const rootGrandGrandRightChild = new StoryCard({ tags: [new Tag(), new Tag()] });
  
      tree.insert(root);
      tree.insert(rootLeftChild);
      tree.insert(rootRightChild);
      tree.insert(rootGrandLeftChild, rootLeftChild.id);
      tree.insert(rootGrandRightChild, rootRightChild.id);
      tree.insert(rootGrandGrandRightChild, rootGrandRightChild.id);
  
      const result = StoryTreeMap.toViewModel(tree);
  
      expect(result).toEqual({
        id: root.id,
        parentId: null,
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
            parentId: root.id,
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
                parentId: rootLeftChild.id,
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
            parentId: root.id,
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
                parentId: rootRightChild.id,
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
                    parentId: rootGrandRightChild.id,
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
      const result = StoryTreeMap.toViewModel(new Tree<StoryCard>());
  
      expect(result).toBeNull();
    });
  });  
});
