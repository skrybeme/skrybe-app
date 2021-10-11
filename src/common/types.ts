export type AsyncMaybe<T> = Promise<T | null | undefined>;
export type EventAware = Pick<
  WindowEventHandlers,
  "addEventListener" | "removeEventListener"
>;
export type Maybe<T> = T | null | undefined;
export type MouseEventHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
export type Nullable<T> = T | null
export type PartialProps<T> = { [K in keyof T]: Partial<T[K]> };
export type Stub = (message?: string) => never;
export type StubFactory = (message?: string) => Stub;
export type UuidType = string;
