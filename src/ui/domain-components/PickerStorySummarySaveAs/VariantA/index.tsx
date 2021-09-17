import React from 'react';
import { Button_VariantB as Button } from '@/ui/components/Button/VariantB';
import { PickerItem, PickerTab, Picker_VariantA as Picker } from '@/ui/components/Picker';
import { useToggle } from '@/ui/hooks';
import * as S from './styles';

export interface PickerStorySummarySaveAsProps {
  onSaveAsStorySummary?: () => void;
  onSaveAsStorySummaryDraft?: () => void;
}

export function PickerStorySummarySaveAs_VariantA({
  onSaveAsStorySummary,
  onSaveAsStorySummaryDraft
}: PickerStorySummarySaveAsProps): React.ReactElement<PickerStorySummarySaveAsProps> {
  const { close, isOpen, toggle } = useToggle();

  const handleSaveAsStorySummaryDraftClick = React.useCallback(() => {
    onSaveAsStorySummaryDraft?.();
    close();
  }, []);

  const handleSaveAsStorySummaryClick = React.useCallback(() => {
    onSaveAsStorySummary?.();
    close();
  }, []);

  return (
    <S.PickerStorySummarySaveAs_VariantA>
      <Button
        onClick={toggle}
        upper
        variant='primary'
      >
        Save as...
      </Button>
      <Picker
        isOpen={isOpen}
        onClickOutside={close}
      >
        <PickerTab name="default">
          <PickerItem
            hoverable
            onClick={handleSaveAsStorySummaryDraftClick}
          >
            Story summary draft
          </PickerItem>
          <PickerItem
            hoverable
            onClick={handleSaveAsStorySummaryClick}
          >
            Story summary
          </PickerItem>
        </PickerTab>
      </Picker>
    </S.PickerStorySummarySaveAs_VariantA>
  );
}
