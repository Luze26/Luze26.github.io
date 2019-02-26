import React from 'react';
import ControlsPanel from '../../controls/ControlsPanel';
import DlaControls from './DlaControls';
import ColorPickerPanel from '../../controls/colors/ColorPickerPanel';
import ExtendedColorPickerPanel from '../../controls/colors/ExtendedColorPickerPanel';
import NumbersPickerPanel from '../../controls/numbers/NumbersPickerPanel';
import SharePanel from '../../controls/styles/SharePanel';

class DlaControlsPanel extends React.PureComponent {

  state = {
    panelStack: [
      {
        id: 'DEFAULT',
        props: null,
      },
    ],
  };

  navigation = ((ref) => ({
    navigateTo: (id, props) => {
      const panelStack = ref.state.panelStack.slice();
      panelStack.push({id, props});
      ref.setState({panelStack});
    },
    goBack: () => {
      if (ref.state.panelStack.length > 1) {
        ref.setState({panelStack: ref.state.panelStack.slice(0, ref.state.panelStack.length - 1)});
      }
    },
  }))(this);

  renderPanelContent(id, props) {
    let Component;
    switch (id) {
      case 'DEFAULT':
        Component = DlaControls;
        props = this.props;
        break;
      case 'COLOR_PICKER':
        Component = ColorPickerPanel;
        break;
      case 'EXTENDED_COLOR_PICKER':
        Component = ExtendedColorPickerPanel;
        break;
      case 'NUMBERS_PICKER':
        Component = NumbersPickerPanel;
        break;
      case 'SHARE_PANEL':
        Component = SharePanel;
        break;
      default:
        Component = null;
    }
    return Component !== null ? <Component navigation={this.navigation} {...props}/> : null;
  }

  renderPanel = (panel, index) => (
    <div key={index} className='lab-controlsPanel-inner'>
      {this.renderPanelContent(panel.id, panel.props)}
    </div>
  );

  render() {
    return (
      <ControlsPanel>
        {this.state.panelStack.map(this.renderPanel)}
      </ControlsPanel>
    );
  }
}

export default DlaControlsPanel;