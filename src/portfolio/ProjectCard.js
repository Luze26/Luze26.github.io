import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import './css/projectCard.css';
import TechIcon from './TechIcon';

class ProjectCard extends React.Component {

  onClick = () => this.props.history.push('/projects/' + this.props.project.id);

  renderTechIcon = (tech) => <TechIcon key={tech} name={tech}/>;

  render() {
    return (
      <Link to={'/projects/' + this.props.project.id}>
        <div className={'projectCard projectCard_' + this.props.project.id} onClick={this.onClick}>
          <div className='projectCard-inner'>
            <div className='projectCard-img-wrapper'>
              <img className='projectCard-img' src={this.props.project.image} alt={this.props.project.name}/>
            </div>
            <div className='projectCard-body'>
              <h3 className='projectCard-title'>{this.props.project.name}</h3>
              <div className='projectCard-date'>{this.props.project.date}</div>
              <div className='projectCard-type'>
                <div className='projectCard-subTitle'>TYPE:</div>
                <div className='projectCard-label'>{this.props.project.shortDescription}</div>
              </div>
              <div className='projectCard-techs'>
                <div className='projectCard-subTitle'>TECH:</div>
                <div>{this.props.project.techs.map(this.renderTechIcon)}</div>
              </div>
            </div>
          </div>
          <div className='projectCard-overlay'>
            <div className='projectCard-role'>
              <div className='projectCard-subTitle'>ROLE:</div>
              <div className='projectCard-label'>{this.props.project.role}</div>
            </div>
            <div className='projectCard-subTitle'>DESCRIPTION:</div>
            <div className='projectCard-text'>
              {this.props.project.description}
            </div>
            <div className='projectCard-overlay-footer'>
              <button className='portfolio-btn'>
                SEE MORE
                <i className='i-arrow-right1'/>
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default withRouter(ProjectCard);