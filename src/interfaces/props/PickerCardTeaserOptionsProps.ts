export default interface PickerCardTeaserOptionsProps {
  onCardOpen?: () => void;
  onGenerateChildren?: (source: 'body' | 'header') => void;
  onRemoveNode?: () => void;
  onToggle?: (isOpen: boolean) => void;
}
