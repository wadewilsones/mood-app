# Hello there

## This is short explanation how to get started:

1. Clone the repo:

```
git clone https://github.com/wadewilsones/mood-app.git
```

2. Install modules

```
npm install
```

3. Set up Database. 
Create DB with your credentials in db.js

```
    user: 'yourusername', 
    password:'yourpassword',
    database:'yourdbname',
    host:'localhost',
    port:5432,
    
```
4. Create a role and add tables from database.sql to your previously created database.
5. To get Weather API you will need your own API key from https://openweathermap.org/api. After you had obtained it, you can change Weather.js.

```javascript

const API_KEY = 'type ypur API here'

```

6. Run localhost

```
npm run serve
```

7. Go to client folder and run react app

```
cd client

npm run start

```

8. Enjoy



