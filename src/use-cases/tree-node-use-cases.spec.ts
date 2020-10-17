import StoryCard from '../entities/StoryCard';
import StoryTree from '../entities/StoryTree';
import Tag from '../entities/Tag';
import { ITree, ITreeNode } from '../interfaces';
import createTreeNodeUseCases from './tree-node-use-cases';

describe(`TreeNode Use Cases`, () => {
  const getTreeById = jest.fn();
  const save = jest.fn().mockImplementation((tree: ITree) => Promise.resolve(tree));

  const treeNodeUseCases = createTreeNodeUseCases({ getTreeById, save });

  afterEach(() => {
    save.mockClear();
  });

  describe(`generateTreeNodes`, () => {
    const { generateChildrenTreeNodes } = treeNodeUseCases;

    // @TODO
    // Test text formatting, especially white spaces and dots at the begining and end of
    // the string.

    describe(`for childless parent`, () => {
      it(`inserts child for every sentence in parent's body with sentence as the header`, async () => {
        const body = `First sentence. Second sentence. Third sentence`;

        const tree = new StoryTree();
        const root = tree.makeNode(new StoryCard('', body, [new Tag(), new Tag()]));
        
        tree.insert(root);

        const newTree = await generateChildrenTreeNodes(root);

        const generatedChildren: Array<ITreeNode> = newTree!.getChildrenOf(root);

        expect(generatedChildren).toHaveLength(3);
        expect(generatedChildren[0].getStoryCard().header).toEqual(`First sentence`);
        expect(generatedChildren[1].getStoryCard().header).toEqual(`Second sentence`);
        expect(generatedChildren[2].getStoryCard().header).toEqual(`Third sentence`);
      });
    });

    describe(`for parent with children`, () => {
      test(`as default it places inserted children after the existing ones in parent's children level`, async () => {
        const body = `First sentence. Second sentence`;

        const tree = new StoryTree();
        const root = tree.makeNode(new StoryCard('', body, [new Tag(), new Tag()]));
        const rootChild = tree.makeNode(new StoryCard('Root child header', '', [new Tag(), new Tag()]));
        
        tree.insert(root);
        tree.insert(rootChild);

        const newTree = await generateChildrenTreeNodes(root);

        const generatedChildren: Array<ITreeNode> = newTree!.getChildrenOf(root);

        expect(generatedChildren).toHaveLength(3);
        expect(generatedChildren[0].getStoryCard().header).toEqual(`Root child header`);
        expect(generatedChildren[1].getStoryCard().header).toEqual(`First sentence`);
        expect(generatedChildren[2].getStoryCard().header).toEqual(`Second sentence`);
      });

      test(`it is possible to place generated children before specified tree node in parent's children level`, async () => {
        const body = `First sentence. Second sentence`;

        const tree = new StoryTree();
        const root = tree.makeNode(new StoryCard('', body, [new Tag(), new Tag()]));
        const rootChild = tree.makeNode(new StoryCard('Third sentence', '', [new Tag(), new Tag()]));
        
        tree.insert(root);
        tree.insert(rootChild);

        const newTree = await generateChildrenTreeNodes(root, rootChild);

        const generatedChildren: Array<ITreeNode> = newTree!.getChildrenOf(root);

        expect(generatedChildren).toHaveLength(3);
        expect(generatedChildren[0].getStoryCard().header).toEqual(`First sentence`);
        expect(generatedChildren[1].getStoryCard().header).toEqual(`Second sentence`);
        expect(generatedChildren[2].getStoryCard().header).toEqual(`Third sentence`);
      });
    });

    describe(`persistance`, () => {
      it(`persist updated tree with repo's save method`, async () => {
        const body = `First sentence. Second sentence. Third sentence`;

        const tree = new StoryTree();
        const root = tree.makeNode(new StoryCard('', body, [new Tag(), new Tag()]));
        
        tree.insert(root);

        const newTree = await generateChildrenTreeNodes(root);
  
        expect(save).toBeCalledTimes(1);
        expect(save).toBeCalledWith(newTree);
      });
    });
  });

  describe(`insertTreeNode`, () => {
    const { insertTreeNode } = treeNodeUseCases;

    const tree = new StoryTree();
  
    const root = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));
    const rootLeftChild = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));
    const rootRightChild = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));

    tree.insert(root);
    tree.insert(rootLeftChild);
    tree.insert(rootRightChild);

    it(`returns tree with inserted node`, async () => {
      const node = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));

      const newTree = await insertTreeNode(node, root);

      expect(newTree!.getRoot()!.getChildrenIds()).toHaveLength(3);
    });

    it(`persist updated tree with repo's save method`, async () => {
      const node = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));

      const newTree = await insertTreeNode(node, root);

      expect(save).toBeCalledTimes(1);
      expect(save).toBeCalledWith(newTree);
    });
  });

  describe(`removeTreeNode`, () => {
    const { removeTreeNode } = treeNodeUseCases;

    it(`removes tree node with all its children from the tree`, async () => {
      const tree = new StoryTree();
  
      const root = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));
      const rootLeftChild = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));
      const rootRightChild = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));
      const rootLeftGrandChild = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));

      tree.insert(root);
      tree.insert(rootLeftChild);
      tree.insert(rootRightChild);
      tree.insert(rootLeftGrandChild, rootLeftChild);

      const newTree = await removeTreeNode(rootLeftChild);

      expect(newTree!.getRoot()!.getChildrenIds()).toHaveLength(1);
    });

    it(`persist updated tree with repo's save method`, async () => {
      const tree = new StoryTree();
  
      const root = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));
      const rootChild = tree.makeNode(new StoryCard('', '', [new Tag(), new Tag()]));

      tree.insert(root);
      tree.insert(rootChild);

      const newTree = await removeTreeNode(rootChild);

      expect(save).toBeCalledTimes(1);
      expect(save).toBeCalledWith(newTree);
    });
  });
});
