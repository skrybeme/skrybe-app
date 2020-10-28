import createMockTreeDataSource from '@/data-sources/mock/MockStoryTreeDataSource';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { IStoryTreeDataSource, IStoryTreeRepo, IStoryTreeUseCases } from '@/interfaces';
import createStoryTreeRepo from '@/repository/StoryTreeRepo';
import createStoryTreeUseCases from '@/use-cases/story-tree-use-cases';
import { Container, ContainerModule } from 'inversify';
import * as SYMBOL from './symbols';

const container = new Container();

container.load(new ContainerModule(bind => {
  bind<IStoryTreeUseCases<Tree<StoryCard>, StoryCard>>(SYMBOL.TreeUseCases).toDynamicValue(({ container }) =>
    createStoryTreeUseCases(container.get<IStoryTreeRepo>(SYMBOL.TreeRepo)))
}));

container.load(new ContainerModule(bind => {
  bind<IStoryTreeRepo>(SYMBOL.TreeRepo).toDynamicValue(({ container }) =>
    createStoryTreeRepo(container.get<IStoryTreeDataSource>(SYMBOL.TreeDataSource))
)}));

container.load(new ContainerModule(bind => {
  bind<IStoryTreeDataSource>(SYMBOL.TreeDataSource)
    .toConstantValue(createMockTreeDataSource());
}));

export { container }
