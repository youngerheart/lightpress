# models

## config

| field | type | description |
| --- | --- | --- |
| blogName | String ||
| blogDesc | String ||
| password | String ||
| urlById | Boolean | use _id for url |
| totalTheme | ObjectId ||

## theme

| field | type | description |
| --- | --- | --- |
| name | String ||
| packName | String | name for package |
| author | Object ||
| sourceUrl | String | git link |
| version | String ||

## article

| field | type | description |
| --- | --- | --- |
| name | String ||
| urlName | String | name for legal url |
| mdContent | String ||
| htmlContent | String ||
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
