export default interface ISidebarContext {
  close: () => void;
  readonly cardId?: string;
  readonly isOpen: boolean;
  open: () => void;
  setCardId: (cardId: string) => void;
  setTreeId: (treeId: string) => void;
  readonly treeId: string;
  unsetComponent: () => void;
}
