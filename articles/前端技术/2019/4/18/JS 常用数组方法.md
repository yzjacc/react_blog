# 【详】JS 常用数组方法全涵盖

### 数组的创建

- 常用方法:

  ```javascript
  // 字面量
  var arr = [1,2,3]; // [1,2,3]
  // 构造方式
  var arr = Array(); // []
  var arr = Array(1,2,3); // [1,2,3]
  var arr = Array(3); //[,,]
  ```

> 一般的， new Array === Array, 所以加不加new并没有很大的影响。

- ES6 新增方法:

  - Array.of() 返回一个由参数组成的数组

  ```javascript
  let arr = Array.of(1,2,3); // [1,2,3]
  ```

  - Array.from() 将参数对象转换为数组,不改变原对象，而是返回一个新的数组对象

    对象的要求:

    1. 拥有 length 属性
    2. 可迭代对象,即必须要有[Symbol.iterator]接口的数据类型结构 例如：Set，Map,NodeList，字符串等

    参数:

    1. (必需) 要转化为数组的对象。
    2. (可选) 类似于 map 方法，即对于每个元素进行的处理，并会在处理后放入返回的新的数组中
    3. (可选) 用来绑定执行第二参数方法时的this指向.

  ```javascript
  let a = {0: '1', 1: '2', 2: '3', 'length': 3};
  let arr = Array.from(a); //['1','2','3']
  // 字符串
  let arr = Array.from('array'); //['a','r','r','a','y']
  // Set、Map
  let arrset = Array.from(new Set(['func', window])); //['func', window]
  let arrMap = Array.from(new Map([1,2],[3,4],[5,6])); // [[1,2], [3,4],[5,6]]
  // 类 map 方法的使用
  let theArr = Array.from([1,2,3], x => ++x); // [2,3,4]
  ```



### 数组的方法:

数组有多种方法，下面我将一一通过举例等为大家讲解以及场景应用:

#### splice() 添加/删除/替换 [改变原数组]

> arr.splice(index, num, item1, item2, ...);

参数介绍:

1. index(必需): 一个整数，用来指定添加/删除元素的位置，可以使用负数来从尾部开始数。
2. num(可选): 删除的元素数量，若不想删除，设置为0即可。
3. item1,item2....(可选): 向数组添加的元素.

返回值：如果是*删除*操作,那么会把删除的元素放在一个*新数组*中返回。

使用场景:

- 删除元素:

```javascript
let arr = [1,2,3,4,5];
// 删除 arr 的前三个元素
let before = arr.splice(0,3); //[1,2,3]
// 此时 arr 为 [4,5]
// 删除 arr 的最后一位元素
let after = arr.splice(-1,1); //[5], 注意，此时最后一位之后只有一个元素，后一位不管写多大都只会是最后一位元素被删除并返回
// 此时 arr 为 [4]
```

- 添加元素:

```javascript
let arr = [1,2,3,4,5];
let addFromStart = arr.splice(0,0,0); // [] 没有删除，所以这里返回的是空数组
console.log(arr); // [0,1,2,3,4,5]
let addFromEnd = arr.splice(-1,0,6); // []
console.log(arr); // [0,1,2,3,4,6,5] !!! 注意，是从最后一位开始向前添加元素，所以 6 在 5 前。
```

- 删除并添加

```javascript
let arr = [1,2,3,4,5];
let arrAddAndDelete = arr.splice(0,2,100); //[1,2]
console.log(arr); //[100,3,4,5]
```

特点:

1.操作的元素会包括开始的元素。

2.如果数组的元素不够，会一直删除到最后一个数组。



#### pop() 删除数组的最后一个元素[改变原数组]

> arr.pop();

无参数

返回值: 被删除的元素

使用场景:

```javascript
let arr = [1,2,3];
let deleteItem = arr.pop(); // 3
console.log(arr); //[1,2]
```



#### shift() 删除数组的第一个元素[改变原数组]

> arr.shift();

无参数

返回值: 被删除的元素

使用场景:

```javascript
let arr = [1,2,3];
let deleteItem = arr.shift(); // 1
console.log(arr); // [2,3]
```



