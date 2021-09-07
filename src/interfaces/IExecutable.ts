export default interface IExecutable<TArgs = any, TReturnType = Promise<void>> {
  execute: (params: TArgs) => TReturnType;
}
