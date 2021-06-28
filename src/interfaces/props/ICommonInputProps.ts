interface ICommonInputProps<T = string> {
  isDisabled?: boolean;
  handleBlur?: (value: T) => void;
  handleChange?: (value: T) => void;
  handleFocus?: (value: T) => void;
  placeholder?: string;
  value?: T;
}

export default ICommonInputProps;
