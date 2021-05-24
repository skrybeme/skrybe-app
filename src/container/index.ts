import { LocalStorageStoryTreeDataSource } from '@/data-sources/localstorage/LocalStorageStoryTreeDataSource';
import { IStoryTreeDataSource, IStoryTreeRepo, IStoryTreeUseCases } from '@/interfaces';
import createStoryTreeRepo from '@/repository/StoryTreeRepo';
import createStoryTreeUseCases from '@/use-cases/story-tree-use-cases';
import { Container, ContainerModule } from 'inversify';
import * as SYMBOL from './symbols';

const container = new Container();

container.load(new ContainerModule(bind => {
  bind<IStoryTreeUseCases>(SYMBOL.TreeUseCases).toDynamicValue(({ container }) =>
    createStoryTreeUseCases(container.get<IStoryTreeRepo>(SYMBOL.TreeRepo)))
}));

container.load(new ContainerModule(bind => {
  bind<IStoryTreeRepo>(SYMBOL.TreeRepo).toDynamicValue(({ container }) =>
    createStoryTreeRepo(container.get<IStoryTreeDataSource>(SYMBOL.TreeDataSource))
)}));

container.load(new ContainerModule(bind => {
  const mockTreeDataSource: IStoryTreeDataSource = new LocalStorageStoryTreeDataSource();

  mockTreeDataSource.boot();

  bind<IStoryTreeDataSource>(SYMBOL.TreeDataSource)
    .toConstantValue(mockTreeDataSource);
}));

export { container }
