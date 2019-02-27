import React from 'react';
import './css/controlsPanel.css';
import './css/controlSlider.css';

class ControlsPanel extends React.PureComponent {

    state = {
        extended: window.innerWidth > 845,
    };

    render() {
        return (
            <div
                className={'controlsPanel-wrapper controlsPanel-wrapper_' + (this.state.extended ? 'extended' : 'collapsed')}
            >
                <div
                    className='controlsPanel-wrapper-handle'
                    onClick={() => this.setState({extended: !this.state.extended})}
                >
                    <i className='ic-tools'/>
                </div>
                <div className='controlsPanel'>
                    <div className='controlsPanel-closeBtn' onClick={() => this.setState({extended: false})}>
                        <i className='ic-x'/>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ControlsPanel;
