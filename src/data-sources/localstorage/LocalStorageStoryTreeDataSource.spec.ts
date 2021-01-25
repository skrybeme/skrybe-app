import { createLocalStorageStoryTreeDataSource } from './LocalStorageStoryTreeDataSource';

describe(`LocalStorageStoryTreeDataSource`, () => {
  const localStorageTreeDataSource = createLocalStorageStoryTreeDataSource();

  describe(`boot`, () => {});

  describe(`getById`, () => {
    it.todo(`resolves with null if the tree is not found in localStorage`);
  });

  describe(`getCollection`, () => {});

  describe(`save`, () => {});
});
