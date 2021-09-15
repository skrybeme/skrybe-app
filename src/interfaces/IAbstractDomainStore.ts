import ILoadable from './ILoadable';

export default interface IAbstractDomainStore<TDomainModel> extends ILoadable<TDomainModel> {
  set: (loadable: ILoadable<TDomainModel>) => void;
}
