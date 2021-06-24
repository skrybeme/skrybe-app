import StoryCard from './StoryCard';
import Tree from './Tree';
import { crawl, crawlBreadthFirst, crawlDeepFirst } from './Crawler';
import { ITreeNodeContext } from '../interfaces';
import { UuidType } from '../common/types';

describe(`Crawler`, () => {
  //       A
  //    B     C
  //  D   E F   G
  // H I
  const tree = new Tree<StoryCard>();
  const A = new StoryCard();
  const B = new StoryCard();
  const C = new StoryCard();
  const D = new StoryCard();
  const E = new StoryCard();
  const F = new StoryCard();
  const G = new StoryCard();
  const H = new StoryCard();
  const I = new StoryCard();
      
  tree.insert(A);
  tree.insert(B);
  tree.insert(C);
  tree.insert(D, B.id);
  tree.insert(E, B.id);
  tree.insert(F, C.id);
  tree.insert(G, C.id);
  tree.insert(H, D.id);
  tree.insert(I, D.id);

  describe(`crawlBreadthFirst`, () => {
    it(`returns an empty array if given tree does not have a root node`, () => {
      const tree = new Tree<StoryCard>();

      const result = crawlBreadthFirst<StoryCard, UuidType>(
        tree,
        (item: ITreeNodeContext<StoryCard>) => item.node.id
      );

      expect(result).toEqual([]);
    });

    it(`crawles each tree level from left to right starting with root node`, () => {
      //       A
      //    B     C
      //  D   E F   G
      // H I
      const result = crawlBreadthFirst<StoryCard, UuidType>(
        tree,
        (item: ITreeNodeContext<StoryCard>) => item.node.id
      );

      expect(result).toEqual([
        A.id,
        B.id,
        C.id,
        D.id,
        E.id,
        F.id,
        G.id,
        H.id,
        I.id
      ]);
    });

    it(`can start the crawl from specified node`, () => {
      //       A
      //    B     C
      //  D   E F   G
      // H I
      const result = crawlBreadthFirst<StoryCard, UuidType>(
        tree,
        (item: ITreeNodeContext<StoryCard>) => item.node.id,
        B.id
      );

      expect(result).toEqual([
        B.id,
        D.id,
        E.id,
        H.id,
        I.id
      ]);
    });

    it(`returns an empty array if specified starting node does not exist in the tree`, () => {
      //       A
      //    B     C
      //  D   E F   G
      // H I
      const result = crawlBreadthFirst<StoryCard, UuidType>(
        tree,
        (item: ITreeNodeContext<StoryCard>) => item.node.id,
        'invalid-uuid'
      );

      expect(result).toEqual([]);
    });
  });

  describe(`crawlDeepFirst`, () => {
    it(`returns an empty array if given tree does not have a root node`, () => {
      const tree = new Tree<StoryCard>();

      const result = crawlDeepFirst<StoryCard, UuidType>(
        tree,
        (item: ITreeNodeContext<StoryCard>) => item.node.id
      );

      expect(result).toEqual([]);
    });

    it(`crawles each tree node from top to bottom starting with root node`, () => {
      //       A
      //    B     C
      //  D   E F   G
      // H I
      const result = crawlDeepFirst<StoryCard, UuidType>(
        tree,
        (item: ITreeNodeContext<StoryCard>) => item.node.id
      );

      expect(result).toEqual([
        A.id,
        B.id,
        D.id,
        H.id,
        I.id,
        E.id,
        C.id,
        F.id,
        G.id
      ]);
    });

    it(`can start the crawl from specified node`, () => {
      //       A
      //    B     C
      //  D   E F   G
      // H I
      const result = crawlDeepFirst<StoryCard, UuidType>(
        tree,
        (item: ITreeNodeContext<StoryCard>) => item.node.id,
        B.id
      );

      expect(result).toEqual([
        B.id,
        D.id,
        H.id,
        I.id,
        E.id
      ]);
    });

    it(`returns an empty array if specified starting node does not exist in the tree`, () => {
      //       A
      //    B     C
      //  D   E F   G
      // H I
      const result = crawlDeepFirst<StoryCard, UuidType>(
        tree,
        (item: ITreeNodeContext<StoryCard>) => item.node.id,
        'invalid-uuid'
      );

      expect(result).toEqual([]);
    });
  });

  describe("default crawling method", () => {
    test("deep first search is the default crawling method", () => {
      expect(crawl).toEqual(crawlDeepFirst);
    });
  });
});
