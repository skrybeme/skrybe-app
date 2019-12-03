import UniversalPicker from '@/components/UniversalPicker';
import React from 'react';
import * as Styles from './styles';

function Toolbar() {
  function handleClick() {
    console.log('Should open navbar.');
  }

  return (
    <Styles.Toolbar>
      <Styles.Hamburger onClick={handleClick}>
        <div>
          <span />
          <span />
          <span />
        </div>
      </Styles.Hamburger>
      <Styles.Logo>
        <span>
          Skrybe
        </span>
      </Styles.Logo>
      <UniversalPicker />
    </Styles.Toolbar>
  );
}

export default Toolbar;
