import React from 'react';
import ControlsActions from '../../controls/ControlsActions';
import ControlsTabs from '../../controls/ControlsTabs';
import ControlsPanelTitle from '../../controls/ControlsPanelTitle';
import PerlinCharsConfig from '../models/PerlinCharsConfig';
import PerlinCharsColorControls from './PerlinCharsColorControls';
import PerlinCharsSettingsControls from './PerlinCharsSettingsControls';
import StylesSelector from '../../controls/styles/StylesSelector';
import PerlinCharsInfo from './PerlinCharsInfo';

class PerlinCharsControls extends React.PureComponent {
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
    tabSelectedId: PerlinCharsControls.TABS[0].id,
    config: this.props.originalConfig,
    styles: [],
  };

  componentWillMount() {
    let styles = PerlinCharsConfig.defaultStyles;
    try {
      const storedStylesStr = localStorage.getItem('PerlinCharsControls-Styles');
      this.storedStyles = JSON.parse(storedStylesStr);
      this.storedStyles = this.storedStyles.map((storedStyle) => PerlinCharsConfig.fromJsObject(storedStyle));
      styles = styles.concat(this.storedStyles);
    }
    catch (e) {
      // nothing to do
    }
    this.setState({ styles });
  }

  onReset = () => this.setState({ config: this.props.originalConfig }, this.onApply);

  onLoadStyle = (config) => {
    this.setState({ config });
    this.props.onApply(config);
  };

  onDeleteStyle = (styleName) => {
    const storedIndex = this.storedStyles && this.storedStyles.findIndex((style) => style.name === styleName);
    if (storedIndex > 0) {
      this.storedStyles.splice(storedIndex, 1);
      try {
        localStorage.setItem('PerlinCharsControls-Styles', JSON.stringify(this.storedStyles));
      }
      catch (e) {
        //nothing to do
      }
    }
    const index = this.state.styles.findIndex((style) => style.name === styleName);
    if (index > 0) {
      const newStyles = this.state.styles.slice();
      newStyles.splice(index, 1);
      this.setState({ styles: newStyles });
    }
  };

  onSaveStyle = (styleName) => {
    const config = this.state.config.copy({ name: styleName });
    const newStyles = this.state.styles.slice();
    newStyles.push(config);
    if (this.storedStyles == null) {
      this.storedStyles = [];
    }
    this.storedStyles.push(config);
    try {
      localStorage.setItem('PerlinCharsControls-Styles', JSON.stringify(this.storedStyles));
    }
    catch (e) {
      console.error(e);
    }
    this.setState({ config, styles: newStyles });
  };

  onApply = () => this.onLoadStyle(this.state.config);

  onChanges = (changes) => this.setState({ config: this.state.config.copy(changes) });

  onTabChange = (tabSelectedId) => this.setState({ tabSelectedId });

  renderControls() {
    let controls;
    switch (this.state.tabSelectedId) {
      case 'COLORS':
        controls = (
          <PerlinCharsColorControls
            config={this.state.config}
            onChange={this.onChanges}
            navigation={this.props.navigation}
          />
        );
        break;
      case 'SETTINGS':
        controls = (
          <PerlinCharsSettingsControls
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
            defaultStylesNames={PerlinCharsConfig.defaultStylesNames}
            selectedStyleName={this.state.config.name}
            onLoad={this.onLoadStyle}
            onSave={this.onSaveStyle}
            onDelete={this.onDeleteStyle}
            navigation={this.props.navigation}
          />
        );
        break;
      case 'INFO':
        controls = <PerlinCharsInfo />;
        break;
      default:
        controls = null;
    }
    return controls;
  }

  render() {
    return (
      <div>
        <ControlsPanelTitle
          sketchState={this.props.sketchState}
          onPause={this.props.onPause}
          onResume={this.props.onResume}
        />
        <ControlsTabs
          tabs={PerlinCharsControls.TABS}
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
      </div>
    );
  }
}

export default PerlinCharsControls;
