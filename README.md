Binding
=======

##数据库配置
> /config.js

修改以下数据库配置，并确保databa与你的数据库名字相同

```
  connections: {
      myLocalMySql: {
          adapter: 'mysql',
          host: '127.0.0.1',
          user: 'root',
          password: '',
          database: 'bg_binding'
      }
  },
```

##路由说明

###绑定订单编号与QQ号
---

###URL
> POST /api/binding

###参数
| 参数名 | 是否必须| 类型 | 说明|
|------------ | ------------- | ------------ |  ------------ |
| order_num | Yes  | String | 订单编号|
| qq | Yes  | String | QQ号|

###返回说明
> 成功返回binding对象

```
[
    {
        "order_num": "6577818241",
        "qq": "1231231112",
        "isUsed": true,
        "id": 10,
        "createdAt": "2014-12-24T06:50:27.000Z",
        "updatedAt": "2014-12-24T09:49:57.000Z"
    }
]
```

> 失败返回错误信息

```
{
    "err": "订单编号已被绑定"
}
```
