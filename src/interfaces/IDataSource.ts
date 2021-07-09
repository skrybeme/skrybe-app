import IBootable from './IBootable';
import IPersistable from './IPersistable';

export default interface IDataSource<TEntity> extends IBootable, IPersistable<TEntity> {}
