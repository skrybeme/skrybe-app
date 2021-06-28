import { Maybe } from '@/common/types';

export default interface IScrollableContext<TRef = any> {
  ref: Maybe<React.RefObject<TRef>>
}
