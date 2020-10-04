import { Maybe } from '@/common/types';

export default interface ILoadable<T> {
  data: Maybe<T>;
  isError: boolean;
  isLoading: boolean;
}
