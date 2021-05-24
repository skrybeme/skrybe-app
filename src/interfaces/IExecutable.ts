export default interface IExecutable<TArgs = any, TReturnType = any> {
  execute: (params: TArgs) => TReturnType;
}
