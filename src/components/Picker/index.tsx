import React, { useRef, useState } from 'react';
import ThemePicker from '@/components/ThemePicker';
import * as S from './styles';
import { useClickOutside } from '@/hooks';

function Item(props) {
  const { children } = props;

  return (
    <S.Item>
      {children}
    </S.Item>
  );
}

function List() {
  return (
    <S.List>
      <Item>
        <ThemePicker />
      </Item>
      <Item>
        <S.Link>
          Help
        </S.Link>
      </Item>
      {/* <Item>
        <S.Link>
          Account settings
        </S.Link>
      </Item>
      <Item>
        <S.Link>
          Sign out
        </S.Link>
      </Item> */}
      <Item>
        <S.Link>
          Sign in / Sign up
          <div style={{ marginTop: '7px', fontSize: '13px' }}>
            <i className="fas fa-user-plus" style={{ color: 'orange' }}></i>
            &nbsp;&nbsp;No credit card required.
          </div>
        </S.Link>
      </Item>
      {/* <Item>
        <S.Link>
          <i className="fas fa-star" style={{ color: 'orange' }}></i>
          &nbsp;&nbsp;Skrybe Premium
        </S.Link>
      </Item> */}
    </S.List>
  );
}

function Picker(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const self = useRef(null);

  useClickOutside(self, () => setIsOpen(false));

  return (
    <S.Context isOpen={isOpen} ref={self}>
      <S.Picker flex onClick={() => setIsOpen(!isOpen)}>
        <i className="fas fa-user-cog"></i>
      </S.Picker>
      <List />
    </S.Context>
  );
}

export default Picker;
