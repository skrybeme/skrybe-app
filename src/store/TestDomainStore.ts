import { Maybe } from '@/common/types';
import { IAbstractDomainStore, ILoadable } from '@/interfaces';

export class TestDomainStore<TDomainModel> implements IAbstractDomainStore<TDomainModel> {
  data: Maybe<TDomainModel> = null;
  isError: boolean = false;
  isLoading: boolean = false;

  set(loadable: Partial<ILoadable<TDomainModel>>): void {
    if (loadable.data) {
      this.data = loadable.data;
    }

    if (loadable.isError) {
      this.isError = loadable.isError;
    }

    if (loadable.isLoading) {
      this.isLoading = loadable.isLoading;
    }
  }
}