# Mood tracker

![alt text](https://github.com/wadewilsones/mood-app/blob/main/screenshot.png)


### This is a short explanation of how to get started:

1. Clone the repo:

```
git clone https://github.com/wadewilsones/mood-app.git
```

2. Navigate to your project root

```
cd ...

```

3. Install modules

```
npm install
```

4. Set up Database. 
Create DB with your credentials in db.js. 
The app uses a MariaDB connector.
```
$ npm install mariadb
```

```
const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'username', 
    password:'yourpassword',
    database:'yourdbname',
    host:'localhost',
    port:5432,
})
module.exports = pool;
```
5. Create a role and add tables from database.sql to your previously created database.
6. To get Weather API you will need your own API key from https://openweathermap.org/api. After you had obtained it, you can change Weather.js.

```javascript
.env file

API_KEY = 'yourAPIkey';

```

7. Run localhost

```
npm run serve
```

8. Navigate to the client folder and install modules run the react app

```
cd client

npm install
npm run start

```

8. Enjoy sunglasses::sunglasses:



