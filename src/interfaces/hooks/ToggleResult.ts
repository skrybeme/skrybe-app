export default interface ToggleResult {
  close: () => void;
  isOpen: boolean;
  toggle: () => void;
}
