import { LOGICAL_OPERATOR } from '../common/enums';
import { UuidType } from '../common/types';
import { crawlBreadthFirst, crawlDeepFirst } from '../entities/Crawler';
import StoryCard from '../entities/StoryCard';
import StoryTree from '../entities/StoryTree';
import Tag from '../entities/Tag';
import { createStoryUseCases } from './story-use-cases';
import { ITag } from './../interfaces';

describe(`StoryUseCases`, () => {
  const storyUseCases = createStoryUseCases();

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

  describe(`buildStory`, () => {
    const { bfs, buildStory, dfs } = storyUseCases;

    // @TODO
    // Test the returning object.
    describe(`build`, () => {
      const mockedCallback = jest.fn();

      afterEach(() => {
        mockedCallback.mockClear();
      });

      it(`calls piped methods for each node in given tree using BFS`, () => {
        buildStory().for(root).go(bfs()).pipe(mockedCallback).build();

        expect(mockedCallback).toBeCalledTimes(6);
        expect(mockedCallback).toHaveBeenNthCalledWith(1, root);
        expect(mockedCallback).toHaveBeenNthCalledWith(2, rootLeftChild);
        expect(mockedCallback).toHaveBeenNthCalledWith(3, rootRightChild);
        expect(mockedCallback).toHaveBeenNthCalledWith(4, rootGrandLeftChild);
        expect(mockedCallback).toHaveBeenNthCalledWith(5, rootGrandRightChild);
        expect(mockedCallback).toHaveBeenNthCalledWith(6, rootGrandGrandRightChild);
      });

      it(`calls piped methods for each node in given tree using DFS`, () => {
        buildStory().for(root).go(dfs()).pipe(mockedCallback).build();

        expect(mockedCallback).toBeCalledTimes(6);
        expect(mockedCallback).toHaveBeenNthCalledWith(1, root);
        expect(mockedCallback).toHaveBeenNthCalledWith(2, rootLeftChild);
        expect(mockedCallback).toHaveBeenNthCalledWith(3, rootGrandLeftChild);
        expect(mockedCallback).toHaveBeenNthCalledWith(4, rootRightChild);
        expect(mockedCallback).toHaveBeenNthCalledWith(5, rootGrandRightChild);
        expect(mockedCallback).toHaveBeenNthCalledWith(6, rootGrandGrandRightChild);
      });
    });
  });

  describe(`bfs`, () => {
    it(`returns BFS function for story tree`, () => {
      const { bfs } = storyUseCases;
      
      expect(bfs()).toEqual(crawlBreadthFirst);
    });
  });

  describe(`byEdgeNodes`, () => {
    it(`determines whether given node is an edge node`, () => {
      const { byEdgeNodes } = storyUseCases;

      const isEdgeNodeFn = byEdgeNodes();

      expect(isEdgeNodeFn(rootGrandLeftChild)).toEqual(rootGrandLeftChild);
      expect(isEdgeNodeFn(rootLeftChild)).toBeNull();
    });
  });

  describe(`byNodeIds`, () => {
    it(`determines whether given node has one of the desired ids`, () => {
      const { byNodeIds } = storyUseCases;

      const hasDesiredNodeId = byNodeIds([root.id, rootGrandLeftChild.id]);

      expect(hasDesiredNodeId(rootGrandLeftChild)).toEqual(rootGrandLeftChild);
      expect(hasDesiredNodeId(rootLeftChild)).toBeNull();
    })
  });

  describe(`byTags`, () => {
    it(`determines whether given node has one of the desired tag ids`, () => {
      const { byTags } = storyUseCases;

      const hasDesiredTagIds = byTags([
        root.getStoryCard().tags[0].id as UuidType,
        rootGrandLeftChild.getStoryCard().tags[0].id as UuidType
      ]);

      expect(hasDesiredTagIds(root)).toEqual(root);
      expect(hasDesiredTagIds(rootGrandLeftChild)).toEqual(rootGrandLeftChild);
      expect(hasDesiredTagIds(rootLeftChild)).toBeNull();
    });

    it(`determines whether given node has all of the desired tag ids`, () => {
      const { byTags } = storyUseCases;

      const hasDesiredTagIds = byTags(
        [
          root.getStoryCard().tags[0].id as UuidType,
          rootGrandLeftChild.getStoryCard().tags[0].id as UuidType
        ],
        LOGICAL_OPERATOR.AND
      );

      expect(hasDesiredTagIds(root)).toBeNull();
      expect(hasDesiredTagIds(rootGrandLeftChild)).toBeNull();
      expect(hasDesiredTagIds(rootLeftChild)).toBeNull();

      const hasAllRootTagIds = byTags(
        root.getStoryCard().tags.map(
          (tag: ITag) => tag.id as UuidType
        ),
        LOGICAL_OPERATOR.AND
      );

      expect(hasAllRootTagIds(root)).toEqual(root);
      expect(hasAllRootTagIds(rootGrandLeftChild)).toBeNull();
      expect(hasAllRootTagIds(rootLeftChild)).toBeNull();
    });
  });

  describe(`dfs`, () => {
    it(`returns DFS function for story tree`, () => {
      const { dfs } = storyUseCases;
      
      expect(dfs()).toEqual(crawlDeepFirst);
    });
  });
});
