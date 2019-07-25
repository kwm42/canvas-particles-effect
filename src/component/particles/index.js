import React, { Component } from 'react';

class Particles extends Component {
    constructor() {
        super();
        this.state = {
            particles: [],
            step: 8
        }
    }

    render() {
        return (
            <div>
                <canvas ref="canvas"></canvas>
                <div>
                    <button onClick={ () => this.drawOriginText('hell') }>draw</button>
                </div>
            </div>
        )
    }

    drawOriginText(text) {
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d');
        if(!ctx) return;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'bolder 256px serif';
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // 用渐变填色
        ctx.fillStyle = gradient;
        ctx.fillText(text, 50, 530);
        ctx.fill();
    }
}

export default Particles;