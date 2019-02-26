import React from 'react';

class PerlinCharsInfo extends React.Component {

  render() {
    return (
      <div>
        <h4>Simplex Noise x String</h4>
        <p>
          Generative art inspired by the very good Matt DesLauriers' course on Frontend Masters.<br/>
          Using simplex noise for the size and rotation.<br/>
          <a href='https://frontendmasters.com/courses/canvas-webgl/' target='_blank' rel='noopener noreferrer'>
            Matt DesLauriers' course
          </a>
        </p>
        <div className='m-t-5'>
          <a href='https://en.wikipedia.org/wiki/Simplex_noise' target='_blank' rel='noopener noreferrer'>
            Simplex noise on Wikipedia
          </a>
        </div>
      </div>
    );
  }
}

export default PerlinCharsInfo;