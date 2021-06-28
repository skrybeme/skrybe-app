import { Editable } from "@/ui/components/Editable/styles";
import { px, Space } from "@/ui/styles/spacing";
import styled from "styled-components";

export const Fixed = styled.div`
  background-color: #fff;
  left: 0;
  padding-bottom: ${px(Space.M)};
  padding-top: ${px(Space.M)};
  position: sticky;
  right: 0;
  top: 0;
  transform: translateY(-100%);
  transition: none;

  &.visible {
    transform: none;
    transition: none;
  }
`;

export const ClippedEditableHeader = styled.div`
  ${Editable} {
    color: #999;
    font-size: 18px;
    font-weight: 400;
    line-height: 25px;
    overflow: hidden;
    padding: 0 128px;
    text-overflow: ellipsis;
    transition: color 0.05s ease-in-out;
    white-space: nowrap;

    &:hover {
      color: #111;
    }

    &:focus {
      color: #111;
      overflow: visible;
      white-space: normal;
    }
  }
`;

export const Scrollable = styled.div`
  margin-top: -57px;
  min-height: 100%;
  padding: 128px;
`;

export const EditableHeader = styled.div`
  ${Editable} {
    color: #111;
    font-size: 22px;
    font-weight: 600;
    line-height: 34px;
  }
`;

export const EditableBody = styled.div`
  height: 100%;
  padding-top: ${px(Space.XXXL)};

  ${Editable} {
    color: #111;
    font-size: 16px;
    font-weight: 400;
    height: 100%;
    line-height: 32px;

    p {
      margin: 0;
      text-indent: 1.25em;
    }
  }
`;
