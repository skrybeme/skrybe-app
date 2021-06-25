interface CardEditorProps {
  body?: string;
  header?: string;
  onChange?: (value: { body: string, header: string }) => void;
}

export default CardEditorProps;
