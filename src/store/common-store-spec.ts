export function describeCommonStoreSpec(storeClass): void {
  it(`returns initial state`, () => {
    const store = new storeClass();

    expect(store.data).toBeNull();
    expect(store.isError).toBeFalsy();
    expect(store.isLoading).toBeFalsy();
  });
}
