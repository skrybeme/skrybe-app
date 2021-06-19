import { StoryTreeLocalStorageMap } from './StoryTreeLocalStorageMap';
import { StoryTreeLocalStorageModel } from './models/StoryTreeLocalStorageModel';
import Tree from '@/entities/Tree';
import StoryCard from '@/entities/StoryCard';
import Tag from '@/entities/Tag';
import { TagColor } from '@/entities/enums';

describe(`StoryTreeLocalStorageMap`, () => {
  describe(`toDomainModel`, () => {
    it(`maps localStorage model to domain model with respect to parent's children array order`, () => {
      const input: StoryTreeLocalStorageModel = {
        id: 'aef2c353-62be-47dc-a24c-3b6210a19e84',
        tree: {
          'ad25244b-9d62-4506-9427-f5ee2e15b3e8': {
            childrenIds: [
              'b5db3f95-0c6e-474d-ac47-0adf68b16fa5',
              '0373574e-3160-4b9e-9e4c-082c5abfa1eb',
              'e798000f-f706-46f2-90ca-0cf4bfa466c3'
            ],
            isRoot: true,
            node: {
              body: 'b1',
              header: 'h1',
              id: 'ad25244b-9d62-4506-9427-f5ee2e15b3e8',
              tags: [
                {
                  color: TagColor.RED,
                  id: '983367cc-709b-41e4-b33a-f90ad43154dc',
                  label: 't1'
                },
                {
                  color: TagColor.WHITE,
                  id: 'c594b2a4-b7fa-44c5-a107-1ee372a4ca46',
                  label: 't2'
                }
              ]
            },
            parentId: ''
          },
          '0373574e-3160-4b9e-9e4c-082c5abfa1eb': {
            childrenIds: [],
            isRoot: false,
            node: {
              body: 'b12',
              header: 'h12',
              id: '0373574e-3160-4b9e-9e4c-082c5abfa1eb',
              tags: []
            },
            parentId: 'ad25244b-9d62-4506-9427-f5ee2e15b3e8'
          },
          'e798000f-f706-46f2-90ca-0cf4bfa466c3': {
            childrenIds: [
              '1f725f9d-c4d5-44f0-97ff-f7ff848b8804',
              '28659e5e-aeb7-4f35-8bc2-8c71e3b4af7f'
            ],
            isRoot: false,
            node: {
              body: 'b13',
              header: 'h13',
              id: 'e798000f-f706-46f2-90ca-0cf4bfa466c3',
              tags: [
                {
                  color: TagColor.WHITE,
                  id: '94d421e1-4659-443a-a448-6519479f546f',
                  label: 't3'
                }
              ]
            },
            parentId: 'ad25244b-9d62-4506-9427-f5ee2e15b3e8'
          },
          'b5db3f95-0c6e-474d-ac47-0adf68b16fa5': {
            childrenIds: [],
            isRoot: false,
            node: {
              body: 'b11',
              header: 'h11',
              id: 'b5db3f95-0c6e-474d-ac47-0adf68b16fa5',
              tags: []
            },
            parentId: 'ad25244b-9d62-4506-9427-f5ee2e15b3e8'
          },
          '28659e5e-aeb7-4f35-8bc2-8c71e3b4af7f': {
            childrenIds: [],
            isRoot: false,
            node: {
              body: 'b132',
              header: 'h132',
              id: '28659e5e-aeb7-4f35-8bc2-8c71e3b4af7f',
              tags: []
            },
            parentId: 'e798000f-f706-46f2-90ca-0cf4bfa466c3'
          },
          '1f725f9d-c4d5-44f0-97ff-f7ff848b8804': {
            childrenIds: [],
            isRoot: false,
            node: {
              body: 'b131',
              header: 'h131',
              id: '1f725f9d-c4d5-44f0-97ff-f7ff848b8804',
              tags: []
            },
            parentId: 'e798000f-f706-46f2-90ca-0cf4bfa466c3'
          }
        }
      };
  
      const output = StoryTreeLocalStorageMap.toDomainModel(input);
  
      const root = output.getRoot()!;
      const children = output.getChildrenOf(root.id)!;
      const grandChildren = output.getChildrenOf(children[2].id)!;
  
      expect(root.id).toEqual('ad25244b-9d62-4506-9427-f5ee2e15b3e8');
      expect(root.body).toEqual('b1');
      expect(root.header).toEqual('h1');
      expect(root.tags).toHaveLength(2);
      expect(root.tags[0].color).toEqual(TagColor.RED);
      expect(root.tags[0].id).toEqual('983367cc-709b-41e4-b33a-f90ad43154dc');
      expect(root.tags[0].label).toEqual('t1');
      expect(root.tags[1].color).toEqual(TagColor.WHITE);
      expect(root.tags[1].id).toEqual('c594b2a4-b7fa-44c5-a107-1ee372a4ca46');
      expect(root.tags[1].label).toEqual('t2');

      expect(children[0].id).toEqual('b5db3f95-0c6e-474d-ac47-0adf68b16fa5');
      expect(children[0].body).toEqual('b11');
      expect(children[0].header).toEqual('h11');
      expect(children[0].tags).toEqual([]);

      expect(children[1].id).toEqual('0373574e-3160-4b9e-9e4c-082c5abfa1eb');
      expect(children[1].body).toEqual('b12');
      expect(children[1].header).toEqual('h12');
      expect(children[1].tags).toEqual([]);

      expect(children[2].id).toEqual('e798000f-f706-46f2-90ca-0cf4bfa466c3');
      expect(children[2].body).toEqual('b13');
      expect(children[2].header).toEqual('h13');
      expect(children[2].tags).toHaveLength(1);
      expect(children[2].tags[0].color).toEqual(TagColor.WHITE);
      expect(children[2].tags[0].id).toEqual('94d421e1-4659-443a-a448-6519479f546f');
      expect(children[2].tags[0].label).toEqual('t3');

      expect(grandChildren[0].id).toEqual('1f725f9d-c4d5-44f0-97ff-f7ff848b8804');
      expect(grandChildren[0].body).toEqual('b131');
      expect(grandChildren[0].header).toEqual('h131');
      expect(grandChildren[0].tags).toEqual([]);

      expect(grandChildren[1].id).toEqual('28659e5e-aeb7-4f35-8bc2-8c71e3b4af7f');
      expect(grandChildren[1].body).toEqual('b132');
      expect(grandChildren[1].header).toEqual('h132');
      expect(grandChildren[1].tags).toEqual([]);
    });
  });

  describe(`toLocalStorageModel`, () => {
    it(`maps domain model to localStorage model with respect to parent's children array order`, () => {
      const tree = new Tree<StoryCard>();

      const tags = [
        new Tag({
          color: TagColor.RED,
          label: 't1'
        }),
        new Tag({
          color: TagColor.WHITE,
          label: 't2'
        }),
        new Tag({
          color: TagColor.RED,
          label: 't3'
        }),
        new Tag({
          color: TagColor.WHITE,
          label: 't4'
        }),
        new Tag({
          color: TagColor.RED,
          label: 't5'
        }),
        new Tag({
          color: TagColor.RED,
          label: 't6'
        })
      ]

      const root = new StoryCard({
        body: 'b1',
        header: 'h1',
        tags: tags.slice(0, 3)
      });

      const children = [
        new StoryCard({
          body: 'b11',
          header: 'h11'
        }),
        new StoryCard({
          body: 'b12',
          header: 'h12',
          tags: tags.slice(3, 5)
        }),
        new StoryCard({
          body: 'b13',
          header: 'h13',
          tags: [tags[5]]
        })
      ];

      const grandChildren = [
        new StoryCard({
          body: 'b131',
          header: 'h131'
        }),
        new StoryCard({
          body: 'b132',
          header: 'h132'
        })
      ];

      tree.insert(root);
      tree.insert(children[0]);
      tree.insert(children[2]);
      tree.insert(grandChildren[1], children[2].id);
      tree.insert(grandChildren[0], children[2].id, {
        afterOrBefore: 'before',
        nodeId: grandChildren[1].id
      });
      tree.insert(children[1], root.id, {
        afterOrBefore: 'before',
        nodeId: children[2].id
      });

      const output = StoryTreeLocalStorageMap.toLocalStorageModel(tree);

      expect(output).toEqual({
        id: tree.id,
        tree: {
          [root.id]: {
            childrenIds: children.map(({ id }) => id),
            isRoot: true,
            node: {
              body: 'b1',
              header: 'h1',
              id: root.id,
              tags: [
                {
                  color: TagColor.RED,
                  id: tags[0].id,
                  label: 't1'
                },
                {
                  color: TagColor.WHITE,
                  id: tags[1].id,
                  label: 't2'
                },
                {
                  color: TagColor.RED,
                  id: tags[2].id,
                  label: 't3'
                }
              ]
            },
            parentId: ''
          },
          [children[0].id]: {
            childrenIds: [],
            isRoot: false,
            node: {
              body: 'b11',
              header: 'h11',
              id: children[0].id,
              tags: []
            },
            parentId: root.id
          },
          [children[1].id]: {
            childrenIds: [],
            isRoot: false,
            node: {
              body: 'b12',
              header: 'h12',
              id: children[1].id,
              tags: [
                {
                  color: TagColor.WHITE,
                  id: tags[3].id,
                  label: 't4'
                },
                {
                  color: TagColor.RED,
                  id: tags[4].id,
                  label: 't5'
                }
              ]
            },
            parentId: root.id
          },
          [children[2].id]: {
            childrenIds: grandChildren.map(({ id }) => id),
            isRoot: false,
            node: {
              body: 'b13',
              header: 'h13',
              id: children[2].id,
              tags: [
                {
                  color: TagColor.RED,
                  id: tags[5].id,
                  label: 't6'
                }
              ]
            },
            parentId: root.id
          },
          [grandChildren[0].id]: {
            childrenIds: [],
            isRoot: false,
            node: {
              body: 'b131',
              header: 'h131',
              id: grandChildren[0].id,
              tags: []
            },
            parentId: children[2].id
          },
          [grandChildren[1].id]: {
            childrenIds: [],
            isRoot: false,
            node: {
              body: 'b132',
              header: 'h132',
              id: grandChildren[1].id,
              tags: []
            },
            parentId: children[2].id
          }
        }
     });
    });
  });
});
