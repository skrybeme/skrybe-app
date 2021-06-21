export default interface ModalResult {
  close(): void;
  open(component: React.ReactNode): void;
}
