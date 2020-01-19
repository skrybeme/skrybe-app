import React from 'react';
import * as S from './styles';

function Card() {
  return (
    <S.Card>
      <header>
        Michael was not even Bay that day.
      </header>
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pulvinar bibendum neque, nec tincidunt sem posuere in. Suspendisse tempor efficitur ante, vitae porttitor risus luctus semper. Sed ut ante posuere, feugiat libero quis, hendrerit diam. Donec varius egestas tellus, ut mattis mauris sollicitudin malesuada. Vivamus mattis, elit vel iaculis venenatis, mauris ante viverra ante, id rutrum mauris lacus id enim. Mauris in eros neque.
        </p>
        <p>
          Phasellus elementum neque odio, a dapibus massa sagittis non. Proin gravida tempus ex eget tincidunt. Praesent posuere non lectus id sollicitudin. Fusce massa nunc, bibendum nec varius quis, imperdiet et libero. Proin sagittis fringilla nisi, id sollicitudin nulla luctus ut. Phasellus neque tortor, hendrerit non tempus eu, scelerisque vitae mauris...
        </p>
      </div>
    </S.Card>
  );
}

function DetailedView() {
  return (
    <S.Context>
      <S.Wrapper>
        <S.Card isMuted={true} />
        <Card />
        <S.Card isMuted={true} />
      </S.Wrapper>
    </S.Context>
  );
}

export default DetailedView;
