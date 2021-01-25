import IBootable from './IBootable';
import IPersistable from './IPersistable';

export default interface IDataSource<T> extends IBootable, IPersistable<T> {}
