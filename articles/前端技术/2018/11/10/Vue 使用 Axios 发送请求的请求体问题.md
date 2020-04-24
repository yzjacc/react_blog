# Vue 使用 Axios 发送请求的请求体问题

### 问题出现

最近在接手一个项目的时候使用了Vue框架搭配Axios作为请求库，再给服务器发送post的请求的时候发现了后台总是返回500，像下图

![iq9WUe.png](https://s1.ax1x.com/2018/11/10/iq9WUe.png)

后来经过调试发现是因为 请求体内 Form Data 和 Request Payload 的问题。后台对这两者的处理是不一样的，就会导致我们拿不到数据。



### 问题原因

其实原因很简单，是因为当我们用下面的方式

```javascript
axios.post(url,{
    key:value
}).then()
```

给服务器发送请求时，axios默认会用Requset Payload发送参数，但后台是以Form Data方式处理的，所以会拿不到参数。

此时前后端的场景可能是这样的

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541849173732&di=bf115ed5351c41023ef6e49243881cd4&imgtype=0&src=http%3A%2F%2Fupload.mnw.cn%2F2017%2F0227%2F1488182688870.jpg)

### 解决方法

#### 第一种方法 URLSearchParams对象

```javascript
let params = new URLSearchParams();
//你要传给后台的key-value对
params.append('key','value');

axios.post(url,params);
```

这样传过去就是Form Data格式了，但这样有一个重大的问题那就是：兼容性很差，尤其是**iE**浏览器，完全不兼容。 

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541849468615&di=a6e6ef83be095d033bd3a295c18c3192&imgtype=0&src=http%3A%2F%2Fp0.ifengimg.com%2Fpmop%2F2018%2F0917%2F4B1AE15340D43175C77679C05155AB12E5026220_size25_w400_h399.gif)

#### 第二种方法 使用qs

```javascript
import qs from 'qs';

let params = qs.stringify({
    key:value,
    key2:value2
})

axios.post(url,params);

//或者

axios.request({
    method:'post',
    url:url,
    params: {
      key: value,
      key1: value
    },
    // `paramsSerializer` 是一个负责 `params` 序列化的函数
    paramsSerializer: function(params){ 
        // arrayFormat可以格式化你的数组参数
      return qs.stringify(params, { arrayFormat: 'brackets' })
    }
})
```