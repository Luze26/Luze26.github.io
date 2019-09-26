import React from 'react';
import './css/portfolioDrawer.css';
import portfolioService from './services/PortfolioService';
import TechIcon from './TechIcon';
import ImageOverlay from './ImageOverlay';

class PortfolioDrawer extends React.Component {

  project = undefined;

  state = {
    overlayImage: null,
  };

  componentWillMount() {
    this.project = portfolioService.getProjectById(this.props.match.params.projectId);
  }

  close = () => this.props.history.push('/');

  stopPropagation = (event) => event.stopPropagation();

  renderTechIcon = (tech) => <TechIcon key={tech} name={tech}/>;

  renderLink = (link) => {
    let iconClassName = null;
    let label;
    switch (link.type) {
      case 'website':
        label = 'Website';
        break;
      case 'android':
        iconClassName = 'i-android_alt';
        label = 'Google Play';
        break;
      case 'ios':
        iconClassName = 'i-apple_alt';
        label = 'App Store';
        break;
    }
    return (
      <a className='portfolioDrawer-link portfolio-btn' href={link.url} alt={label} target='_blank' key={link.url}
         rel='noopener noreferrer'>
        {iconClassName ? <i className={'portfolioDrawer-link-icon ' + iconClassName}/> : null}
        {label}
      </a>
    );
  };

  renderScreenshot(screenshotId, screenshot) {
    return (
      <div
        key={screenshotId}
        className='portfolioDrawer-screenshots-gallery-screenshot'
        onClick={() => this.setState({overlayImage: screenshot.src})}
      >
        <img src={screenshot.src}/>
      </div>
    );
  }

  renderProjectInfo() {
    return (
      <div>
        <i className='portfolioDrawer-close i-cross' onClick={this.close}/>
        <div className='portfolioDrawer-header'>
          <h1>{this.project.name}</h1>
          <div className='portfolioDrawer-header-logo-wrapper'>
            <img className='portfolioDrawer-header-logo' src={this.project.image} alt={this.project.name}/>
          </div>
        </div>
        <div className='portfolioDrawer-info'>
          <div className='portfolioDrawer-info-label'>DATE:</div>
          <div className='portfolioDrawer-info-text'>
            {this.project.date}
          </div>
        </div>
        <div className='portfolioDrawer-info'>
          <div className='portfolioDrawer-info-label'>ROLE:</div>
          <div className='portfolioDrawer-info-text'>
            {this.project.role}
          </div>
        </div>
        <div className='portfolioDrawer-info'>
          <div className='portfolioDrawer-info-label'>TYPE:</div>
          <div className='portfolioDrawer-info-text'>
            {this.project.stackDescription}
          </div>
        </div>
        <div className='portfolioDrawer-info portfolioDrawer-techs'>
          <div className='portfolioDrawer-info-label'>STACK:</div>
          <div className='portfolioDrawer-info-text portfolioDrawer-techs-text'>
            {this.project.techs.map(this.renderTechIcon)}
          </div>
        </div>
        <div className='portfolioDrawer-info portfolioDrawer-description'>
          <div className='portfolioDrawer-info-label'>DESCRIPTION:</div>
          <div
            className='portfolioDrawer-description-text portfolioDrawer-info-text'
            dangerouslySetInnerHTML={{__html: this.project.description}}
          />
        </div>
        <div className='portfolioDrawer-links'>
          {this.project.links ? this.project.links.map(this.renderLink) : null}
        </div>
        {
          this.project.screenshots && this.project.screenshots.length > 0
            ? (
              <div className='portfolioDrawer-screenshots'>
                <div className='portfolioDrawer-info-label'>SCREENSHOTS:</div>
                <div className='portfolioDrawer-screenshots-gallery'>
                  {this.project.screenshots.map((screenshot, index) => this.renderScreenshot(index, screenshot))}
                </div>
              </div>
            )
            : null
        }
      </div>
    );
  }

  render() {
    return (
      <div className='portfolioDrawer' onClick={this.close}>
        <div
          className='portfolioDrawer-modal'
          onClick={this.stopPropagation}
        >
          {this.renderProjectInfo()}
        </div>
        <ImageOverlay
          image={this.state.overlayImage}
          onClose={() => this.setState({overlayImage: null})}
        />
      </div>
    );
  }
}

export default PortfolioDrawer;
