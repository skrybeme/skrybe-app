export default function randomInt(start: number, end: number): number {
  return Math.round(Math.random() * (end - start)) + start;
}
