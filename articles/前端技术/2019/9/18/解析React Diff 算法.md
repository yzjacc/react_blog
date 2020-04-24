# 解析React Diff 算法

### Diff 的作用

React Diff 会帮助我们计算出 Virtual DOM 中*真正发生变化的部分*，并且只针对该部分进行实际的DOM操作，而不是对整个页面进行重新渲染

### 传统diff算法的问题

传统的diff算法是使用循环递归对节点进行依次对比，复杂度为O(n^3),效率低下。

### React diff算法策略

- 针对树结构(tree diff)：对UI层的DOM节点跨层级的操作进行忽略。（数量少）
- 针对组件结构(component diff)：拥有相同*类*的两个组件生成相似的树形结构，拥有不同*类*的两个组件会生成不同的属性结构。
- 针对元素结构(element-diff): 对于同一层级的一组节点，使用具有*唯一性*的id区分 (key属性)



#### tree diff 的特点

- React 通过使用 updateDepth 对 虚拟DOM树进行层次遍历

- 两棵树只对同一层级节点进行比较，只要该节点不存在了，那么该节点与其所有子节点会被*完全删除*,不在进行进一步比较。
- 只需要遍历一次，便完成对整个DOM树的比较。

> React diff 只考虑*同层次*的<u>节点位置变换</u>,若为跨层级的位置变化，则是创建节点和删除节点的操作。即在新位置上重新创建相同的节点，而删除原位置的节点。

 

Tips:  React 官方建议不要进行DOM节点的跨层级操作，可是通过CSS来隐藏，显示节点，而不是真正地删除和添加DOM节点，保持稳定的DOM结构会对性能提升有帮助。



#### component diff的特点

- 同一类型的组件，按照原策略(tree diff)比较 virtual DOM tree 
- 同类型组件，组件A转化为了组件B，如果virtual DOM 无变化，可以通过`shouldComponentUpdate()`方法来判断是否

> [React官方文档对于 shouldComponentUpdate的介绍](https://zh-hans.reactjs.org/docs/optimizing-performance.html#shouldcomponentupdate-in-action)

- 不同类型的组件，那么diff算法会把要改变的组件判断为`dirty component`,从而替换整个组件的所有节点。

> 就算结构再相似的组件，只要 React 判断是不同的组件，就不会判断是否为不同类型的组件，就不会比较其结构，而是删除组件以及其子组件，并创建新的组件以及其子节点。



#### element diff特点

对于处于同一层级的节点，React diff 提供了三种节点操作: 插入，移动，删除

- 插入： 新的组件不在原来的集合中，而是全新的节点，则对集合进行插入操作。
- 删除：组件已经在集合中，但集合已经更新，此时节点就需要删除。
- 移动：组件*已经存在于*集合中，并且集合更新时，组件并没有发生更新，只是<u>位置</u>发生改变，例如：(A,B,C,D) → (A,D,B,C), 如果为*传统diff*则会在检测到旧集合中第二位为B，新集合第二位为D时删除B，插入D，并且后面的所有节点都要重新加载，而 React diff 则是通过向同一层的节点添加 *唯一key* 进行区分，并且移动。



#### 一些移动的场景与逻辑

##### 节点相同，位置不同

[![nT73TS.md.jpg](https://s2.ax1x.com/2019/09/18/nT73TS.md.jpg)](https://imgchr.com/i/nT73TS)

按新集合中顺序开始遍历

1. B在新集合中 lastIndex(类似浮标) = 0, 在旧集合中 index = 1，index > `lastIndex` 就认为 B 对于集合中其他元素位置无影响，不进行移动，之后` lastIndex` = max(index, lastIndex) = 1
2. A在旧集合中 index = 0， 此时 `lastIndex` = 1, 满足 index < `lastIndex`, 则对A进行移动操作，此时`lastIndex` = max(Index, lastIndex) = 1
3. D和B操作相同，同(1)，不进行移动，此时`lastIndex`=max(index, lastIndex) = 3
4. C和A操作相同，同(2)，进行移动，此时`lastIndex` = max(index, lastIndex) = 3

##### 节点位置均有变化

[![nT7GFg.md.jpg](https://s2.ax1x.com/2019/09/18/nT7GFg.md.jpg)](https://imgchr.com/i/nT7GFg)

1.同上面那种情形，B不进行移动，`lastIndex`=1

2.新集合中取得E,发现旧中不存在E，在 `lastIndex`处创建E，`lastIndex`++

3.在旧集合中取到C，C不移动，`lastIndex`=2

4.在旧集合中取到A，A移动到新集合中的位置，`lastIndex`=2

5.完成新集合中所有节点diff后，对旧集合进行循环遍历，寻找新集合中不存在但就集合中的节点(此例中为D)，删除D节点。

#### React diff 的不足之处

[![nT71w8.md.jpg](https://s2.ax1x.com/2019/09/18/nT71w8.md.jpg)](https://imgchr.com/i/nT71w8)

此例中D直接从最后一位提升至第一位，导致`lastIndex`在第一步直接提升为3，使ABC在进行index与lastIndex的判断时均处于 index < lastIndex 的情况，使ABC都需要做移动操作。所以我们应该减少将*最后一个*节点提升至*第一个*的操作，如果操作频率较大或者节点数量较多时，会对渲染性能产生影响。





### 小结

- React diff 与 传统diff 的不同是 React通过优化将O(n^3)提升至O(n)
- React 通过三个方面对tree diff, component diff, element diff 进行了优化
- 在开发时，尽量保持稳定的DOM结构，并且减少将最后的节点移动到首部的操作，能够优化渲染性能。



> 参考资料
>
> 《深入React技术栈》
>
> [React 源码剖析系列 － 不可思议的 react diff](https://zhuanlan.zhihu.com/p/20346379)

