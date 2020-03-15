import Picker from '@/components/Picker';
import UniversalPicker from '@/components/UniversalPicker';
import React from 'react';
import * as S from './styles';

function Toolbar() {
  return (
    <S.Toolbar flex>
      <S.Flex>
        <S.Logo>
          <span>
            <i className="fab fa-scribd"></i>
            &nbsp;&nbsp;Skrybe
          </span>
        </S.Logo>
        <UniversalPicker />
      </S.Flex>
      <S.Flex>
        <div
          title="Create new project"
          style={{
            fontSize: '15px',
            width: '30px',
            margin: '10px',
            height: '30px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            color: '#5b3da2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <i className="fas fa-plus"></i>
        </div>
        <div
          title="My generated stories"
          style={{
            fontSize: '15px',
            width: '30px',
            margin: '10px',
            height: '30px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            color: '#5b3da2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <i className="fas fa-book-open"></i>
        </div>
        <div
          title="Help"
          style={{
            fontSize: '15px',
            width: '30px',
            margin: '10px',
            height: '30px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            color: '#5b3da2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <i className="fas fa-question"></i>
        </div>
        <Picker />
      </S.Flex>
    </S.Toolbar>
  );
}

export default Toolbar;
