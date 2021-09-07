import { datatype, lorem } from 'faker';
import { computed, reaction } from 'mobx';
import { AbstractStore } from './AbstractStore';

class AbstractStoreImplementation extends AbstractStore<any, any> {
  @computed
  get data() {
    return this._data as any;
  }
}

describe(`Store: AbstractStore (implementation)`, () => {
  it(`returns initial state`, () => {
    const store = new AbstractStoreImplementation();

    expect(store.data).toBeNull();
    expect(store.isError).toBeFalsy();
    expect(store.isLoading).toBeFalsy();
  });

  describe(`"set" method`, () => {
    it(`sets properties with nullable data`, (done) => {
      const store = new AbstractStoreImplementation();

      reaction(
        () => store.isLoading,
        (() => {
          expect(store.data).toBeNull();
          expect(store.isError).toBeFalsy();
          expect(store.isLoading).toBeTruthy();

          done();
        })
      );

      store.set({
        data: null,
        isError: false,
        isLoading: true
      });
    });

    it(`sets properties with domain model data`, (done) => {
      const store = new AbstractStoreImplementation();

      const data = {
        propertyA: lorem.paragraph(),
        propertyB: datatype.uuid()
      };

      reaction(
        () => store.data !== null,
        (() => {
          expect(store.data).toEqual(data);
          expect(store.isError).toBeFalsy();
          expect(store.isLoading).toBeFalsy();

          done();
        })
      );

      store.set({
        data,
        isError: false,
        isLoading: false
      });
    });

    it(`sets properties partially`, (done) => {
      const store = new AbstractStoreImplementation();

      store.set({
        data: {
          propertyA: lorem.paragraph(),
          propertyB: datatype.uuid()
        },
        isError: false,
        isLoading: false
      });

      reaction(
        () => store.data === null && store.isError,
        (() => {
          expect(store.data).toBeNull();
          expect(store.isError).toBeTruthy();
          expect(store.isLoading).toBeFalsy();

          done();
        })
      );

      store.set({
        data: null,
        isError: true,
      });
    });
  });

  describe(`"reset" method`, () => {
    it(`restores store properties with initial parameters`, (done) => {
      const store = new AbstractStoreImplementation();

      store.set({
        data: {
          propertyA: lorem.paragraph(),
          propertyB: datatype.uuid()
        },
        isError: true,
        isLoading: true
      });

      reaction(
        () => store.data === null && !store.isLoading,
        (() => {
          expect(store.data).toBeNull();
          expect(store.isError).toBeFalsy();
          expect(store.isLoading).toBeFalsy();

          done();
        })
      );

      store.reset();
    });
  });
});
