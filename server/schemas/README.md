# 数据库

## admin(管理者)

| 字段名 | 类型 | 描述 |
| ---- | ------- | ----- |
| name | String | 用户名，unique |
| email | String | 邮箱 |
| password | String | 密码 |
| authority | Number | 用户权限: root，普通发布者 |
| article | ObjectIdArray | 该管理者发布的文章 |
| category | ObjectIdArray | 该管理者创建的类别 |
| tag | ObjectIdArray | 该管理者创建的标签 |

## article(文章)

| 字段名 | 类型 | 描述 |
| ---- | ------- | ----- |
| title | String | 文章名 |
| context | String | 文章内容 |
| author | ObjectId | 文章作者 |
| category | ObjectId | 文章类别 |
| tag | ObjectIdArray | 文章标签 |
| comment | ObjectIdArray | 文章评论 |

## category(类别)

| 字段名 | 类型 | 描述 |
| ---- | ------- | ----- |
| title | String | 类别名 |
| author | ObjectId | 类别作者 |
| category | ObjectIdArray | 该类别文章 |

## tag(标签)

| 字段名 | 类型 | 描述 |
| ---- | ------- | ----- |
| title | String | 标签名 |
| author | ObjectId | 标签作者 |
| category | ObjectIdArray | 该标签文章 |

## comment(评论)

| 字段名 | 类型 | 描述 |
| ---- | ------- | ----- |
| ip | String | 评论者ip |
| name | String | 评论者署名 |
| context | String | 评论内容 |
| article | ObjectId | 评论的文章 |
