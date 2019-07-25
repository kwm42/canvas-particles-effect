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

这是一个比较核心的函数了，主要功能是把刚刚写在画板上的字通过像素的方式保存下来，可以理解为截屏然后转化成像素的数组，看看 getImageData 这个方法，它可以截取一个矩形区域的像素，接受四个参数，分别是左上角的 x、y 坐标以及右下角的 x、y 坐标，返回的是一个对象，有 data 属性，width 和 height，宽高没什么好说的，data 数组

你可以在 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData) 上查看关于这个函数的具体信息，









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