import styled from 'styled-components';

export const RangePickerContext = styled.div`
  position: relative;
`;

export const RangePickerControls = styled.div`
  position: relative;
`;

export const RangePickerValue = styled.div`
  color: ${props => props.theme.primaryLight};
  font-size: 25px;
  font-weight: 500;
  padding: 0 0 20px;
  position: relative;
  user-select: none;
`;

export const RangePicker = styled.div`
  background-color: ${props => props.theme.bgLight};
  color: ${props => props.theme.light};
  bottom: 0;
  left: -92px;
  width: 200px;
  padding: 20px 25px;
  box-shadow: 1px 1px 3px ${props => props.theme.shadow};
  position: absolute;
  text-align: center;

  .trace {
    background-color: ${props => props.theme.primaryLight};
    left: 0;
    right: 0;
    height: 2px;
    top: calc(50% - 1px);
    position: absolute;
  }

  .bullet {
    transform: translateX(89px);
    background-color: ${props => props.theme.primaryLight};
    width: 10px;
    height: 10px;
    left: 0;
    top: calc(50% - 5px);
    border-radius: 50%;
    position: absolute;
  }
`;

export const Panel = styled.div<any>`
  transition: opacity 0.1s ease-in-out;
  padding: 10px 20px;
  font-size: 15px;
`;

export const Control = styled.a`
  cursor: pointer;
`;

export const Item = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;

  i {
    color: ${props => props.theme.muted};
    font-size: 13px;
    margin-left: 5px;
  }
`;

export const Context = styled.div``;
