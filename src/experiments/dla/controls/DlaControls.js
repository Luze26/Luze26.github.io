import React from 'react';
import ControlsPanel from '../../controls/ControlsPanel';
import ControlsActions from '../../controls/ControlsActions';
import ControlsTabs from '../../controls/ControlsTabs';
import DlaColorControls from './DlaColorControls';
import DlaSettingsControls from './DlaSettingsControls';
import DlaInfo from './DlaInfo';
import ControlsPanelTitle from '../../controls/ControlsPanelTitle';
import StylesSelector from '../../controls/styles/StylesSelector';
import DlaConfig from '../models/DlaConfig';

class DlaControls extends React.PureComponent {
  static TABS = [
    {
      id: 'COLORS',
      title: 'Colors',
      iconName: 'ic-paint-palette',
    },
    {
      id: 'SETTINGS',
      title: 'Settings',
      iconName: 'ic-settings',
    },
    {
      id: 'STYLES',
      title: 'Styles',
      iconName: 'ic-picture-frame',
    },
    {
      id: 'INFO',
      title: 'Info',
      iconName: 'ic-book',
    },
  ];

  storedStyles = [];

  state = {
    tabSelectedId: DlaControls.TABS[0].id,
    config: this.props.originalConfig,
    styles: [],
  };

  componentWillMount() {
    let styles = DlaConfig.defaultStyles;
    try {
      const storedStylesStr = localStorage.getItem('DlaControls-Styles');
      this.storedStyles = JSON.parse(storedStylesStr);
      this.storedStyles = this.storedStyles.map((storedStyle) => DlaConfig.fromJsObject(storedStyle));
      styles = styles.concat(this.storedStyles);
    }
    catch (e) {
      // nothing to do
    }
    this.setState({styles});
  }

  onReset = () => this.setState({config: this.props.originalConfig}, this.onApply);

  onLoadStyle = (config) => {
    this.setState({config});
    this.props.onApply(config);
  };

  onDeleteStyle = (styleName) => {
    const storedIndex = this.storedStyles && this.storedStyles.findIndex((style) => style.name === styleName);
    if (storedIndex > 0) {
      this.storedStyles.splice(storedIndex, 1);
      try {
        localStorage.setItem('DlaControls-Styles', JSON.stringify(this.storedStyles));
      }
      catch (e) {
        //nothing to do
      }
    }
    const index = this.state.styles.findIndex((style) => style.name === styleName);
    if (index > 0) {
      const newStyles = this.state.styles.slice();
      newStyles.splice(index, 1);
      this.setState({styles: newStyles});
    }
  };

  onSaveStyle = (styleName) => {
    const config = this.state.config.copy({name: styleName});
    const newStyles = this.state.styles.slice();
    newStyles.push(config);
    if (this.storedStyles == null) {
      this.storedStyles = [];
    }
    this.storedStyles.push(config);
    try {
      localStorage.setItem('DlaControls-Styles', JSON.stringify(this.storedStyles));
    }
    catch (e) {
      console.error(e);
    }
    this.setState({config, styles: newStyles});
  };

  onApply = () => this.onLoadStyle(this.state.config);

  onChanges = (changes) => this.setState({config: this.state.config.copy(changes)});

  onTabChange = (tabSelectedId) => this.setState({tabSelectedId});

  renderControls() {
    let controls;
    switch (this.state.tabSelectedId) {
      case 'COLORS':
        controls = (
          <DlaColorControls
            config={this.state.config}
            onChange={this.onChanges}
            navigation={this.props.navigation}
          />
        );
        break;
      case 'SETTINGS':
        controls = (
          <DlaSettingsControls
            config={this.state.config}
            onChange={this.onChanges}
            navigation={this.props.navigation}
          />
        );
        break;
      case 'STYLES':
        controls = (
          <StylesSelector
            config={this.state.config}
            styles={this.state.styles}
            defaultStylesNames={DlaConfig.defaultStylesNames}
            selectedStyleName={this.state.config.name}
            onLoad={this.onLoadStyle}
            onSave={this.onSaveStyle}
            onDelete={this.onDeleteStyle}
            navigation={this.props.navigation}
          />
        );
        break;
      case 'INFO':
        controls = <DlaInfo/>;
        break;
      default:
        controls = null;
    }
    return controls;
  }

  render() {
    return (
      <ControlsPanel>
        <ControlsPanelTitle
          sketchState={this.props.sketchState}
          onPause={this.props.onPause}
          onResume={this.props.onResume}
        />
        <ControlsTabs
          tabs={DlaControls.TABS}
          tabSelectedId={this.state.tabSelectedId}
          onChange={this.onTabChange}
        />
        {this.renderControls()}
        {
          this.state.tabSelectedId !== 'INFO' && this.state.tabSelectedId !== 'STYLES'
            ? (
            <ControlsActions
              onReset={this.onReset}
              onApply={this.onApply}
            />
          )
            : null
        }
      </ControlsPanel>
    );
  }
}

export default DlaControls;