#### push() 向末尾添加元素[改变原数组]

> arr.push(item1,item2, item3,...);

参数: 向数组末尾添加的元素

返回值：添加后数组的 length

使用场景: 

```javascript
let a = [1,2,3];
let theLength = a.push(4); // 4
console.log(a); // [1,2,3,4]
```



#### unshift()  向数组开头添加元素[改变原数组]

> arr.unshift(item1,item2,...);

参数： 向数组开头添加的元素

返回值：添加后数组的 length

使用场景: 

```javascript
let a = [1,2,3];
let theLength = a.unshift(0); // 4
console.log(a); // [0,1,2,3]
```

#### sort() 数组的排序[改变原数组]

> arr.sort(func)

对数组进行排序，之后返回这个数组

参数：规定排序顺序的比较函数(非必须)

传入函数的参数：两个默认参数，非别是要比较的两个元素（后面用a，b指示），并且排序顺序主要跟函数的返回值有关，若返回值 `小于0`， 则 a 在 b 之前；若返回值`等于0`， 则a，b位置不变；若返回值`大于0`,则 b 在 a 之前。

返回值： 排序后的数组

使用场景:

- 默认情况下，不传参数的话，默认按字母升序，若为*非字符串*,则先调用`toString()`将元素转化为字符串的 Unicode ,再进行字符串比较.所以，默认的`sort()`不适合用来比较数字等。

  ```javascript
  let arr = ["A","C","B","E","D"];
  arr.sort();
  console.log(arr); //["A","B","C","E","D"]
  ```

- 数组的升序与降序排序

  ```javascript
  let arr = [9,15,35,21,42,2,7];
  // 升序操作， 若 a < b, 则 a - b 小于 0， a将排在b之前
  arr.sort((a,b) => a-b);
  console.log(arr); //[2, 7, 9, 15, 21, 35, 42]
  // 降序操作, 若 a < b, 则 b - a 大于 0， a排在b之后
  arr.sort((a,b) => b-a);
  console.log(arr); // [42, 35, 21, 15, 9, 7, 2]
  ```

- 复杂条件(自定义)判断

  ```javascript
  // 按年龄排序，若年龄相同，就女士(sex属性为0) 排在男士(sex属性为1)之前。
  let arr = [{age: 18, sex: 0}, {age: 19, sex: 0}, {age: 20, sex: 0}, {age: 18, sex: 1}, {age: 19, sex: 1}];
  arr.sort((a,b) => {
    if (a.age === b.age) { //若年龄相同就按性别排，女士优先
      return a.sex - b.sex;
    } else { //年龄不相同就默认按年龄排升序
      return a.age - b.age;
    }
  })
  
  console.log(arr); //[{age: 18, sex: 0}, {age: 18, sex: 1}, {age: 29, sex: 0}, {age: 19, sex: 1}, {age: 20, sex: 0}];
  ```

#### reverse() 数组的反转[改变原数组]

> arr.reverse();

无参数

无返回值

使用场景:

```javascript
let arr = [1,2,3];
arr.reverse();
console.log(arr); [3,2,1]
```

#### copyWithin() 数组的指定位置复制[改变原数组、ES6]

> arr.copyWithin(index, start, end)

参数:

1. index(必需): 开始替换元素的位置，负值表示从后面查起。
2. start(可选): 从该位置读取数据，默认值为0，负值表示从后面查起。
3. end(可选): 到该位置停止读取，默认为数组长度，负值表示从后面查起，但实际上复制的是到这位之前的元素。

无返回值

使用场景:

```javascript
let arr = [1,2,3,4,5];
arr.copyWithin(0,2,4); //复制了几个元素，就替代几个元素
console.log(arr); // [3,4,3,4,5]
```

#### fill()数组的填充 [改变原数组、ES6]

> arr.fill(value, start, end)

参数:

1. value(必需): 用来填充的值。
2. start(可选): 填充的起始位置，默认为0。
3. end(可选)：填充的结束为止，默认为 数组的长度。

无返回值

使用场景:

```javascript
let arr = new Array(3);
arr.fill(1);
console.log(arr); //[1,1,1]
arr.fill(2,1,3);
console.log(arr); //[1,2,2]
```



