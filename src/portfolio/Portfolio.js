import React from 'react';
import './css/portfolio.css';
import ProjectCard from './ProjectCard';
import PortfolioBubbles from './PortfolioBubbles';
import portfolioService from './services/PortfolioService';
import PortfolioDrawerWithRouter from './PortfolioDrawerWithRouter';

class Portfolio extends React.Component {

  renderProject = (project) => (
    <div className='col-lg-4 col-md-4 col-sm-6 col-xs-12' key={project.id}>
      <ProjectCard project={project}/>
    </div>
  );

  render() {
    return (
      <div>
        <div
          className={'portfolio ' + (this.props.location.pathname.startsWith('/projects/') ? 'portfolio_blurred' : '')}
        >
          <div className='wrap container'>
            <div className='portfolio-header'>
              <div className='portfolio-header-left'>
                <h1 className='portfolio-title'>Hi, I am Yann Uzel</h1>
                <h2 className='portfolio-subtitle'>Full-Stack Developer & Passionate Builder</h2>
              </div>
              <div className='portfolio-header-right'>
                <a href='https://github.com/Luze26' target='_blank'>
                  <i className='i-github'/>
                </a>
                <a href='https://www.linkedin.com/in/yannuzel/' target='_blank'>
                  <i className='i-linkedin'/>
                </a>
                <a href='mailto:yann.uzel@gmail.com' target='_blank'>
                  <i className='i-email'/>
                </a>
              </div>
            </div>
            <hr className='portfolio-hr'/>
            <div className='portfolio-projects row'>
              <PortfolioBubbles/>
              {portfolioService.projects.map(this.renderProject)}
            </div>
          </div>
        </div>
        <PortfolioDrawerWithRouter/>
      </div>
    );
  }
}

export default Portfolio;