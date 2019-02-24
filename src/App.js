import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import ExperimentsHome from './experiments/home/ExperimentsHome';
import EXPERIMENTS from './experiments/configs/ExperimentsConfig';
import Portfolio from './portfolio/Portfolio';

class App extends React.Component {
  renderExperiment = (experiment) => (
    <Route
      key={experiment.id}
      exact
      path={experiment.path}
      component={experiment.component}
    />
  );

  render() {
    return (
      <HashRouter>
        <div className='app'>
          <Switch>
            <Route exact path='/experiments' component={ExperimentsHome}/>
            {EXPERIMENTS.map(this.renderExperiment)}
            <Route path='/' component={Portfolio}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
