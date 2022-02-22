## What the project does

This project is all about user crud. user can sign Up,
login In,edit profile and delete own profile and also user can change password if forgot.

## Why the project is usefull?

project is usefull because it is flexible to use and also use authentication and authorization technics with the help of this project become more secure.

## How user can get started with the project?

you need to install node environment in your machine you get reference from `https://nodejs.org/en/download/`,
after that we need to install mongodb you can get reference from `https://www.mongodb.com/try/download/community`,
then for install all package we have to run command `npm install`,and
For starting the project command- `npm start`

## API Reference

#### sign Up user

```http
  post /signUp
```

| Parameter   | Type     | Description  |
| :---------- | :------- | :----------- |
| `firstname` | `string` | **Required** |
| `lastName`  | `string` | **Required** |
| `email`     | `string` | **Required** |
| `password`  | `string` | **Required** |

#### login User

```http
  post /login
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

#### show User List

```http
  GET /showUserList
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**.(authorization) |

#### delete User List

```http
  GET /deleteUser
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**.(authorization) |

#### edit User List

```http
  put /editUser
```

| Parameter   | Type     | Description                  |
| :---------- | :------- | :--------------------------- |
| `id`        | `string` | **Required**.(authorization) |
| `firstname` | `string` | **Required**                 |
| `lastname`  | `string` | **Required**                 |

#### forgetPassword

```http
  post /forgetPassword
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `email`   | `string` | **Required**. |

#### verifyToken

```http
  get /verifyToken/:token
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `token`   | `string` | **Required**. |

#### resetPassword

```http
  get /resetPassword/:token
```

| Parameter            | Type     | Description   |
| :------------------- | :------- | :------------ |
| `token`              | `string` | **Required**. |
| `newPassword`        | `string` | **Required**. |
| `confirmNewPassword` | `string` | **Required**. |

#### truncateTable

```http
  get /truncateTable
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `token`   | `string` | **Required**. |
