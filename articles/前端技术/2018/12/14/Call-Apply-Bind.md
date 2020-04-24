# Call,Apply与Bind的兄弟密谈

## 三兄弟来源

call,apply,bind 为什么要叫做三兄弟，是因为他们有一个共同的父亲——**Function.prototype**，所以他们都是实例方法，不妨咱们现场"滴血认亲"一下

```javascript
Function.prototype.hasOwnProperty('call'); 
Function.prototype.hasOwnProperty('apply');
Function.prototype.hasOwnProperty('bind');
```



上面三条语句的返回结果都为true，算了有图有真相，上图

[![FUddkF.png](https://s1.ax1x.com/2018/12/14/FUddkF.png)](https://imgchr.com/i/FUddkF)

因此，这三兄弟可以在对象，数组，函数中都可以使用。

## 大哥——Call

call方法，可以指定所用目标函数的this指向，即函数执行时所在的作用域（上下文），并且在指定的作用域调用这个函数，立即执行。

```javascript
var content = {
    number: 2
};

var number = 1;

function func(){
    console.log(this.number);
}
a();  //结果为1
a.call(); //没有传递参数还是默认所在的作用域
a.call(content); //指向content的内部作用域，此时结果为2

```

即，当我们执行a函数时，它指向的是全局对象，所以this指向的也就是全局对象；但当我们帮它指向content对象时，这个函数的执行作用域也就变为了content对象的作用域

### Call 传参

call方法可以传递多个参数，第一个参数即为指定的this的指向，即要提供这个函数要执行所存在的作用域的家伙，后面的参数是函数调用时需要使用的参数，直接用","号分割即可。

>如果 call的第一个参数为null或者undefined或者this，它等同于指向全局对象。

## 二哥——Apply

apply方法身为二哥，自然是和大哥的作用非常相似，他们都是改变this指向来在制定的作用域中调用这个函数，立即执行，唯一的不同可能就是二哥Apply相比较于大哥Call来说它更"挑食"。它只能接收两个参数，第一个参数为this指向的对象，第二个参数为执行时需要的参数，注意，它只要**数组**作为他的第二个参数。

我们让大哥和二哥实现相同的功能来看一下他们的不同

```javascript
function sum(a,b){
    return a + b;
}
sum.call(this,1,2); //结果为3
sum.apply(this,[1,2]); //结果为3
```

所以，当我们要让某个数组来执行某种方法时，使用apply方法相较于call方法能方便很多。比如我们想快速的查找一个数组中的最大值

```javascript
var a = [1,2,3,4,5,7,8,9,45,123,111];
Math.max.apply(this,a); // 123
```



## 三弟——bind

bind方法用于指定函数内部的this指向，然后返回一个**新函数**，但它不会立即执行，它只是给这个函数增加了修饰，并没有调用它。

```javascript
var content = {
    number: 2
};

function func(){
    console.log(this.number);
}

//call方法
func.call(content); // 2
//apply方法
func.apply(content); //2
//bind方法
func.bind(content)(); //2
```

bind的参数要求和大哥一样，即为一个一个的传参.

> call 和 apply 方法在调用后会立即执行，而bind则是把作用域修改后的函数返回，需要自己再次手动调用。

## 三兄弟异同

从上面的例子我们可以看到三兄弟十分相似，但也各有千秋。

同:

- 都用来改变函数的this指向，即作用域。
- 第一个参数都是用来指定函数内部的this。
- 都可以在函数调用的时候传递原函数所需要的参数。

异:

- call 和 apply 调用后立即执行，而bind则是把新函数返回，需要再次调用。
- call 和 bind 传递参数是直接传入，也就是一个一个的传，而apply 则需要一个数组来作为第二个参数。