#### slice() 拷贝数组元素 [不改变原数组]

> arr.slice(start, end);

参数:

1. start(可选): 开始复制的索引位置，负值表示从尾部向前，默认值为0。
2. end(可选): 结束复制的索引位置，复制到它的前一个元素，负值表示从尾部向前，默认值为数组长度。

返回值: 复制后的新数组

使用场景:

- 复制简单数据类型

  ```javascript
  let a = [1,2,3];
  let b = a.slice(0,2);
  console.log(a,b); //[1,2,3] [1,2]
  // 浅拷贝，复制简单数据类型，之后进行操作不会互相干扰。
  a[0] = 100;
  console.log(a,b); // [100, 2, 3] [1, 2]
  b[0] = 200;
  console.log(a,b); // [100, 2, 3] [200, 2]
  ```

- 复制复杂引用类型

  ```javascript
  let a = [{id:1,num:5}];
  let b = a.slice();
  console.log(a,b); //[{id:1,num:5}] [{id:1,num:5}]
  // 浅拷贝，复制复杂引用类型，之后进行操作会相互干扰。因为复制的只是对象的指向，而不是复制一个副本。
  a[0].id = 2;
  console.log(a,b); //[{id:2,num:5}] [{id:2,num:5}]
  b[0].num++;
  console.log(a,b); //[{id:2,num:6}] [{id:2,num:6}]
  ```




####  join() 将数组转换为字符串[不改变原数组]

> arr.join(str);

参数: str(可选): 用来作为指定的分隔符，默认为逗号。

返回值：返回转换后的字符串。

使用场景:

```javascript
let a = [1,2,3];
let str = a.join();
console.log(str); // "1,2,3"
let anotherStr = a.join('-');
console.log(anotherStr); //"1-2-3"
```

注意，当数组中为对象时，`join`方法会默认打出 [object object]



#### toString() / toLocaleString()[不改变原数组]

> arr.toString() / arr.toLocaleString();

无参数

返回值：转换后的字符串。

两个与`join`有点类似，只是 `toLocaleString`相当于先调用数组元素的 `toLocaleString`方法之后再进行`join`,`toString()`用逗号隔开数组元素拼接为字符串。

使用场景:

```javascript
let arr = [1,2,3];
let arrStr = arr.toString();
console.log(arrStr); //"1,2,3"
let arrLocale = [new Date(),1,2];
let LocaleStr = arrLocale.toLocaleString();
console.log(LocaleStr); //"2019/4/16 下午5:05:43,1,2"
```



#### concat() 连接合并多个数组，返回新数组。[不改变原数组]

> arr.concat(arr1,arr2,arr3);

参数: arr1,arr2,arr3: 需要合并的数组，也可以直接为值。

返回值：合并后的新数组。

使用场景:

```javascript
let arr = [1,2,3];
let arr1 = [4,5];
let afterArr = arr.concat(arr1);
console.log(afterArr); //[1, 2, 3, 4, 5]
console.log(arr); //[1, 2, 3]
console.log(arr1); //[4, 5]
```

关于合并数组我们还可以使用 `...` ES6 提供的扩展运算符来合并

```javascript
let arr = [1,2,3];
let arr1 = [...arr,4,5]; // [1,2,3,4,5]
```

#### indexOf() 查找数组中某元素的索引值。[不改变原数组]

> arr.indexOf(value, fromIndex);

参数:

1. value(必需)：要查找的元素值
2. fromIndex(可选): 从此处开始查找，接受负值，默认为0，若超过数组长度则函数返回-1。

返回值:

- 若查找到元素，则返回元素的索引值。
- 若数组中没有此元素，返回 -1.

注意!!! `indexOf`使用的是严格相等(`===`),不存在隐式类型转换。

```javascript
let arr = [1,2,3];
console.log(arr.indexOf(1)); // 0
console.log(arr.indexOf(1,1)); // -1
console.log(arr.indexOf(4)); // -1
```

#### lastIndexOf() 查找指定元素在数组中的最后一个位置。[不改变原数组]

> arr.lastIndexOf(value, fromIndex);

