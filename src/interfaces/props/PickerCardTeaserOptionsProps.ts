export default interface PickerCardTeaserOptionsProps {
  onGenerateChildren?: () => void;
  onRemoveNode?: () => void;
  onToggle?: (isOpen: boolean) => void;
}
