import { generateUuid } from '@/utils';

export default class Uuid {
  private constructor(private _uuid: string) {}

  static create(uuid?: string): Uuid {
    return new Uuid(uuid || generateUuid());
  }

  toString(): string {
    return this._uuid;
  }
}
