import createMockTreeDataSource from '@/data-sources/mock/MockTreeDataSource';
import { ITreeDataSource, ITreeRepo, ITreeUseCases } from '@/interfaces';
import createTreeRepo from '@/repository/TreeRepo';
import createTreeUseCases from '@/use-cases/tree-use-cases';
import { Container, ContainerModule } from 'inversify';
import * as SYMBOL from './symbols';

const container = new Container();

container.load(new ContainerModule(bind => {
  bind<ITreeUseCases>(SYMBOL.TreeUseCases).toDynamicValue(({ container }) =>
    createTreeUseCases(container.get<ITreeRepo>(SYMBOL.TreeRepo)))
}));

container.load(new ContainerModule(bind => {
  bind<ITreeRepo>(SYMBOL.TreeRepo).toDynamicValue(({ container }) =>
    createTreeRepo(container.get<ITreeDataSource>(SYMBOL.TreeDataSource))
)}));

container.load(new ContainerModule(bind => {
  bind<ITreeDataSource>(SYMBOL.TreeDataSource)
    .toConstantValue(createMockTreeDataSource());
}));

export { container }
