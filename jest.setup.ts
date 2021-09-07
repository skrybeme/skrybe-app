import "reflect-metadata";

class LocalStorageMock implements Storage {
  constructor(private _storage: { [key: string]: string } = {}) {}

  clear(): void {
    this._storage = {};
  }

  getItem(key: string): string | null {
    return this._storage[key] || null;
  }

  key(index: number): string | null {
    return Object.values(this._storage)[index];
  }

  get length(): number {
    return Object.keys(this._storage).length;
  }

  removeItem(key: string): void {
    delete this._storage[key];
  }

  setItem(key: string, value: string) {
    this._storage[key] = value;
  }
}

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock()
});
