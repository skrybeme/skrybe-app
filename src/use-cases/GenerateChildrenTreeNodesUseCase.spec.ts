import StoryCard from "../entities/StoryCard";
import Tag from "../entities/Tag";
import Tree from "../entities/Tree";
import { InMemoryRepo } from "../repository";
import { GenerateChildrenTreeNodesUseCase } from "./GenerateChildrenTreeNodesUseCase";

describe(`GenerateChildrenTreeNodesUseCase`, () => {
  const inMemoryStoryTreeRepo = new InMemoryRepo([Tree.create<StoryCard>()]);

  const generateChildrenTreeNodes =
    new GenerateChildrenTreeNodesUseCase(inMemoryStoryTreeRepo);

  // @TODO
  // Test text formatting, especially white spaces and dots at the begining and end of
  // the string.

  describe(`for childless parent`, () => {
    it(
      `inserts child for every sentence in parent's body with sentence as the header`,
      async () => {
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

        const generatedChildren = await generateChildrenTreeNodes.execute({
          parentNodeId: root.id,
          treeId: tree.id
        });

        expect(generatedChildren).toHaveLength(3);
        expect(generatedChildren![0].header).toEqual(`First sentence`);
        expect(generatedChildren![1].header).toEqual(`Second sentence`);
        expect(generatedChildren![2].header).toEqual(`Third sentence`);
      }
    );
  });

  describe(`for parent with children`, () => {
    test(
      `as default it places inserted children after the existing ones in parent's children level`,
      async () => {
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

        await generateChildrenTreeNodes.execute({
          parentNodeId: root.id,
          treeId: tree.id
        });

        const generatedChildren = tree.getChildrenOf(root.id)!;

        expect(generatedChildren).toHaveLength(3);
        expect(generatedChildren[0].header).toEqual(`Root child header`);
        expect(generatedChildren[1].header).toEqual(`First sentence`);
        expect(generatedChildren[2].header).toEqual(`Second sentence`);
      }
    );

    test(
      `it is possible to place generated children before specified tree node in parent's children level`,
      async () => {
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

        await generateChildrenTreeNodes.execute({
          parentNodeId: root.id,
          placeBeforeNodeId: rootChild.id,
          treeId: tree.id
        });

        const generatedChildren = tree.getChildrenOf(root.id)!;

        expect(generatedChildren).toHaveLength(3);
        expect(generatedChildren[0].header).toEqual(`First sentence`);
        expect(generatedChildren[1].header).toEqual(`Second sentence`);
        expect(generatedChildren[2].header).toEqual(`Third sentence`);
      }
    );
  });

  it(`ignores redundant whitespaces and punctuation marks in parent's body`, async () => {
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

    const generatedChildren = await generateChildrenTreeNodes.execute({
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
