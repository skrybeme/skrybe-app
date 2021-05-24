import { AsyncMaybe, UuidType } from "@/common/types";
import { IIdentifiable } from "@/interfaces";

export class InMemoryRepo<T extends IIdentifiable> {
  constructor(private _collection: Array<T> = []) {}

  getById(id: UuidType): AsyncMaybe<T> {
    const record = this._collection.find((value) => value.id === id);

    return Promise.resolve(record || null);
  }

  getCollection(): Promise<T[]> {
    return Promise.resolve(this._collection);
  }

  async save(record: T): Promise<T> {
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
