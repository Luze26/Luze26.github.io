import React from 'react';
import './css/home.css';
import Experiments from './Experiments';
import Footer from './Footer';

class ExperimentsHome extends React.Component {

  render() {
    return (
      <div className='experimentsHome'>
        <Experiments/>
        <Footer/>
      </div>
    );
  }
}

export default ExperimentsHome;