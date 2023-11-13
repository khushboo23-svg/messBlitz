# API Documentation

### Sucess return format

```js
{
    status: 200,
    data: {}
}
```

### Failure return format

```js
{
    status: 400,
    message: string
}
```

## POST REQUESTS

### Register api

link: website/registerStudent  
required format:

```js
{
    name: required,
    regNo: required,
    hostelId: optional,
    email: required,
    password: required,
    recoveryEmail: required,
    roomNo: optional
}
```

Register successful:

```js
{
    status: 200,
    data: {
        message: string
    }
}
```

Register unsucessful:

```js
{
    status: 400,
    message: string
}
```

eg.

```js
{
    "name": "Bharat",
    "regNo" : "2022ca019",
    "email" :"adbharat14@gmail.com",
    "password" : "alpha.beta",
    "recoveryEmail" : "140102002bharat@gmail.com",
    "roomNo" : 10
}
```

result

```js
{
    "status": 200,
    "data": {
        "message": "Successfully registered the user"
    }
}
```

### Student LOGIN API

link: website/loginStudent  
required format:

```js
{
    email: required,
    password: required
}
```

eg.

```js
{
    "email": "adbharat14@gmail.com",
    "password": "alpha.beta"
}
```

return

```js
{
    "status": 200,
    "data": {
        "status": 200,
        "message": "student successfully logged in",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRmNGJlOWEzMGUxYzhmZGI3MWIyNTAiLCJpYXQiOjE2OTk2OTYwNjh9.3QCBB56sMOSE71lHBcjVCN--2Og3poKigMkmQtxsVE8"
    }
}
```

### Admin LOGIN API

link: website/loginAdmin  
required format:

```js
{
    email: required,
    password: required
}
```

### Register Hostel

link: website/registerHostel (admin: chief Warden only)
required format:

```js
{
    hostelName: required;
}
```

eg.

```js
{
    "hostelName": "PG Girls"
}
```

output:

```js
{
    "status": 400,
    "data": {
        "message": "Hostel created Sucessfully"
    }
}
```

### Register Warden

link: (admin: chief Warden only)  
Required format: 
```js
{
    name:
}
```

## GET REQUESTS

### Get All hostel Names

link: website/getAllHostels
output format:

```js
{
    "status": 400,
    "data": {
        "hostels": [
            {
                "_id": "6551551bf518dbfd1be0320c",
                "hostelName": "CV Raman"
            },
            {
                "_id": "65515545f518dbfd1be03211",
                "hostelName": "PG Girls"
            }
        ]
    }
}
```
