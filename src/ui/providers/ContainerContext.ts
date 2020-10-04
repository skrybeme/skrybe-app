import { Maybe } from '@/common/types';
import { IContainerContext } from '@/interfaces';
import { Container } from 'inversify';
import { createContext } from 'react';

export default createContext<Maybe<IContainerContext>>({
  container: new Container()
});
