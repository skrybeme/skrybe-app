import createMockTreeDataSource from '@/data-sources/mock/MockStoryTreeDataSource';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { IStoryTreeDataSource, IStoryTreeRepo, IStoryTreeUseCases } from '@/interfaces';
import createTreeRepo from '@/repository/StoryTreeRepo';
import createTreeUseCases from '@/use-cases/story-tree-use-cases';
import { Container, ContainerModule } from 'inversify';
import * as SYMBOL from './symbols';

const container = new Container();

container.load(new ContainerModule(bind => {
  bind<IStoryTreeUseCases<Tree<StoryCard>, StoryCard>>(SYMBOL.TreeUseCases).toDynamicValue(({ container }) =>
    createTreeUseCases(container.get<IStoryTreeRepo>(SYMBOL.TreeRepo)))
}));

container.load(new ContainerModule(bind => {
  bind<IStoryTreeRepo>(SYMBOL.TreeRepo).toDynamicValue(({ container }) =>
    createTreeRepo(container.get<IStoryTreeDataSource>(SYMBOL.TreeDataSource))
)}));

container.load(new ContainerModule(bind => {
  bind<IStoryTreeDataSource>(SYMBOL.TreeDataSource)
    .toConstantValue(createMockTreeDataSource());
}));

export { container }
