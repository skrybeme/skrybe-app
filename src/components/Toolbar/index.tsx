import UniversalPicker from '@/components/UniversalPicker';
import React from 'react';
import * as Styles from './styles';

function Toolbar() {
  return (
    <Styles.Toolbar>
      <Styles.Logo>
        <span>
          <i className="fab fa-scribd"></i>
          &nbsp;&nbsp;Skrybe.
        </span>
      </Styles.Logo>
      <UniversalPicker />
      <div className="right">
        T
      </div>
    </Styles.Toolbar>
  );
}

export default Toolbar;
