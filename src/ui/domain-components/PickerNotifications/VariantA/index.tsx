import { PickerItem, PickerTab, Picker_VariantA as Picker } from '@/ui/components/Picker';
import { useToggle } from '@/ui/hooks';
import React from 'react';
import * as S from './styles';

export interface PickerNotificationsProps {
  hasUnreadMessages?: boolean;
}

export function PickerNotifications_VariantA({
  hasUnreadMessages
}: PickerNotificationsProps): React.ReactElement<PickerNotificationsProps> {
  const { close, isOpen, toggle } = useToggle();

  return (
    <S.PickerNotifications_VariantA>
      <S.BellIconTrigger
        isOpen={isOpen}
        onClick={toggle}
      >
        <i className="fas fa-bell" />
        {hasUnreadMessages && <S.UnreadMessagesIndicator />}
      </S.BellIconTrigger>
      <Picker
        isOpen={isOpen}
        onClickOutside={close}
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
              <S.MessageFooter>
                <S.Button className="primary">
                  Keep me posted
                </S.Button>
                <S.Button>
                  Dismiss
                </S.Button>
              </S.MessageFooter>
            </S.Message>
          </PickerItem>
        </PickerTab>
      </Picker>
    </S.PickerNotifications_VariantA>
  )
}
