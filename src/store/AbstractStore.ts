import { Maybe } from '@/common/types';
import { ILoadable } from '@/interfaces';
import { action, computed, makeObservable, observable } from 'mobx';

export abstract class AbstractStore<TDomainModel, TViewModel> implements Readonly<ILoadable<TViewModel>> {
  @observable
  protected _data: Maybe<TDomainModel>;

  @observable
  protected _isError!: boolean;

  @observable
  protected _isLoading!: boolean;
  
  constructor() {
    this.reset();

    makeObservable(this);
  }

  abstract get data(): Maybe<TViewModel>;

  @computed
  get isError() {
    return this._isError;
  }

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @action
  reset(): void {
    this._data = null;
    this._isError = false;
    this._isLoading = false;
  }

  @action
  set(loadable: Partial<ILoadable<TDomainModel>>): void {
    if (loadable.data !== undefined) {
      this._data = loadable.data;
    }

    if (loadable.isError !== undefined) {
      this._isError = loadable.isError;
    }

    if (loadable.isLoading !== undefined) {
      this._isLoading = loadable.isLoading;
    }
  }
}
