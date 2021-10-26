import React from 'react';
import {
  PickerItem,
  PickerTab,
  Picker_VariantA as Picker
} from '@/ui/components/Picker';
import { useContainer, useToggle } from '@/ui/hooks';
import { FormSignToESL } from '../../FormSignToESL';
import * as S from './styles';
import { ToggleResult } from '@/interfaces/hooks';
import { observer } from 'mobx-react-lite';
import { ESLSubscriptionStore } from '@/store/ESLSubscriptionStore';
import * as SYMBOL from '@/container/symbols';

export interface PickerESLProps {
  hasUnreadMessages?: boolean;
  popover: ToggleResult;
  triggerDisabled?: boolean;
}

export const PickerESL_VariantA = observer(({
  hasUnreadMessages,
  popover,
  triggerDisabled = false
}: PickerESLProps): React.ReactElement<PickerESLProps> => {
  const form = useToggle();

  const store = useContainer<ESLSubscriptionStore>(SYMBOL.store.ESLSubscriptionStore);

  const [isStubborn, setIsStubborn] = React.useState(true);

  const [email, setEmail] = React.useState('');

  const emailInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (popover.isOpen) {
      return;
    }

    form.close();
  }, [popover.isOpen]);

  React.useEffect(() => {
    if (!form.isOpen) {
      return;
    }

    setIsStubborn(false);
    emailInputRef.current?.focus();
  }, [form.isOpen]);

  const handleCancel = React.useCallback(() => {
    form.close();
  }, []);

  const handleClickOutside = React.useCallback(() => {
    if (isStubborn) {
      return;
    }

    popover.close();
  }, [popover, isStubborn]);

  const handleDismiss = React.useCallback(() => {
    setIsStubborn(false);
    popover.close();
  }, []);

  const handleEmailInputChange = React.useCallback((value: string) => {
    setEmail(value);
  }, []);

  const handleTriggerClick = React.useCallback(() => {
    if (triggerDisabled) {
      return;
    }

    popover.toggle();
  }, [triggerDisabled]);

  const openForm = React.useCallback(() => {
    setTimeout(form.open);
  }, []);

  return (
    <S.PickerESL_VariantA>
      <S.BellIconTrigger
        data-testid="picker-esl-trigger"
        isOpen={popover.isOpen}
        onClick={handleTriggerClick}
      >
        <i className="fas fa-bell" />
        {hasUnreadMessages && <S.UnreadMessagesIndicator />}
      </S.BellIconTrigger>
      <Picker
        isOpen={popover.isOpen}
        onClickOutside={handleClickOutside}
      >
        <PickerTab>
          <PickerItem styleless>
            <S.Message>
              <strong>
                This app is a work in progress.
              </strong>
              <p>
                That means your changes won't be saved for too long.<br/>
                We are working on user accounts to enable that.
              </p>
              <p>
                You can leave your email to be notified when we publish the full version of Skrybe.co.
              </p>
              {!store?.data && form.isOpen && (
                <FormSignToESL
                  emailInputRef={emailInputRef}
                  onCancel={handleCancel}
                  onChange={handleEmailInputChange}
                  value={email}
                />
              )}
              {!store?.data && !form.isOpen && (
                <S.MessageFooter>
                  <S.Button
                    className="primary"
                    data-testid="picker-esl-keep-me-posted"
                    onClick={openForm}
                  >
                    Keep me posted
                  </S.Button>
                  <S.Button
                    data-testid="picker-esl-dismiss"
                    onClick={handleDismiss}
                  >
                    Dismiss
                  </S.Button>
                </S.MessageFooter>
              )}
              {store?.data && (
                <MessageSubscriptionSuccess onClose={handleDismiss} />
              )}
            </S.Message>
          </PickerItem>
        </PickerTab>
      </Picker>
    </S.PickerESL_VariantA>
  )
});

interface MessageSubscriptionSuccessProps {
  onClose: () => void;
}

function MessageSubscriptionSuccess({
  onClose
}: MessageSubscriptionSuccessProps): React.ReactElement<MessageSubscriptionSuccessProps> {
  return (
    <S.MessageSubscriptionSuccess>
      <S.MessageWithIcon>
        <i className="fas fa-check" />
        <div>
          <p>
            <strong>Thank you for signing up!</strong>
          </p>
          <p>
            We will send you only very important information!
          </p>
        </div>
      </S.MessageWithIcon>
      <S.MessageFooter>
        <S.Button onClick={onClose}>
          Close
        </S.Button>
      </S.MessageFooter>
    </S.MessageSubscriptionSuccess>
  );
}
