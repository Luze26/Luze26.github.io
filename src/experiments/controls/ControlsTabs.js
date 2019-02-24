import React from 'react';
import './css/controlsTabs.css';

class ControlsTabs extends React.PureComponent {

  selectTab(tabId) {
    if (this.props.tabSelectedId !== tabId) {
      this.props.onChange(tabId);
    }
  }

  renderTab = (tab) => (
    <div
      key={tab.id}
      title={tab.title}
      className={'controlsTabs-tab ' + (this.props.tabSelectedId === tab.id ? 'controlsTabs-tab_selected' : 'controlsTabs-tab_unselected')}
      onClick={() => this.selectTab(tab.id)}
    >
      <i className={'controlsTabs-tab-icon ' + tab.iconName}/>
    </div>
  );

  render() {
    return (
      <div className='controlsTabs'>
        {this.props.tabs.map(this.renderTab)}
      </div>
    );
  }
}

export default ControlsTabs;