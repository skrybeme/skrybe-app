import { Editable } from "@/ui/components/Editable/styles";
import { px, Space } from "@/ui/styles/spacing";
import styled from "styled-components";

export const CardEditor_VariantA = styled.div`
  background-color: #fff;
  width: 100%;
`;

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
  padding-bottom: ${px(Space.XXXXL)};
  padding-top: ${px(Space.XXXXL)};
`

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 768px;
  min-width: 512px;
  width: 100%;
`;

export const EditableHeader = styled.div`
  ${Editable} {
    color: #111;
    font-size: 28px;
    font-weight: 600;
    line-height: 42px;
  }
`;

export const EditableBody = styled.div`
  padding-top: ${px(Space.XXXL)};

  ${Editable} {
    color: #111;
    font-size: 20px;
    font-weight: 400;
    line-height: 40px;

    p {
      margin: 0;
      text-indent: 1.25em;
    }
  }
`;
