import { UuidType, AsyncMaybe } from '@/common/types';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { IStoryTreeDataSource, ITreeNodeContext } from '@/interfaces';

export function createLocalStorageStoryTreeDataSource(): IStoryTreeDataSource {
  return {
    boot(): void {
      if (!localStorage.getItem('example-tree')) {
        const tree = Tree.create<StoryCard>();

        tree.insert(StoryCard.create({
          header: 'Your story begins here.',
          body: '',
          tags: []
        }, 'ad25244b-9d62-4506-9427-f5ee2e15b3e8'));

        tree.insert(StoryCard.create({
          header: 'It can go in one direction.',
          body: '',
          tags: []
        }, 'b5db3f95-0c6e-474d-ac47-0adf68b16fa5'), 'ad25244b-9d62-4506-9427-f5ee2e15b3e8');

        tree.insert(StoryCard.create({
          header: 'It can go the other direction.',
          body: '',
          tags: []
        }, '0373574e-3160-4b9e-9e4c-082c5abfa1eb'), 'ad25244b-9d62-4506-9427-f5ee2e15b3e8');

        tree.insert(StoryCard.create({
          header: 'The other direction has one scenario.',
          body: '',
          tags: []
        }, '63a93d48-1040-4a8e-9a47-ef4bc3420e29'), '0373574e-3160-4b9e-9e4c-082c5abfa1eb');

        tree.insert(StoryCard.create({
          header: 'And other scenario.',
          body: '',
          tags: []
        }, '5aef3981-b775-4232-b833-d94636079e2b'), '0373574e-3160-4b9e-9e4c-082c5abfa1eb');

        localStorage.setItem("example-tree", JSON.stringify({
          ...tree,
          _tree: Array.from(tree.getRawTreeMap().entries())
        }));
      }
    },
    getById(id: UuidType): AsyncMaybe<Tree<StoryCard>> {
      const rawTree = JSON.parse(localStorage.getItem('example-tree')!);

      const tree = Tree.create<StoryCard>();

      rawTree._tree.forEach((item: [string, ITreeNodeContext<StoryCard>]) => {
        const card = StoryCard.create({
          // @ts-ignore
          header: item[1].node._props.header,
          body: '',
          tags: []
        }, item[0]);

        if (item[1].isRoot) {
          tree.insert(card);
        } else {
          const parent = rawTree._tree.find(i => i[0] === item[1].parentId)

          const index = parent[1].childrenIds.indexOf(item[0]);

          if (
            index > 0 &&
            index < parent[1].childrenIds.length - 1 &&
            tree.getNodeById(parent[1].childrenIds[index + 1])
          ) {
            tree.insert(card, item[1].parentId, parent[1].childrenIds[index + 1]);
          } else {
            tree.insert(card, item[1].parentId);
          }
        }
      })

      return Promise.resolve(tree);
    },
    getCollection(): Promise<Tree<StoryCard>[]> {
      return Promise.resolve([]);
    },
    save(tree: Tree<StoryCard>): Promise<Tree<StoryCard>> {
      localStorage.setItem("example-tree", JSON.stringify({
        ...tree,
        _tree: Array.from(tree.getRawTreeMap().entries())
      }));

      return Promise.resolve(tree);
    }
  };
}
