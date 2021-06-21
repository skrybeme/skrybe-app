export default interface ToggleResult {
  close: () => void;
  isOpen: boolean;
  open: () => void;
  toggle: () => void;
}
