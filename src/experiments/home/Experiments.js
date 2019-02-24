import React from 'react';
import {withRouter} from 'react-router-dom';
import EXPERIMENTS from '../configs/ExperimentsConfig';
import './css/experiments.css'

class Experiments extends React.Component {

  renderExperiment = (experiment) => (
    <div
      key={experiment.id}
      className='experiment'
      onClick={() => this.props.history.push(experiment.path)}
    >
      <div className='experiment-date'>{experiment.date}</div>
      <div className='experiment-number'>{experiment.number}</div>
      <div className='experiment-image-container'>
        <img src={experiment.image} className='experiment-image'/>
      </div>
      <h3 className='experiment-title'>{experiment.title}</h3>
    </div>
  );

  render() {
    return (
      <div className='experiments'>
        {EXPERIMENTS.map(this.renderExperiment)}
      </div>
    );
  }
}

export default withRouter(Experiments);