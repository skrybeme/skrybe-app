export const useLocalStorageMiddleware = () => store => next => action => {
  return next(action);
}
