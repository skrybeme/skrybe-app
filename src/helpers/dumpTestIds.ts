import { Maybe } from '@/common/types';

export default function dumpTestIds(
  element: HTMLElement,
  log = true
): Maybe<Array<string>> {
  const dump = element.innerHTML.match(/data-testid="([^"]+)"/g)?.map(
    (item) => item.replace(/"/g, "").replace(/data-testid=/g, "")
  );

  if (log) {
    console.log(dump);
  }

  return dump;
}
