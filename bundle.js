!function(t){var i={};function s(e){if(i[e])return i[e].exports;var o=i[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=i,s.d=function(t,i,e){s.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:e})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,i){if(1&i&&(t=s(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(s.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var o in t)s.d(e,o,function(i){return t[i]}.bind(null,o));return e},s.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(i,"a",i),i},s.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},s.p="",s(s.s=1)}([function(t,i,s){"use strict";s.r(i),s.d(i,"Dino",function(){return o});let{NeuralNetwork:e}=s(2);class o{constructor(t,i,s,o,n){this.brain=n?n.copy():new e(2,10,1),this.i=o,this.x=t,this.y=s.height/2-i,this.y_limit=s.height/2-i,this.width=i,this.height=i,this.v=0,this.g=1.4,this.score=0,this.died=!1,this.pos=[849,938,982],this.posvalue=0,this.fitness=0}static constrain(t,i,s){return t=t<i?i:t>s?s:t}show(t){t.drawImage(this.i,this.pos[this.posvalue],4,44,44,this.x,this.y,this.width,this.height)}jump(){this.y==this.y_limit&&(this.v=-22),this.posvalue=0}mutate(t){this.brain.mutate(i=>i*t)}move(t,i){this.y+=this.v,this.v+=this.g,this.y=o.constrain(this.y,0,this.y_limit),this.score++,this.y==this.y_limit&&(this.posvalue++,this.posvalue==this.pos.length&&(this.posvalue=0)),this.brain.predict([t,i])[0]>.5&&this.jump()}}},function(t,i,s){let{Dino:e}=s(0),{Block:o}=s(4),{nextGeneration:n}=s(5),h=document.querySelector("canvas"),r=h.getContext("2d"),a=1,l=document.querySelector(".gen"),u=!1,c=!1;const d="white";let f,p=2,w=1e3,m=new Image;m.src="dino.png",m.onload=()=>{u=!0};let g=[];for(let t=0;t<50;t++)g.push(new e(40,50,h,m));let _=[],y=[],b=[30,25],v=[100,75],x=b[Math.floor(Math.random()*b.length)],M=v[Math.floor(Math.random()*v.length)];function A(){c||(c=!0),0==g.length&&(f=Date.now(),w=1e3,(y=[]).push(new o(700*Math.random()+600,x,M,h,m)),g=n(_,h,m),a++,_=[],console.log(g.length))}y.push(new o(700*Math.random()+600,x,M,h,m));setInterval(()=>(function(){if(l.innerText=a,0!=g.length&&u&&c){A(),Math.random()<.1&&h.width-y[y.length-1].x>w&&(x=b[Math.floor(Math.random()*b.length)],M=v[Math.floor(Math.random()*v.length)],y.push(new o(800,x,M,h,m))),y.length>5&&y.splice(0,1),r.fillStyle=d,r.fillRect(0,0,h.width,h.height),r.drawImage(m,p,54,281,10,0,h.height/2-4,h.width,7);for(let t of g)t.show(r);for(let t of g)for(let i of y)if(i.x>t.x){t.move(i.x,i.height);break}for(let t of y){t.show(r),t.move();for(let i=0;i<g.length;i++)t.strike(g[i]),g[i].died&&(_.unshift(g[i]),g.splice(i,1))}(p+=3.7)+281>1195&&(p=2),Date.now()-f>3e3&&(t=w-=10,s=1e3,w=t=t<(i=500)?i:t>s?s:t,f=Date.now())}else 0==g.length?(r.fillStyle=d,r.fillRect(0,0,h.width,h.height),r.drawImage(m,654,14,192,12,100,h.height/2-15,h.width-200,30),A()):c||(g[0].show(r),r.drawImage(m,2,58,281,7,0,h.height/2,h.width,7),A());var t,i,s})(),16)},function(t,i,s){"use strict";s.r(i),s.d(i,"NeuralNetwork",function(){return h});let{Matrix:e}=s(3);class o{constructor(t,i){this.func=t,this.dfunc=i}}let n=new o(t=>1/(1+Math.exp(-t)),t=>t*(1-t));new o(t=>Math.tanh(t),t=>1-t*t);class h{constructor(t,i,s){if(t instanceof h){let i=t;this.input_nodes=i.input_nodes,this.hidden_nodes=i.hidden_nodes,this.output_nodes=i.output_nodes,this.weights_ih=i.weights_ih.copy(),this.weights_ho=i.weights_ho.copy(),this.bias_h=i.bias_h.copy(),this.bias_o=i.bias_o.copy()}else this.input_nodes=t,this.hidden_nodes=i,this.output_nodes=s,this.weights_ih=new e(this.hidden_nodes,this.input_nodes),this.weights_ho=new e(this.output_nodes,this.hidden_nodes),this.weights_ih.randomize(),this.weights_ho.randomize(),this.bias_h=new e(this.hidden_nodes,1),this.bias_o=new e(this.output_nodes,1),this.bias_h.randomize(),this.bias_o.randomize();this.setLearningRate(),this.setActivationFunction()}predict(t){let i=e.fromArray(t),s=e.multiply(this.weights_ih,i);s.add(this.bias_h),s.map(this.activation_function.func);let o=e.multiply(this.weights_ho,s);return o.add(this.bias_o),o.map(this.activation_function.func),o.toArray()}setLearningRate(t=.1){this.learning_rate=t}setActivationFunction(t=n){this.activation_function=t}train(t,i){let s=e.fromArray(t),o=e.multiply(this.weights_ih,s);o.add(this.bias_h),o.map(this.activation_function.func);let n=e.multiply(this.weights_ho,o);n.add(this.bias_o),n.map(this.activation_function.func);let h=e.fromArray(i),r=e.subtract(h,n),a=e.map(n,this.activation_function.dfunc);a.multiply(r),a.multiply(this.learning_rate);let l=e.transpose(o),u=e.multiply(a,l);this.weights_ho.add(u),this.bias_o.add(a);let c=e.transpose(this.weights_ho),d=e.multiply(c,r),f=e.map(o,this.activation_function.dfunc);f.multiply(d),f.multiply(this.learning_rate);let p=e.transpose(s),w=e.multiply(f,p);this.weights_ih.add(w),this.bias_h.add(f)}serialize(){return JSON.stringify(this)}static deserialize(t){"string"==typeof t&&(t=JSON.parse(t));let i=new h(t.input_nodes,t.hidden_nodes,t.output_nodes);return i.weights_ih=e.deserialize(t.weights_ih),i.weights_ho=e.deserialize(t.weights_ho),i.bias_h=e.deserialize(t.bias_h),i.bias_o=e.deserialize(t.bias_o),i.learning_rate=t.learning_rate,i}copy(){return new h(this)}mutate(t){this.weights_ih.map(t),this.weights_ho.map(t),this.bias_h.map(t),this.bias_o.map(t)}}},function(t,i,s){"use strict";s.r(i),s.d(i,"Matrix",function(){return e});class e{constructor(t,i){this.rows=t,this.cols=i,this.data=Array(this.rows).fill().map(()=>Array(this.cols).fill(0))}static fromArray(t){return new e(t.length,1).map((i,s)=>t[s])}static subtract(t,i){if(t.rows===i.rows&&t.cols===i.cols)return new e(t.rows,t.cols).map((s,e,o)=>t.data[e][o]-i.data[e][o]);console.log("Columns and Rows of A must match Columns and Rows of B.")}toArray(){let t=[];for(let i=0;i<this.rows;i++)for(let s=0;s<this.cols;s++)t.push(this.data[i][s]);return t}randomize(){return this.map(t=>2*Math.random()-1)}add(t){return t instanceof e?this.rows!==t.rows||this.cols!==t.cols?void console.log("Columns and Rows of A must match Columns and Rows of B."):this.map((i,s,e)=>i+t.data[s][e]):this.map(i=>i+t)}static add(t,i){if(t.rows===i.rows&&t.cols===i.cols)return new e(t.rows,t.cols).map((s,e,o)=>t.data[e][o]+i.data[e][o]);console.log("Columns and Rows of A must match Columns and Rows of B.")}static transpose(t){return new e(t.cols,t.rows).map((i,s,e)=>t.data[e][s])}static multiply(t,i){if(t.cols===i.rows)return new e(t.rows,i.cols).map((s,e,o)=>{let n=0;for(let s=0;s<t.cols;s++)n+=t.data[e][s]*i.data[s][o];return n});console.log("Columns of A must match rows of B.")}multiply(t){return t instanceof e?this.rows!==t.rows||this.cols!==t.cols?void console.log("Columns and Rows of A must match Columns and Rows of B."):this.map((i,s,e)=>i*t.data[s][e]):this.map(i=>i*t)}map(t){for(let i=0;i<this.rows;i++)for(let s=0;s<this.cols;s++){let e=this.data[i][s];this.data[i][s]=t(e,i,s)}return this}static map(t,i){return new e(t.rows,t.cols).map((s,e,o)=>i(t.data[e][o],e,o))}print(){return console.table(this.data),this}serialize(){return JSON.stringify(this)}static deserialize(t){"string"==typeof t&&(t=JSON.parse(t));let i=new e(t.rows,t.cols);return i.data=t.data,i}copy(){let t=new e(this.rows,this.cols);for(let i=0;i<this.rows;i++)for(let s=0;s<this.cols;s++)t.data[i][s]=this.data[i][s];return t}}},function(t,i,s){"use strict";s.r(i),s.d(i,"Block",function(){return e});class e{constructor(t,i,s,e,o){this.i=o,this.x=t,this.width=i,this.height=s,this.y=e.height/2-this.height}show(t){t.drawImage(this.i,458,2,26,48,this.x,this.y,this.width,this.height)}move(){this.x-=11}strike(t){t.x+t.width>this.x&&t.x<this.x+this.width&&t.y+t.height>this.y&&(t.died=!0)}}},function(t,i,s){"use strict";s.r(i),s.d(i,"nextGeneration",function(){return o});let{Dino:e}=s(0);function o(t,i,s){let e=t.length,o=[];!function(t){let i=0;for(let s of t)i+=s.score;for(let s of t)s.fitness=s.score/i}(t);for(let h=0;h<e;h++)o.push(n(t,i,s));return o}function n(t,i,s){let o=0,n=Math.random(1);for(;n>0;)n-=t[o].fitness,o++;let h=t[--o],r=new e(40,50,i,s,h.brain);return r.mutate(.1),r}}]);
