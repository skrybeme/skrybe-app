export type AsyncMaybe<T> = Promise<T | null | undefined>;
export type Maybe<T> = T | null | undefined;
export type MouseEventHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
export type PartialProps<T> = { [K in keyof T]: Partial<T[K]> };
export type UuidType = string;
