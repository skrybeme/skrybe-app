import { ReactNode } from "react";

export default interface PickerProps {
  children: ReactNode;
  isOpen: boolean;
  onClickOutside: () => void;
}
