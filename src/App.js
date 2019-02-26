import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ExperimentsHome from './experiments/home/ExperimentsHome';
import EXPERIMENTS from './experiments/configs/ExperimentsConfig';
import Portfolio from './portfolio/Portfolio';
import BackgroundCanvas from './BackgroundCanvas';

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
          <div style={{ position: 'relative', zIndex: 10, minHeight: '100%', height: '100%' }}>
            <Switch>
              <Route exact path='/experiments' component={ExperimentsHome} />
              {EXPERIMENTS.map(this.renderExperiment)}
              <Route path='/' component={Portfolio} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
