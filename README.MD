# apiMemoV2

This API allows to obtain resources for the MyAppMemo application.

## Getting started

1. Clone this project
2. Go to the project folder ` cd apiMemoV2`
3. Install the dependencies ` npm install`
4. Run the application with `nodemon src/app.js`

The application will automatically reload if you change any of the source files.

## Endpoints

__Login__
`POST` `'/api/login'`

__Create user__
`POST` `'/api/users'`

__Bring back all registered users__
`GET` `'/api/users'`

__Retrieve all received messages__
`GET` `'/api/users/:username/messages/inbox'`

__Retrieve all sent messages__
`GET` `'/api/users/:username/messages/sent'`

__Send a message to N users__
`POST` `'/api/users/:username/messages'`

__Change message reading state__
`POST` `'/api/users/:username/messages/:id'`
---


### Login
This request must send an object containing the following fields per body:
```
    {
      "username": "xxxxxx",
      "password": "xxxxxx"
    }

```

### Create user
This request must send an object containing the following fields per body:
```
    {
      "username": "xxxxxx",
      "firstName": "xxxxxx",
      "lastName": "xxxxxx",
      "password": "xxxxxx",
      "country": "xxxxxx",
      "city": "xxxxxx"
    }

```

### Send a message to N users
This request must send by body an array of N objects containing the following fields:
```
    [{
      "senderId": "xxxxxx",
      "receiverId": "xxxxxx",
      "text": "xxxxxx"
    },{...}]

```