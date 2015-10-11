# nd-datetime

[![spm version](http://spm.crossjs.com/badge/nd-datetime)](http://spm.crossjs.com/package/nd-datetime)

> 简单的时间日期转换库

## 安装

```bash
$ spm install nd-datetime --save
```

## 使用

```js
var datetime = require('nd-datetime');
// use datetime
console.log(datetime().format())
console.log(datetime(1444553026337).format())
console.log(datetime(1444553026337).format(yyyy-MM-dd hh:mm:ss.ii))
// see more examples in tests/
```
