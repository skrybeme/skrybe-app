export default function randomOf<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * (arr.length - 1))];
}
