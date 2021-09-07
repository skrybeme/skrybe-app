import { AsyncMaybe, UuidType } from "@/common/types";
import { IIdentifiable } from "@/interfaces";

export type RepoCollectionQuery<TEntity> = Record<keyof TEntity, any>;

export class InMemoryRepo<TEntity extends IIdentifiable> {
  constructor(protected _collection: Array<TEntity> = []) {}

  getById(id: UuidType): AsyncMaybe<TEntity> {
    const record = this._collection.find((value) => value.id === id);

    return Promise.resolve(record || null);
  }

  getCollection(query?: RepoCollectionQuery<TEntity>): Promise<TEntity[]> {
    return Promise.resolve(this._collection);
  }

  async save(record: TEntity): Promise<TEntity> {
    let recordFound = this._collection.find((t) => t.id === record.id);

    if (recordFound) {
      const indexFound = this._collection.indexOf(recordFound);

      this._collection.splice(indexFound, 1, record);

      return Promise.resolve(record);
    }

    this._collection.push(record);

    return Promise.resolve(record);
  }
}
