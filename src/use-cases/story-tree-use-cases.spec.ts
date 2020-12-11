import createStoryTreeUseCases from './story-tree-use-cases';
import StoryCard from '../entities/StoryCard';
import Tag from '../entities/Tag';
import Tree from '../entities/Tree';
import { createInMemoryStoryTreeRepo } from '../repository';

describe(`StoryTreeUseCases`, () => {
  const tree = Tree.create<StoryCard>();

  const inMemoryStoryTreeRepo = createInMemoryStoryTreeRepo([tree]);

  const storyTreeUseCases = createStoryTreeUseCases(inMemoryStoryTreeRepo);

  describe(`getTreeById`, () => {
    const { getTreeById } = storyTreeUseCases;

    it(`resolves with null if the tree with given id does not exist in the repo`, async () => {
      const entry = await getTreeById({ id: 'invalid-uuid' });

      expect(entry).toBeNull();
    });

    it(`resolves with story tree domain model if it exists in the repo`, async () => {
      const entry = await getTreeById({ id: tree.id });

      expect(entry).toEqual(tree);
    });
  });

  describe(`generateTreeNodes`, () => {
    const { generateChildrenTreeNodes } = storyTreeUseCases;

    // @TODO
    // Test text formatting, especially white spaces and dots at the begining and end of
    // the string.

    describe(`for childless parent`, () => {
      it(`inserts child for every sentence in parent's body with sentence as the header`, async () => {
        const body = `First sentence. Second sentence. Third sentence.`;

        const tree = Tree.create<StoryCard>();

        const root = StoryCard.create({
          body,
          header: '',
          tags: [
            Tag.create(),
            Tag.create()
          ]
        });
        
        tree.insert(root);

        await inMemoryStoryTreeRepo.save(tree);

        const generatedChildren = await generateChildrenTreeNodes({
          parentNodeId: root.id,
          treeId: tree.id
        });

        expect(generatedChildren).toHaveLength(3);
        expect(generatedChildren![0].header).toEqual(`First sentence`);
        expect(generatedChildren![1].header).toEqual(`Second sentence`);
        expect(generatedChildren![2].header).toEqual(`Third sentence`);
      });
    });

    describe(`for parent with children`, () => {
      test(`as default it places inserted children after the existing ones in parent's children level`, async () => {
        const body = `First sentence. Second sentence.`;

        const tree = Tree.create<StoryCard>();

        const root = StoryCard.create({
          body,
          header: '',
          tags: [
            Tag.create(),
            Tag.create()
          ]
        });

        const rootChild = StoryCard.create({
          body: '',
          header: 'Root child header',
          tags: [
            Tag.create(),
            Tag.create()
          ]
        });
        
        tree.insert(root);
        tree.insert(rootChild);

        await inMemoryStoryTreeRepo.save(tree);

        await generateChildrenTreeNodes({
          parentNodeId: root.id,
          treeId: tree.id
        });

        const generatedChildren = tree.getChildrenOf(root.id)!;

        expect(generatedChildren).toHaveLength(3);
        expect(generatedChildren[0].header).toEqual(`Root child header`);
        expect(generatedChildren[1].header).toEqual(`First sentence`);
        expect(generatedChildren[2].header).toEqual(`Second sentence`);
      });

      test(`it is possible to place generated children before specified tree node in parent's children level`, async () => {
        const body = `First sentence. Second sentence.`;

        const tree = Tree.create<StoryCard>();

        const root = StoryCard.create({
          body,
          header: '',
          tags: [
            Tag.create(),
            Tag.create()
          ]
        });

        const rootChild = StoryCard.create({
          body: '',
          header: 'Third sentence',
          tags: [
            Tag.create(),
            Tag.create()
          ]
        });
        
        tree.insert(root);
        tree.insert(rootChild);

        await inMemoryStoryTreeRepo.save(tree);

        await generateChildrenTreeNodes({
          parentNodeId: root.id,
          placeBeforeNodeId: rootChild.id,
          treeId: tree.id
        });

        const generatedChildren = tree.getChildrenOf(root.id)!;

        expect(generatedChildren).toHaveLength(3);
        expect(generatedChildren[0].header).toEqual(`First sentence`);
        expect(generatedChildren[1].header).toEqual(`Second sentence`);
        expect(generatedChildren[2].header).toEqual(`Third sentence`);
      });
    });

    describe(`persistance`, () => {
      xit(`persist updated tree with repo's save method`, async () => {
        const body = `First sentence. Second sentence. Third sentence.`;

        const tree = Tree.create<StoryCard>();

        const root = StoryCard.create({
          body,
          header: '',
          tags: [
            Tag.create(),
            Tag.create()
          ]
        });
        
        tree.insert(root);

        await inMemoryStoryTreeRepo.save(tree);

        const newTree = await generateChildrenTreeNodes({
          parentNodeId: root.id,
          treeId: tree.id
        });
  
        expect(inMemoryStoryTreeRepo.save).toBeCalledTimes(1);
        expect(inMemoryStoryTreeRepo.save).toBeCalledWith(newTree);
      });
    });

    it(`ignores redundant whitespaces and punctuation marks`, async () => {
      const body = `.. # %%$  .. First sentence.    S   econd sentence,  or another   . ... Third  $.sentence. ..    , ;  `;

        const tree = Tree.create<StoryCard>();

        const root = StoryCard.create({
          body,
          header: '',
          tags: [
            Tag.create(),
            Tag.create()
          ]
        });
        
        tree.insert(root);

        await inMemoryStoryTreeRepo.save(tree);

        const generatedChildren = await generateChildrenTreeNodes({
          parentNodeId: root.id,
          treeId: tree.id
        });

        expect(generatedChildren).toHaveLength(4);
        expect(generatedChildren![0].header).toEqual(`First sentence`);
        expect(generatedChildren![1].header).toEqual(`S econd sentence, or another`);
        expect(generatedChildren![2].header).toEqual(`Third $`);
        expect(generatedChildren![3].header).toEqual(`sentence`)
    });
  });

  describe(`insertTreeNode`, () => {
    const { insertTreeNode } = storyTreeUseCases;

    const tree = Tree.create<StoryCard>();
  
    const root = StoryCard.create({
      body: '',
      header: '',
      tags: [
        Tag.create(),
        Tag.create()
      ]
    });

    const rootLeftChild = StoryCard.create({
      body: '',
      header: '',
      tags: [
        Tag.create(),
        Tag.create()
      ]
    });

    const rootRightChild = StoryCard.create({
      body: '',
      header: '',
      tags: [
        Tag.create(),
        Tag.create()
      ]
    });

    tree.insert(root);
    tree.insert(rootLeftChild);
    tree.insert(rootRightChild);

    it(`returns tree with inserted node`, async () => {
      await inMemoryStoryTreeRepo.save(tree);

      await insertTreeNode({
        body: '',
        header: '',
        parentNodeId: root.id,
        tags: [],
        treeId: tree.id
      });

      expect(tree.getChildrenOf(root.id)).toHaveLength(3);
    });

    xit(`persist updated tree with repo's save method`, async () => {
      await insertTreeNode({
        body: '',
        header: '',
        parentNodeId: root.id,
        tags: [],
        treeId: tree.id
      });

      expect(inMemoryStoryTreeRepo.save).toBeCalledTimes(1);
      expect(inMemoryStoryTreeRepo.save).toBeCalledWith(tree);
    });
  });

  describe(`removeTreeNode`, () => {
    const { removeTreeNode } = storyTreeUseCases;

    it(`removes tree node with all its children from the tree`, async () => {
      const tree = Tree.create<StoryCard>();
  
      const root = StoryCard.create({
        body: '',
        header: '',
        tags: [
          Tag.create(),
          Tag.create()
        ]
      });

      const rootLeftChild = StoryCard.create({
        body: '',
        header: '',
        tags: [
          Tag.create(),
          Tag.create()
        ]
      });

      const rootRightChild = StoryCard.create({
        body: '',
        header: '',
        tags: [
          Tag.create(),
          Tag.create()
        ]
      });

      const rootLeftGrandChild = StoryCard.create({
        body: '',
        header: '',
        tags: [
          Tag.create(),
          Tag.create()
        ]
      });

      tree.insert(root);
      tree.insert(rootLeftChild);
      tree.insert(rootRightChild);
      tree.insert(rootLeftGrandChild, rootLeftChild.id);

      await inMemoryStoryTreeRepo.save(tree);

      await removeTreeNode({
        id: rootLeftChild.id,
        treeId: tree.id
      });

      expect(tree.getChildrenOf(root.id)).toHaveLength(1);
    });

    xit(`persist updated tree with repo's save method`, async () => {
      const tree = Tree.create<StoryCard>();
  
      const root = StoryCard.create({
        body: '',
        header: '',
        tags: [
          Tag.create(),
          Tag.create()
        ]
      });

      const rootChild = StoryCard.create({
        body: '',
        header: '',
        tags: [
          Tag.create(),
          Tag.create()
        ]
      });

      tree.insert(root);
      tree.insert(rootChild);

      await removeTreeNode({
        id: rootChild.id,
        treeId: tree.id
      });

      expect(inMemoryStoryTreeRepo.save).toBeCalledTimes(1);
      expect(inMemoryStoryTreeRepo.save).toBeCalledWith(tree);
    });
  });
});
