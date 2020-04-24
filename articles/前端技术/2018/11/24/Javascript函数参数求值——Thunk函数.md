# Javascript函数参数求值——Thunk函数

### 问题发现

我们在平常的开发过程中可能会写出以下类型的代码:

```javascript
...
fun(x+1,2); //参数是一个表达式的情况
...
```

诸如此类的参数是一个表达式，那我们时候考虑过一个问题，这个参数究竟是在什么时候求的值呢？

### 两种情况

我们通过下面的这个函数来讲解两种情况

```javascript
var a = 1;

function double(argument){
    return argument * 2;
}


double(a+1);
```



#### 传值调用(call by value)

就是在参数进入函数体之前就把表达式的值计算出来在代入函数体。类似于C语言

```javascript
double(a+1);
//当使用传值调用时，上面的语句等同于
double(2);
```

#### 传名调用(call by name)

直接把表达式传入函数体，当需要用到它的时候再运算它求值。类似于Scala

```javascript
double(a+1);
//当使用传名调用时，上面的语句等同于
(a+1) * 2;
```

#### 利弊分析

**传值调用** 相比较于 **传名调用** 比较简单，但是对参数求值的时候如果我们实际并没有用到这个参数可能会造成性能的损失。

```javascript
function fun(a,b){
    if(a == 1){
        return b;
    }else{
        return a;
    }
}
var x = 100;
fun(0,x * 3 * 10 - x * 20 + x);//注意此时传递进去的第二个参数因为条件判断后并没有使用
```

上面的代码中，因为 a 并不等于 1 ，所以这次函数我们并没有用到第二个参数，但是如果我们要求值就需要计算那一长串表达式，实际上是没有必要的，所以我们更倾向于**传名调用**这种高效率的参数求值方式。

But, what a pity! JavaScript语言使用的方式是**传值调用**，但我们可以用一种其他方法来实现传名调用——**Thunk函数**！

### Thunk函数

编译器进行**传名调用**的方法就是先将参数放到一个临时函数中，再将这个临时函数传入函数体。这个临时函数就是主角 —— Thunk函数。

```javascript
function double(argument){
    return argument * 2;
}

double(a+1);
//等同于
var thunk = function(){ //thunk临时函数
    return a + 1;
}
function double(thunk){
    return thunk() * 2;
}
```

相当于是当我们需要用的那个参数里表达式的值的时候就调用那个函数求值即可。它是实现**传名调用**的一种策略。

### 在Javascript中实现Thunk函数

对于Javascript这门语言来说，它的Thunk函数更加特殊。它替换的不是表达式而是多参数函数，把它变成一个-只接受回调函数-作为参数-的-单参数函数。

```javascript
// ES6版本
var Thunk = function(fun) {  //一个thunk函数转换器
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};
```

使用转换器我们可以把一个需要引入多个回调函数的函数变为一个thunk函数。

```javascript
var multipleParametersFunc = function(param,callback){
    console.log(param);
    callback();
}
//使用转换器
var thunkFunc = Thunk(multipleParametersFunc);
thunkFunc(param)(callback);
```

### Thunk的强大功能——Generator函数的自动流程管理

Thunk函数在ES6的出现之后又有了一个强大的功能——对Generator函数的自动流程管理。

在不使用Thunk函数时我们可以用如下方法自动执行Generator

```javascript
function* gen(){
    //do something...
}
var g = gen();
var result = g.next();

while(!result.done){
    console.log(result.value);
    result = g.next();
}
```

下面我们使用了Thunk函数自动执行

```javascript
function thunkRunGen(fun){
    var gen = fun();
    
    function next(err, data){
        var result = gen.next(data);
        if(result.done) return;
        result.value(next);
    }
    
    next();
}

function* g(){
    //do something
}

thunkRunGen(g);
```

上面代码的`thunkRunGen`函数，就是一个 Generator 函数的自动执行器。内部的`next`函数就是 Thunk 的回调函数。`next`函数先将指针移到 Generator 函数的下一步（`gen.next`方法），然后判断 Generator 函数是否结束（`result.done`属性），如果没结束，就将`next`函数再传入 Thunk 函数（`result.value`属性），否则就直接退出。

使用这个执行器，不管Generator函数内部有多少个异步操作，我们只需要把Generator函数传入thunkRunGen即可。但有个前提，每个yield 函数后面都需要是Thunk函数。

Thunk 函数它并不是 Generator 函数自动执行的唯一方案。因为自动执行的关键是-自动控制 Generator 函数的流程，接收和交还程序的执行权。回调函数可以做到这一点，Promise 对象当然也可以做到这一点。