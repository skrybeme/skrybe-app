import { LocalStorageStoryTreeDataSource } from './LocalStorageStoryTreeDataSource';
import defaultStoryTree from './data/defaultStoryTree';
import { StoryTreeLocalStorageMap } from './StoryTreeLocalStorageMap';
import Tree from '@/entities/Tree';
import StoryCard from '@/entities/StoryCard';

it(`LocalStorageStoryTreeDataSource`, () => {
  it(`creation`, () => {
    it(`does not affect stored data on creation if data is corrupted`, () => {
      localStorage.setItem('example-tree', 'corrupted!##data');
  
      new LocalStorageStoryTreeDataSource();
  
      expect(localStorage.getItem('example-tree')).toEqual('corrupted!##data');
    });

    it(`does not affect stored data on creation if data is not corrupted`, () => {
      localStorage.setItem('example-tree', JSON.stringify({}));
  
      new LocalStorageStoryTreeDataSource();
  
      expect(localStorage.getItem('example-tree')).toEqual('{}');
    });
  })

  it(`populating with initial data`, () => {
    it(`does not overwrite stored data if such exists and is valid`, async () => {
      const mockedStoryTree = Tree.create<StoryCard>();
      mockedStoryTree.insert(StoryCard.create());

      const treeLocalStorageModel =
        StoryTreeLocalStorageMap.toLocalStorageModel(mockedStoryTree);

      localStorage.setItem('example-tree', JSON.stringify(treeLocalStorageModel));

      const dataSource = new LocalStorageStoryTreeDataSource();

      dataSource.boot();
  
      const result = await dataSource.getById('example-tree');

      expect(result?.equals(mockedStoryTree)).toBeTruthy();
    });

    it(`overwrites stored data if such is valid but of invalid type`, async () => {
      localStorage.setItem('example-tree', JSON.stringify({}));

      const dataSource = new LocalStorageStoryTreeDataSource();

      dataSource.boot();
  
      const result = await dataSource.getById('example-tree');

      expect(result).toEqual(defaultStoryTree);
    });

    it(`overwrites stored data if such is corrupted`, async () => {
      localStorage.setItem('example-tree', 'corrupted!##data');

      const dataSource = new LocalStorageStoryTreeDataSource();

      dataSource.boot();
  
      const result = await dataSource.getById('example-tree');

      expect(result).toEqual(defaultStoryTree);
    });

    it(`populates storage with initial data if storage is empty`, async () => {
      const dataSource = new LocalStorageStoryTreeDataSource();

      dataSource.boot();
  
      const result = await dataSource.getById('example-tree');

      expect(result).toEqual(defaultStoryTree);
    });
  })

  it(`accessing specific tree`, () => {
    it(`returns null if stored data is corrupted and does not affect it`, async () => {
      localStorage.setItem('example-tree', 'corrupted!##data');
  
      const dataSource = new LocalStorageStoryTreeDataSource();
  
      const result = await dataSource.getById('example-tree');
  
      expect(result).toBeNull();
      expect(localStorage.getItem('example-tree')).toEqual('corrupted!##data');
    });

    it(`returns null if stored data is valid but of wrong type and does not affect it`, async () => {
      localStorage.setItem('example-tree', JSON.stringify({}));
  
      const dataSource = new LocalStorageStoryTreeDataSource();
  
      const result = await dataSource.getById('example-tree');
  
      expect(result).toBeNull();
      expect(localStorage.getItem('example-tree')).toEqual('{}');
    });

    it(`returns tree's domain model by id`, async () => {
      const treeLocalStorageModel =
        StoryTreeLocalStorageMap.toLocalStorageModel(defaultStoryTree);

      localStorage.setItem('example-tree', JSON.stringify(treeLocalStorageModel));

      const dataSource = new LocalStorageStoryTreeDataSource();
  
      const result = await dataSource.getById('example-tree');

      expect(result).toEqual(defaultStoryTree);
    });
  })

  describe(`saving`, () => {
    it(`saves the tree to localStorage in proper format`, async () => {
      const dataSource = new LocalStorageStoryTreeDataSource();

      await dataSource.save(defaultStoryTree);

      expect(localStorage.getItem('example-tree')).toEqual(`{"id":"ba5ff9b6-c93c-4af9-b6d2-8e73168db61c","tree":{"ad25244b-9d62-4506-9427-f5ee2e15b3e8":{"childrenIds":["b5db3f95-0c6e-474d-ac47-0adf68b16fa5","0373574e-3160-4b9e-9e4c-082c5abfa1eb"],"isRoot":true,"node":{"body":"","header":"Your story begins here.","id":"ad25244b-9d62-4506-9427-f5ee2e15b3e8","tags":[]},"parentId":""},"b5db3f95-0c6e-474d-ac47-0adf68b16fa5":{"childrenIds":[],"isRoot":false,"node":{"body":"","header":"It can go in one direction.","id":"b5db3f95-0c6e-474d-ac47-0adf68b16fa5","tags":[]},"parentId":"ad25244b-9d62-4506-9427-f5ee2e15b3e8"},"0373574e-3160-4b9e-9e4c-082c5abfa1eb":{"childrenIds":["63a93d48-1040-4a8e-9a47-ef4bc3420e29","5aef3981-b775-4232-b833-d94636079e2b"],"isRoot":false,"node":{"body":"","header":"It can go the other direction.","id":"0373574e-3160-4b9e-9e4c-082c5abfa1eb","tags":[]},"parentId":"ad25244b-9d62-4506-9427-f5ee2e15b3e8"},"63a93d48-1040-4a8e-9a47-ef4bc3420e29":{"childrenIds":[],"isRoot":false,"node":{"body":"","header":"The other direction has one scenario.","id":"63a93d48-1040-4a8e-9a47-ef4bc3420e29","tags":[]},"parentId":"0373574e-3160-4b9e-9e4c-082c5abfa1eb"},"5aef3981-b775-4232-b833-d94636079e2b":{"childrenIds":[],"isRoot":false,"node":{"body":"","header":"And other scenario.","id":"5aef3981-b775-4232-b833-d94636079e2b","tags":[]},"parentId":"0373574e-3160-4b9e-9e4c-082c5abfa1eb"}}}`);
    });
  });
});
