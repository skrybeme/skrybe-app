export default interface ToggleResult {
  close: () => void;
  readonly isOpen: boolean;
  open: () => void;
  toggle: (isOpen?: boolean) => void;
}
