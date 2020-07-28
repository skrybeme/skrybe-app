import React from 'react';
import themes from '@/ui/styles/theme';
import * as S from './styles';
import { useDispatch, useSelector } from 'react-redux';

function Item(props) {
  const { isActive, onClick, primary, secondary, title } = props;

  return (
    <S.Item isActive={isActive} onClick={onClick} title={title}>
      <svg height="30" width="30">
        <rect x="0" y="0" width="30" height="30" fill={primary} />
        <rect x="15" y="0" width="15" height="30" fill={secondary} />
      </svg>
    </S.Item>
  );
}

function ThemePicker(): JSX.Element {
  const currentTheme = useSelector(state => state.settings.theme);
  const dispatch = useDispatch();

  return (
    <S.Context>
      <S.Grid>
        {Object.keys(themes).map(theme => {
          return (
            <Item
              key={theme}
              primary={themes[theme].primary}
              secondary={themes[theme].primaryLight}
              title={theme}
              isActive={theme === currentTheme}
              onClick={() => dispatch({ type: 'set_theme', theme })}
            />
          )
        })}
      </S.Grid>
    </S.Context>
  );
}

export default ThemePicker;
