import { PickerItem, PickerTab } from '@/ui/components/Picker/styles';
import styled from 'styled-components';

export const PickerStorySummarySaveAs_VariantA = styled.div`
  ${PickerTab} {
    width: max-content;
  }

  ${PickerItem} {
    background-color: #fff;
    border-color: #e5e5e5;
    color: #555;

    &:hover {
      background-color: #f6f6f6;
    }
  }
`;
