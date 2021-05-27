interface ICommonInputProps<T = string> {
  isDisabled?: boolean;
  handleBlur?: (value: T) => void;
  handleChange?: (value: T) => void;
  handleFocus?: () => void;
  value?: T;
}

export default ICommonInputProps;
