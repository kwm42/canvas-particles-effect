19/07/25

使用 canvas 和 react 实现一个粒子动画效果，

先看看效果图

简单说一下实现思路：

首先在 canvas 上画一个你想要的文件或者透明背景的图片，然后利用 canvas 的 getImageData 这个方法获取到对应区域的所有像素点的信息，得到的是像素数组，然后遍历这个数组，把对应的点找出来，不需要全部找出来，只要一部分就好，然后根据这些零散的点绘制到原来的 canvas 上就会出现沙化 的效果，可以设置一下点的大小，然后需要加动画的话就利用 setInternal 或者 requestAnimationFrame 来更新点的位置，就能看出效果了，其中比较重要的就是对原始图像的获取和处理，也就是 getImageData 方法， 后面的就是比较普通的动画了，不过可以设置多种动画的方式。

看看程序的整体过程：

```javascript
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
```

其实主要的就是 if 判断后面的三个函数。

一 drawOriginText

html 的结构很简单，就是上面几个操作按钮，下面一个 canvas 元素，由于是 React 项目，组件这里我用到了 ant-design 。

```html
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
    </div>
    <canvas ref="canvas"></canvas>
</div>
```

然后接着就是初始化 canvas 等等，接着当我们按下 draw 的按钮的时候会先在 canvas 用 fillText 画出原始的文字，代码也很简单，随便看看就好，这里使用了 gradient 因为这样会比较好看（个人 感觉。

```javascript
drawOriginText(text) {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    if(!ctx) return;
    let {r, g, b, a} = this.state.backgroundColor;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bolder 256px serif';
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    ctx.fillStyle = gradient;
    ctx.fillText(text, 50, 300);
    ctx.fill();
}
```

二 getParticles

这是一个比较核心的函数了，主要功能是把刚刚写在画板上的字通过像素的方式保存下来，可以理解为截屏然后转化成像素的数组，看看 getImageData 这个方法，它可以截取一个矩形区域的像素，接受四个参数，分别是左上角的 x、y 坐标以及右下角的 x、y 坐标，返回的是一个对象，有 data 属性，width 和 height，宽高没什么好说的，data 数组是 **data: Uint8ClampedArray(400)**，而其中的每一个都是 number 类型，四个四个为一组，代表了 rgba 的四个值，例如说前四个分别是 「255， 255， 255， 255」就是白色对应的 rgba 的值，它的顺序是从左到右、从上到下的，我们主要就是利用这个函数来判断并且生成我们的粒子

```javascript
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
                    x: 0,
                    y: 0
                });
            }
        }
    }
    this.setState({
        particles: newParticles
    })
}
```

首先通过 **getImageData** 函数获得一块区域的像素值，我这里直接获取了整个 canvas 的数据，然后通过一个逐行逐列的获取像素的值，每次前进 step 个像素，因为画出来的粒子不是全部连在一起的，之间有间隔，所以有一个 step，然后判断一下当前像素值和背景色是否一致，如果不一致就认为是前面画出来的图案，所以说如果是图片的话背景要是透明的，不然就会简单的认为整块图形都是要画的，最后效果就和想象的不太一样了，当认为一个点和背景不一致的时候就加入到粒子数组中， 这样后面我们就会把它绘制到 canvas 上，target 是目标位置也就是粒子对应图案的位置，xy 是起始位置，简单的先设置为原点。

<small>ps: 你可以在 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData) 上查看关于「getImageData」这个函数的具体信息</small>

举个栗子：
在 canvas 上写 "A" 这个字母的时候，获取到的的 imageData 和 生成的 Particles 是这样的：

```

```

三 animate

```javascript
animate(){
    this.drawParticles();
    requestId = requestAnimationFrame(this.animate.bind(this));
}
```

很简单，就是通过 requestAnimationFrame 函数不断的回调重绘，然后在重绘的过程中不断地改变粒子的位置，然后得到的效果就是会动的效果了

绘制 Particles 的函数也比较简单，遍历 Particles 数组，对每个对象执行绘制和更新操作就行了

```javascript
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
```

其中不同的 update 函数会有不同的运动效果。

<details>
<summary>View contents</summary>

* [`ary`](#ary)
* [`call`](#call)
* [`collectInto`](#collectinto)
* [`flip`](#flip)
* [`over`](#over)
* [`overArgs`](#overargs)
* [`pipeAsyncFunctions`](#pipeasyncfunctions)
* [`pipeFunctions`](#pipefunctions)
* [`promisify`](#promisify)
* [`rearg`](#rearg)
* [`spreadOver`](#spreadover)
* [`unary`](#unary)

</details>



我们把不同的更新策略和粒子位置的生成策略放在一个单独的 js 文件中，然后再组件内倒入使用，这样比较好，