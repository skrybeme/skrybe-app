export default interface ToggleResult {
  close: () => void;
  readonly isOpen: boolean;
  open: () => void;
  set: (isOpen?: boolean) => void;
  toggle: () => void;
}
