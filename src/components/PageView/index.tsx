import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Calendar from '@/components/Calendar';
import { Settings as EditorSettings, Stats, Tags } from '@/components/Editor';
import { Label } from '@/components/Elements'
import * as S from './styles';

function PageView() {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 0);
  }, []);

  function onClickReturn() {
    setIsReady(false);

    setTimeout(() => {
      dispatch({ type: 'change_page', page: 'wide-view' });
    }, 50);
  }

  return (
    <S.Context isReady={isReady}>
      <S.Wrapper>
        <S.Editable>
          <div className="muted">
            The story:
          </div>
          <div className="fs-32">
            The others claim that Michael's behaviour always has been bad.
          </div>
          <p>
            In molestie hendrerit orci, at tristique nulla volutpat ut. Praesent non metus vitae ligula interdum vestibulum at a ligula. Mauris vulputate nisl a rutrum imperdiet. Praesent vel eros at neque auctor sodales id eget purus. Morbi et hendrerit velit. Donec at urna molestie, mollis neque ac, eleifend nulla. Mauris luctus convallis vestibulum. Proin tincidunt porttitor sapien sit amet vestibulum. Sed volutpat fermentum augue, vitae viverra neque tristique ut. Vestibulum non cursus erat. Vivamus ultricies accumsan nisl, sit amet fringilla ante imperdiet tincidunt.
          </p>
          <p>
            Nulla eu laoreet tortor. Vivamus sit amet faucibus tellus. Nullam elementum mattis diam, ut luctus erat tempor ac. Pellentesque eu ante feugiat, consequat metus sed, rutrum enim. Nunc sed sem quam. Aenean pulvinar velit velit, eu ullamcorper leo accumsan at. Sed neque nulla, mollis et hendrerit eu, lacinia ac urna. Pellentesque condimentum ipsum in ligula lobortis gravida. Nam id nibh et libero malesuada eleifend nec ut lorem. Nunc luctus nunc et tortor convallis, sed tincidunt odio gravida. Sed sollicitudin ipsum at tellus luctus, eu fermentum nibh lacinia. Phasellus convallis luctus elementum. Ut eget turpis nec nulla finibus pellentesque dignissim in nibh. Nulla ligula neque, luctus sed orci vel, porttitor dapibus tortor. Duis ac congue eros, at condimentum orci. Sed vulputate quam ligula, in rhoncus erat varius vitae.
          </p>
          <p>
            Suspendisse in nunc aliquam turpis lobortis pretium quis quis nulla. In varius pulvinar cursus. Aliquam erat volutpat. Quisque ut ultrices nisi, ut tincidunt sapien. Donec eget orci nec nulla faucibus bibendum at in magna. Duis sollicitudin nibh non erat vulputate, sed luctus nulla posuere. Fusce sed convallis eros. Morbi rhoncus commodo lorem. Donec facilisis purus nisl, vitae venenatis lacus lacinia id. Nullam ac ex tellus. Cras in porttitor tellus, a mollis sem. Proin fringilla eros ipsum, at luctus ipsum rutrum sed. Mauris tincidunt eros sed leo consectetur lacinia. Aliquam molestie dui quis felis placerat scelerisque. Fusce dolor sapien, finibus vel velit sagittis, molestie sagittis purus.
          </p>
          <div className="fixed fixed-left">
            <Label
              icon="fas fa-arrow-left"
              title="Go back to wide view"
              className="mt-48"
              onClick={() => onClickReturn()} isClickable={true}
            />
          </div>
          <div className="fixed fixed-right" style={{ minWidth: '320px' }}>
            <Tags />
            <EditorSettings />
            <Stats />
            <Label icon="fas fa-book-open" label="Generate story" isClickable={true} />
            {/* <div style={{ padding: '10px 20px', fontSize: '15px' }}>
              <div>
                By cards from edge nodes
              </div>
              <div>
                By tags selection
              </div>
              <div>
                By direct card/node selection
              </div>
              <div style={{ marginTop: '20px' }}>
                <div>
                  Previously generated stories
                </div>
                <div style={{ marginTop: '20px' }}>
                  The Curious Case of Benjamin Button, version 3
                </div>
                <div style={{ marginTop: '20px' }}>
                  The Curious Case of Benjamin Button, version 2
                </div>
                <div style={{ marginTop: '20px' }}>
                  The Curious Case of Benjamin Button, version 1
                </div>
              </div>
            </div> */}
          </div>
        </S.Editable>
      </S.Wrapper>
    </S.Context>
  );
}

export default PageView;
