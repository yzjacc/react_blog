# "This" is For JavaScript

## What is this?

 先提前说明一个观点，实际上，**this既不指向函数自身，也不止像函数的词法作用域** ,此外还有一个重点:**this跟函数在哪里定义无关，决定this的是函数在哪里调用**，它是一种在函数调用时发生的绑定。

## this的绑定规则

> this的四种绑定规则分别为:默认绑定、隐式绑定、显式绑定、new绑定。
>
> 他们中的优先级为 new绑定 > 显式绑定 > 阴式绑定 > 默认绑定

### 默认绑定

即当没有任何其他绑定规则时默认会生效的规则。最常使用的是当函数被单独定义以及调用时，它默认绑定全局变量

```javascript
function fun() {
    console.log( this.x );
}
var x = '我是一个全局变量';
fun(); //‘我是一个全局变量’ this此时指向window
```

但我们需要注意，当我们在**严格模式**下时，全局对象是无法用默认绑定的，会抛出错误

```javascript
function fun() {
    "use strict";
    console.log( this.x );
}
var x = '我是严格模式下的全局变量';

fun(); //Uncaught TypeError:Cannot read property 'x' of underfined
```

### 隐式绑定

如果函数的调用是在某个对象上触发，那么这个调用位置存在一个上下文对象来绑定this。

```javascript
function fun() {
    console.log( this.a );
}
var a = '我是一个全局变量';

var obj = {
    a: '我是obj对象的a属性',
    fun: fun
};

obj.fun(); //'我是obj对象的a属性'
```

这里obj对象内的fun函数被当做引用属性，当调用它时实际上的流程为：

> 通过obj对象会去到fun 属性 --> 根据引用关系找到 fun 函数 --> 调用fun函数

所以在此时调用fun函数是，this 被隐式绑定到了obj上下文上，此时的 this.a 也就被解析为了 obj.a。

##### 多层调用

有时我们调用一个函数时会使用多层调用的情况，此时我们通过分析一个实际的例子来演示

```javascript
function fun() {
    console.log( this.a );
}

var a = '我是全局变量!';
var obj1 = {
    a: '我是obj1的属性a',
    fun: fun
};
var obj2 = {
    a: '我是obj2的属性a',
    obj1:obj1
}

obj2.obj1.fun(); // '我是obj1的属性a'
```

此时这个函数的调用过程为:

> 访问obj2.obj1 --> 通过引用获取 obj1对象 --> 访问obj1.fun --> 引用获取fun函数 --> 调用fun函数

此时隐式绑定实际上只是获取**最后一层调用的上下文对象**，把this绑定上去。

#### 隐式丢失

##### 函数别名

我们可能会在日常开发中有这样的场景

```javascript
function fun() {
    console.log( this.a );
}

var a = '我是全局变量';

var obj = {
    a: '我是obj对象的a属性',
    fun: fun
};
//此时再赋予这个函数一个别名
var bar = obj.fun;
bar(); //'我是全局变量'
```

结果并不是'我是obj对象的a属性'，这是因为obj.fun 本质上是引用属性，所以下面两行本质上是没有区别的

> var bar = obj.fun;
>
> var bar = fun

所以调用时本质上是 bar 找到了 fun函数本身，进行调用时是在全局环境下调用的，所以不会输出obj内定义的属性，所以此时就是**默认绑定**

##### 回调函数

当我们使用回调函数时也会存在隐式绑定丢失的情况

```javascript
function fun() {
    console.log( this.a );
}

var a = '我是全局变量';

var obj = {
    a: '我是obj的属性a',
    fun: fun
};

setTimeout( obj.fun, 1000); //我是全局变量
```

发证这个结果的原因也是同样的道理，传入 setTimeout的obj.fun 是引用属性， 所以调用顺序为:

> setTimeout --> 获取obj.fun属性 --> 通过引用属性的到fun函数 --> 调用执行fun函数。

所以在调用执行的时候并没有在obj的上下文中，所以仍为**默认绑定**。

### 显式绑定

相较于隐式绑定而言，我们有时需要手动来为函数调用指明函数执行的上下文，此时据需要使用显式绑定

显式绑定主要是使用三个方法 **call,apply以及bind**方法来实现，这部分内容我在另一篇文章中有详细解析

[Call,Apply与Bind的兄弟密谈](https://juejin.im/post/5c13b37de51d4571a1577527)

### new 绑定

当我们使用new 来修饰并调用函数时，他会先查看这个函数是否有其他的返回对象，如果没有就自动返回自己作为一个新对象。

```javascript
function fun(a) {
    this.a = a;
    console.log( this.a );
}
var a = '我是全局变量';

var fun1 = new fun('我是fun1的参数');
var fun2 = new fun('我是fun2的参数');

console.log(fun1.a,fun2.a); // '我是fun1的参数'，'我是fun2的参数'
```

因为当我们使用new时他会生成一个全新的对象来绑定this。

### 箭头函数

箭头函数作为ES6提出的新概念，它是一种对之前this复杂操作的一种极好的解决方案，他的this绑定取决于外层(函数或者全局)作用域。

注意，是**只**取决于外层作用域,也就是我们对箭头函数使用显示绑定来强制修改上下文绑定也是无效的。





### 参考

《你不知道的JavaScript(上卷)》——Kyle Simpson 著

《ES6标准入门(第三版)》 —— 阮一峰 著























