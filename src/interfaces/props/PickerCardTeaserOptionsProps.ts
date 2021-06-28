export default interface PickerCardTeaserOptionsProps {
  onCardOpen?: () => void;
  onGenerateChildren?: () => void;
  onRemoveNode?: () => void;
  onToggle?: (isOpen: boolean) => void;
}
