# React Hooks

### 为什么需要Hooks?

我们知道，React 提供的单向数据流以及组件化帮助我们将一个庞大的项目变为小型、独立、可复用的组件。但有时，我们无法进一步拆分**很复杂的组件**，因为它们内部的逻辑是**有状态的**，无法抽象为函数式组件。所以有时我们可能会写出非常不适合复用性开发的：

- **巨大的组件** 难以重构
- **重复的逻辑** 需要在多个组件的多个生命周期中写重复的代码
- **复杂的应用模式** 类似于 render props 于 高阶组件

但谢天谢地，Hooks 的出现，让我们把组件内部的逻辑组织成为了可复用的**隔离单元**。

### Hooks 要解决的问题：

跨组件地复用包含状态的逻辑，通过 Hooks 可以将含有 state 的逻辑从组建抽象出来，同时也可以帮助我们在*不重写组件结构*的情况下复用逻辑。Hooks 一般是用于函数式组件的，在类class组件中无效。让我们根据代码的作用将它们拆分，而不是生命周期。简而言之， Hooks 实现了我们在函数式组件中使用*状态变量*与*类似*于生命周期的操作。

### 使用 Hooks 的语法规则

- 只能在顶层调用钩子。不在循环、控制流和嵌套的函数中调用钩子。
- 只能从React的函数式组件中调用钩子。不在常规的JS函数中调用钩子。

### 创建Hooks

- 使用`useState`创建Hook

```react
import {useState} from 'react';

function hooks(){
    // 声明一个名为 count 的新状态变量
    const [count, setCount] = useState(0);
    // 第二个参数 setCount 为一个可以更新状态的函数
    // useState 的参数即为初始值
    
    return (
        <div>
        	<p>当前的状态量为: {count}</p>
            <button onClick={() => setCount(count + 1)}>点击加一</button>
        </div>
    )
}
```

- 使用 `useEffect` 来执行相应操作

```react
import {useState, useEffect} from 'react';

function hooks(){
    const [count, setCount] = useState(0);
    // 类似于 componentDidMount 和 componentDidUpdate
    // 在 useEffect 中可以使用组建的 state 和 props
    // 在每次渲染后都执行 useEffect
    useEffect(() => {
        window.alert(`You have clicked ${count} times`);
    })
    return (
        <div>
        	<p>当前的状态量为: {count}</p>
            <button onClick={() => setCount(count + 1)}>点击加一</button>
        </div>
    )
}
```

### 钩子是独立的

我们在两个不同的组件使用同一个钩子，他们是相互独立的，甚至在一个组件使用两个钩子他们也是相互独立的。

#### React如何保证useState相互独立

React 其实是根据`useState`传出现的顺序来保证`useState`之间相互独立。

```react
// 首次渲染
const [num, setNum] = useState(1); // 将num初始化为1
const [str, setStr] = useState('string'); // 将str初始化为'string'
const [obj, setObj] = useState({id:1}); // ....
// 第二次渲染
const [num, setNum] = useState(1); // 读取状态变量num的值， 此时传入的参数已被忽略，下同
const [str, setStr] = useState('string'); // 读取状态变量str的值
const [obj, setObj] = useState({id:1}); // ....
```

同时正是由于根据顺序保证独立，所以 React 规定我们必须把 hooks 写在最外层，而不能写在条件语句之中，来确保hooks的执行顺序一致，若要进行条件判断，我们应该在 `useEffect` 的函数中写入条件

### Effect Hooks

useEffect 来传递给 React 一个方法，React会在进行了 DOM 更新之后调用。我们通常将 useEffect 放入组件内部，这样我们可以直接访问 state 与 props。记得，useEffect 在每次 render 后都要调用。

#### 需要清理的Effect

我们有时需要从*外部数据源*获取数据，此时我们就要保证清理Effect来避免内存泄露 ，此时我们需要在 effect 中返回一个函数来清理它， React 会在组件每次接触挂载的时候清理。一个比较使用的场景就是我们在 `useEffect`中若执行了异步请求，由于异步的时间不确定性，我们很需要在执行下一次异步请求时先结束上一次的请求，因此我们就需要清理。

```react
useEffect(() => {
    let canceled = false;
    const getData = async () => {
        const res = await fetch(api);
        if(!canceled) {
            // 展示 res
        }
    }
    
    getData();
    
    // return 的即为我们的清理函数
    return () => {
        canceled = true;
    }
});
```

此时我们在进行重新渲染时，就可以避免异步请求带来的竞态问题，从而避免数据的不稳定性。

#### 配置根据条件执行的Effect

