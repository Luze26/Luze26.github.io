import React from 'react';
import { withRouter } from 'react-router-dom';

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;


class BackgroundCanvas extends React.Component {

    expanding = false;
    shrinking = false;
    done = true;
    step = 0;

    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        const listener = this.props.history.listen(
            (location) => {
                if (
                    location.pathname.startsWith('/experiments') &&
                    !this.expanding
                ) {
                    this.expanding = true;
                    this.shrinking = false;
                    if (this.done) {
                        this.done = false;
                        this._expand(0);
                    }
                }
                else if (!this.shrinking) {
                    this.shrinking = true;
                    this.expanding = false;
                    if (this.done) {
                        this.done = false;
                        this._expand(99);
                    }
                }
            }
        );
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.requestId);
    }

    _expand(step = 0) {
        this.requestId = window.requestAnimationFrame(
            () => {
                this.ctx.fillStyle = '#FFF';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                if (!this.shrinking || step > 0) {
                    this.ctx.fillStyle = 'red';
                    this.ctx.fillRect(0, 0, this.canvas.width / (100 - step), this.canvas.height / (100 - step));
                }
                if ((this.expanding && step < 99) || (this.shrinking && step > 0)) {
                    this._expand(step + (this.expanding ? 1 : -1));
                }
                else {
                    this.done = true;
                }
            }
        );
    }

    render() {
        return (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
                <canvas ref='canvas' />
            </div>
        );
    }
}

export default withRouter(BackgroundCanvas);
