import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
            <div className="link mt-48" title="Go back to wide view" onClick={() => onClickReturn()}>
              <i className="fas fa-arrow-left"></i>
            </div>
          </div>
          <div className="fixed fixed-right" style={{ minWidth: '320px' }}>
            <div className="link mt-10">
              <i className="fas fa-tag"></i>
              <span className="link-title">
                Tags
              </span>
            </div>
            <div style={{ padding: '10px 20px', fontSize: '15px' }}>
              <div style={{ padding: '10px 10px', display: 'flex', justifyContent: 'space-between', backgroundColor: '#559955', color: '#fff' }}>
                <span>Main storyline</span>
                {/* <span><i className="fas fa-pen" style={{ fontSize: '13px', marginLeft: '5px', color: '#fff' }}></i></span> */}
              </div>
              <div style={{ marginTop: '10px', padding: '10px 10px', display: 'flex', justifyContent: 'space-between', backgroundColor: '#995555', color: '#fff' }}>
                <span>Character: Dorothy</span>
                {/* <span><i className="fas fa-pen" style={{ fontSize: '13px', marginLeft: '5px', color: '#fff' }}></i></span> */}
              </div>
              <div style={{ marginTop: '10px', padding: '10px 10px', display: 'flex', justifyContent: 'space-between', backgroundColor: '#555599', color: '#fff' }}>
                <span>No action</span>
                {/* <span><i className="fas fa-pen" style={{ fontSize: '13px', marginLeft: '5px', color: '#fff' }}></i></span> */}
              </div>
              <div style={{ marginTop: '10px', padding: '10px 10px', display: 'flex', justifyContent: 'center', backgroundColor: '#fff', color: '#999' }}>
                <span>+ Add new tag</span>
                {/* <span><i className="fas fa-pen" style={{ fontSize: '13px', marginLeft: '5px', color: '#fff' }}></i></span> */}
              </div>
            </div>
            <div className="link">
              <i className="fas fa-cog"></i>
              <span className="link-title">
                Editor settings
              </span>
            </div>
            <div style={{ padding: '10px 20px', fontSize: '15px' }}>
              <div style={{ padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
                <span>Characters in line</span>
                <span>70 <i className="fas fa-pen" style={{ fontSize: '13px', marginLeft: '5px', color: '#999' }}></i></span>
              </div>
              <div style={{ padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
                <span>Font</span>
                <span>Cairo <i className="fas fa-pen" style={{ fontSize: '13px', marginLeft: '5px', color: '#999' }}></i></span>
              </div>
              <div style={{ padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
                <span>Font size</span>
                <span>17px <i className="fas fa-pen" style={{ fontSize: '13px', marginLeft: '5px', color: '#999' }}></i></span>
              </div>
              <div style={{ padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
                <span>Line height</span>
                <span>1,5 <i className="fas fa-pen" style={{ fontSize: '13px', marginLeft: '5px', color: '#999' }}></i></span>
              </div>
            </div>
            <div className="link">
              <i className="fas fa-chart-pie"></i>
              <span className="link-title">
                Writing progress & stats
              </span>
            </div>
            <div style={{ padding: '10px 20px', fontSize: '15px' }}>
              <div style={{ padding: '10px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr', gridRowGap: '10px', gridColumnGap: '10px', justifyContent: 'start' }}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da222', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da264', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da266', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da288', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da233', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da2cc', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da2bb', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da222', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da255', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da2dd', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da2bb', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da274', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da266', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da2ff', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da233', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da211', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da233', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da277', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da277', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da222', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da222', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da266', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da211', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da233', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da211', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da255', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da244', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da222', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da233', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da200', width: '20px', height: '20px' }}></span>
                <span style={{ borderRadius: '50%', backgroundColor: '#5b3da211', width: '20px', height: '20px' }}></span>
              </div>
              <a style={{ marginTop: '20px', marginBottom: '20px', padding: '10px 20px;', textAlign: 'center', display: 'block', fontSize: '17px' }}>
                See all months...
              </a>
            </div>
            <div className="link">
              <i className="fas fa-book-open"></i>
              <span className="link-title">
                Generate story
              </span>
            </div>
            <div style={{ padding: '10px 20px', fontSize: '15px' }}>
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
            </div>
          </div>
        </S.Editable>
      </S.Wrapper>
    </S.Context>
  );
}

export default PageView;
