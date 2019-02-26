import React from 'react';
import './css/home.css';
import Experiments from './Experiments';
import {Link} from 'react-router-dom';

class ExperimentsHome extends React.Component {

  render() {
    return (
      <div className='experimentsHome'>
        <h1 className='experimentsHome-title'>
          <div>
            <i className='i-lab' />
          </div>
          Experiments
        </h1>
        <div style={{textAlign: 'center'}}>
          <Link to='/' className='experimentsHome-backLink'>
            <i className='i-arrow-right1' style={{transform: 'rotate(180deg)', display: 'inline-block', marginRight: 5}}/>
            Back to the portfolio
          </Link>
        </div>
        <Experiments />
      </div>
    );
  }
}

export default ExperimentsHome;