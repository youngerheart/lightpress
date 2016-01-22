# API

## 通用的可能报错的结果

`400 Bad Request` 参数错误，请求失败

`401 Unauthorized` 用户未登陆

`403 forbidden` 用户权限出错

`404 Not found` 未找到该资源

`405 Method Not Allowed` 没有该方法

`500 Internal Server Error` 服务器发生错误

## 通用查询参数

*通过id查询时不可用*

`limit` 显示的条目数，默认30

`offset` 起始条数，默认0

## 配置相关

**初始化博客**

url: `(POST) /api/init`

必要字段: `name, desc, rootName, rootPassword, rootEmail`

返回: `204 No content`

**修改配置**

url: `(PUT) /api/config`

可能修改字段 `name, desc`

**查看配置**

url: `(GET) /api/config`

## 管理者操作相关

**增加管理者**

url: `(POST) /api/admin`

必要字段: `name, email, password, authority`

返回: `200 OK {id: ..}`

**注销管理者**

url: `(DELETE) /api/admin/:id`

返回: `204 No content`

**修改登录者信息**

url: `(PUT) /api/admin`

可能修改的字段: `name, email, authority`

返回: `204 No content`

**修改登录者密码, 并清除登录状态**

url: `(PUT) /api/admin/password`

可能修改的字段: `password`

**显示管理者**

url: `(GET) /api/admin`

返回: `200 OK [{name: ...}, ...]`

**登录**

url: `(POST) /api/login`

必要字段: `name, password`

返回: `200 OK {id: ...}`

**登出**

url: `(GET) /api/logout`

返回: `204 No content`

## 文章操作相关

**增加文章**

url: `(POST) /api/article`

必要字段: `title, content, author, category`

返回: `200 OK {id: ...}`

**删除文章**

url: `(DELETE) /api/article/:id`

返回: `204 No content`

**修改文章**

url: `(PUT) /api/article/:id`

可能修改的字段: `title, content, category, tag, comment`

返回: `204 No content`

**查找文章**

url:

`(GET) /api/article` 获取全部文章

`(GET) /api/article/id/:id` 通过id查找文章

返回: `200 OK [{title: ...}, ...]`

## 类别操作相关

**增加类别**

`(POST) /api/category`

必要字段: `title`

返回: `200 OK {id: ...}`

*类别的增删改同时跟随文章*

**查找类别**

`(GET) /api/category/:id` 获取某个类别的文章

`(GET) /api/category` 获取所有类别

返回: `200 OK [{title: ...}, ...]`

## 标签操作相关

**增加标签**

`(POST) /api/tag`

必要字段: `title`

返回: `200 OK {id: ...}`

*标签的增删改同时跟随文章*

**查找标签**

`(GET) /api/tag/:id` 获取某个类别的文章

`(GET) /api/tag` 获取所有类别

返回: `200 OK [{title: ...}, ...]`

## 评论操作相关

**增加评论**

url: `(POST) /api/comment`

必要字段: `content, name`

返回: `200 OK {id: ...}`

**修改评论**

url: `(PUT) /api/comment/:id`

可变字段: `content, name`

返回: `204 No content`

**删除评论**

url: `(DELETE) /api/comment/:id`

返回: `204 No content`

**查找评论**

url:

`(GET) /api/comment/:article` 查看某个文章的评论
`(GET) /api/comment` 查看所有文章的评论