我们可以给`useEffect`传入第二个参数只有当第二个参数（数组）里的所有的state 值发生变化时，才重新执行Effect

```react
useEffect(() => {
    window.alert(`you had clicked ${count} times`);
}, [count]); //只有当 count 发生变化时才会重新执行effect
```

### 在函数式组件使用实例

由于函数式组件中没有 this ，所以我们无法使用ref，但hooks帮助我们解决了这个问题，他提供了`useRef`方法来为我们创建一个实例，而传入的参数会被挂载在这个实例的`.current`属性上，返回的实例会持续到整个生命周期结束为止。

```react
function RefExample() {
    const ref1 = useRef(null);
    return (
    	<div>
            <input ref={ref1} type="text" />
            <button onClick={() => {ref1.current.focus()}}
    	</div>
    )
}
```



### 类型的Hooks

如果比起上面的状态变量类型，你更想要使用 Redux 类型的状态管理，OK，React 也给我们提供了`useReducer`这个方法。作为`useState` 的一种替代，我们可以使用`dispatch`方法来改变状态变量。

```react
// 初始化的状态变量
const initState = {count:0};
// 编写 reducer 处理函数
function reducer(state, action) {
    switch(action.type) {
        case 'increment': return {count: state.count + 1};
        case 'decrement': return {count: state.count - 1};
    }
}

function counter({initState}) {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
    <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
   	</div>
    )
}
```

### 回调形式的Hooks

我们可以通过监听状态变量并在变换后执行回调函数来执行 Effect ，此时你可能会问，为什么使用 Hooks 会使用这么多的 inline 函数，岂不是很影响性能？ 谢天谢地，JavaScript 中的*闭包函数*的性能十分的快，它帮助了我们很多。回调形式的 Hooks 有两种，`useCallback`与`useMemo`.

> 二者的转换关系为：
>
> useCallback(fn, inputs) === useMemo(() => fn, inputs)

`useCallback`是如何帮助我们提升性能的呢？ 实际上，它其实是缓存了每次渲染时的 inline 回调函数的实例，之后无论是配合`shouldComponentUpdate` 或者是 `React.memo`都能够达到减少不必要的渲染的作用。这也提示我们，`React.memo`和`React.useCallback`一般是配合使用，缺了其一都可能无法达到提升性能的功效。

下面以一个表单组件表示使用方法

```react
function FormComponent() {
    const [text, setText] = useState(' ');
    
    const handleSubmit = useCallback(() => {
        console.log(`new test is ${text}`);
    }, [text]);
    
    return (
    	<div>
        	<input value={text} onChange={(e) => setText(e.target.value)} />
            <BigTree onSubmit={handleSubmit} /> // 巨大无比的组件，不优化卡的不行
        </div>
    )
}
```

但此时有一个很严重的问题，就是我们的 BigTree 依赖于一个太容易变化的 state， 只要我们在input框随意输入， BigTree 就会重新渲染好多次来获取最新的callback，此时这个callback就无法使用缓存了。

一个解决办法是我们定义一个新的实例，这个实例只有在 re-render 时才会更新最新的值，这样我们就可以不根据一个经常变换的state，而是根据一个在 `useLayoutEffect`中更新的ref实例来更新。

```react
function FormComponent() {
    const [text, setText] = useState(' ');
    const textRef = useRef();
    
    useLayoutEffect(() => {
        textRef.current = text;
    })
    
    const handleSubmit = useCallback(() => {
        console.log(`new test is ${text}`);
    }, [textRef]); // 只根据 textRef 的变化而产生变化，并不会在 text 改变就变化
    
    return (
    	<div>
        	<input value={text} onChange={(e) => setText(e.target.value)} />
            <BigTree onSubmit={handleSubmit} /> // 巨大无比的组件，不优化卡的不行
        </div>
    )
}
```



### Hooks的多重 Effect 更新场景

#### useLayoutEffect

> DOM 突变之后，重新绘制之前同步触发

它与 `useEffect` 的作用相同,都是用来执行副作用的，但不同的是，它会在所有的 DOM 变更结束后同步地调用 effect。一个与 `useEffect`很大的区别是，`useLayoutEffect`是同步地，而`useEffect`是异步的，在浏览器重新绘制页面布局前，`useLayoutEffect`内部的更新将会同步刷新，但官方给出的建议是尽量使用`useEffect`来避免阻塞视觉更新。

### Hooks 的好处

- 避免了我们在复用含状态组件(classes) 时使用 `render props` 与 `高阶组件`时产生的

夸张的层级嵌套。

- 防止我们为了实现功能而在生命周期函数中写入了大量的重复的代码。
- classes 中的 this 指向十分的迷惑。



