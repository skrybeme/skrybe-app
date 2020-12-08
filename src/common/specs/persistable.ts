import { IIdentifiable, IPersistable } from '@/interfaces';

export default function createCommonPersistableSpec<T extends IPersistable<E>, E extends IIdentifiable>(
  dataSourceFactory: (collection: E[]) => T,
  entityFactory: () => E,
  entityUpdateFn: (entity: E) => E
) {
  describe(`getCollection`, () => {
    it("returns empty array if there are no entries in data source", async () => {
      const instance = dataSourceFactory([]);

      const result = await instance.getCollection();

      expect(result).toEqual([]);
    });

    it("returns entry collection from data source", async () => {
      const entries = [
        entityFactory(),
        entityFactory()
      ];

      const instance = dataSourceFactory(entries);

      const result = await instance.getCollection();

      expect(result).toEqual(entries);
    });
  });

  describe(`save`, () => {
    it("persist new entry if entry does not exist in the collection", async () => {
      const entry =  entityFactory();

      const instance = dataSourceFactory([]);

      instance.save(entry);

      const result = await instance.getCollection();

      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(entry);
    });

    it("updates an entry in the collection if entry does exist in the collection", async () => {
      let entry = entityFactory();

      const instance = dataSourceFactory([entry]);

      entry = entityUpdateFn(entry);

      instance.save(entry);

      const result = await instance.getCollection();

      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(entry);
    });
  });

  describe(`findById`, () => {
    it("resolves with entry with given id from the collection", async () => {
      const entry = entityFactory();

      const instance = dataSourceFactory([entry]);

      const result = await instance.getById(entry.id);

      expect(result).toEqual(entry);
    });

    it("resolves with null if entry with given id is not found in the collection", async () => {
      const entry = entityFactory();

      const instance = dataSourceFactory([entry]);

      const result = await instance.getById('invalid-uuid');

      expect(result).toBeNull();
    });
  });
}
