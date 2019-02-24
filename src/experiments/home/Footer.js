import React from 'react';
import './css/footer.css';

class Footer extends React.Component {

  render() {
    return (
      <div className='home-footer'>
        <div className='home-footer-line'/>
        <div className='home-footer-line'/>
        <div className='home-footer-line'/>
        <div className='home-footer-line'/>
        <div className='home-footer-line'/>
        <div className='home-footer-content'>
          <h4 className='home-footer-subtitle'>ApprentiBarbu</h4>
          <h1 className='home-footer-title'>Experiments</h1>
          <div className='home-footer-bottomLine'>Just for fun</div>
        </div>
      </div>
    );
  }
}

export default Footer;