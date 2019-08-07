(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{107:function(t,e,a){t.exports=a(182)},112:function(t,e,a){},181:function(t,e,a){},182:function(t,e,a){"use strict";a.r(e);var n=a(1),r=a.n(n),i=a(7),o=a.n(i),l=(a(112),a(105)),c=a(94),u=a(95),s=a(103),h=a(96),d=a(104),g=a(185),f=a(59),m=a(186),v=a(187),y=a(188),S=a(184),p=a(189),w=a(75),k=a.n(w),b=a(36),x=a.n(b),C=g.a.Option,E=null,M=function(t){function e(){var t;return Object(c.a)(this,e),(t=Object(s.a)(this,Object(h.a)(e).call(this))).state={particles:[],step:10,ctx:null,backgroundColor:{r:255,g:255,b:255,a:255},layoutStrategy:null,moveStrategy:null,randomDelay:!0,sizeRate:80,fontSize:256},t}return Object(d.a)(e,t),Object(u.a)(e,[{key:"componentDidMount",value:function(){var t=this.refs.canvas;t.width=window.innerWidth,t.height=window.innerHeight,this.setState({ctx:t.getContext("2d"),layoutStrategy:x.a.layoutStrategies[0].value,moveStrategy:x.a.moveStrategies[0].value})}},{key:"render",value:function(){var t=this,e=r.a.createElement(f.a,{onClick:function(){return t.show()}},"draw"),a=x.a.moveStrategies.map(function(t,e){return r.a.createElement(C,{key:e,value:t.id},t.name)}),n=x.a.layoutStrategies.map(function(t,e){return r.a.createElement(C,{key:e,value:t.id},t.name)});return r.a.createElement("div",{className:k.a.container},r.a.createElement("div",{className:k.a.operation},r.a.createElement(m.a,{addonBefore:"write something",addonAfter:e,ref:"input"})),r.a.createElement("div",null,r.a.createElement(g.a,{defaultValue:"0",onChange:function(e){return t.moveStrategyChange(e)}},a),r.a.createElement(g.a,{defaultValue:"0",onChange:function(e){return t.layoutStrategyChange(e)}},n),"\u968f\u673a\u5ef6\u8fdf",r.a.createElement(v.a.Group,{defaultValue:!0,onChange:function(e){return t.setState({randomDelay:e.target.value})}},r.a.createElement(v.a,{value:!0},"\u221a"),r.a.createElement(v.a,{value:!1},"\xd7")),"\u95f4\u9694\uff1a",r.a.createElement(y.a,{defaultValue:this.state.step,onChange:function(e){return t.changeStep(e)}}),r.a.createElement("br",null),"\u7c92\u5b50\u5927\u5c0f\uff1a",r.a.createElement(S.a,{defaultValue:this.state.sizeRate,onChange:function(e){return t.changeSizeRate(e)}}),"\u5b57\u4f53\u5927\u5c0f\uff1a",r.a.createElement(S.a,{defaultValue:this.state.fontSize,max:512,onChange:function(e){return t.changeFontSize(e)}})),r.a.createElement("canvas",{ref:"canvas"}))}},{key:"changeStep",value:function(t){this.setState({step:t})}},{key:"changeSizeRate",value:function(t){this.setState({sizeRate:t})}},{key:"changeFontSize",value:function(t){this.setState({fontSize:t})}},{key:"moveStrategyChange",value:function(t){var e=x.a.moveStrategies.find(function(e){return e.id===t});this.setState({moveStrategy:e.value})}},{key:"layoutStrategyChange",value:function(t){var e=x.a.layoutStrategies.find(function(e){return console.log(e),e.id===t});this.setState({layoutStrategy:e.value})}},{key:"drawOriginText",value:function(t){var e=this.refs.canvas,a=e.getContext("2d");if(a){var n=this.state.backgroundColor,r=n.r,i=n.g,o=n.b,l=n.a;a.fillStyle="rgba(".concat(r,", ").concat(i,", ").concat(o,", ").concat(l,")"),a.fillRect(0,0,e.width,e.height),a.font="bolder ".concat(this.state.fontSize,"px serif");var c=a.createLinearGradient(0,0,e.width,0);c.addColorStop("0","magenta"),c.addColorStop("0.5","blue"),c.addColorStop("1.0","red"),a.fillStyle=c,a.fillText(t,50,300),a.fill()}}},{key:"getParticles",value:function(){for(var t=[],e=this.state,a=e.ctx,n=e.step,r=this.refs.canvas,i=a.getImageData(0,0,r.width,r.height).data,o=0;o<r.height;o+=n)for(var c=0;c<r.width;c+=n){var u=4*r.width*o+4*c,s={r:i[u],g:i[u+1],b:i[u+2],a:i[u+3]},h=s.r,d=s.g,g=s.b,f=s.a;this.isBackgroundColor(h,d,g,f)||t.push(Object(l.a)({targetX:c,targetY:o,style:"rgba(".concat(h,", ").concat(d,", ").concat(g,", ").concat(f,")"),delay:this.state.randomDelay?50*Math.random()+50:50},this.state.layoutStrategy(r.width,r.height)))}this.setState({particles:t})}},{key:"isBackgroundColor",value:function(t,e,a,n){var r=this.state.backgroundColor;return r.r===t&&r.g===e&&r.b===a&&r.a===n}},{key:"drawParticles",value:function(){var t=this,e=this.state,a=e.ctx,n=e.particles,r=e.step,i=e.sizeRate,o=this.refs.canvas;a.clearRect(0,0,o.width,o.height),n.forEach(function(e){t.state.moveStrategy(e),a.beginPath(),a.fillStyle=e.style;var n=r*i/100/2;a.arc(e.x,e.y,n,0,2*Math.PI),a.fill(),a.closePath()})}},{key:"show",value:function(){E&&cancelAnimationFrame(E);var t=this.refs.input.state.value;t?(this.drawOriginText(t),this.getParticles(),this.animate()):p.a.info("you have not enter anything yet i_i")}},{key:"animate",value:function(){this.drawParticles(),E=requestAnimationFrame(this.animate.bind(this))}}]),e}(n.Component);a(181);var z=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(M,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},36:function(t,e){t.exports={moveStrategies:[{id:"0",name:"linearMove",value:function(t){t.delay>0?--t.delay:(t.x+=.02*(t.targetX-t.x),t.y+=.02*(t.targetY-t.y))}},{id:"1",name:"randomMove",value:function(t){if(t.delay>0)--t.delay;else{var e=t.targetX-t.x,a=t.targetY-t.y,n=.99*Math.sqrt(e*e+a*a);t.x=t.targetX+Math.sin(2*Math.random()*Math.PI)*n,t.y=t.targetY+Math.cos(2*Math.random()*Math.PI)*n}}}],layoutStrategies:[{id:"0",name:"pointLayout",value:function(t,e){return{x:0,y:0}}},{id:"1",name:"randomLayout",value:function(t,e){return{x:Math.random()*t,y:Math.random()*e}}},{id:"2",name:"aroundLayout",value:function(t,e){var a=Math.random()>.5;return{x:a?Math.random()>.5?5:t-20:Math.random()*t,y:a?Math.random()*e:Math.random()>.5?5:e-20}}}]}},75:function(t,e,a){t.exports={container:"particles_container__3PBvW",operation:"particles_operation__33WxJ"}}},[[107,1,2]]]);
//# sourceMappingURL=main.172eef91.chunk.js.map