import React from "react";

class PortfolioBubbles extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    this.refs.bubble2.style['margin-top'] = window.scrollY / 4 + 'px';
    this.refs.bubble3.style['margin-top'] = window.scrollY / 4 + 'px';
    this.refs.bubble4.style['margin-top'] = window.scrollY / 20 + 'px';
  };

  render() {
    return [
      <div key={2} ref='bubble2' className='portfolio-bubble portfolio-bubble_2'/>,
      <div key={3} ref='bubble3' className='portfolio-bubble portfolio-bubble_3'/>,
      <div key={4} ref='bubble4' className='portfolio-bubble portfolio-bubble_4'/>,
    ];
  }
}

export default PortfolioBubbles;