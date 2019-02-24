import React from 'react';

class DlaInfo extends React.Component {

  render() {
    return (
      <div>
        <h4>Diffusion-Limited Aggregation (DLA)</h4>
        <blockquote
          cite='https://en.wikipedia.org/wiki/Diffusion-limited_aggregation'
          className='m-0'
        >
          "Is the process whereby particles undergoing a random walk due to Brownian motion cluster together to form
          aggregates of such particles. This theory, proposed by T.A. Witten Jr. and L.M. Sander in 1981, is
          applicable to aggregation in any system where diffusion is the primary means of transport in the system. DLA
          can be observed in many systems such as electrodeposition, Hele-Shaw flow, mineral deposits, and dielectric
          breakdown."
        </blockquote>
        <div className='m-t-5'>
          <a href='https://en.wikipedia.org/wiki/Diffusion-limited_aggregation' target='_blank' rel='noopener noreferrer'>
            Wikipedia
          </a>
        </div>
      </div>
    );
  }
}

export default DlaInfo;