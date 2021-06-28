import { Stub, StubFactory } from "@/common/types";

export const stub: Stub = (message: string = "Implementation not provided."): never => {
  throw new Error(message);
}

export function stubFactory(
  message: string = "Implementation not provided."
): StubFactory {
  return () => stub(message);
}
