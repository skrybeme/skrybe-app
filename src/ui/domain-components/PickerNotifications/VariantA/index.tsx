import React from 'react';
import { PickerItem, PickerTab, Picker_VariantA as Picker } from '@/ui/components/Picker';
import { useToggle } from '@/ui/hooks';
import { noop } from '@/utils';
import { FormSignToESL } from '../../FormSignToESL';
import * as S from './styles';

export interface PickerNotificationsProps {
  hasUnreadMessages?: boolean;
}

export function PickerNotifications_VariantA({
  hasUnreadMessages
}: PickerNotificationsProps): React.ReactElement<PickerNotificationsProps> {
  const popover = useToggle();

  const form = useToggle();

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

    emailInputRef.current?.focus();
  }, [form.isOpen]);

  const handleDismiss = React.useCallback(() => {
    popover.close();
  }, []);

  return (
    <S.PickerNotifications_VariantA>
      <S.BellIconTrigger
        isOpen={popover.isOpen}
        onClick={popover.toggle}
      >
        <i className="fas fa-bell" />
        {hasUnreadMessages && <S.UnreadMessagesIndicator />}
      </S.BellIconTrigger>
      <Picker
        isOpen={popover.isOpen}
        onClickOutside={noop}
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
              {form.isOpen
                ? <FormSignToESL emailInputRef={emailInputRef} />
                : (
                    <S.MessageFooter>
                      <S.Button
                        className="primary"
                        onClick={form.open}
                      >
                        Keep me posted
                      </S.Button>
                      <S.Button onClick={handleDismiss}>
                        Dismiss
                      </S.Button>
                    </S.MessageFooter>
                  )
              }
              {/* <MessageSubscriptionSuccess onClose={handleDismiss} /> */}
            </S.Message>
          </PickerItem>
        </PickerTab>
      </Picker>
    </S.PickerNotifications_VariantA>
  )
}

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
