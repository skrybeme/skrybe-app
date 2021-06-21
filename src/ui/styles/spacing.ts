export enum Space {
  XS = 4,
  S = 8,
  M = 16,
  L = 24,
  XL = 32,
  XXL = 48,
  XXXL = 64,
  XXXXL = 96
}

export function px(Space: Space): string {
  return `${Space}px`;
}