参数:

1. value(必需): 要查找的元素
2. fromIndex(可选):*逆向*查找的开始位置 ,默认为数组长度 - 1，查找整个数组。

返回值: 元素的最后一个位置。

```javascript
let arr = [1,2,3,2,1];
console.log(arr.lastIndexOf(1)); // 4
console.log(arr.lastIndexOf(2)); // 3
```

#### includes() 查找数组是否包含某个元素。[不改变原数组, ES7]

> arr.includes(value);

参数:

1. value(必需)：要查找的元素值
2. fromIndex(可选): 从此处开始查找，接受负值，默认为0，若超过数组长度则函数返回-1。

返回值：布尔型

与`indexOf`的区别:

1. indexOf 不能识别 `NaN`,但 includes 可以。
2. 当我们只需要查找是否含有时，若返回索引可能是0的情况，不方便我们直接进行一些判断操作。

```javascript
let arr = [1,NaN, 100,'42'];
console.log(arr.includes(1)); //true
console.log(arr.includes(NaN)); //true
console.log(arr.includes(1,3)); //false
```

### 遍历

#### forEach 按升序依次遍历数组中的值

> arr.forEach(function(value, index, arr), this);

参数:

1. value(必须): 当前遍历时的数组值。
2. index(可选): 当前遍历时的索引值。
3. arr(可选): 数组对象本身。
4. this(可选): 执行回调函数时的。

返回值：无

一些特点：

 	1. 在迭代过程中遇到删除的元素或者空元素，则会跳过回调函数。
 	2. 对空数组不进行回调。
 	3. 遍历的次数在循环前就会确认，即在遍历过程中添加元素不会被遍历到。

```javascript
let arr = [1,2,3,4, ,5 ];
const obj = {name: 'obj'};
arr.forEach(function(value, index,array) {
  arr[4] = 'edited'; // 改变空元素的值,传递给回调的是遍历到这一刻的值
  arr.push(6); //新添加的元素，不会被遍历到。
  console.log(value, index);
  console.log(this.name); // "obj"
}, obj); // 用来让回调函数内的this指向obj
```



#### some()检测数组中是否存在满足条件的元素

> arr.some(function(value, index, arr), this);

参数:

1. value(必须): 当前遍历时的数组值。
2. index(可选): 当前遍历时的索引值。
3. arr(可选): 数组对象本身。
4. this(可选): 执行回调函数时的。

返回值：布尔类型 `ture` or `false`

```javascript
let arr = [1,2,3,4,5];
let result1 = arr.some((value) => value > 6); //false
let result2 = arr.some((value) => value < 2); //true
```

#### every()检测数组中的元素是否全部满足条件

> arr.some(function(value, index, arr), this);

参数:

1. value(必须): 当前遍历时的数组值。
2. index(可选): 当前遍历时的索引值。
3. arr(可选): 数组对象本身。
4. this(可选): 执行回调函数时的。

返回值：布尔类型 `ture` or `false`

```javascript
let arr = [1,2,3,4,5];
let result1 = arr.every((value) => value > 6); //false
let result2 = arr.every((value) => value < 6); //true
```

#### filter()过滤原数组，返回新数组

> arr.filter(function(value,index,arr), this);

参数:

1. value(必须): 当前遍历时的数组值。
2. index(可选): 当前遍历时的索引值。
3. arr(可选): 数组对象本身。
4. this(可选): 执行回调函数时的。

返回值: 新的数组。

```javascript
let arr = [1,2,3,4,5];
// 只获取数组中大于2的元素，并放入一个新数组中
let result = arr.filter(item => item > 2);
console.log(result); //[3,4,5]
```

#### map() 对数组中的每一个元素都进行处理，返回新的数组

> arr.map(function(value, index, arr), this);

map 遍历的回调内必须要有一个返回值，一定要注意。

参数:

1. value(必须): 当前遍历时的数组值。
2. index(可选): 当前遍历时的索引值。
3. arr(可选): 数组对象本身。
4. this(可选): 执行回调函数时的。

返回值: 新的数组。

