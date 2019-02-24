import React from "react";

class TechIcon extends React.PureComponent {

  static getClassNameAndLabel(tech) {
    let className = '';
    let title = '';
    let paths = null;
    switch(tech) {
      case 'android':
        className = 'i-android';
        title = 'Android';
        break;
      case 'ios':
        className = 'i-apple';
        title = 'iOS';
        break;
      case 'react':
        className = 'i-react';
        title = 'React';
        break;
      case 'react-native':
        className = 'i-react';
        title = 'React Native';
        break;
      case 'js':
        className = 'i-js';
        title = 'JavaScript';
        break;
      case 'java':
        className = 'i-java';
        title = 'Java';
        break;
      case 'angular':
        className = 'i-angular';
        title = 'Angular 1';
        break;
      case 'node':
        className = 'i-node';
        title = 'Node.js';
        break;
      case 'html5':
        className = 'i-html5';
        title = 'HTML 5';
        break;
      case 'css3':
        className = 'i-css3';
        title = 'CSS 3';
        break;
      case 'html':
        className = 'i-html5';
        title = 'HTML';
        break;
      case 'css':
        className = 'i-css3';
        title = 'CSS';
        break;
      case 'mongoDB':
        className = 'i-mongoDB';
        title = 'MongoDB';
        break;
      case 'scala':
        className = 'i-scala';
        title = 'Scala';
        break;
      case 'play':
        className = 'i-play';
        title = 'Play Framework';
        break;
      case 'postgreSQL':
        className = 'i-postgreSQL';
        title = 'PostgreSQL';
        break;
      case 'grunt':
        className = 'i-grunt';
        title = 'Grunt';
        break;
      case 'gulp':
        className = 'i-gulp';
        title = 'Gulp';
        break;
      case 'heroku':
        className = 'i-heroku';
        title = 'Heroku';
        break;
      case 'aws':
        className = 'i-aws';
        title = 'AWS';
        break;
      case 'php':
        className = 'i-php';
        title = 'PHP';
        break;
      case 'haskell':
        className = 'i-haskell';
        title = 'Haskell';
        break;
      case 'neo4j':
        className = 'i-neo4j';
        title = 'Neo4j';
        break;
      case 'jQuery':
        className = 'i-jQuery';
        title = 'jQuery';
        break;
      case 'zf':
        className = 'i-zf';
        title = 'Zend Framework';
        break;
      case 'tensorflow':
        className = 'i-tensorflow';
        title = 'TensorFlow';
        paths = ['path1', 'path2', 'path3', 'path4'];
        break;
    }
    return {className, title, paths};
  }

  renderPath = (path) => <span key={path} className={path}/>;

  render() {
    const {paths, ...props} = TechIcon.getClassNameAndLabel(this.props.name);
    return (
      <i {...props}>
        {
          paths
          ? paths.map(this.renderPath)
          : null
        }
      </i>
    );
  }
}

export default TechIcon;