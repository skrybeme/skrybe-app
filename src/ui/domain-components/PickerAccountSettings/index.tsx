import React from 'react';
import { PickerTab, PickerItem, Picker_VariantA } from '@/ui/components/Picker';
import ThemePicker from '@/ui/components/ThemePicker';
import { useToggle } from '@/ui/hooks';
import * as S from './styles';

export function PickerAccountSettings(): JSX.Element {
  const { close, isOpen, toggle } = useToggle();

  return (
    <S.PickerAccountSettings isOpen={isOpen}>
      <S.Trigger
        flex
        onClick={toggle}
      >
        <i className="fas fa-user-cog" />
      </S.Trigger>
      <Picker_VariantA
        isOpen={isOpen}
        onClickOutside={close}
      >
        <PickerTab>
          <PickerItem styleless>
            <S.Item>
              <ThemePicker />
            </S.Item>
          </PickerItem>
          <PickerItem styleless>
            <S.Item>
              <S.Link>
                Help
              </S.Link>
            </S.Item>
          </PickerItem>
          <PickerItem styleless>
            <S.Item>
              <S.Link>
                Sign in / Sign up
                <div style={{ marginTop: '7px', fontSize: '13px' }}>
                  <i className="fas fa-user-plus" style={{ color: 'orange' }} />
                  &nbsp;&nbsp;No credit card required.
                </div>
              </S.Link>
            </S.Item>
          </PickerItem>
        </PickerTab>
      </Picker_VariantA>
    </S.PickerAccountSettings>
  );
}
