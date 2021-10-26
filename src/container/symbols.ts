import { ESLSubscriptionStore } from '@/store/ESLSubscriptionStore';

export const dataSource = {
  ESLSubscriptionDataSource: Symbol.for('ESLSubscriptionDataSource')
};
export const LocalStorageDatabase = Symbol.for('LocalStorageDatabase');
export const StoryTreeInfoDataSource = Symbol.for('StoryTreeInfoDataSource');
export const StoryTreeInfoRepo = Symbol.for('StoryTreeInfoRepo');
export const TagRepo = Symbol.for('TagRepo');
export const TreeDataSource = Symbol.for('TreeDataSource');
export const TreeRepo = Symbol.for('TreeRepo');
export const useCase = {
  SignToESLUseCase: Symbol.for('SignToESLUseCase')
};
export const UseCases = Symbol.for('UseCases');
export const store = {
  CardDetailsStore: Symbol.for('CardDetailsStore'),
  ESLSubscriptionStore: Symbol.for('ESLSubscriptionStore'),
  StoryTreeInfoCollectionStore: Symbol.for('StoryTreeInfoCollectionStore'),
  StoryTreeRootDetailsStore: Symbol.for('StoryTreeRootDetailsStore'),
  TagCollectionStore: Symbol.for('TagCollectionStore')
};
