# models

## common

* `createdAt` & `updatedAt` will be included in all schemas by using `timestamps` option.
*

| field | type | description |
| --- | --- | --- |
| createdAt | Date ||
| updatedAt | Date ||

## config

| field | type | description |
| --- | --- | --- |
| blogName | String ||
| blogDesc | String ||
| password | String ||
| email | String ||
| totalTheme | ObjectId ||

## theme

| field | type | description |
| --- | --- | --- |
| name | String ||
| packName | String | name for package |
| author | Object ||
| description | String ||
| homepage | String | |
| sourceUrl | String | git link |
| version | String ||

## article

| field | type | description |
| --- | --- | --- |
| title | String ||
| urlName | String | name for legal url |
| mdContent | String ||
| htmlContent | String ||
| isPublished | Boolean ||
| publishTime | Date ||
| headImgUrl || a url for head image |
| category | ObjectId ||
| tag | ObjectIdArray ||

## category

| field | type | description |
| --- | --- | --- |
| name | String ||
| urlName | String | name for legal url |

## tag

| field | type | description |
| --- | --- | --- |
| name | String ||
| urlName | String | name for legal url |

## comment

| field | type | description |
| --- | --- | --- |
| userIP | String ||
| nickname | String ||
| content | String ||
| reply | ObjectId ||
| article | ObjectId ||
