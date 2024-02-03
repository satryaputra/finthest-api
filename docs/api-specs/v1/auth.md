# Auth API Spec

## Login API

Endpoint : [POST]() `/auth/login`

Request Body :

```json
{
  "email": "eka@email.com",
  "password": "Ekasatrya123"
}
```

Response Body Success :

```json
{
  "accessToken": "token"
}
```

## Signup  API

Endpoint : [POST]() `/auth/signup`

Request Body :

```json
{
  "name": "Eka",
  "email": "eka@email.com",
  "password": "Ekasatrya123"
}
```

Response Body Success :

```json
{
  "accessToken": "token"
}
```

## Refresh Token API

Description : Generate new accessToken and refreshToken (cookie) 

Endpoint : [POST]() `/auth/refresh`

Query Param :

- accessToken : String , a expired JWT

Response Body Success :

```json
{
  "accessToken": "token"
}
```

## Logout  API

Endpoint : [POST]() `/auth/logout`

Headers :

- Authorization : Bearer _token_

Response Body Success `204` :

```json
```

## Forgot Password API
Description : Send link reset password to email

Endpoint : [POST]() `/auth/password/forgot`

Query Param :

- email : String (email users who forgot their password)

Response Body Success `200` :

```json
{
  "message": "Berhasil mengirim link untuk reset password"
}
```

## Reset Password API

Endpoint : [POST]() `/auth/password/reset`

Request Body :

```json
{
  "token": "token",
  "oldPassword": "Ekasatrya123",
  "newPassword": "Passwordbaru123"
}
```

Response Body Success `200` :

```json
{
  "message": "Berhasil mengubah password"
}
```

