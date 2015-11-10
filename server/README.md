# API

## 通用的可能报错的结果

`400 Bad Request` 参数错误，请求失败

`401 Unauthorized` 用户没登陆或权限不够

`404 Not found` 未找到该资源

`405 Method Not Allowed` 没有该方法

`500 Internal Server Error` 服务器发生错误

## 管理者操作相关

**增加管理者**

url: `(POST) /api/admin`

必要字段: `name, email, phone, password, authority`

返回: `204 No content`

**删除管理者**

url: `(DELETE) /api/admin/id/:id`

返回: `204 No content`

**修改管理者**

url: `(PUT) /api/admin/id/:id`

可能修改的字段: `name, email, phone, password, authority`

返回: `204 No content`

**显示管理者**

url: `(GET) /api/admin`

返回: `200 OK [{name: ...}, ...]`

**登录**

url: `(POST) /api/login`

必要字段: `name, password`

返回: `204 No content`

**登出**

url: `(GET) /api/logout`

返回: `204 No content`