```javascript
let arr = [1,2,3,4,5];
// 数组元素变为原来的2倍
let result = arr.map(item => item * 2);
console.log(result); //[2, 4, 6, 8, 10]
```

#### reduce()数组的累加器，合并成为一个值。

> arr.reduce((total, value, index, arr), init)

参数:

1. total(必须)：初始值，之后为上一次回调的返回值。
2. value(必须): 数组元素的值。
3. index(可选): 索引值。
4. arr(可选): 数组对象。
5. init(可选): 初始值。

返回值：累加后的值。

- 若 init 在调用 reduce时提供，那么第一次total即为 init， value 为 第一个元素的值。
- 若 init 没有提供， total为数组第一个元素的值，value为第二个元素的值。

```javascript
let arr = [1,2,3,4];
let sum = arr.reduce((total,value) => total + value ); //10
```

#### find() / findIndex() 根据条件找到数组成员 [ES6]

> arr.find(function(value, index, arr), this);

参数:

1. value(必须): 当前遍历时的数组值。
2. index(可选): 当前遍历时的索引值。
3. arr(可选): 数组对象本身。
4. this(可选): 执行回调函数时的。

返回值： find()返回第一个符合条件的数组成员，若不存在返回`undefined`。 findIndex()返回符合条件的数组成员的索引。

```javascript
let arr = [1,2,3,4];
let result1 = arr.find((value) => value > 3); 
console.log(result1);//4
let result2 = arr.findIndex((value) => value > 3);
console.log(result2); //3
```

#### flat()深度遍历展开数组

> arr.flat(depth);

参数: depth(可选): 提取嵌套数组的结构深度，默认为1。

返回值：展开后的新数组。

 ```javascript
let arr = [1,2,[3,4,[5,6]]]
let one = arr.flat();
console.log(one); //默认值为1， 所以只能展开一层嵌套 [1,2,3,4,[5,6]]
let two = arr.flat(2);
console.log(two); //[1,2,3,4,5,6]
// 若不清楚有多少层嵌套，可以直接用 Infinity 设置，就可全部展开
let inf = arr.flat(Infinity);
console.log(inf); //[1,2,3,4,5,6]
// flat方法会移除数组中的空白项
let arr2 = [1,2,3,,5];
console.log(arr2.flat()); //[1,2,3,5]
 ```

分享一个可以用这个解决的面试题，还是通过这道题发现原来有`flat`这个方法 :joy:

题目: 将一个多维数组扁平化并去重，之后得到一个升序数组。

```javascript
let arr = [1,2,3,4,5,[2,4,5,8,[44,88,1,3,4,8,5,7,6,[123],111],15],2,8,7];
let newArr = Array.from(new Set(arr.flat(Infinity))).sort((a,b) => a - b)
console.log(newArr); //[1, 2, 3, 4, 5, 6, 7, 8, 15, 44, 88, 111, 123]
```

#### keys() 遍历键名 / values()  遍历键值/ entries() 遍历键值对

>  arr.keys()  / arr.values() / arr.entries()

无参数

返回值: 一个可遍历的数组对象[Array Iterator],所以我们是不可以直接打印这个对象的，而是可以遍历它。

```javascript
let arr = [9,8,7,6,5,4,3,2,1]
for(let index of arr.keys()){
    console.log(index); //0,1,2,3,4...依次打印
}

for(let value of arr.values()){
    console.log(value); //9,8,7,6,5....依次打印
}

for(let [index, value] of arr.entries()){
    console.log(index,value); // 0,9  1,8  2,7
}
```

当然也可以手动调用遍历器

```javascript
let arr =["one","two","three"];
let result = arr.entries();
console.log(result.next().value); //[0, "one"]
console.log(result.next().value); //[1,"two"]
console.log(result.next().value); //[2, "three"]
```





### 总结

​	之前一直用数组有关方法的时候感觉总是只能想起一些常用的，有时用一些数组方法还要去确认了文档才能开始使用，感觉数组的有些方法还是需要有个系统的认知，可以将一些更高效的原生方法应用在开发中。

​	若对文中部分内容有异议，欢迎在评论区讨论！





##### 参考链接:

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

[ECMAScript 6 入门](http://es6.ruanyifeng.com/)

