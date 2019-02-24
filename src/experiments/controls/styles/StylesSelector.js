import React from 'react';
import ControlBtn from '../ControlBtn';
import ControlBlock from '../ControlBlock';

class StylesSelector extends React.Component {

  state = {
    selectedStyleName: this.props.selectedStyleName,
    name: '',
  };

  onNameChange = (event) => this.setState({name: event.target.value});

  onShare = () => this.props.navigation.navigateTo(
    'SHARE_PANEL',
    {
      title: 'SHARE',
      value: this.props.config,
    },
  );

  onLoad = () => this.props.onLoad(this.props.styles.find((style) => style.name === this.state.selectedStyleName));

  onDelete = () => {
    this.props.onDelete(this.state.selectedStyleName);
    this.setState({selectedStyleName: this.props.styles[0].name});
  };

  onSave = () => {
    const originalName = this.state.name.trim();
    if (originalName !== '') {
      let name = originalName;
      let prefix = 0;
      while (this.props.styles.find((style) => style.name === name)) {
        prefix++;
        name = originalName + '-' + prefix;
      }
      this.setState({name: ''});
      this.props.onSave(name);
    }
  };

  renderOption = (style, index) => (
    <option value={style.name} key={style.name}>
      {style.name}
    </option>
  );

  render() {
    return (
      <div className='stylesSelector'>
        <ControlBtn
          onClick={this.onShare}
          icon='ic-basic_share'
          label='SHARE THE CURRENT STYLE'
        />
        <hr style={{marginBottom: 35}}/>
        <select
          value={this.state.selectedStyleName}
          onChange={(event) => this.setState({selectedStyleName: event.target.value})}
        >
          {this.props.styles.map(this.renderOption)}
        </select>
        <div className='controls-btns' style={{marginTop: 10}}>
          <ControlBtn
            onClick={this.onLoad}
            icon='ic-paint-bucket'
            label='LOAD'
          />
          {
            !this.props.defaultStylesNames.includes(this.state.selectedStyleName)
              ? (
              <ControlBtn
                onClick={this.onDelete}
                icon='ic-trash-can'
                label='DELETE'
              />
            )
              : null
          }
        </div>
        <hr style={{marginBottom: 35}}/>
        <ControlBlock title='Style Name'>
          <input value={this.state.name} onChange={this.onNameChange}/>
          <div className='controls-btns'>
            <ControlBtn
              onClick={this.onSave}
              icon='ic-save'
              label='SAVE AS NEW'
            />
          </div>
        </ControlBlock>
      </div>
    );
  }
}

export default StylesSelector;