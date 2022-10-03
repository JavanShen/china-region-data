## 中国省市区数据

### 特性

+ 省市区关联数据

+ 支持TS类型提示

+ 通过数据关联测试

### 安装

```shell
npm i china-region-data
```

### 数据格式

[省份数据](https://raw.githubusercontent.com/JavanShen/china-region-data/master/src/data/province.json)

```js
const province = [
    {
        //省份名称
        name: '浙江省',
        //行政区划代码
        id: '330000000000'
    },
    //...
]
```

[市级数据](https://raw.githubusercontent.com/JavanShen/china-region-data/master/src/data/city.json)

```js
const city = {
    //省行政区划代码
    '330000000000': [
        {
            //上级省份
            province: '浙江省',
            //市级名称
            name: '湖州市',
            //行政区划代码
            id: '330500000000'
        },
        //...
    ],
    //...
}
```

[地区数据](https://raw.githubusercontent.com/JavanShen/china-region-data/master/src/data/county.json)

```js
const country = {
    //市行政区划代码
    '330500000000': [
        {
            //上级市级
            city: '湖州市',
            //地区名称
            name: '德清县',
            //行政区划代码
            id: '330521000000'
        }
        //...
    ],
    //...
}
```
