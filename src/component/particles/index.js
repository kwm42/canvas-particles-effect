import React, { Component } from 'react';
import { Button, Input, message, Select, Radio, InputNumber, Slider } from 'antd';
import styles from './index.module.scss';
import strategy from './Strategy';

const { Option } = Select;
let requestId = null;

class Particles extends Component {
    constructor() {
        super();
        this.state = {
            particles: [],
            step: 10,
            ctx: null,
            backgroundColor: {
                r: 255,
                g: 255,
                b: 255,
                a: 255
            },
            layoutStrategy: null,
            moveStrategy: null,
            randomDelay: true,
            sizeRate: 80,
            fontSize: 256
        }
    }

    componentDidMount(){
        let canvas = this.refs.canvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.setState({
            ctx: canvas.getContext('2d'),
            layoutStrategy: strategy.layoutStrategies[0].value,
            moveStrategy: strategy.moveStrategies[0].value
        })
    }

    render() {
        const animateButton = (
            <Button onClick={ () => this.show() }>draw</Button>
        );

        const moveOptions = strategy.moveStrategies.map((item, index) => {
            return <Option key={index} value={item.id}>{ item.name }</Option>
        });
        const layoutOptions = strategy.layoutStrategies.map((item, index) => {
            return <Option key={index} value={item.id}>{ item.name }</Option>
        });

        return (
            <div className={styles.container}>
                <div className={styles.operation}>
                    <Input addonBefore="write something" addonAfter={animateButton} ref="input"></Input>
                </div>
                <div>
                    <Select defaultValue="0" onChange={ (value) => this.moveStrategyChange(value) }>
                        { moveOptions }
                    </Select>
                    <Select defaultValue="0" onChange={ (value) => this.layoutStrategyChange(value) }>
                        { layoutOptions }
                    </Select>
                    随机延迟
                    <Radio.Group defaultValue={true} onChange={ (e) => this.setState({randomDelay: e.target.value}) }>
                        <Radio value={true}>√</Radio>
                        <Radio value={false}>×</Radio>
                    </Radio.Group>
                    间隔：
                    <InputNumber defaultValue={this.state.step} onChange={(value) => this.changeStep(value)}></InputNumber>
                    <br/>
                    粒子大小：
                    <Slider defaultValue={this.state.sizeRate} onChange={(value) => this.changeSizeRate(value)}></Slider>
                    字体大小：
                    <Slider defaultValue={this.state.fontSize} max={512} onChange={(value) => this.changeFontSize(value)}></Slider>
                </div>
                <canvas ref="canvas"></canvas>
            </div>
        )
    }

    changeStep(value){
        this.setState({
            step: value
        });
    }

    changeSizeRate(value){
        this.setState({
            sizeRate: value
        });
    }

    changeFontSize(value){
        this.setState({
            fontSize: value
        });
    }

    moveStrategyChange(id){
        let newStrategy = strategy.moveStrategies.find(s => {
            return s.id === id;
        });
        this.setState({
            moveStrategy: newStrategy.value
        })
    }

    layoutStrategyChange(id){
        
        let newStrategy = strategy.layoutStrategies.find(s => {
            console.log(s)
            return s.id === id;
        });
        this.setState({
            layoutStrategy: newStrategy.value
        })
    }

    drawOriginText(text) {
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d');
        if(!ctx) return;
        let {r, g, b, a} = this.state.backgroundColor;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `bolder ${this.state.fontSize}px serif`;
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        ctx.fillStyle = gradient;
        ctx.fillText(text, 50, 300);
        ctx.fill();
    }

    getParticles() {
        let newParticles = [], { ctx, step } = this.state, canvas = this.refs.canvas;
        let { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < canvas.height; i += step) {
            for (var j = 0; j < canvas.width; j += step) {
                let k = (4 * canvas.width) * i + (4 * j);
                let { r, g, b, a } = {
                    r: data[k],
                    g: data[k + 1],
                    b: data[k + 2],
                    a: data[k + 3]
                }
                if (!this.isBackgroundColor(r, g, b, a)) {
                    newParticles.push({
                        targetX: j,
                        targetY: i,
                        style: `rgba(${r}, ${g}, ${b}, ${a})`,
                        delay: this.state.randomDelay ? Math.random() * 50 + 50 : 50,
                        // retuen {x, y} stands for the start position
                        ...this.state.layoutStrategy(canvas.width, canvas.height)
                    });
                }
            }
        }
        this.setState({
            particles: newParticles
        })
    }

    isBackgroundColor(r, g, b, a) {
        let { backgroundColor } = this.state;
        return backgroundColor.r === r &&
            backgroundColor.g === g &&
            backgroundColor.b === b &&
            backgroundColor.a === a;
    }

    drawParticles() {
        let { ctx, particles, step, sizeRate } = this.state, canvas = this.refs.canvas;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            this.state.moveStrategy(p);
            ctx.beginPath();
            ctx.fillStyle = p.style;
            let radius = step * sizeRate / 100 / 2;
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        });
    }

    show() {
        // if not, the animation speed will be more and more quick
        if(requestId){
            cancelAnimationFrame(requestId);
        }
        let text = this.refs.input.state.value;
        if(!text){
            message.info('you have not enter anything yet i_i');
            return;
        }
        this.drawOriginText(text);
        this.getParticles();
        // drawParticles();
        this.animate();
    }

    animate(){
        this.drawParticles();
        requestId = requestAnimationFrame(this.animate.bind(this));
    }
}

export default Particles;