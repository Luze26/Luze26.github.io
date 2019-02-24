import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import PortfolioDrawer from './PortfolioDrawer';

const PortfolioDrawerWithRouter = withRouter(({location}) => (
  <TransitionGroup>
    <CSSTransition
      key={location.key}
      classNames={{
        enter: 'portfolioDrawer_willOpen',
        enterActive: 'portfolioDrawer_opening',
        exitActive: 'portfolioDrawer_closing',
        exitDone: 'portfolioDrawer_closing',
      }}
      timeout={500}
    >
      <Switch location={location}>
        <Route exact path='/projects/:projectId' component={PortfolioDrawer}/>
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

export default PortfolioDrawerWithRouter;