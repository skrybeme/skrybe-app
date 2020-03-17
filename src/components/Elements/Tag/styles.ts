import styled from 'styled-components';

// Minimal adaptation of invert-color by onury
// @see: https://github.com/onury/invert-color
function invert(hex: string): string {
  if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }

  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  if (hex.length !== 6) {
      throw new Error('[invert] Invalid HEX color.');
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return (r * 0.299 + g * 0.587 + b * 0.114) > 186
    ? '#000'
    : '#fff';
}

// @TODO: do NOT call invert function twice.
export const Context = styled.div<any>`
  background-color: ${props => props.color || `#559955`};
  color: ${props => invert(props.color || `#559955`)};
  padding: 10px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  & + & {
    margin-top: 10px;
  }

  .onhover {
    transition: opacity 0.1s ease-in-out;
    opacity: 0;

    i {
      color: ${props => invert(props.color || `#559955`)};
      font-size: 13px;
      margin-left: 5px;
    }
  }

  &:hover {
    .onhover {
      opacity: 1;
    }
  }
`;
