# Cryptocurrency market simulation

### Getting Started

#### These instructions will get you copy of this project and runnning on your local machine for development.

Install dependencies

```
npm install
```

Create **.env** file and set enviroment variables based on **_.env-sample_**.

```
MONGODB_CONNECTION_URL = <your mongodb connection link>
RECAPTCHA_SERVER_KEY = < your recaptcha v2 server key - you can generate this code here: https://www.google.com/u/1/recaptcha/admin/create >
```

Run backend

```
npm run server
```

Run Angular app

```
ng serve
```
