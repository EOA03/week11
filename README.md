# Project Milestone 2

## INTRODUCTION

I built a transfer request management system with a RESTful API using Node.js, Express.js, and MySQL.

## TOOLS

- **Programming language**
  - JavaScript (with Node.js & Express.js)
- **Helping Tools**
  - VS Code
  - Swagger UI
  - MySQL
  - Railway
  - Cyclic

## DETAILS PROJECT

### Roles

There are 3 roles in this project: admin, approver, and user.

- User
  - Register
  - Login
  - Get all transfer request
  - Create a transfer request

- Approver
  - Register
  - Login
  - Get all transfer request
  - Update transfer status

- Admin
  - Register
  - Login
  - Get all transfer request
  - Change the transfer request data
  - Update transfer status
  - Delete transfer request

You can try using these roles data for login:

**User**
```
{
    "username": "user123",
    "password": "ester123"
}
```

**Approver**
```
{
    "username": "approver123",
    "password": "ester123"
}
```

**Admin**
```
{
    "username": "admin123",
    "password": "ester123"
}
```

### Transfer

The transfer data is still empty. Feel free to try adding and changing data.

### Endpoint

| Name  | HTTP Method | Endpoint | Requirements |
| ------| ----------- | -------- | ------------ |
| **List All User**                               | `GET`    | [/auth] |
| **List All User (admin)**                       | `GET`    | [/auth/admin] |
| **Register User**                               | `POST`   | [/auth/register] | Request Body: `username: string, password: string, role: string` |
| **Login User**                                  | `POST`   | [/auth/login] | Request Body: `username: string, password: string` |
| **List All Transfer (admin/approver)**          | `GET`    | [/transfer] |
| **List All Transfer User ID (user)**            | `GET`    | [/transfer/:user_id] | Request Params: `user_id: number` |
| **Create Transfer by User ID (user)**           | `POST`   | [/transfer/:user_id] | Request Params: `user_id: number` <br> Request Body: `destinationBank: string, destinationAccount: number, amount: number, details: string` |
| **Update Transfer Status by Transfer ID (admin/approver)** | `PATCH`  | [/transfer/:transferId] | Request Params: `transferId: number` <br> Request Body: `status: string` |
| **Change Transfer Data by Transfer ID (admin)** | `PUT`    | [/transfer/:transferId]   | Request Params: `transferId: number` <br> Request Body: `destinationBank: string, destinationAccount: number, amount: number, details: string` |
| **Delete Transfer by Transfer ID (admin)**      | `DELETE` | [/transfer/:transferId]  | Request Params: `transferId: number` |

### Deploy

I deployed the database using Railway and my web app using Cyclic. You can try it using the link below.

[Try API using Swagger](https://week-11-eoa03.cyclic.app/api-docs/)

That's all for my project. I hope I've already explained it clearly.

![Thankyou](https://media1.giphy.com/media/osjgQPWRx3cac/giphy.gif)
